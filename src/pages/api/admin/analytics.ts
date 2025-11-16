import type { NextApiRequest, NextApiResponse } from 'next';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext) {
      return res.status(401).json({ error: 'No tenant context found' });
    }

    const supabase = supabaseAdmin();
    const tenantId = tenantContext.tenant.id;

    // Fetch all analytics data in parallel
    const [
      completionFunnel,
      scoreDistribution,
      industryBreakdown,
      monthlyTrend,
      waitlistMetrics,
      timeMetrics,
      reportHealth
    ] = await Promise.all([
      getCompletionFunnel(supabase, tenantId),
      getScoreDistribution(supabase, tenantId),
      getIndustryBreakdown(supabase, tenantId),
      getMonthlyTrend(supabase, tenantId),
      getWaitlistMetrics(supabase, tenantId),
      getTimeMetrics(supabase, tenantId),
      getReportHealth(supabase, tenantId)
    ]);

    res.status(200).json({
      overview: {
        completionFunnel,
        scoreDistribution,
        industryBreakdown,
        monthlyTrend
      },
      waitlist: waitlistMetrics,
      performance: {
        timeMetrics,
        reportHealth
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
}

// 1. Completion Funnel
async function getCompletionFunnel(supabase: any, tenantId: string) {
  const { data, error } = await supabase
    .from('quiz_responses')
    .select(`
      id,
      started_at,
      completed_at,
      ai_reports!inner(report_status, email_sent_at)
    `)
    .eq('tenant_id', tenantId);

  if (error) throw error;

  const started = data.length;
  const completed = data.filter((d: any) => d.completed_at).length;
  const reportGenerated = data.filter((d: any) =>
    d.ai_reports?.some((r: any) => r.report_status === 'completed')
  ).length;
  const emailed = data.filter((d: any) =>
    d.ai_reports?.some((r: any) => r.email_sent_at)
  ).length;

  return {
    started,
    completed,
    reportGenerated,
    emailed,
    completionRate: started > 0 ? (completed / started) * 100 : 0,
    reportRate: completed > 0 ? (reportGenerated / completed) * 100 : 0,
    emailRate: reportGenerated > 0 ? (emailed / reportGenerated) * 100 : 0
  };
}

// 2. Score Distribution
async function getScoreDistribution(supabase: any, tenantId: string) {
  const { data, error } = await supabase
    .from('quiz_responses')
    .select('total_score')
    .eq('tenant_id', tenantId)
    .not('total_score', 'is', null);

  if (error) throw error;

  const scores = data.map((d: any) => d.total_score);
  const avg = scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0;

  // Group into ranges
  const low = scores.filter((s: number) => s >= 15 && s <= 35).length;
  const medium = scores.filter((s: number) => s >= 36 && s <= 55).length;
  const high = scores.filter((s: number) => s >= 56 && s <= 75).length;
  const veryHigh = scores.filter((s: number) => s >= 76 && s <= 85).length;

  return {
    average: Math.round(avg),
    distribution: [
      { label: 'Low (15-35)', value: low, color: '#EF4444' },
      { label: 'Medium (36-55)', value: medium, color: '#F59E0B' },
      { label: 'High (56-75)', value: high, color: '#10B981' },
      { label: 'Very High (76-85)', value: veryHigh, color: '#3B82F6' }
    ]
  };
}

// 3. Industry Breakdown
async function getIndustryBreakdown(supabase: any, tenantId: string) {
  const { data, error } = await supabase
    .from('quiz_responses')
    .select('industry')
    .eq('tenant_id', tenantId)
    .not('industry', 'is', null);

  if (error) throw error;

  // Count by industry
  const counts: Record<string, number> = {};
  data.forEach((d: any) => {
    const industry = d.industry || 'Unknown';
    counts[industry] = (counts[industry] || 0) + 1;
  });

  // Sort and return top 5
  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([industry, count]) => ({ industry, count }));

  return sorted;
}

// 4. Monthly Trend (last 6 months)
async function getMonthlyTrend(supabase: any, tenantId: string) {
  const { data, error } = await supabase.rpc('get_monthly_assessment_trend', {
    tenant_id_param: tenantId,
    months_back: 6
  });

  if (error) {
    // Fallback if RPC doesn't exist
    const { data: fallbackData } = await supabase
      .from('quiz_responses')
      .select('started_at')
      .eq('tenant_id', tenantId)
      .gte('started_at', new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString());

    // Group by month manually
    const monthCounts: Record<string, number> = {};
    fallbackData?.forEach((d: any) => {
      const month = new Date(d.started_at).toISOString().slice(0, 7);
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    return Object.entries(monthCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));
  }

  return data || [];
}

// 5. Waitlist Metrics
async function getWaitlistMetrics(supabase: any, tenantId: string) {
  const { data, error } = await supabase
    .from('quiz_responses')
    .select('id, request_status, completed_at')
    .eq('tenant_id', tenantId)
    .not('request_status', 'is', null);

  if (error) throw error;

  const requested = data.filter((d: any) => d.request_status === 'requested').length;
  const approved = data.filter((d: any) => d.request_status === 'approved' || d.request_status === 'completed').length;
  const completed = data.filter((d: any) => d.request_status === 'completed').length;
  const pending = data.filter((d: any) => d.request_status === 'requested').length;

  return {
    requested,
    approved,
    completed,
    pending,
    approvalRate: requested > 0 ? (approved / requested) * 100 : 0,
    completionRate: approved > 0 ? (completed / approved) * 100 : 0
  };
}

// 6. Time Metrics
async function getTimeMetrics(supabase: any, tenantId: string) {
  const { data, error } = await supabase
    .from('quiz_responses')
    .select(`
      started_at,
      completed_at,
      ai_reports(created_at, email_sent_at)
    `)
    .eq('tenant_id', tenantId)
    .not('completed_at', 'is', null);

  if (error) throw error;

  // Calculate completion times
  const completionTimes = data
    .filter((d: any) => d.started_at && d.completed_at)
    .map((d: any) => {
      const start = new Date(d.started_at).getTime();
      const end = new Date(d.completed_at).getTime();
      return (end - start) / 1000 / 60; // minutes
    });

  const avgCompletionTime = completionTimes.length > 0
    ? completionTimes.reduce((a: number, b: number) => a + b, 0) / completionTimes.length
    : 0;

  // Distribution
  const under2 = completionTimes.filter((t: number) => t < 2).length;
  const between2and3 = completionTimes.filter((t: number) => t >= 2 && t < 3).length;
  const between3and5 = completionTimes.filter((t: number) => t >= 3 && t < 5).length;
  const over5 = completionTimes.filter((t: number) => t >= 5).length;

  return {
    averageMinutes: Math.round(avgCompletionTime * 10) / 10,
    distribution: [
      { label: '< 2 min', value: under2 },
      { label: '2-3 min', value: between2and3 },
      { label: '3-5 min', value: between3and5 },
      { label: '> 5 min', value: over5 }
    ]
  };
}

// 7. Report Health
async function getReportHealth(supabase: any, tenantId: string) {
  const { data, error } = await supabase
    .from('ai_reports')
    .select('report_status, created_at, updated_at')
    .eq('tenant_id', tenantId);

  if (error) throw error;

  const total = data.length;
  const completed = data.filter((d: any) => d.report_status === 'completed').length;
  const failed = data.filter((d: any) => d.report_status === 'failed').length;
  const processing = data.filter((d: any) => d.report_status === 'generating').length;

  // Check for stuck reports (processing > 10 minutes)
  const now = Date.now();
  const stuck = data.filter((d: any) => {
    if (d.report_status !== 'generating') return false;
    const created = new Date(d.created_at).getTime();
    return (now - created) > 10 * 60 * 1000; // 10 minutes
  }).length;

  return {
    total,
    completed,
    failed,
    processing,
    stuck,
    successRate: total > 0 ? (completed / total) * 100 : 0,
    failureRate: total > 0 ? (failed / total) * 100 : 0
  };
}
