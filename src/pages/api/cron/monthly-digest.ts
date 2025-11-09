import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendMonthlyDigestEmail } from '@/lib/email/email-service';

/**
 * Cron job to send monthly digest emails to all active tenants
 * Runs on the 1st of each month at 9:00 AM UTC
 *
 * Vercel Cron Configuration (add to vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/monthly-digest",
 *     "schedule": "0 9 1 * *"
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

  console.log('[CRON] Starting monthly digest email job');

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

    // Calculate date range for the previous month
    const now = new Date();
    const monthEnd = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of previous month
    monthEnd.setHours(23, 59, 59, 999);

    const monthStart = new Date(monthEnd.getFullYear(), monthEnd.getMonth(), 1); // First day of previous month
    monthStart.setHours(0, 0, 0, 0);

    const monthName = monthStart.toLocaleString('en-US', { month: 'long' });
    const year = monthStart.getFullYear();

    let successCount = 0;
    let errorCount = 0;

    // Process each tenant
    for (const tenant of tenants) {
      try {
        // Get all assessments completed during the month
        const { data: assessments, error: assessmentsError } = await supabase
          .from('quiz_responses')
          .select('id, user_first_name, user_last_name, user_email, user_company, industry, company_size, completed_at, started_at')
          .eq('tenant_id', tenant.id)
          .not('completed_at', 'is', null)
          .gte('completed_at', monthStart.toISOString())
          .lte('completed_at', monthEnd.toISOString())
          .order('completed_at', { ascending: false });

        if (assessmentsError) {
          console.error(`[CRON] Failed to fetch assessments for tenant ${tenant.id}:`, assessmentsError);
          errorCount++;
          continue;
        }

        const totalAssessments = assessments?.length || 0;

        // Get current tenant usage (this should match the month's totals)
        const { data: usageData } = await supabase
          .from('tenants')
          .select('assessments_used, assessments_overage')
          .eq('id', tenant.id)
          .single();

        const overageCount = usageData?.assessments_overage || 0;

        // Calculate industry breakdown
        const industryMap = new Map<string, number>();
        assessments?.forEach(assessment => {
          if (assessment.industry) {
            industryMap.set(assessment.industry, (industryMap.get(assessment.industry) || 0) + 1);
          }
        });

        const industryBreakdown = Array.from(industryMap.entries())
          .map(([industry, count]) => ({
            industry,
            count,
            percentage: Math.round((count / totalAssessments) * 100)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Calculate company size breakdown
        const sizeMap = new Map<string, number>();
        assessments?.forEach(assessment => {
          if (assessment.company_size) {
            sizeMap.set(assessment.company_size, (sizeMap.get(assessment.company_size) || 0) + 1);
          }
        });

        const companySizeBreakdown = Array.from(sizeMap.entries())
          .map(([size, count]) => ({
            size,
            count,
            percentage: Math.round((count / totalAssessments) * 100)
          }))
          .sort((a, b) => b.count - a.count);

        // Find top performing days
        const dayMap = new Map<string, number>();
        assessments?.forEach(assessment => {
          const date = new Date(assessment.completed_at).toISOString().split('T')[0];
          dayMap.set(date, (dayMap.get(date) || 0) + 1);
        });

        const topPerformingDays = Array.from(dayMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Calculate completion rate (completed vs started)
        const { count: startedCount } = await supabase
          .from('quiz_responses')
          .select('*', { count: 'exact', head: true })
          .eq('tenant_id', tenant.id)
          .gte('started_at', monthStart.toISOString())
          .lte('started_at', monthEnd.toISOString());

        const completionRate = startedCount && startedCount > 0
          ? (totalAssessments / startedCount) * 100
          : 0;

        // Calculate average completion time
        let averageCompletionTime: number | undefined;
        if (assessments && assessments.length > 0) {
          const completionTimes = assessments
            .filter(a => a.started_at && a.completed_at)
            .map(a => {
              const start = new Date(a.started_at).getTime();
              const end = new Date(a.completed_at).getTime();
              return (end - start) / 1000 / 60; // minutes
            });

          if (completionTimes.length > 0) {
            averageCompletionTime = completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length;
          }
        }

        // Send monthly digest email
        const result = await sendMonthlyDigestEmail({
          tenantId: tenant.id,
          adminEmail: tenant.contact_email,
          companyName: tenant.company_name,
          subdomain: tenant.subdomain,
          month: monthName,
          year,
          totalAssessments,
          assessmentsLimit: tenant.assessments_limit || 0,
          currentTier: tenant.tier || 'starter',
          overageCount,
          topPerformingDays,
          industryBreakdown,
          companySizeBreakdown,
          averageCompletionTime,
          completionRate,
        });

        if (result.success) {
          successCount++;
          console.log(`[CRON] Sent monthly digest to ${tenant.company_name} (${tenant.contact_email})`);
        } else {
          errorCount++;
          console.error(`[CRON] Failed to send monthly digest to ${tenant.company_name}:`, result.error);
        }

      } catch (error) {
        errorCount++;
        console.error(`[CRON] Error processing tenant ${tenant.id}:`, error);
      }
    }

    console.log(`[CRON] Monthly digest job complete: ${successCount} sent, ${errorCount} errors`);

    res.status(200).json({
      message: 'Monthly digest emails sent',
      total: tenants.length,
      sent: successCount,
      errors: errorCount,
      month: monthName,
      year,
      monthStart: monthStart.toISOString(),
      monthEnd: monthEnd.toISOString(),
    });

  } catch (error) {
    console.error('[CRON] Monthly digest job failed:', error);
    res.status(500).json({
      error: 'Failed to send monthly digests',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
