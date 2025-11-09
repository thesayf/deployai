import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendFeedbackRequestEmail } from '@/lib/email/email-service';

/**
 * Cron job to send feedback requests to candidates who viewed their reports
 * Runs daily at 11:00 AM UTC
 *
 * Strategy:
 * - Send feedback request 3 days after report is viewed
 * - Only send once per report
 *
 * Vercel Cron Configuration (add to vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/feedback-requests",
 *     "schedule": "0 11 * * *"
 *   }]
 * }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret to prevent unauthorized access
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[CRON] Starting feedback requests job');

  try {
    const supabase = supabaseAdmin();

    const now = new Date();

    // Calculate date range: 3 days ago
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);
    threeDaysAgo.setHours(0, 0, 0, 0);

    const threeDaysAgoEnd = new Date(threeDaysAgo);
    threeDaysAgoEnd.setHours(23, 59, 59, 999);

    // Find reports viewed 3 days ago that haven't received feedback requests
    const { data: reports, error: reportsError } = await supabase
      .from('ai_reports')
      .select(`
        id,
        access_token,
        first_viewed_at,
        feedback_requested_at,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company,
          tenant_id,
          tenants!inner(
            company_name,
            subdomain
          )
        )
      `)
      .not('first_viewed_at', 'is', null)
      .gte('first_viewed_at', threeDaysAgo.toISOString())
      .lte('first_viewed_at', threeDaysAgoEnd.toISOString())
      .is('feedback_requested_at', null) // Haven't sent feedback request yet
      .eq('report_status', 'completed');

    if (reportsError) {
      console.error('[CRON] Failed to fetch reports:', reportsError);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }

    if (!reports || reports.length === 0) {
      console.log('[CRON] No reports need feedback requests');
      return res.status(200).json({ message: 'No feedback requests needed', sent: 0 });
    }

    console.log(`[CRON] Found ${reports.length} reports needing feedback requests`);

    let successCount = 0;
    let errorCount = 0;

    // Process each report
    for (const report of reports) {
      try {
        const quizData = Array.isArray(report.quiz_responses)
          ? report.quiz_responses[0]
          : report.quiz_responses;

        if (!quizData) {
          console.error(`[CRON] No quiz data found for report ${report.id}`);
          errorCount++;
          continue;
        }

        const tenant = Array.isArray(quizData.tenants)
          ? quizData.tenants[0]
          : quizData.tenants;

        if (!tenant) {
          console.error(`[CRON] No tenant found for report ${report.id}`);
          errorCount++;
          continue;
        }

        // Generate URLs
        const reportUrl = `https://${tenant.subdomain}.deployai.studio/report/view/${report.access_token}`;
        // TODO: Create a feedback form page and use its URL
        // For now, using a generic feedback email
        const feedbackUrl = `https://${tenant.subdomain}.deployai.studio/feedback?report=${report.id}`;

        // Send feedback request email
        const result = await sendFeedbackRequestEmail({
          candidateFirstName: quizData.user_first_name || 'there',
          candidateLastName: quizData.user_last_name || '',
          candidateEmail: quizData.user_email,
          candidateCompany: quizData.user_company,
          companyName: tenant.company_name,
          reportViewedAt: report.first_viewed_at,
          feedbackUrl,
          reportUrl,
        });

        if (result.success) {
          // Mark feedback request as sent
          await supabase
            .from('ai_reports')
            .update({
              feedback_requested_at: new Date().toISOString(),
            })
            .eq('id', report.id);

          successCount++;
          console.log(`[CRON] Sent feedback request to ${quizData.user_email} (${tenant.company_name})`);
        } else {
          errorCount++;
          console.error(`[CRON] Failed to send feedback request to ${quizData.user_email}:`, result.error);
        }

      } catch (error) {
        errorCount++;
        console.error(`[CRON] Error processing report ${report.id}:`, error);
      }
    }

    console.log(`[CRON] Feedback requests complete: ${successCount} sent, ${errorCount} errors`);

    res.status(200).json({
      message: 'Feedback requests sent',
      total: reports.length,
      sent: successCount,
      errors: errorCount,
    });

  } catch (error) {
    console.error('[CRON] Feedback requests job failed:', error);
    res.status(500).json({
      error: 'Failed to send feedback requests',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
