import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { syncStripeDataToSupabase } from '@/lib/stripe/sync';
import { createClient } from '@/utils/supabase/server';

// Disable body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Events we track (2025 comprehensive list)
const TRACKED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.trial_will_end', // 3 days before trial ends
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.payment_succeeded',
  'invoice.payment_action_required', // SCA requirements
  'payment_intent.succeeded', // Single assessment purchases
  'payment_intent.payment_failed',
  'customer.subscription.pending_update_applied', // Proration handling
] as const;

/**
 * Stripe Webhook Handler (Pages Router)
 *
 * This endpoint receives webhook events from Stripe and syncs subscription
 * data to our Supabase database using the single source of truth pattern.
 *
 * Critical: Must use raw body for signature verification
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Step 1: Get raw body as buffer for signature verification
    const buf = await buffer(req);
    const rawBody = buf.toString('utf8');

    // Step 2: Get signature from headers
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      console.error('[WEBHOOK] Missing stripe-signature header');
      return res.status(400).json({ error: 'No signature provided' });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('[WEBHOOK] STRIPE_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // Step 3: Verify webhook signature
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.error('[WEBHOOK] Signature verification failed:', err.message);
      return res.status(400).json({
        error: 'Invalid signature',
        details: err.message
      });
    }

    console.log(`[WEBHOOK] Received event: ${event.type} (${event.id})`);

    // Step 4: Return 200 immediately (Stripe requirement)
    // Process async to avoid timeout
    res.status(200).json({
      received: true,
      event_id: event.id,
      event_type: event.type
    });

    // Step 5: Process event asynchronously
    setImmediate(() => {
      processWebhookEvent(event).catch(error => {
        console.error(`[WEBHOOK ERROR] Event ${event.id} (${event.type}):`, error);
        // TODO: Add dead letter queue or retry mechanism
      });
    });

  } catch (error: any) {
    console.error('[WEBHOOK] Unexpected error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}

/**
 * Process webhook event and sync to database
 */
async function processWebhookEvent(event: Stripe.Event) {
  const eventType = event.type as typeof TRACKED_EVENTS[number];

  // Skip events we don't track
  if (!TRACKED_EVENTS.includes(eventType)) {
    console.log(`[WEBHOOK] Ignoring untracked event: ${event.type}`);
    return;
  }

  console.log(`[WEBHOOK] Processing event: ${event.type} (${event.id})`);

  try {
    // Handle single assessment purchases separately
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      if (paymentIntent.metadata?.type === 'single_assessment') {
        await handleSingleAssessmentPurchase(paymentIntent);
        return;
      }
    }

    // Extract customer ID from event
    const eventData = event.data.object as any;
    let customerId: string | null = null;

    // Try multiple ways to get customer ID
    if (eventData.customer) {
      customerId = eventData.customer;
    } else if (event.type === 'checkout.session.completed') {
      customerId = eventData.customer;
    } else if (eventData.id && eventData.object === 'customer') {
      customerId = eventData.id;
    }

    if (!customerId || typeof customerId !== 'string') {
      console.error(`[WEBHOOK] No customer ID for event ${event.type}`);
      console.error(`[WEBHOOK] Event data:`, JSON.stringify(eventData, null, 2));
      return;
    }

    console.log(`[WEBHOOK] Syncing data for customer: ${customerId}`);

    // Sync all subscription data for this customer
    const syncResult = await syncStripeDataToSupabase(customerId);

    if (syncResult.success) {
      console.log(`[WEBHOOK] ✓ Sync successful for ${event.type} (${event.id})`);
      console.log(`[WEBHOOK] Changes:`, syncResult.changes);
    } else {
      console.error(`[WEBHOOK] ✗ Sync failed for ${event.type} (${event.id}):`, syncResult.error);
    }

    // Handle specific event types
    await handleSpecificEvent(event, customerId);

  } catch (error: any) {
    console.error(`[WEBHOOK] Processing error for ${event.type}:`, error);
    throw error; // Re-throw for outer error handler
  }
}

/**
 * Handle event-specific logic
 */
async function handleSpecificEvent(event: Stripe.Event, customerId: string) {
  switch (event.type) {
    case 'customer.subscription.trial_will_end':
      console.log(`[WEBHOOK] Trial ending soon for customer: ${customerId}`);
      // TODO: Send email notification to user
      break;

    case 'invoice.payment_failed':
      console.log(`[WEBHOOK] Payment failed for customer: ${customerId}`);
      // TODO: Send payment failure notification
      break;

    case 'invoice.payment_action_required':
      console.log(`[WEBHOOK] Payment action required (SCA) for customer: ${customerId}`);
      // TODO: Send SCA authentication request
      break;

    case 'customer.subscription.deleted':
      console.log(`[WEBHOOK] Subscription cancelled for customer: ${customerId}`);
      // Sync function already handles clearing subscription data
      break;

    default:
      // Most events are handled by sync function
      break;
  }
}

/**
 * Handle single assessment purchase
 */
async function handleSingleAssessmentPurchase(paymentIntent: Stripe.PaymentIntent) {
  const { tenant_id } = paymentIntent.metadata;

  if (!tenant_id) {
    console.error('[WEBHOOK] No tenant_id in payment intent metadata');
    return;
  }

  console.log(`[WEBHOOK] Processing single assessment purchase for tenant: ${tenant_id}`);

  try {
    const supabase = await createClient();

    // Get current bonus count and increment
    const { data: tenant, error: fetchError } = await supabase
      .from('tenants')
      .select('bonus_assessments')
      .eq('id', tenant_id)
      .single();

    if (fetchError) {
      console.error('[WEBHOOK] Failed to fetch tenant:', fetchError);
      throw fetchError;
    }

    const newBonus = (tenant?.bonus_assessments || 0) + 1;

    const { error: updateError } = await supabase
      .from('tenants')
      .update({ bonus_assessments: newBonus })
      .eq('id', tenant_id);

    if (updateError) {
      console.error('[WEBHOOK] Failed to increment bonus assessments:', updateError);
      throw updateError;
    }

    console.log(`[WEBHOOK] ✓ Added bonus assessment for tenant: ${tenant_id} (now ${newBonus})`);
  } catch (error) {
    console.error('[WEBHOOK] Single assessment purchase error:', error);
    throw error;
  }
}

/**
 * Read raw body from request stream
 */
async function buffer(req: NextApiRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  const stream = req as unknown as Readable;

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}