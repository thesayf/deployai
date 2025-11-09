import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendWeeklySummaryEmail } from '@/lib/email/email-service';

/**
 * Cron job to send weekly activity summaries to all active tenants
 * Runs every Monday at 9:00 AM UTC
 *
 * Vercel Cron Configuration (add to vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/weekly-summary",
 *     "schedule": "0 9 * * 1"
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

  console.log('[CRON] Starting weekly summary email job');

  try {
    const supabase = supabaseAdmin();

    // Get all active tenants with contact emails
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('id, company_name, contact_email, subdomain, tier, assessments_limit')
      .not('contact_email', 'is', null)
      .eq('is_active', true);

    if (tenantsError) {
      console.error('[CRON] Failed to fetch tenants:', tenantsError);
      return res.status(500).json({ error: 'Failed to fetch tenants' });
    }

    if (!tenants || tenants.length === 0) {
      console.log('[CRON] No active tenants found');
      return res.status(200).json({ message: 'No active tenants', sent: 0 });
    }

    console.log(`[CRON] Processing ${tenants.length} tenants`);

    // Calculate date range for the previous week (Monday to Sunday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek + 6; // If Sunday, go back 6 days, else go back to previous Monday

    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() - dayOfWeek); // Last Sunday
    weekEnd.setHours(23, 59, 59, 999);

    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6); // Previous Monday
    weekStart.setHours(0, 0, 0, 0);

    let successCount = 0;
    let errorCount = 0;

    // Process each tenant
    for (const tenant of tenants) {
      try {
        // Get assessments completed during the week
        const { data: assessments, error: assessmentsError } = await supabase
          .from('quiz_responses')
          .select('id, user_first_name, user_last_name, user_email, user_company, industry, completed_at')
          .eq('tenant_id', tenant.id)
          .not('completed_at', 'is', null)
          .gte('completed_at', weekStart.toISOString())
          .lte('completed_at', weekEnd.toISOString())
          .order('completed_at', { ascending: false });

        if (assessmentsError) {
          console.error(`[CRON] Failed to fetch assessments for tenant ${tenant.id}:`, assessmentsError);
          errorCount++;
          continue;
        }

        const assessmentsCompleted = assessments?.length || 0;

        // Get current monthly usage
        const { data: usageData } = await supabase
          .from('tenants')
          .select('assessments_used, assessments_overage')
          .eq('id', tenant.id)
          .single();

        const assessmentsUsed = usageData?.assessments_used || 0;
        const overageCount = usageData?.assessments_overage || 0;

        // Calculate top industries from this week's assessments
        const industryMap = new Map<string, number>();
        assessments?.forEach(assessment => {
          if (assessment.industry) {
            industryMap.set(assessment.industry, (industryMap.get(assessment.industry) || 0) + 1);
          }
        });

        const topIndustries = Array.from(industryMap.entries())
          .map(([industry, count]) => ({ industry, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        // Format assessment data for email
        const newAssessments = (assessments || []).map(assessment => ({
          candidateName: `${assessment.user_first_name} ${assessment.user_last_name}`,
          candidateEmail: assessment.user_email,
          candidateCompany: assessment.user_company,
          completedAt: assessment.completed_at,
          assessmentId: assessment.id,
        }));

        // Send weekly summary email
        const result = await sendWeeklySummaryEmail({
          tenantId: tenant.id,
          adminEmail: tenant.contact_email,
          companyName: tenant.company_name,
          subdomain: tenant.subdomain,
          weekStart: weekStart.toISOString(),
          weekEnd: weekEnd.toISOString(),
          assessmentsCompleted,
          newAssessments,
          assessmentsUsed,
          assessmentsLimit: tenant.assessments_limit || 0,
          currentTier: tenant.tier || 'starter',
          overageCount,
          topIndustries,
        });

        if (result.success) {
          successCount++;
          console.log(`[CRON] Sent weekly summary to ${tenant.company_name} (${tenant.contact_email})`);
        } else {
          errorCount++;
          console.error(`[CRON] Failed to send weekly summary to ${tenant.company_name}:`, result.error);
        }

      } catch (error) {
        errorCount++;
        console.error(`[CRON] Error processing tenant ${tenant.id}:`, error);
      }
    }

    console.log(`[CRON] Weekly summary job complete: ${successCount} sent, ${errorCount} errors`);

    res.status(200).json({
      message: 'Weekly summary emails sent',
      total: tenants.length,
      sent: successCount,
      errors: errorCount,
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
    });

  } catch (error) {
    console.error('[CRON] Weekly summary job failed:', error);
    res.status(500).json({
      error: 'Failed to send weekly summaries',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
