import { supabase } from '@/lib/supabase';
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

  async getUsageStats() {
    const tenant = await tenantService.getTenantById(this.tenantId);

    if (!tenant) {
      return {
        assessments_used: 0,
        assessments_limit: null,
      };
    }

    return {
      assessments_used: tenant.assessments_used,
      assessments_limit: tenant.assessments_limit,
    };
  }

  async getAssessmentStats() {
    // Get total count
    const { count: total } = await supabase
      .from('quiz_responses')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId);

    // Get completed count
    const { data: statusCounts } = await supabase
      .from('ai_reports')
      .select('report_status')
      .eq('tenant_id', this.tenantId);

    const completed = statusCounts?.filter(r => r.report_status === 'completed').length || 0;
    const processing = statusCounts?.filter(r =>
      ['generating', 'processing', 'pending'].includes(r.report_status)
    ).length || 0;
    const failed = statusCounts?.filter(r => r.report_status === 'failed').length || 0;

    // Get this month's count
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const { count: thisMonth } = await supabase
      .from('quiz_responses')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .gte('created_at', thisMonthStart.toISOString());

    // Get last month's count
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const { count: lastMonth } = await supabase
      .from('quiz_responses')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .gte('created_at', lastMonthStart.toISOString())
      .lte('created_at', lastMonthEnd.toISOString());

    return {
      total: total || 0,
      completed,
      processing,
      failed,
      thisMonth: thisMonth || 0,
      lastMonth: lastMonth || 0,
    };
  }

  async getMonthlyTrend(months: number = 6) {
    const trends = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const { count } = await supabase
        .from('quiz_responses')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', this.tenantId)
        .gte('created_at', monthStart.toISOString())
        .lte('created_at', monthEnd.toISOString());

      trends.push({
        month: monthStart.toISOString(),
        count: count || 0,
      });
    }

    return trends;
  }

  async getMVPAssessments(options: QueryOptions = {}) {
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