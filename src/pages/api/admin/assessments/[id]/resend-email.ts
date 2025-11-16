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
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid assessment ID' });
    }

    // Get tenant context (requires admin authentication)
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext || !tenantContext.member) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabase = supabaseAdmin();

    // Get the assessment and its report
    const { data: assessment, error: assessmentError } = await supabase
      .from('quiz_responses')
      .select(`
        id,
        user_email,
        user_first_name,
        user_last_name,
        user_company,
        tenant_id,
        ai_reports (
          id,
          report_status,
          access_token,
          email_sent_at
        )
      `)
      .eq('id', id)
      .eq('tenant_id', tenantContext.tenant.id)
      .single();

    if (assessmentError || !assessment) {
      console.error('[RESEND-EMAIL] Assessment not found:', assessmentError);
      return res.status(404).json({ error: 'Assessment not found' });
    }

    const report = assessment.ai_reports?.[0];

    if (!report) {
      return res.status(400).json({ error: 'No report found for this assessment' });
    }

    // Only allow resend for completed reports
    if (report.report_status !== 'completed') {
      return res.status(400).json({
        error: `Cannot resend email for report with status: ${report.report_status}. Only completed reports can be sent.`
      });
    }

    if (!report.access_token) {
      return res.status(400).json({ error: 'Report has no access token. Cannot generate email link.' });
    }

    if (!assessment.user_email) {
      return res.status(400).json({ error: 'No email address found for this assessment' });
    }

    console.log(`[RESEND-EMAIL] Resending report ${report.id} to ${assessment.user_email}`);

    // Send the report email
    try {
      const { sendReportReadyEmail } = await import('@/lib/email/email-service');

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`;
      const reportUrl = `${baseUrl}/report/view/${report.access_token}`;

      await sendReportReadyEmail({
        reportId: report.id,
        userEmail: assessment.user_email,
        firstName: assessment.user_first_name || '',
        lastName: assessment.user_last_name || '',
        company: assessment.user_company || '',
        accessToken: report.access_token,
      });

      // Update email_sent_at timestamp
      await supabase
        .from('ai_reports')
        .update({
          email_sent_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', report.id);

      console.log('[RESEND-EMAIL] Email sent successfully');

      res.status(200).json({
        success: true,
        message: `Report resent successfully to ${assessment.user_email}`,
        emailSentAt: new Date().toISOString(),
      });
    } catch (emailError) {
      console.error('[RESEND-EMAIL] Failed to send email:', emailError);
      return res.status(500).json({
        error: 'Failed to send email. Please check email service configuration.',
        details: emailError instanceof Error ? emailError.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('[RESEND-EMAIL] Error resending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
