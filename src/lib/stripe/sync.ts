import { stripe, SUBSCRIPTION_TIERS, type SubscriptionTier } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export interface SyncResult {
  success: boolean;
  tenant_id?: string;
  subscription_status?: string;
  subscription_tier?: string;
  error?: string;
  changes?: string[];
}

/**
 * Master sync function - Single source of truth for Stripe → Supabase state
 * This function ensures our database always reflects the current Stripe state
 *
 * @param customerId - Stripe customer ID
 * @param isWebhook - Whether this is called from a webhook (uses service role client)
 * @returns Promise<SyncResult> - Result of sync operation
 */
export async function syncStripeDataToSupabase(customerId: string, isWebhook: boolean = false): Promise<SyncResult> {
  // Use service role client for webhooks (no request context)
  // Use server client for API routes (has request context)
  const supabase = isWebhook
    ? createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
    : await createClient();
  const changes: string[] = [];

  try {
    console.log(`[STRIPE SYNC] Starting sync for customer: ${customerId}`);

    // Step 1: Find tenant by stripe_customer_id
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();

    if (tenantError || !tenant) {
      throw new Error(`No tenant found for Stripe customer ${customerId}: ${tenantError?.message}`);
    }

    console.log(`[STRIPE SYNC] Found tenant: ${tenant.subdomain} (${tenant.id})`);

    // Step 2: Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1, // We enforce single subscription per customer in Stripe settings
      status: 'all',
      expand: ['data.default_payment_method', 'data.latest_invoice']
    });

    console.log(`[STRIPE SYNC] Found ${subscriptions.data.length} subscriptions for customer`);

    // Step 3: Handle case with no subscription
    if (subscriptions.data.length === 0) {
      const updateData = {
        subscription_status: 'none' as const,
        subscription_tier: null,
        stripe_subscription_id: null,
        price_id: null,
        assessments_limit: null,
        current_period_start: null,
        current_period_end: null,
        cancel_at_period_end: false,
        payment_method_brand: null,
        payment_method_last4: null,
        payment_method_exp_month: null,
        payment_method_exp_year: null,
        last_sync_at: new Date().toISOString(),
        stripe_sync_error: null
      };

      const { error: updateError } = await supabase
        .from('tenants')
        .update(updateData)
        .eq('stripe_customer_id', customerId);

      if (updateError) {
        throw new Error(`Failed to update tenant: ${updateError.message}`);
      }

      changes.push('Cleared subscription data (no active subscription)');
      console.log(`[STRIPE SYNC] Cleared subscription data for tenant ${tenant.subdomain}`);

      return {
        success: true,
        tenant_id: tenant.id,
        subscription_status: 'none',
        changes
      };
    }

    // Step 4: Process subscription data
    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0]?.price.id;

    if (!priceId) {
      throw new Error('No price ID found in subscription');
    }

    console.log(`[STRIPE SYNC] Processing subscription ${subscription.id} with price ${priceId}`);

    // Step 5: Map price ID to tier and limits
    const tierMapping: Record<string, { tier: SubscriptionTier; limit: number | null }> = {
      [process.env.STRIPE_PRICE_STARTER_ID!]: { tier: 'starter', limit: 5 },
      [process.env.STRIPE_PRICE_PROFESSIONAL_ID!]: { tier: 'professional', limit: 20 },
      [process.env.STRIPE_PRICE_SCALE_ID!]: { tier: 'scale', limit: null },
    };

    const tierInfo = tierMapping[priceId];
    if (!tierInfo) {
      console.error(`[STRIPE SYNC] Unknown price ID: ${priceId}`);
      throw new Error(`Unknown subscription price ID: ${priceId}`);
    }

    changes.push(`Mapped price ${priceId} to tier ${tierInfo.tier}`);

    // Step 6: Extract payment method details
    let paymentMethod: {
      brand: string | null;
      last4: string | null;
      exp_month: number | null;
      exp_year: number | null;
    } = { brand: null, last4: null, exp_month: null, exp_year: null };

    if (subscription.default_payment_method &&
        typeof subscription.default_payment_method !== 'string') {
      const pm = subscription.default_payment_method;
      if (pm.card) {
        paymentMethod = {
          brand: pm.card.brand || null,
          last4: pm.card.last4 || null,
          exp_month: pm.card.exp_month || null,
          exp_year: pm.card.exp_year || null
        };
        changes.push(`Updated payment method: ${paymentMethod.brand} ****${paymentMethod.last4} (exp: ${paymentMethod.exp_month}/${paymentMethod.exp_year})`);
      }
    }

    // Step 7: Get current period from latest invoice
    let currentPeriodStart: Date;
    let currentPeriodEnd: Date;

    // Use latest_invoice if it's expanded, otherwise use billing_cycle_anchor
    if (subscription.latest_invoice && typeof subscription.latest_invoice !== 'string') {
      const invoice = subscription.latest_invoice;
      currentPeriodStart = new Date((invoice as any).period_start * 1000);
      currentPeriodEnd = new Date((invoice as any).period_end * 1000);
    } else {
      // Fallback to calculating from billing_cycle_anchor
      const anchorDate = new Date(subscription.billing_cycle_anchor * 1000);
      const now = new Date();

      // Calculate current period based on anchor
      currentPeriodStart = new Date(anchorDate);
      while (currentPeriodStart < now) {
        currentPeriodStart.setMonth(currentPeriodStart.getMonth() + 1);
      }
      currentPeriodStart.setMonth(currentPeriodStart.getMonth() - 1);

      currentPeriodEnd = new Date(currentPeriodStart);
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }

    const isNewPeriod = !tenant.current_period_end ||
      currentPeriodStart > new Date(tenant.current_period_end);

    if (isNewPeriod) {
      changes.push('New billing period detected - usage will be reset');
    }

    // Step 8: Prepare update data
    const updateData = {
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_tier: tierInfo.tier,
      price_id: priceId,
      assessments_limit: tierInfo.limit,
      current_period_start: currentPeriodStart.toISOString(),
      current_period_end: currentPeriodEnd.toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      payment_method_brand: paymentMethod.brand,
      payment_method_last4: paymentMethod.last4,
      payment_method_exp_month: paymentMethod.exp_month,
      payment_method_exp_year: paymentMethod.exp_year,
      last_sync_at: new Date().toISOString(),
      stripe_sync_error: null,
      // Reset usage if new period
      ...(isNewPeriod && { assessments_used: 0 })
    };

    // Step 9: Update tenant record
    const { error: updateError } = await supabase
      .from('tenants')
      .update(updateData)
      .eq('stripe_customer_id', customerId);

    if (updateError) {
      throw new Error(`Failed to update tenant: ${updateError.message}`);
    }

    changes.push(`Updated subscription status to ${subscription.status}`);
    changes.push(`Set tier to ${tierInfo.tier} with limit ${tierInfo.limit || 'unlimited'}`);

    console.log(`[STRIPE SYNC] Successfully synced tenant ${tenant.subdomain}:`, {
      status: subscription.status,
      tier: tierInfo.tier,
      limit: tierInfo.limit,
      newPeriod: isNewPeriod
    });

    return {
      success: true,
      tenant_id: tenant.id,
      subscription_status: subscription.status,
      subscription_tier: tierInfo.tier,
      changes
    };

  } catch (error: any) {
    console.error(`[STRIPE SYNC ERROR] Customer ${customerId}:`, error);

    // Try to log the error to the tenant record if we can find it
    try {
      await supabase
        .from('tenants')
        .update({
          stripe_sync_error: error.message,
          last_sync_at: new Date().toISOString()
        })
        .eq('stripe_customer_id', customerId);
    } catch (dbError) {
      console.error(`[STRIPE SYNC] Failed to log error to database:`, dbError);
    }

    return {
      success: false,
      error: error.message || 'Unknown sync error',
      changes
    };
  }
}

/**
 * Sync multiple customers (useful for batch operations)
 */
export async function syncMultipleCustomers(customerIds: string[]): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  for (const customerId of customerIds) {
    const result = await syncStripeDataToSupabase(customerId);
    results.push(result);

    // Add small delay to avoid rate limiting
    if (customerIds.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}

/**
 * Get sync status for a tenant (useful for debugging)
 */
export async function getTenantSyncStatus(tenantId: string) {
  const supabase = await createClient();

  const { data: tenant, error } = await supabase
    .from('tenants')
    .select(`
      id,
      subdomain,
      stripe_customer_id,
      stripe_subscription_id,
      subscription_status,
      subscription_tier,
      last_sync_at,
      stripe_sync_error
    `)
    .eq('id', tenantId)
    .single();

  if (error) {
    throw new Error(`Failed to get tenant: ${error.message}`);
  }

  return {
    tenant,
    hasStripeCustomer: !!tenant.stripe_customer_id,
    hasActiveSubscription: !!tenant.stripe_subscription_id,
    lastSyncAgo: tenant.last_sync_at
      ? Math.round((Date.now() - new Date(tenant.last_sync_at).getTime()) / 1000)
      : null,
    hasError: !!tenant.stripe_sync_error
  };
}