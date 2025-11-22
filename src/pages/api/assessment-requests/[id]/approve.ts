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

    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
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

    // Check if account is paused - if so, increment overage and log
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('subscription_status, subscription_tier, assessments_overage, overage_charges_current_period')
      .eq('id', tenantContext.tenant.id)
      .single();

    if (tenantError || !tenant) {
      return res.status(500).json({ error: 'Failed to fetch tenant data' });
    }

    // Determine overage price based on tier
    const overagePrice = tenant.subscription_tier === 'starter' ? 4 : tenant.subscription_tier === 'professional' ? 3 : 2;

    // If account is paused, treat as overage
    if (tenant.subscription_status === 'paused') {
      // Increment overage count and charges
      const { error: overageError } = await supabase
        .from('tenants')
        .update({
          assessments_overage: (tenant.assessments_overage || 0) + 1,
          overage_charges_current_period: (tenant.overage_charges_current_period || 0) + overagePrice,
        })
        .eq('id', tenantContext.tenant.id);

      if (overageError) {
        console.error('Failed to update overage:', overageError);
        return res.status(500).json({ error: 'Failed to process overage charge' });
      }

      // Log overage in history table if it exists
      try {
        await supabase.from('overage_history').insert({
          tenant_id: tenantContext.tenant.id,
          assessment_id: id,
          charge_amount: overagePrice,
          created_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('[OVERAGE] Failed to log overage history (table may not exist):', err);
      }

      console.log(`[OVERAGE] Charged $${overagePrice} for paused account sending assessment ${id}`);
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

    // Send approval email to candidate with assessment link (async, don't wait)
    const { sendApprovalEmail } = await import('@/lib/email/email-service');

    sendApprovalEmail({
      candidateFirstName: requestRecord.user_first_name,
      candidateLastName: requestRecord.user_last_name,
      candidateEmail: requestRecord.user_email,
      companyName: tenantContext.tenant.company_name,
      assessmentLink,
      approvedAt: new Date().toISOString(),
      expiresInDays: 30,
    }).then((result) => {
      if (result.success) {
        console.log('[ASSESSMENT REQUEST] Approval email sent successfully');
      } else {
        console.error('[ASSESSMENT REQUEST] Failed to send approval email:', result.error);
      }
    }).catch(err => {
      console.error('[ASSESSMENT REQUEST] Approval email exception:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Assessment request approved and email sent',
      assessmentLink,
      requestId: id
    });
  } catch (error) {
    console.error('Error approving assessment request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
