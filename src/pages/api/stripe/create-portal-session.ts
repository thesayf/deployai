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
    const { customerId, returnUrl } = req.body;

    // Validation
    if (!customerId) {
      return res.status(400).json({ error: 'Missing customerId' });
    }

    if (!returnUrl) {
      return res.status(400).json({ error: 'Missing returnUrl' });
    }

    console.log(`[PORTAL] Creating portal session for customer: ${customerId}`);

    // Create Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    console.log(`[PORTAL] Session created: ${session.id}`);

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('[PORTAL ERROR]', error);
    return res.status(500).json({
      error: error.message || 'Failed to create portal session',
    });
  }
}
