import React, { useEffect, useState } from 'react';
import { useTenant } from '@/contexts/TenantContext';
import DashboardStats from './dashboard/DashboardStats';
import UsageMeter from './dashboard/UsageMeter';
import RecentAssessments from './dashboard/RecentAssessments';
import MonthlyTrend from './dashboard/MonthlyTrend';
import { TrialBanner } from '@/components/billing/TrialBanner';
import { getTenantAssessmentUrl } from '@/lib/utils/url-builder';

interface DashboardData {
  usage: {
    used: number;
    limit: number | null;
    percentage: number;
  };
  recentAssessments: any[];
  stats: {
    total: number;
    completed: number;
    processing: number;
    failed: number;
    thisMonth: number;
    lastMonth: number;
    conversionRate: number;
    averageCompletionTime: number;
  };
  monthlyTrend: Array<{
    month: string;
    count: number;
  }>;
  billing?: {
    subscription_status: string;
    trial_end_date: string | null;
    subscription_tier: string | null;
  };
}

const Dashboard: React.FC = () => {
  const { tenantContext } = useTenant();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, [tenantContext]);

  const fetchDashboardData = async () => {
    if (!tenantContext) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/dashboard`, {
        headers: {
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-600 mb-2">Loading...</div>
          <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="font-medium text-red-600">{error || 'Failed to load dashboard'}</p>
      </div>
    );
  }

  // Calculate trial data
  const isTrialing = dashboardData?.billing?.subscription_status === 'trialing';
  const isPaused = dashboardData?.billing?.subscription_status === 'paused';
  const trialEndDate = dashboardData?.billing?.trial_end_date;
  const trialDaysRemaining = trialEndDate
    ? Math.max(0, Math.ceil((new Date(trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Get tier pricing
  const TIER_PRICING: Record<string, number> = {
    starter: 199,
    professional: 499,
    scale: 997,
  };
  const monthlyPrice = TIER_PRICING[dashboardData?.billing?.subscription_tier || 'starter'];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back to {tenantContext?.tenant.company_name} Admin Portal
        </p>
      </div>

      {/* Trial Banner */}
      {isTrialing && trialEndDate && (
        <TrialBanner
          daysRemaining={trialDaysRemaining}
          assessmentsUsed={dashboardData.usage.used}
          assessmentsLimit={dashboardData.usage.limit || 5}
          trialEndDate={trialEndDate}
          monthlyPrice={monthlyPrice}
          tenant={tenantContext?.tenant.subdomain || ''}
        />
      )}

      {/* Paused Banner */}
      {isPaused && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-4xl">⏸️</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Assessments Paused
              </h3>
              <p className="text-amber-800 mb-4">
                Your assessment portal is currently paused. Clients cannot take new assessments until you resume. Your subscription remains active and you won't lose any unused assessments.
              </p>
              <a
                href={`/${tenantContext?.tenant.subdomain}/admin/settings/billing`}
                className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors"
              >
                Resume Assessments
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Usage Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-1">
          <UsageMeter
            used={dashboardData.usage.used}
            limit={dashboardData.usage.limit}
            percentage={dashboardData.usage.percentage}
            tier={tenantContext?.tenant.subscription_tier || 'starter'}
            tenant={tenantContext?.tenant.subdomain}
          />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                Copy Assessment Link
              </button>
              <button className="bg-white font-medium py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Export Data
              </button>
              <button className="bg-white font-medium py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                View Reports
              </button>
            </div>

            {/* Assessment Link */}
            <div className="mt-auto pt-4">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs font-medium text-gray-500 mb-1">Your Assessment Link</p>
              <code className="text-sm break-all">
                {getTenantAssessmentUrl(tenantContext?.tenant.subdomain || '')}
              </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <DashboardStats stats={dashboardData.stats} />

      {/* Recent Assessments and Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAssessments
          assessments={dashboardData.recentAssessments}
          tenantSubdomain={tenantContext?.tenant.subdomain || ''}
        />
        <MonthlyTrend data={dashboardData.monthlyTrend} />
      </div>
    </div>
  );
};

export default Dashboard;