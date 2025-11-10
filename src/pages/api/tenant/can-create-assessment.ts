import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'No tenant context found' });
    }

    const supabase = supabaseAdmin();

    // Get tenant details to check status
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('subscription_status, assessments_used, assessments_limit, bonus_assessments')
      .eq('id', tenantContext.tenant.id)
      .single();

    if (tenantError || !tenant) {
      console.error('Error fetching tenant:', tenantError);
      return res.status(500).json({ error: 'Failed to fetch tenant' });
    }

    // Check if paused
    if (tenant.subscription_status === 'paused') {
      return res.status(200).json({
        canCreate: false,
        reason: 'paused',
        assessmentsUsed: tenant.assessments_used,
        assessmentsLimit: tenant.assessments_limit,
        subscriptionStatus: tenant.subscription_status
      });
    }

    // Use the database function to check if tenant can create assessment
    const { data: canCreate, error } = await supabase.rpc('can_create_assessment', {
      p_tenant_id: tenantContext.tenant.id
    });

    if (error) {
      console.error('Error checking assessment limit:', error);
      return res.status(500).json({ error: 'Failed to check assessment limit' });
    }

    res.status(200).json({
      canCreate: !!canCreate,
      reason: canCreate ? null : 'limit_reached',
      assessmentsUsed: tenant.assessments_used,
      assessmentsLimit: tenant.assessments_limit,
      subscriptionStatus: tenant.subscription_status
    });
  } catch (error) {
    console.error('Error in can-create-assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
