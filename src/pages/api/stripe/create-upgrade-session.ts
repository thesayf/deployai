import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { newTier } = req.body;

    if (!newTier || !['starter', 'professional', 'scale'].includes(newTier)) {
      return res.status(400).json({ error: 'Invalid tier specified' });
    }

    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { tenant } = tenantContext;

    // Type assertion for Stripe fields
    const tenantData = tenant as any;

    if (!tenantData.stripe_subscription_id) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    console.log(`[UPGRADE] Upgrading ${tenantData.subdomain} from ${tenantData.subscription_tier} to ${newTier}`);

    // Get the new price ID
    const newPriceId = SUBSCRIPTION_TIERS[newTier as keyof typeof SUBSCRIPTION_TIERS].priceId;

    if (!newPriceId) {
      return res.status(500).json({ error: 'Price ID not configured for this tier' });
    }

    // Retrieve the current subscription
    const subscription = await stripe.subscriptions.retrieve(tenantData.stripe_subscription_id);

    if (!subscription || subscription.items.data.length === 0) {
      return res.status(400).json({ error: 'Subscription not found or has no items' });
    }

    // Update the subscription with the new price
    // Stripe automatically handles proration
    const updatedSubscription = await stripe.subscriptions.update(tenantData.stripe_subscription_id, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: 'always_invoice', // Create invoice immediately with proration
      metadata: {
        ...subscription.metadata,
        previous_tier: tenantData.subscription_tier || 'starter',
        new_tier: newTier,
      },
    });

    console.log(`[UPGRADE] Updated subscription: ${updatedSubscription.id}`);

    // The webhook will handle updating the database
    return res.status(200).json({
      success: true,
      message: 'Subscription upgraded successfully',
      subscription: updatedSubscription.id
    });
  } catch (error: any) {
    console.error('[UPGRADE ERROR]', error);
    return res.status(500).json({
      error: error.message || 'Failed to create upgrade session',
    });
  }
}
