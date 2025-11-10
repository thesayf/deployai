import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { notifyAccountPaused, notifyAccountResumed } from '@/services/notifications';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pause } = req.body;

    if (typeof pause !== 'boolean') {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'No tenant context found' });
    }

    const supabase = supabaseAdmin();

    // Get current subscription status
    const { data: tenant, error: fetchError } = await supabase
      .from('tenants')
      .select('subscription_status')
      .eq('id', tenantContext.tenant.id)
      .single();

    if (fetchError || !tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Determine new status
    let newStatus: string;

    if (pause) {
      // Pausing - only allow if currently active or trialing
      if (tenant.subscription_status !== 'active' && tenant.subscription_status !== 'trialing') {
        return res.status(400).json({ error: 'Can only pause active subscriptions' });
      }
      newStatus = 'paused';
    } else {
      // Resuming - only allow if currently paused
      if (tenant.subscription_status !== 'paused') {
        return res.status(400).json({ error: 'Account is not paused' });
      }
      // Resume to active (even if was trialing before, set to active)
      newStatus = 'active';
    }

    // Update subscription status
    const { error: updateError } = await supabase
      .from('tenants')
      .update({ subscription_status: newStatus })
      .eq('id', tenantContext.tenant.id);

    if (updateError) {
      console.error('Error updating subscription status:', updateError);
      return res.status(500).json({ error: 'Failed to update status' });
    }

    // Create notification (async, don't wait)
    if (pause) {
      notifyAccountPaused(
        tenantContext.tenant.id,
        tenantContext.tenant.subdomain
      ).catch(err => console.error('[PAUSE] Failed to create paused notification:', err));
    } else {
      notifyAccountResumed(
        tenantContext.tenant.id,
        tenantContext.tenant.subdomain
      ).catch(err => console.error('[PAUSE] Failed to create resumed notification:', err));
    }

    res.status(200).json({
      success: true,
      status: newStatus,
      message: pause ? 'Assessments paused successfully' : 'Assessments resumed successfully'
    });
  } catch (error) {
    console.error('Error in pause-assessments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
