import { supabaseAdmin } from '@/lib/supabase';
import { tenantService } from '@/services/tenant';

export interface QueryOptions {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class AssessmentRepository {
  constructor(private tenantId: string) {}

  async findByTenant(options: QueryOptions = {}) {
    const supabase = supabaseAdmin();
    let query = supabase
      .from('quiz_responses')
      .select(`
        *,
        ai_reports (
          id,
          report_status,
          access_token,
          email_sent_at,
          created_at,
          updated_at
        )
      `, { count: 'exact' })
      .eq('tenant_id', this.tenantId);

    // Apply search filter
    if (options.search) {
      query = query.or(`
        user_email.ilike.%${options.search}%,
        user_company.ilike.%${options.search}%,
        user_first_name.ilike.%${options.search}%,
        user_last_name.ilike.%${options.search}%
      `);
    }

    // Apply date filters
    if (options.dateFrom) {
      query = query.gte('created_at', options.dateFrom);
    }
    if (options.dateTo) {
      query = query.lte('created_at', options.dateTo);
    }

    // Apply sorting
    const sortBy = options.sortBy || 'created_at';
    const sortOrder = options.sortOrder === 'asc';
    query = query.order(sortBy, { ascending: sortOrder });

    // Apply pagination
    if (options.offset !== undefined && options.limit !== undefined) {
      query = query.range(options.offset, options.offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching assessments:', error);
      throw error;
    }

    return { data, count };
  }

  async findById(assessmentId: string) {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from('quiz_responses')
      .select(`
        *,
        ai_reports (
          id,
          report_status,
          access_token,
          email_sent_at,
          created_at,
          updated_at,
          final_report,
          stage1_problem_analysis,
          report_html
        )
      `)
      .eq('id', assessmentId)
      .eq('tenant_id', this.tenantId)
      .single();

    if (error) {
      console.error('Error fetching assessment:', error);
      return null;
    }

    return data;
  }

  async findAll(options: QueryOptions = {}) {
    const supabase = supabaseAdmin();
    let query = supabase
      .from('quiz_responses')
      .select(`
        *,
        ai_reports (
          id,
          report_status,
          access_token,
          email_sent_at
        )
      `)
      .eq('tenant_id', this.tenantId);

    if (options.search) {
      query = query.or(`
        user_email.ilike.%${options.search}%,
        user_company.ilike.%${options.search}%,
        user_first_name.ilike.%${options.search}%,
        user_last_name.ilike.%${options.search}%
      `);
    }

    if (options.status && options.status !== 'all') {
      query = query.eq('ai_reports.report_status', options.status);
    }

    if (options.dateFrom) {
      query = query.gte('created_at', options.dateFrom);
    }
    if (options.dateTo) {
      query = query.lte('created_at', options.dateTo);
    }

    const sortBy = options.sortBy || 'created_at';
    const sortOrder = options.sortOrder === 'asc';
    query = query.order(sortBy, { ascending: sortOrder });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching all assessments:', error);
      throw error;
    }

    return data || [];
  }

  async getRecentAssessments(limit: number = 5) {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from('quiz_responses')
      .select(`
        *,
        ai_reports (
          id,
          report_status,
          access_token,
          email_sent_at
        )
      `)
      .eq('tenant_id', this.tenantId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent assessments:', error);
      return [];
    }

    return data || [];
  }

  async getUsageStats(tenant?: { assessments_used: number; assessments_limit: number | null }) {
    // If tenant data is provided, use it directly (avoids extra DB query)
    if (tenant) {
      return {
        assessments_used: tenant.assessments_used,
        assessments_limit: tenant.assessments_limit,
      };
    }

    // Fallback to DB lookup if tenant data not provided
    const tenantData = await tenantService.getTenantById(this.tenantId);

    if (!tenantData) {
      return {
        assessments_used: 0,
        assessments_limit: null,
      };
    }

    return {
      assessments_used: tenantData.assessments_used,
      assessments_limit: tenantData.assessments_limit,
    };
  }

  async getAssessmentStats() {
    const supabase = supabaseAdmin();
    // Use single optimized query with SQL aggregation
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999).toISOString();

    const { data, error } = await supabase.rpc('get_assessment_stats', {
      p_tenant_id: this.tenantId,
      p_this_month_start: thisMonthStart,
      p_last_month_start: lastMonthStart,
      p_last_month_end: lastMonthEnd,
    });

    if (error) {
      console.error('Error fetching assessment stats:', error);
      // Fallback to default values on error
      return {
        total: 0,
        completed: 0,
        processing: 0,
        failed: 0,
        thisMonth: 0,
        lastMonth: 0,
      };
    }

    const stats = data?.[0] || {};

    return {
      total: Number(stats.total) || 0,
      completed: Number(stats.completed) || 0,
      processing: Number(stats.processing) || 0,
      failed: Number(stats.failed) || 0,
      thisMonth: Number(stats.this_month) || 0,
      lastMonth: Number(stats.last_month) || 0,
    };
  }

  async getMonthlyTrend(months: number = 6) {
    const supabase = supabaseAdmin();
    // Use single optimized query with GROUP BY
    const { data, error } = await supabase.rpc('get_monthly_trend', {
      p_tenant_id: this.tenantId,
      p_months_ago: months,
    });

    if (error) {
      console.error('Error fetching monthly trend:', error);
      return [];
    }

    // Fill in missing months with 0 count
    const trends = [];
    const now = new Date();
    const resultMap = new Map(
      (data || []).map(item => [
        new Date(item.month).toISOString().slice(0, 7), // YYYY-MM format
        item.count
      ])
    );

    for (let i = months - 1; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = monthDate.toISOString().slice(0, 7);

      trends.push({
        month: monthDate.toISOString(),
        count: Number(resultMap.get(monthKey) || 0),
      });
    }

    return trends;
  }

  async getMVPAssessments(options: QueryOptions = {}) {
    const supabase = supabaseAdmin();
    let query = supabase
      .from('mvp_planner_responses')
      .select(`
        *,
        mvp_planner_reports (
          id,
          report_status,
          access_token,
          email_sent_at,
          created_at,
          updated_at
        )
      `, { count: 'exact' })
      .eq('tenant_id', this.tenantId);

    // Apply filters similar to quiz responses
    if (options.search) {
      query = query.or(`
        user_email.ilike.%${options.search}%,
        project_name.ilike.%${options.search}%,
        user_first_name.ilike.%${options.search}%
      `);
    }

    if (options.dateFrom) {
      query = query.gte('created_at', options.dateFrom);
    }
    if (options.dateTo) {
      query = query.lte('created_at', options.dateTo);
    }

    const sortBy = options.sortBy || 'created_at';
    const sortOrder = options.sortOrder === 'asc';
    query = query.order(sortBy, { ascending: sortOrder });

    if (options.offset !== undefined && options.limit !== undefined) {
      query = query.range(options.offset, options.offset + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching MVP assessments:', error);
      throw error;
    }

    return { data, count };
  }
}