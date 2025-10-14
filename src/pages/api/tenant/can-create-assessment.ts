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
      assessmentsUsed: tenantContext.tenant.assessments_used,
      assessmentsLimit: tenantContext.tenant.assessments_limit
    });
  } catch (error) {
    console.error('Error in can-create-assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
