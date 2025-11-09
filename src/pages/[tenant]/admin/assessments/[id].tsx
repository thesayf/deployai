import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { useTenant } from '@/contexts/TenantContext';
import { ArrowLeft, ExternalLink, Clock, Target, TrendingUp, Mail, X } from 'lucide-react';
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
  const [isApproving, setIsApproving] = useState(false);

  // Send report modal state
  const [showSendModal, setShowSendModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendMode, setSendMode] = useState<'original' | 'different'>('original');
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    if (id && typeof id === 'string' && tenantContext) {
      fetchAssessment(id);
    }
  }, [id, tenantContext]);

  const handleApprove = async () => {
    if (!id || !tenantContext) return;

    if (!confirm('Approve this assessment request? The user will receive an email with their assessment link.')) {
      return;
    }

    setIsApproving(true);

    try {
      const response = await fetch(`/api/assessment-requests/${id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
        body: JSON.stringify({
          notes: `Approved by admin on ${new Date().toLocaleString()}`
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to approve request');
      }

      alert(`Assessment request approved!\n\nAssessment link:\n${result.assessmentLink}\n\n(Email sent to user)`);

      // Refresh assessment data
      await fetchAssessment(id as string);
    } catch (err: any) {
      console.error('Error approving request:', err);
      alert(`Failed to approve: ${err.message}`);
    } finally {
      setIsApproving(false);
    }
  };

  const handleSendReport = async () => {
    if (!assessment?.report?.id || !tenantContext) return;

    setIsSending(true);

    try {
      const payload: any = {
        reportId: assessment.report.id,
      };

      // If sending to different email, include new details
      if (sendMode === 'different') {
        if (!newEmail || !newEmail.includes('@')) {
          alert('Please enter a valid email address');
          setIsSending(false);
          return;
        }
        payload.userEmail = newEmail;
        payload.firstName = newFirstName || 'there';
        payload.lastName = newLastName || '';
      }

      const response = await fetch('/api/reports/send-report-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send report');
      }

      const recipientEmail = sendMode === 'different' ? newEmail : assessment.user_email;
      alert(`Report sent successfully to ${recipientEmail}!`);

      // Close modal and reset
      setShowSendModal(false);
      setSendMode('original');
      setNewEmail('');
      setNewFirstName('');
      setNewLastName('');

      // Refresh assessment data to update email_sent_at
      await fetchAssessment(id as string);
    } catch (err: any) {
      console.error('Error sending report:', err);
      alert(`Failed to send report: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

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
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSendModal(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Send Report
              </button>
              <Link
                href={`/report/view/${assessment.report.access_token}`}
                target="_blank"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                View Report
              </Link>
            </div>
          )}
        </div>

        {/* Requested Status Banner */}
        {assessment.request_status === 'requested' && (
          <div className="bg-orange-100 border-l-4 border-orange-500 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-orange-900 mb-1">
                    Assessment Requested
                  </h3>
                  <p className="text-orange-800 mb-2">
                    This user has requested assessment access because they reached their limit.
                    Approve to send them a unique assessment link via email.
                  </p>
                  <p className="text-sm text-orange-700">
                    Requested on {new Date(assessment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="flex-shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
              >
                {isApproving ? 'Approving...' : 'Approve & Send Link'}
              </button>
            </div>
          </div>
        )}

        {/* Approved Status Banner */}
        {assessment.request_status === 'approved' && !assessment.report && (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-bold text-lg text-blue-900 mb-1">
                  Assessment Approved - Awaiting Completion
                </h3>
                <p className="text-blue-800">
                  This assessment request was approved and the user has been sent their unique link.
                  They have not started the assessment yet.
                </p>
                {assessment.admin_notes && (
                  <p className="text-sm text-blue-700 mt-2">
                    <strong>Admin Notes:</strong> {assessment.admin_notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

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

      {/* Send Report Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Send Report</h2>
              <button
                onClick={() => {
                  setShowSendModal(false);
                  setSendMode('original');
                  setNewEmail('');
                  setNewFirstName('');
                  setNewLastName('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mode Selection */}
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="sendMode"
                  value="original"
                  checked={sendMode === 'original'}
                  onChange={(e) => setSendMode(e.target.value as 'original' | 'different')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Resend to Original Email</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Send to: <strong>{assessment.user_email}</strong>
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="sendMode"
                  value="different"
                  checked={sendMode === 'different'}
                  onChange={(e) => setSendMode(e.target.value as 'original' | 'different')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Send to Different Email</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Enter a new recipient's details
                  </div>
                </div>
              </label>
            </div>

            {/* Different Email Form */}
            {sendMode === 'different' && (
              <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="recipient@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSendModal(false);
                  setSendMode('original');
                  setNewEmail('');
                  setNewFirstName('');
                  setNewLastName('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendReport}
                disabled={isSending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending...' : 'Send Report'}
              </button>
            </div>
          </div>
        </div>
      )}
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