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

    console.log(`[UPGRADE] ===== UPGRADE REQUEST DEBUG =====`);
    console.log(`[UPGRADE] Subdomain: ${tenantData.subdomain}`);
    console.log(`[UPGRADE] Current tier: ${tenantData.subscription_tier}`);
    console.log(`[UPGRADE] Subscription status: ${tenantData.subscription_status}`);
    console.log(`[UPGRADE] Stripe customer ID: ${tenantData.stripe_customer_id || 'MISSING'}`);
    console.log(`[UPGRADE] Stripe subscription ID (DB): ${tenantData.stripe_subscription_id || 'MISSING'}`);
    console.log(`[UPGRADE] Requested new tier: ${newTier}`);

    let subscriptionId = tenantData.stripe_subscription_id;

    // If no subscription_id but we have a customer_id, fetch it from Stripe
    if (!subscriptionId && tenantData.stripe_customer_id) {
      console.log(`[UPGRADE] No subscription_id in DB, fetching from Stripe for customer: ${tenantData.stripe_customer_id}`);

      const subscriptions = await stripe.subscriptions.list({
        customer: tenantData.stripe_customer_id,
        limit: 10, // Get more to see all subscriptions
        status: 'all',
      });

      console.log(`[UPGRADE] Found ${subscriptions.data.length} subscription(s) in Stripe`);

      if (subscriptions.data.length > 0) {
        // Log all subscriptions
        subscriptions.data.forEach((sub, index) => {
          console.log(`[UPGRADE] Subscription ${index + 1}:`, {
            id: sub.id,
            status: sub.status,
            created: new Date(sub.created * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            items: sub.items.data.map(item => ({
              price_id: item.price.id,
              product: item.price.product,
            })),
          });
        });

        // Use the first active subscription, or the first one if none are active
        const activeSubscription = subscriptions.data.find(sub => sub.status === 'active' || sub.status === 'trialing');
        subscriptionId = activeSubscription ? activeSubscription.id : subscriptions.data[0].id;

        console.log(`[UPGRADE] Selected subscription: ${subscriptionId} (status: ${activeSubscription ? activeSubscription.status : subscriptions.data[0].status})`);
      } else {
        console.log(`[UPGRADE] ERROR: No subscriptions found in Stripe for customer ${tenantData.stripe_customer_id}`);
      }
    }

    if (!subscriptionId) {
      console.log(`[UPGRADE] ERROR: No subscription ID available after all checks`);
      console.log(`[UPGRADE] - Has customer_id: ${!!tenantData.stripe_customer_id}`);
      console.log(`[UPGRADE] - Has subscription_id in DB: ${!!tenantData.stripe_subscription_id}`);
      return res.status(400).json({ error: 'No active subscription found. Please contact support.' });
    }

    console.log(`[UPGRADE] ===== END DEBUG =====`);

    console.log(`[UPGRADE] Upgrading ${tenantData.subdomain} from ${tenantData.subscription_tier} to ${newTier}`);

    // Get the new price ID
    const newPriceId = SUBSCRIPTION_TIERS[newTier as keyof typeof SUBSCRIPTION_TIERS].priceId;

    if (!newPriceId) {
      return res.status(500).json({ error: 'Price ID not configured for this tier' });
    }

    // Retrieve the current subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (!subscription || subscription.items.data.length === 0) {
      return res.status(400).json({ error: 'Subscription not found or has no items' });
    }

    // Update the subscription with the new price
    // Stripe automatically handles proration
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
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
