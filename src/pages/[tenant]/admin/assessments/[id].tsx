import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { useTenant } from '@/contexts/TenantContext';
import { ArrowLeft, ExternalLink, Clock, Target, TrendingUp } from 'lucide-react';
import ProblemSummaryCard from '@/components/admin/assessments/detail/ProblemSummaryCard';
import RecommendedToolsGrid from '@/components/admin/assessments/detail/RecommendedToolsGrid';
import FinancialSummaryCards from '@/components/admin/assessments/detail/FinancialSummaryCards';
import ImplementationRoadmap from '@/components/admin/assessments/detail/ImplementationRoadmap';
import RevenueOpportunityCards from '@/components/admin/assessments/detail/RevenueOpportunityCards';

const AdminAssessmentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tenantContext } = useTenant();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string' && tenantContext) {
      fetchAssessment(id);
    }
  }, [id, tenantContext]);

  const fetchAssessment = async (assessmentId: string) => {
    if (!tenantContext) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/assessments/${assessmentId}`, {
        headers: {
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Assessment not found');
        }
        throw new Error('Failed to fetch assessment');
      }

      const data = await response.json();
      setAssessment(data);
    } catch (err: any) {
      console.error('Error fetching assessment:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      completed: { bg: 'bg-green-500', text: 'Completed' },
      generating: { bg: 'bg-yellow-500', text: 'Generating' },
      processing: { bg: 'bg-blue-500', text: 'Processing' },
      failed: { bg: 'bg-red-500', text: 'Failed' },
      pending: { bg: 'bg-gray-500', text: 'Pending' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`${config.bg} text-white px-2 py-1 text-xs font-medium rounded`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Loading...">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-xl font-medium text-gray-600 mb-2">Loading...</div>
              <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error || !assessment) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Error">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="font-medium text-red-600 mb-4">{error || 'Assessment not found'}</p>
            <Link
              href={`/${tenantContext?.tenant.subdomain}/admin/assessments`}
              className="inline-flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Assessments
            </Link>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // Parse AI analysis data
  const finalReport = assessment?.report?.final_report;
  const stage1 = finalReport?.stage1;
  const stage2 = finalReport?.stage2;
  const stage3 = finalReport?.stage3;
  const stage4 = finalReport?.stage4;

  return (
    <ProtectedRoute>
      <AdminLayout title="Assessment Details">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/${tenantContext?.tenant.subdomain}/admin/assessments`}
              className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Assessment Details</h1>
              <p className="text-gray-600 mt-1">
                {assessment.user_first_name} {assessment.user_last_name} • {assessment.user_company || 'No Company'}
              </p>
            </div>
          </div>
          {assessment.report?.status === 'completed' && assessment.report?.access_token && (
            <Link
              href={`/report/view/${assessment.report.access_token}`}
              target="_blank"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              View Report
            </Link>
          )}
        </div>

        {/* AI Opportunity Scores */}
        {stage1 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Opportunity Scores</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stage1.scores && Object.entries(stage1.scores).map(([key, value]) => (
                <div key={key} className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{String(value)}/10</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status & Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Report Status</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {getStatusBadge(assessment.report?.status)}
              </div>
              {assessment.report?.email_sent_at && (
                <div>
                  <p className="text-sm text-gray-500">Email sent</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(assessment.report.email_sent_at).toLocaleString()}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Submitted</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(assessment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">
                  {assessment.user_first_name} {assessment.user_last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{assessment.user_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium text-gray-900">{assessment.user_company || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium text-gray-900">{assessment.industry || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium text-gray-900">{assessment.company_size || 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Intelligence Components */}
        {stage1 && (
          <ProblemSummaryCard
            industryProfile={stage1.industryProfile}
            painPoints={stage1.painPoints}
            businessImpact={stage1.businessImpact}
            monthlyOpportunity={stage1.monthlyOpportunity}
          />
        )}

        {stage2 && (
          <RecommendedToolsGrid
            recommendedSolutions={stage2.marketIntelligence?.recommendedSolutions}
          />
        )}

        {stage2 && (
          <RevenueOpportunityCards
            recommendedSolutions={stage2.marketIntelligence?.recommendedSolutions}
          />
        )}

        {stage3 && (
          <FinancialSummaryCards
            financialAnalysis={stage3.financialAnalysis}
          />
        )}

        {stage4 && (
          <ImplementationRoadmap
            strategicRecommendations={stage4.strategicRecommendations}
          />
        )}

        {/* Assessment Responses (Collapsed) */}
        <details className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
            Assessment Responses (Raw Data)
          </summary>
          <div className="p-6 pt-0 space-y-4 border-t border-gray-200">
            {assessment.responses && Object.entries(assessment.responses).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-3 last:border-b-0">
                <p className="text-sm font-medium text-gray-500 mb-1">{key}</p>
                <p className="text-sm text-gray-900">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </AdminLayout>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get tenant from URL path parameter
  const { tenant: tenantSlug } = context.params as { tenant: string };

  // Import tenant service
  const { tenantService } = await import('@/services/tenant');

  // Get tenant context
  const tenantContext = await tenantService.getTenantContext(tenantSlug);

  if (!tenantContext) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default AdminAssessmentDetailPage;