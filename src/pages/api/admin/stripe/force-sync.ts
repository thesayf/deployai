import { NextApiRequest, NextApiResponse } from 'next';
import { syncStripeDataToSupabase } from '@/lib/stripe/sync';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { createClient as createServiceClient } from '@supabase/supabase-js';

/**
 * Force sync subscription data from Stripe to Supabase
 * This is useful when webhooks fail or for manual reconciliation
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get tenant context from request (validates auth)
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'Unauthorized - no tenant context found' });
    }

    const subdomain = tenantContext.tenant.subdomain;
    const stripeCustomerId = tenantContext.tenant.stripe_customer_id;

    if (!stripeCustomerId) {
      return res.status(400).json({ error: 'Tenant has no Stripe customer ID' });
    }

    console.log(`[FORCE SYNC] Starting sync for tenant: ${subdomain}, customer: ${stripeCustomerId}`);

    // Sync from Stripe
    await syncStripeDataToSupabase(stripeCustomerId);

    console.log(`[FORCE SYNC] Successfully synced tenant: ${subdomain}`);

    // Return updated tenant data using service role client
    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: updatedTenant, error: fetchError } = await supabase
      .from('tenants')
      .select('subscription_tier, subscription_status, assessments_limit, assessments_used')
      .eq('subdomain', subdomain)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully synced subscription data from Stripe',
      tenant: updatedTenant,
    });
  } catch (error: any) {
    console.error('[FORCE SYNC ERROR]', error);
    return res.status(500).json({
      error: 'Failed to sync subscription data',
      details: error.message,
    });
  }
}
