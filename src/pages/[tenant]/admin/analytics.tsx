import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useTenant } from '@/contexts/TenantContext';
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    completionFunnel: {
      started: number;
      completed: number;
      reportGenerated: number;
      emailed: number;
      completionRate: number;
      reportRate: number;
      emailRate: number;
    };
    scoreDistribution: {
      average: number;
      distribution: Array<{ label: string; value: number; color: string }>;
    };
    industryBreakdown: Array<{ industry: string; count: number }>;
    monthlyTrend: Array<{ month: string; count: number }>;
  };
  waitlist: {
    requested: number;
    approved: number;
    completed: number;
    pending: number;
    approvalRate: number;
    completionRate: number;
  };
  performance: {
    timeMetrics: {
      averageMinutes: number;
      distribution: Array<{ label: string; value: number }>;
    };
    reportHealth: {
      total: number;
      completed: number;
      failed: number;
      processing: number;
      stuck: number;
      successRate: number;
      failureRate: number;
    };
  };
}

const AnalyticsPage = () => {
  const { tenantContext } = useTenant();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'waitlist' | 'performance'>('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [tenantContext]);

  const fetchAnalytics = async () => {
    if (!tenantContext) return;

    try {
      setLoading(true);
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/analytics?user_email=${encodeURIComponent(userEmail || '')}`, {
        headers: {
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Analytics">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-xl font-medium text-gray-600 mb-2">Loading analytics...</div>
              <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error || !data) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Analytics">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="font-medium text-red-600">{error || 'Failed to load analytics'}</p>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout title="Analytics">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">
              Insights into your assessment performance and lead quality
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
                { id: 'waitlist' as const, label: 'Waitlist', icon: Users },
                { id: 'performance' as const, label: 'Performance', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <OverviewTab data={data.overview} />
          )}

          {activeTab === 'waitlist' && (
            <WaitlistTab data={data.waitlist} />
          )}

          {activeTab === 'performance' && (
            <PerformanceTab data={data.performance} />
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ data: AnalyticsData['overview'] }> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Completion Funnel */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          COMPLETION FUNNEL
        </h2>
        <p className="text-sm text-gray-700 mb-6 font-medium">
          Track how users progress through your assessment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Started', value: data.completionFunnel.started, icon: Users, bgColor: '#3B82F6', textColor: 'white' },
            { label: 'Completed', value: data.completionFunnel.completed, icon: CheckCircle, bgColor: '#10B981', textColor: 'white', rate: data.completionFunnel.completionRate },
            { label: 'Report Generated', value: data.completionFunnel.reportGenerated, icon: BarChart3, bgColor: '#8B5CF6', textColor: 'white', rate: data.completionFunnel.reportRate },
            { label: 'Emailed', value: data.completionFunnel.emailed, icon: CheckCircle, bgColor: '#F59E0B', textColor: 'white', rate: data.completionFunnel.emailRate }
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div
                  className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  style={{ backgroundColor: step.bgColor }}
                >
                  <Icon className="h-6 w-6 mb-3" style={{ color: step.textColor }} />
                  <div className="text-3xl font-black mb-1" style={{ color: step.textColor }}>{step.value}</div>
                  <div className="text-xs font-bold uppercase" style={{ color: step.textColor, opacity: 0.9 }}>{step.label}</div>
                  {step.rate !== undefined && (
                    <div className="text-xs font-bold mt-2 pt-2 border-t-2" style={{ color: step.textColor, borderColor: 'rgba(255,255,255,0.3)' }}>
                      {step.rate.toFixed(1)}% conversion
                    </div>
                  )}
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <div className="text-black text-3xl font-black">→</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Score Distribution & Industries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-orange-500" />
            SCORE DISTRIBUTION
          </h2>
          <div className="text-center mb-6 bg-gray-100 border-[3px] border-black p-4">
            <div className="text-5xl font-black text-gray-900">{data.scoreDistribution.average}</div>
            <div className="text-xs font-bold uppercase text-gray-600 mt-1">Average Score</div>
          </div>

          <div className="space-y-4">
            {data.scoreDistribution.distribution.map((item, index) => {
              const total = data.scoreDistribution.distribution.reduce((a, b) => a + b.value, 0);
              const percentage = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-gray-900">{item.label}</span>
                    <span className="text-lg font-black text-gray-900">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 border-[3px] border-black h-8 relative overflow-hidden">
                    <div
                      className="h-full border-r-[3px] border-black transition-all flex items-center justify-end pr-2"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color
                      }}
                    >
                      {percentage > 15 && (
                        <span className="text-xs font-black text-white">
                          {percentage.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Industries */}
        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            TOP INDUSTRIES
          </h2>
          <p className="text-sm text-gray-700 mb-6 font-medium">
            Industries taking the most assessments
          </p>

          <div className="space-y-4">
            {data.industryBreakdown.map((item, index) => {
              const maxCount = Math.max(...data.industryBreakdown.map(d => d.count));
              const percentage = (item.count / maxCount) * 100;
              const colors = ['#FF6B35', '#00D4FF', '#FFB800', '#8B5CF6', '#10B981'];
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 border-[3px] border-black flex items-center justify-center font-black text-sm"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      >
                        <span className="text-white">#{index + 1}</span>
                      </div>
                      <span className="font-bold text-gray-900 text-sm uppercase">{item.industry}</span>
                    </div>
                    <span className="text-xl font-black text-gray-900">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 border-[3px] border-black h-6">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          MONTHLY TREND
        </h2>
        <p className="text-sm text-gray-700 mb-6 font-medium">
          Assessment volume over the last 6 months
        </p>

        <div className="border-[3px] border-black bg-gray-50 p-6">
          <div className="flex items-end justify-between gap-3 h-64">
            {data.monthlyTrend.map((item, index) => {
              const maxCount = Math.max(...data.monthlyTrend.map(d => d.count), 1);
              const height = (item.count / maxCount) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-sm font-black text-gray-900">{item.count}</div>
                  <div
                    className="w-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] cursor-pointer"
                    style={{
                      height: `${Math.max(height, 10)}%`,
                      backgroundColor: '#FF6B35'
                    }}
                  />
                  <div className="text-xs font-bold text-gray-600 mt-2 uppercase">
                    {new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Waitlist Tab Component
const WaitlistTab: React.FC<{ data: AnalyticsData['waitlist'] }> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Waitlist Funnel */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-500" />
          WAITLIST CONVERSION FUNNEL
        </h2>
        <p className="text-sm text-gray-700 mb-6 font-medium">
          Track how waitlist requests convert to completed assessments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Requested', value: data.requested, bgColor: '#F59E0B', textColor: 'white' },
            { label: 'Approved', value: data.approved, bgColor: '#3B82F6', textColor: 'white', rate: data.approvalRate },
            { label: 'Completed', value: data.completed, bgColor: '#10B981', textColor: 'white', rate: data.completionRate }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div
                className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center"
                style={{ backgroundColor: step.bgColor }}
              >
                <div className="text-5xl font-black mb-2" style={{ color: step.textColor }}>{step.value}</div>
                <div className="text-xs font-bold uppercase mb-2" style={{ color: step.textColor, opacity: 0.9 }}>{step.label}</div>
                {step.rate !== undefined && (
                  <div className="text-xs font-bold pt-2 border-t-2" style={{ color: step.textColor, borderColor: 'rgba(255,255,255,0.3)' }}>
                    {step.rate.toFixed(1)}% conversion
                  </div>
                )}
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <div className="text-black text-3xl font-black">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pending Requests Alert */}
      {data.pending > 0 && (
        <div className="bg-orange-100 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 border-[3px] border-black p-2">
              <AlertCircle className="h-6 w-6 text-white flex-shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase">
                {data.pending} Pending Request{data.pending !== 1 ? 's' : ''}
              </h3>
              <p className="text-gray-900 mb-4 font-medium">
                You have {data.pending} lead{data.pending !== 1 ? 's' : ''} waiting for approval. These are hot prospects ready to take your assessment!
              </p>
              <a
                href={`/${(window as any).location.pathname.split('/')[1]}/admin/assessments?filter=waitlist`}
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-sm border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Review Requests
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase text-gray-600 mb-2">Approval Rate</p>
              <p className="text-5xl font-black text-gray-900">{data.approvalRate.toFixed(1)}%</p>
            </div>
            <div className="bg-blue-500 border-[3px] border-black p-3">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="border-t-[3px] border-gray-200 pt-4">
            <p className="text-sm font-bold text-gray-700">
              {data.approved} out of {data.requested} approved
            </p>
          </div>
        </div>

        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase text-gray-600 mb-2">Completion Rate</p>
              <p className="text-5xl font-black text-gray-900">{data.completionRate.toFixed(1)}%</p>
            </div>
            <div className="bg-green-500 border-[3px] border-black p-3">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="border-t-[3px] border-gray-200 pt-4">
            <p className="text-sm font-bold text-gray-700">
              {data.completed} out of {data.approved} completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Tab Component
const PerformanceTab: React.FC<{ data: AnalyticsData['performance'] }> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Time Metrics */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          AVERAGE COMPLETION TIME
        </h2>
        <div className="text-center mb-6 bg-orange-500 border-[3px] border-black p-6">
          <div className="text-6xl font-black text-white">{data.timeMetrics.averageMinutes}</div>
          <div className="text-sm font-bold uppercase text-white mt-2">minutes</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.timeMetrics.distribution.map((item, index) => (
            <div key={index} className="text-center bg-gray-100 border-[3px] border-black p-4">
              <div className="text-3xl font-black text-gray-900 mb-2">{item.value}</div>
              <div className="text-xs font-bold uppercase text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Health */}
      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-500" />
          REPORT GENERATION HEALTH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center bg-green-500 border-[3px] border-black p-6">
            <div className="text-5xl font-black text-white mb-2">{data.reportHealth.successRate.toFixed(1)}%</div>
            <div className="text-xs font-bold uppercase text-white">Success Rate</div>
          </div>
          <div className="text-center bg-red-500 border-[3px] border-black p-6">
            <div className="text-5xl font-black text-white mb-2">{data.reportHealth.failureRate.toFixed(1)}%</div>
            <div className="text-xs font-bold uppercase text-white">Failure Rate</div>
          </div>
          <div className="text-center bg-gray-800 border-[3px] border-black p-6">
            <div className="text-5xl font-black text-white mb-2">{data.reportHealth.total}</div>
            <div className="text-xs font-bold uppercase text-white">Total Reports</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Completed', value: data.reportHealth.completed, icon: CheckCircle, bgColor: '#10B981', textColor: 'white' },
            { label: 'Failed', value: data.reportHealth.failed, icon: XCircle, bgColor: '#EF4444', textColor: 'white' },
            { label: 'Processing', value: data.reportHealth.processing, icon: Clock, bgColor: '#F59E0B', textColor: 'white' },
            { label: 'Stuck', value: data.reportHealth.stuck, icon: AlertCircle, bgColor: '#FF6B35', textColor: 'white' }
          ].map((status, index) => {
            const Icon = status.icon;
            return (
              <div
                key={index}
                className="border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4"
                style={{ backgroundColor: status.bgColor }}
              >
                <Icon className="h-6 w-6 mb-3" style={{ color: status.textColor }} />
                <div className="text-3xl font-black mb-1" style={{ color: status.textColor }}>{status.value}</div>
                <div className="text-xs font-bold uppercase" style={{ color: status.textColor, opacity: 0.9 }}>{status.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Alerts */}
      {data.reportHealth.stuck > 0 && (
        <div className="bg-red-100 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-500 border-[3px] border-black p-2">
              <AlertCircle className="h-6 w-6 text-white flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase">
                {data.reportHealth.stuck} Report{data.reportHealth.stuck !== 1 ? 's' : ''} Stuck
              </h3>
              <p className="text-gray-900 font-medium">
                Some reports have been processing for over 10 minutes. This might indicate an API issue or timeout problem that needs investigation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.params as { tenant: string };
  const { tenantService } = await import('@/services/tenant');
  const tenantContext = await tenantService.getTenantContext(tenantSlug);

  if (!tenantContext) {
    return { notFound: true };
  }

  return { props: {} };
};

export default AnalyticsPage;
