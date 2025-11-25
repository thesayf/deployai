import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { customerId, subscriptionId, returnUrl, flowType } = req.body;

    // Validation
    if (!customerId) {
      return res.status(400).json({ error: 'Missing customerId' });
    }

    if (!returnUrl) {
      return res.status(400).json({ error: 'Missing returnUrl' });
    }

    console.log(`[PORTAL] Creating portal session for customer: ${customerId}`);
    console.log(`[PORTAL] Flow type: ${flowType || 'default'}`);

    // Create Stripe Customer Portal session
    const sessionParams: any = {
      customer: customerId,
      return_url: returnUrl,
    };

    // Only add configuration if it's set
    if (process.env.STRIPE_PORTAL_CONFIG_ID) {
      sessionParams.configuration = process.env.STRIPE_PORTAL_CONFIG_ID.trim();
    }

    // Add flow_data to open directly to subscription update
    if (flowType === 'subscription_update' && subscriptionId) {
      console.log(`[PORTAL] Opening subscription update flow for: ${subscriptionId}`);
      sessionParams.flow_data = {
        type: 'subscription_update',
        subscription_update: {
          subscription: subscriptionId,
        },
      };
    }

    const session = await stripe.billingPortal.sessions.create(sessionParams);

    console.log(`[PORTAL] Session created: ${session.id}`);

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('[PORTAL ERROR]', error);

    // Log more details for Stripe errors
    if (error.type === 'StripeInvalidRequestError') {
      console.error('[PORTAL ERROR] Stripe code:', error.code);
      console.error('[PORTAL ERROR] Stripe param:', error.param);
      console.error('[PORTAL ERROR] Stripe raw:', error.raw);
    }

    return res.status(500).json({
      error: error.message || 'Failed to create portal session',
      code: error.code,
      type: error.type,
    });
  }
}
