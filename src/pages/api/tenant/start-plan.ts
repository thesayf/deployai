import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabase = supabaseAdmin();

    // Get current tenant subscription status
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('subscription_status, subscription_tier, trial_end_date')
      .eq('id', tenantContext.tenant.id)
      .single();

    if (tenantError || !tenant) {
      return res.status(500).json({ error: 'Failed to fetch tenant data' });
    }

    // Only allow this for trial users
    if (tenant.subscription_status !== 'trialing') {
      return res.status(400).json({ error: 'Account is not on trial' });
    }

    // Convert trial to active
    // The subscription already exists in Stripe from signup, we just update status
    const { error: updateError } = await supabase
      .from('tenants')
      .update({
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', tenantContext.tenant.id);

    if (updateError) {
      console.error('Failed to start plan:', updateError);
      return res.status(500).json({ error: 'Failed to start plan' });
    }

    console.log(`[START PLAN] Converted trial to active for tenant ${tenantContext.tenant.id} (${tenantContext.tenant.subdomain})`);

    res.status(200).json({
      success: true,
      message: 'Plan started successfully',
    });
  } catch (error) {
    console.error('Error starting plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
