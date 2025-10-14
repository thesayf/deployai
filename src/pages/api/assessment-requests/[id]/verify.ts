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
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'No tenant context found' });
    }

    const supabase = supabaseAdmin();

    // Check if this is an approved assessment request
    const { data: requestRecord, error } = await supabase
      .from('quiz_responses')
      .select('id, request_status, tenant_id')
      .eq('id', id)
      .eq('tenant_id', tenantContext.tenant.id)
      .eq('request_status', 'approved')
      .single();

    if (error || !requestRecord) {
      return res.status(404).json({
        approved: false,
        error: 'Invalid or expired token'
      });
    }

    res.status(200).json({
      approved: true,
      quizId: requestRecord.id
    });
  } catch (error) {
    console.error('Error verifying assessment token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
