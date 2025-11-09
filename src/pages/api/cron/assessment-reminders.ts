import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendAssessmentReminderEmail } from '@/lib/email/email-service';
import { getTenantAssessmentUrl } from '@/lib/utils/url-builder';

/**
 * Cron job to send assessment reminders to candidates who started but didn't complete
 * Runs daily at 10:00 AM UTC
 *
 * Reminder Strategy:
 * - Send reminder 3 days after starting (if not completed)
 * - Send final reminder 1 day before expiration (if applicable)
 *
 * Vercel Cron Configuration (add to vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/assessment-reminders",
 *     "schedule": "0 10 * * *"
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

  console.log('[CRON] Starting assessment reminders job');

  try {
    const supabase = supabaseAdmin();

    const now = new Date();

    // Calculate date ranges
    // 3 days ago (for first reminder)
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);
    threeDaysAgo.setHours(0, 0, 0, 0);

    const threeDaysAgoEnd = new Date(threeDaysAgo);
    threeDaysAgoEnd.setHours(23, 59, 59, 999);

    // Find incomplete assessments started 3 days ago
    const { data: incompleteAssessments, error: assessmentsError } = await supabase
      .from('quiz_responses')
      .select(`
        id,
        user_email,
        user_first_name,
        user_last_name,
        user_company,
        started_at,
        reminder_sent_at,
        tenant_id,
        tenants!inner(
          company_name,
          subdomain,
          contact_email
        )
      `)
      .is('completed_at', null)
      .gte('started_at', threeDaysAgo.toISOString())
      .lte('started_at', threeDaysAgoEnd.toISOString())
      .is('reminder_sent_at', null); // Only send reminder once

    if (assessmentsError) {
      console.error('[CRON] Failed to fetch incomplete assessments:', assessmentsError);
      return res.status(500).json({ error: 'Failed to fetch assessments' });
    }

    if (!incompleteAssessments || incompleteAssessments.length === 0) {
      console.log('[CRON] No assessments need reminders');
      return res.status(200).json({ message: 'No reminders needed', sent: 0 });
    }

    console.log(`[CRON] Found ${incompleteAssessments.length} assessments needing reminders`);

    let successCount = 0;
    let errorCount = 0;

    // Process each incomplete assessment
    for (const assessment of incompleteAssessments) {
      try {
        const tenant = Array.isArray(assessment.tenants)
          ? assessment.tenants[0]
          : assessment.tenants;

        if (!tenant) {
          console.error(`[CRON] No tenant found for assessment ${assessment.id}`);
          errorCount++;
          continue;
        }

        // Generate assessment link with token
        const assessmentLink = `${getTenantAssessmentUrl(tenant.subdomain, req)}?token=${assessment.id}`;

        // Calculate days since started
        const startedDate = new Date(assessment.started_at);
        const daysAgo = Math.floor((now.getTime() - startedDate.getTime()) / (1000 * 60 * 60 * 24));

        // Send reminder email
        const result = await sendAssessmentReminderEmail({
          candidateFirstName: assessment.user_first_name || 'there',
          candidateLastName: assessment.user_last_name || '',
          candidateEmail: assessment.user_email,
          candidateCompany: assessment.user_company,
          companyName: tenant.company_name,
          startedAt: assessment.started_at,
          assessmentLink,
          daysAgo,
        });

        if (result.success) {
          // Mark reminder as sent
          await supabase
            .from('quiz_responses')
            .update({
              reminder_sent_at: new Date().toISOString(),
            })
            .eq('id', assessment.id);

          successCount++;
          console.log(`[CRON] Sent reminder to ${assessment.user_email} (${tenant.company_name})`);
        } else {
          errorCount++;
          console.error(`[CRON] Failed to send reminder to ${assessment.user_email}:`, result.error);
        }

      } catch (error) {
        errorCount++;
        console.error(`[CRON] Error processing assessment ${assessment.id}:`, error);
      }
    }

    console.log(`[CRON] Assessment reminders complete: ${successCount} sent, ${errorCount} errors`);

    res.status(200).json({
      message: 'Assessment reminders sent',
      total: incompleteAssessments.length,
      sent: successCount,
      errors: errorCount,
    });

  } catch (error) {
    console.error('[CRON] Assessment reminders job failed:', error);
    res.status(500).json({
      error: 'Failed to send assessment reminders',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
