import { AssessmentRepository } from '@/repositories/assessment.repository';

export interface Assessment {
  id: string;
  tenant_id: string | null;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_company: string;
  industry: string;
  company_size: string;
  responses: any;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  report?: {
    id: string;
    status: string;
    access_token: string;
    email_sent_at: string | null;
  };
}

export interface AssessmentFilters {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'company' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface AssessmentStats {
  total: number;
  completed: number;
  processing: number;
  failed: number;
  thisMonth: number;
  lastMonth: number;
  conversionRate: number;
  averageCompletionTime: number;
}

export interface DashboardData {
  usage: {
    used: number;
    limit: number | null;
    percentage: number;
  };
  recentAssessments: Assessment[];
  stats: AssessmentStats;
  monthlyTrend: Array<{
    month: string;
    count: number;
  }>;
}

class AssessmentService {
  private repository: AssessmentRepository;

  constructor(private tenantId: string) {
    this.repository = new AssessmentRepository(tenantId);
  }

  async getAssessments(filters: AssessmentFilters = {}): Promise<{
    assessments: Assessment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    const { data, count } = await this.repository.findByTenant({
      ...filters,
      offset,
      limit,
    });

    const assessments = this.transformAssessments(data || []);

    return {
      assessments,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  async getAssessmentById(assessmentId: string): Promise<Assessment | null> {
    const data = await this.repository.findById(assessmentId);
    return data ? this.transformAssessment(data) : null;
  }

  async getDashboardData(): Promise<DashboardData> {
    const [usage, recent, stats, trend] = await Promise.all([
      this.repository.getUsageStats(),
      this.repository.getRecentAssessments(5),
      this.repository.getAssessmentStats(),
      this.repository.getMonthlyTrend(6),
    ]);

    return {
      usage: {
        used: usage.assessments_used,
        limit: usage.assessments_limit || null,
        percentage: usage.assessments_limit
          ? (usage.assessments_used / usage.assessments_limit) * 100
          : 0,
      },
      recentAssessments: this.transformAssessments(recent),
      stats: this.calculateStats(stats),
      monthlyTrend: trend.map(item => ({
        month: this.formatMonth(item.month),
        count: item.count,
      })),
    };
  }

  async exportAssessments(format: 'csv' | 'json' = 'csv', filters: AssessmentFilters = {}) {
    const allAssessments = await this.repository.findAll(filters);
    const transformed = this.transformAssessments(allAssessments);

    if (format === 'json') {
      return transformed;
    }

    return this.convertToCSV(transformed);
  }

  private transformAssessments(data: any[]): Assessment[] {
    return data.map(item => this.transformAssessment(item));
  }

  private transformAssessment(item: any): Assessment {
    const responses = item.responses || {};
    const report = item.ai_reports?.[0] || item.mvp_planner_reports?.[0];

    return {
      id: item.id,
      tenant_id: item.tenant_id,
      user_email: item.user_email,
      user_first_name: item.user_first_name || '',
      user_last_name: item.user_last_name || '',
      user_company: item.user_company || item.company_name || 'N/A',
      industry: responses.industry || 'Unknown',
      company_size: responses.companySize || item.company_size || 'Unknown',
      responses,
      completed_at: item.completed_at,
      created_at: item.created_at,
      updated_at: item.updated_at,
      report: report ? {
        id: report.id,
        status: report.report_status || 'pending',
        access_token: report.access_token,
        email_sent_at: report.email_sent_at,
      } : undefined,
    };
  }

  private calculateStats(raw: any): AssessmentStats {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    return {
      total: raw.total || 0,
      completed: raw.completed || 0,
      processing: raw.processing || 0,
      failed: raw.failed || 0,
      thisMonth: raw.thisMonth || 0,
      lastMonth: raw.lastMonth || 0,
      conversionRate: raw.total > 0 ? (raw.completed / raw.total) * 100 : 0,
      averageCompletionTime: raw.avgCompletionTime || 0,
    };
  }

  private formatMonth(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  private convertToCSV(assessments: Assessment[]): string {
    const headers = [
      'Date',
      'Company',
      'Contact Name',
      'Email',
      'Industry',
      'Company Size',
      'Status',
      'Report Link',
    ];

    const rows = assessments.map(a => [
      new Date(a.created_at).toLocaleDateString(),
      a.user_company,
      `${a.user_first_name} ${a.user_last_name}`.trim(),
      a.user_email,
      a.industry,
      a.company_size,
      a.report?.status || 'pending',
      a.report?.access_token ? `${process.env.NEXT_PUBLIC_APP_URL}/report/view/${a.report.access_token}` : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  }
}

export { AssessmentService };