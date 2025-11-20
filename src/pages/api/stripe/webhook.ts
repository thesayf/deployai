import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { syncStripeDataToSupabase } from '@/lib/stripe/sync';
import { createClient } from '@/utils/supabase/server';
import { notifyTrialEnding, notifyPaymentFailed } from '@/services/notifications';

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

    // Step 4: Process event synchronously (Vercel serverless functions terminate after response)
    try {
      await processWebhookEvent(event);
      console.log(`[WEBHOOK] Successfully processed ${event.type} (${event.id})`);
    } catch (error: any) {
      console.error(`[WEBHOOK ERROR] Event ${event.id} (${event.type}):`, error);
      // Don't fail the webhook - Stripe will retry automatically
    }

    // Step 5: Return 200 after processing
    res.status(200).json({
      received: true,
      event_id: event.id,
      event_type: event.type
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

    // Sync all subscription data for this customer (using service role client for webhooks)
    const syncResult = await syncStripeDataToSupabase(customerId, true);

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
 * Handle event-specific logic including email notifications
 */
async function handleSpecificEvent(event: Stripe.Event, customerId: string) {
  // Get tenant data for email notifications
  const supabase = await createClient();
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select('id, company_name, contact_email, subdomain, tier')
    .eq('stripe_customer_id', customerId)
    .single();

  if (tenantError || !tenant) {
    console.error(`[WEBHOOK] Failed to fetch tenant for customer ${customerId}:`, tenantError);
    return;
  }

  // Import email functions dynamically
  const {
    sendTrialEndingEmail,
    sendPaymentFailedEmail,
    sendPaymentSucceededEmail,
    sendSubscriptionActivatedEmail,
    sendSubscriptionUpdatedEmail,
    sendSubscriptionCanceledEmail,
  } = await import('@/lib/email/email-service');

  switch (event.type) {
    case 'customer.subscription.trial_will_end': {
      console.log(`[WEBHOOK] Trial ending soon for customer: ${customerId}`);
      const subscription = event.data.object as Stripe.Subscription;

      if (!subscription.trial_end) {
        console.error('[WEBHOOK] No trial_end found in subscription');
        break;
      }

      const trialEndsAt = new Date(subscription.trial_end * 1000).toISOString();
      const daysRemaining = Math.ceil((subscription.trial_end * 1000 - Date.now()) / (1000 * 60 * 60 * 24));

      // Get assessments count
      const { count: assessmentsUsed } = await supabase
        .from('quiz_responses')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .not('completed_at', 'is', null);

      sendTrialEndingEmail({
        tenantId: tenant.id,
        companyName: tenant.company_name,
        ownerEmail: tenant.contact_email,
        trialEndsAt,
        daysRemaining: Math.max(daysRemaining, 0),
        assessmentsUsed: assessmentsUsed || 0,
        currentTier: tenant.tier,
        subdomain: tenant.subdomain,
      }).catch(err => console.error('[WEBHOOK] Failed to send trial ending email:', err));

      // Create trial ending notification (async, don't wait)
      notifyTrialEnding(
        tenant.id,
        tenant.subdomain,
        Math.max(daysRemaining, 0)
      ).catch(err => console.error('[WEBHOOK] Failed to create trial ending notification:', err));
      break;
    }

    case 'invoice.payment_failed': {
      console.log(`[WEBHOOK] Payment failed for customer: ${customerId}`);
      const invoice = event.data.object as Stripe.Invoice;

      const gracePeriodDays = 7; // Standard grace period
      const retryDate = invoice.next_payment_attempt
        ? new Date(invoice.next_payment_attempt * 1000).toISOString()
        : undefined;

      sendPaymentFailedEmail({
        tenantId: tenant.id,
        companyName: tenant.company_name,
        ownerEmail: tenant.contact_email,
        amountDue: invoice.amount_due,
        currency: invoice.currency,
        failedAt: new Date(invoice.status_transitions?.finalized_at ? invoice.status_transitions.finalized_at * 1000 : Date.now()).toISOString(),
        retryDate,
        gracePeriodDays,
        currentTier: tenant.tier,
        subdomain: tenant.subdomain,
      }).catch(err => console.error('[WEBHOOK] Failed to send payment failed email:', err));

      // Create payment failed notification (async, don't wait)
      notifyPaymentFailed(
        tenant.id,
        tenant.subdomain,
        invoice.amount_due / 100 // Convert cents to dollars
      ).catch(err => console.error('[WEBHOOK] Failed to create payment failed notification:', err));
      break;
    }

    case 'invoice.payment_succeeded': {
      console.log(`[WEBHOOK] Payment succeeded for customer: ${customerId}`);
      const invoice = event.data.object as Stripe.Invoice;

      // Skip if draft or void
      if (invoice.status !== 'paid') {
        break;
      }

      // Get subscription to determine assessments included
      const invoiceData = invoice as any; // Type assertion for subscription field
      if (!invoiceData.subscription) {
        console.log('[WEBHOOK] No subscription found on invoice');
        break;
      }
      const subscriptionId = typeof invoiceData.subscription === 'string'
        ? invoiceData.subscription
        : invoiceData.subscription.id;
      const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
      const subscription = subscriptionResponse as any; // Type assertion for Stripe subscription fields
      const assessmentsIncluded = parseInt(subscription.metadata?.assessments_limit || '0');

      // Get current assessments used
      const { count: assessmentsUsed } = await supabase
        .from('quiz_responses')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .not('completed_at', 'is', null);

      // Calculate overage charges (if any line items are for overages)
      let overageCharges = 0;
      if (invoice.lines?.data) {
        const overageLines = invoice.lines.data.filter(line =>
          line.description?.toLowerCase().includes('overage') ||
          line.metadata?.type === 'overage'
        );
        overageCharges = overageLines.reduce((sum, line) => sum + (line.amount || 0), 0);
      }

      const nextBillingDate = subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      sendPaymentSucceededEmail({
        tenantId: tenant.id,
        companyName: tenant.company_name,
        ownerEmail: tenant.contact_email,
        amountPaid: invoice.amount_paid,
        currency: invoice.currency,
        paidAt: new Date(invoice.status_transitions?.paid_at ? invoice.status_transitions.paid_at * 1000 : Date.now()).toISOString(),
        currentTier: tenant.tier,
        nextBillingDate,
        assessmentsIncluded,
        assessmentsUsed: assessmentsUsed || 0,
        overageCharges: overageCharges > 0 ? overageCharges : undefined,
        invoiceUrl: invoice.hosted_invoice_url || undefined,
        subdomain: tenant.subdomain,
      }).catch(err => console.error('[WEBHOOK] Failed to send payment succeeded email:', err));
      break;
    }

    case 'customer.subscription.created': {
      console.log(`[WEBHOOK] Subscription created for customer: ${customerId}`);
      const subscription = event.data.object as any; // Type assertion for Stripe subscription fields

      // Only send email if subscription is active (not in trial)
      if (subscription.status !== 'active' || subscription.trial_end) {
        break;
      }

      const planName = subscription.items.data[0]?.price.nickname || tenant.tier;
      const planPrice = subscription.items.data[0]?.price.unit_amount || 0;
      const currency = subscription.items.data[0]?.price.currency || 'usd';
      const assessmentsIncluded = parseInt(subscription.metadata?.assessments_limit || '0');
      const overagePrice = parseInt(subscription.metadata?.overage_price || '0');
      const billingCycle = subscription.items.data[0]?.price.recurring?.interval || 'month';
      const nextBillingDate = new Date(subscription.current_period_end * 1000).toISOString();

      sendSubscriptionActivatedEmail({
        tenantId: tenant.id,
        companyName: tenant.company_name,
        ownerEmail: tenant.contact_email,
        planName,
        planPrice,
        currency,
        assessmentsIncluded,
        overagePrice,
        billingCycle,
        nextBillingDate,
        activatedAt: new Date(subscription.created * 1000).toISOString(),
        subdomain: tenant.subdomain,
      }).catch(err => console.error('[WEBHOOK] Failed to send subscription activated email:', err));
      break;
    }

    case 'customer.subscription.updated': {
      console.log(`[WEBHOOK] Subscription updated for customer: ${customerId}`);
      const subscription = event.data.object as any; // Type assertion for Stripe subscription fields
      const previousAttributes = (event.data as any).previous_attributes;

      // Only send email if the plan actually changed (not just status updates)
      if (!previousAttributes?.items?.data || previousAttributes.items.data.length === 0) {
        break;
      }

      const oldPlan = previousAttributes.items.data[0];
      const newPlan = subscription.items.data[0];

      const oldPlanName = oldPlan.price.nickname || 'Previous Plan';
      const newPlanName = newPlan.price.nickname || tenant.tier;
      const newPlanPrice = newPlan.price.unit_amount || 0;
      const currency = newPlan.price.currency || 'usd';
      const assessmentsIncluded = parseInt(subscription.metadata?.assessments_limit || '0');
      const overagePrice = parseInt(subscription.metadata?.overage_price || '0');
      const nextBillingDate = new Date(subscription.current_period_end * 1000).toISOString();

      // Determine if upgrade or downgrade
      const isUpgrade = newPlanPrice > (oldPlan.price.unit_amount || 0);

      sendSubscriptionUpdatedEmail({
        tenantId: tenant.id,
        companyName: tenant.company_name,
        ownerEmail: tenant.contact_email,
        oldPlanName,
        newPlanName,
        newPlanPrice,
        currency,
        assessmentsIncluded,
        overagePrice,
        effectiveDate: new Date().toISOString(),
        nextBillingDate,
        isUpgrade,
        subdomain: tenant.subdomain,
      }).catch(err => console.error('[WEBHOOK] Failed to send subscription updated email:', err));
      break;
    }

    case 'customer.subscription.deleted': {
      console.log(`[WEBHOOK] Subscription cancelled for customer: ${customerId}`);
      const subscription = event.data.object as any; // Type assertion for Stripe subscription fields

      const planName = subscription.items.data[0]?.price.nickname || tenant.tier;
      const canceledAt = new Date(subscription.canceled_at ? subscription.canceled_at * 1000 : Date.now()).toISOString();
      const accessEndsAt = new Date(subscription.current_period_end * 1000).toISOString();
      const daysRemaining = Math.ceil((subscription.current_period_end * 1000 - Date.now()) / (1000 * 60 * 60 * 24));

      // Get total assessments completed
      const { count: assessmentsCompleted } = await supabase
        .from('quiz_responses')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenant.id)
        .not('completed_at', 'is', null);

      sendSubscriptionCanceledEmail({
        tenantId: tenant.id,
        companyName: tenant.company_name,
        ownerEmail: tenant.contact_email,
        planName,
        canceledAt,
        accessEndsAt,
        daysRemaining: Math.max(daysRemaining, 0),
        assessmentsCompleted: assessmentsCompleted || 0,
        subdomain: tenant.subdomain,
      }).catch(err => console.error('[WEBHOOK] Failed to send subscription canceled email:', err));
      // Sync function already handles clearing subscription data
      break;
    }

    case 'invoice.payment_action_required':
      console.log(`[WEBHOOK] Payment action required (SCA) for customer: ${customerId}`);
      // SCA is typically handled through Stripe's hosted pages
      // We could send an email here if we want to notify users about required authentication
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