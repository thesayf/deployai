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
        tenant_id,
        ai_reports (
          id,
          report_status
        )
      `)
      .eq('id', id)
      .eq('tenant_id', tenantContext.tenant.id)
      .single();

    if (assessmentError || !assessment) {
      console.error('[RETRY] Assessment not found:', assessmentError);
      return res.status(404).json({ error: 'Assessment not found' });
    }

    const report = assessment.ai_reports?.[0];

    if (!report) {
      return res.status(400).json({ error: 'No report found for this assessment' });
    }

    // Only allow retry for failed or stuck reports
    if (report.report_status !== 'failed' && report.report_status !== 'processing') {
      return res.status(400).json({
        error: `Cannot retry report with status: ${report.report_status}. Only failed or stuck reports can be retried.`
      });
    }

    console.log(`[RETRY] Retrying report ${report.id} for assessment ${id}`);

    // Reset report status to pending to trigger reprocessing
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        report_status: 'pending',
        updated_at: new Date().toISOString(),
      })
      .eq('id', report.id);

    if (updateError) {
      console.error('[RETRY] Failed to update report status:', updateError);
      return res.status(500).json({ error: 'Failed to reset report status' });
    }

    // Trigger workflow processing immediately
    try {
      const { triggerWorkflow } = await import('@/lib/workflow/client');

      let baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`;

      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl}`;
      }

      const workflowUrl = `${baseUrl}/api/workflow/process-pipeline`;
      console.log('[RETRY] Triggering workflow:', workflowUrl);

      await triggerWorkflow(
        workflowUrl,
        { reportId: report.id, force: true },
        `report-retry-${report.id}-${Date.now()}`
      );

      console.log('[RETRY] Workflow triggered successfully');
    } catch (workflowError) {
      console.error('[RETRY] Error triggering workflow:', workflowError);
      // Don't fail the request - cron will pick it up as backup
    }

    res.status(200).json({
      success: true,
      message: 'Report regeneration started. This may take 1-2 minutes.',
      reportId: report.id,
    });
  } catch (error) {
    console.error('[RETRY] Error retrying assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
