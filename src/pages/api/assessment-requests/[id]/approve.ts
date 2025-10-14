import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { getTenantAssessmentUrl } from '@/lib/utils/url-builder';

interface ApproveBody {
  notes?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { notes } = req.body as ApproveBody;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    // Get tenant context (admin only)
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext || !tenantContext.member) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabase = supabaseAdmin();

    // Get the request record
    const { data: requestRecord, error: fetchError } = await supabase
      .from('quiz_responses')
      .select('id, user_email, user_first_name, user_last_name, user_company, request_status, tenant_id')
      .eq('id', id)
      .eq('tenant_id', tenantContext.tenant.id)
      .single();

    if (fetchError || !requestRecord) {
      console.error('Request not found:', fetchError);
      return res.status(404).json({ error: 'Assessment request not found' });
    }

    // Verify it's in 'requested' status
    if (requestRecord.request_status !== 'requested') {
      return res.status(400).json({
        error: `Cannot approve: Request status is '${requestRecord.request_status}'`
      });
    }

    // Update request_status to 'approved'
    const { error: updateError } = await supabase
      .from('quiz_responses')
      .update({
        request_status: 'approved',
        admin_notes: notes || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('tenant_id', tenantContext.tenant.id);

    if (updateError) {
      console.error('Failed to approve request:', updateError);
      return res.status(500).json({ error: 'Failed to approve request' });
    }

    // Generate unique assessment link with token
    const assessmentLink = `${getTenantAssessmentUrl(tenantContext.tenant.subdomain, req)}?token=${id}`;

    console.log(`[ASSESSMENT REQUEST] Approved request ${id} for ${requestRecord.user_email}`);
    console.log(`[ASSESSMENT REQUEST] Assessment link: ${assessmentLink}`);

    // TODO: Send approval email to user with assessment link
    // This would integrate with your existing email service
    // await sendApprovalEmail({
    //   email: requestRecord.user_email,
    //   firstName: requestRecord.user_first_name,
    //   lastName: requestRecord.user_last_name,
    //   company: requestRecord.user_company,
    //   assessmentLink,
    //   tenantName: tenantContext.tenant.company_name
    // });

    res.status(200).json({
      success: true,
      message: 'Assessment request approved',
      assessmentLink,
      requestId: id
    });
  } catch (error) {
    console.error('Error approving assessment request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
