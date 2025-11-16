import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest, addTenantIdToData } from '@/utils/tenant-helpers';
import { notifyWaitlistLead } from '@/services/notifications';

interface RequestBody {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, company } = req.body as RequestBody;

    // Validate required fields
    if (!email || !firstName || !lastName || !company) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get tenant context
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'No tenant context found' });
    }

    // Verify tenant is actually at limit
    const supabase = supabaseAdmin();
    const { data: canCreate, error: rpcError } = await supabase.rpc('can_create_assessment', {
      p_tenant_id: tenantContext.tenant.id
    });

    if (rpcError) {
      console.error('Error checking assessment limit:', rpcError);
      return res.status(500).json({ error: 'Failed to verify assessment limit' });
    }

    if (canCreate) {
      return res.status(400).json({
        error: 'Not at assessment limit. Please use the normal assessment flow.'
      });
    }

    // Check for duplicate request from same email
    const { data: existingRequest } = await supabase
      .from('quiz_responses')
      .select('id, request_status')
      .eq('tenant_id', tenantContext.tenant.id)
      .eq('user_email', email.toLowerCase())
      .eq('request_status', 'requested')
      .single();

    if (existingRequest) {
      return res.status(400).json({
        error: 'You have already submitted an assessment request. Please wait for approval.'
      });
    }

    // Create quiz_response with request_status = 'requested'
    const insertData = addTenantIdToData({
      user_email: email.toLowerCase(),
      user_first_name: firstName,
      user_last_name: lastName,
      user_company: company,
      request_status: 'requested',
      responses: {},
      started_at: new Date().toISOString(),
    }, tenantContext.tenant.id);

    const { data: requestRecord, error: insertError } = await supabase
      .from('quiz_responses')
      .insert(insertData)
      .select('id, user_email, user_first_name, user_last_name, user_company')
      .single();

    if (insertError || !requestRecord) {
      console.error('Failed to create assessment request:', insertError);
      return res.status(500).json({ error: 'Failed to create assessment request' });
    }

    console.log(`[ASSESSMENT REQUEST] Created request ${requestRecord.id} for ${email}`);

    // Check if account is paused to determine notification type
    const { data: tenantData } = await supabase
      .from('tenants')
      .select('subscription_status')
      .eq('id', tenantContext.tenant.id)
      .single();

    const isPaused = tenantData?.subscription_status === 'paused';

    // If paused, create waitlist lead notification (async, don't wait)
    if (isPaused) {
      notifyWaitlistLead(
        tenantContext.tenant.id,
        tenantContext.tenant.subdomain,
        firstName,
        email
      ).catch(err => console.error('[ASSESSMENT REQUEST] Failed to create waitlist notification:', err));
    }

    // Send confirmation email to candidate (async, don't wait)
    const {
      sendRequestConfirmationEmail,
      sendAdminNotificationEmail,
    } = await import('@/lib/email/email-service');

    sendRequestConfirmationEmail({
      candidateFirstName: firstName,
      candidateLastName: lastName,
      candidateEmail: email,
      companyName: tenantContext.tenant.company_name,
      requestedAt: (requestRecord as any).created_at,
    }).catch(err => console.error('[ASSESSMENT REQUEST] Failed to send candidate confirmation:', err));

    // Send notification email to tenant admin (async, don't wait)
    if (tenantContext.tenant.contact_email) {
      sendAdminNotificationEmail({
        adminEmail: tenantContext.tenant.contact_email,
        companyName: tenantContext.tenant.company_name,
        candidateFirstName: firstName,
        candidateLastName: lastName,
        candidateEmail: email,
        candidateCompany: company,
        requestId: requestRecord.id,
        requestedAt: requestRecord.created_at,
        subdomain: tenantContext.tenant.subdomain,
      }).catch(err => console.error('[ASSESSMENT REQUEST] Failed to send admin notification:', err));
    }

    res.status(200).json({
      success: true,
      requestId: requestRecord.id,
      message: 'Assessment request submitted successfully'
    });
  } catch (error) {
    console.error('Error handling assessment request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
