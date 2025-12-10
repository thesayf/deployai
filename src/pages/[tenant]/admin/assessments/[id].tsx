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

  // Parse AI analysis data - now directly from report
  const stage1 = assessment?.report?.stage1_problem_analysis;
  const stage2 = assessment?.report?.stage2_tool_research;
  const stage3 = assessment?.report?.stage3_tool_selection;
  const stage4 = assessment?.report?.stage4_report_content;
  const finalReport = assessment?.report?.final_report;

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

        {/* AI Opportunity Scores - only show if scores exist (old format) */}
        {stage1?.scores && Object.keys(stage1.scores).length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Opportunity Scores</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stage1.scores).map(([key, value]) => (
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

        {/* Business Context Summary - new format */}
        {stage1?.businessContext && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Business Context</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stage1.businessContext.industry && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Industry</p>
                  <p className="font-medium text-gray-900">{stage1.businessContext.industry}</p>
                </div>
              )}
              {stage1.businessContext.urgency && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Urgency</p>
                  <p className={`font-medium ${
                    stage1.businessContext.urgency === 'immediate' ? 'text-red-600' :
                    stage1.businessContext.urgency === 'within-month' ? 'text-orange-600' : 'text-blue-600'
                  }`}>{stage1.businessContext.urgency}</p>
                </div>
              )}
              {stage1.businessContext.monthlyBudget && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Monthly Budget</p>
                  <p className="font-medium text-green-700">{stage1.businessContext.monthlyBudget}</p>
                </div>
              )}
              {stage1.businessContext.techCapability && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Tech Capability</p>
                  <p className="font-medium text-gray-900">{stage1.businessContext.techCapability}</p>
                </div>
              )}
              {stage1.businessContext.currentSystems && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">Current Systems</p>
                  <p className="font-medium text-gray-900">{stage1.businessContext.currentSystems}</p>
                </div>
              )}
            </div>
            {stage1.businessContext.businessObjectives && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Business Objectives</p>
                <p className="text-gray-700">{stage1.businessContext.businessObjectives}</p>
              </div>
            )}
          </div>
        )}

        {/* Top Opportunities from Stage 1 - new format */}
        {stage1?.topOpportunities && Array.isArray(stage1.topOpportunities) && stage1.topOpportunities.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Opportunities Identified</h2>
            <div className="space-y-4">
              {stage1.topOpportunities.map((opp: any, idx: number) => (
                <div key={idx} className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                  <p className="font-medium text-gray-900 mb-2">{opp?.problemArea || 'Opportunity identified'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {opp?.annualCost && (
                      <div>
                        <span className="text-red-600 font-medium">Annual Cost: </span>
                        <span className="text-gray-700">{opp.annualCost}</span>
                      </div>
                    )}
                    {opp?.expectedOutcome && (
                      <div>
                        <span className="text-green-600 font-medium">Expected Outcome: </span>
                        <span className="text-gray-700 text-xs">{opp.expectedOutcome}</span>
                      </div>
                    )}
                  </div>
                  {opp?.aiSolutionType && (
                    <div className="mt-2 text-xs text-gray-600">
                      <span className="font-medium">Solution Type: </span>{opp.aiSolutionType}
                    </div>
                  )}
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
              {/* Additional quiz data */}
              {assessment.responses?.budget && (
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium text-green-700">{assessment.responses.budget}</p>
                </div>
              )}
              {assessment.responses?.timeline && (
                <div>
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-medium text-blue-700">{assessment.responses.timeline}</p>
                </div>
              )}
              {assessment.responses?.systems && assessment.responses.systems.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Current Systems</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {assessment.responses.systems.map((system: string, idx: number) => (
                      <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {assessment.responses?.goals && assessment.responses.goals.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Goals</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {assessment.responses.goals.map((goal: string, idx: number) => (
                      <span key={idx} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lead Value Summary - from stage4 data */}
        {stage4?.executiveSummary && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Lead Value Summary</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Readiness Level</p>
                <p className={`text-xl font-bold ${
                  stage4.executiveSummary.readinessLevel === 'High' ? 'text-green-600' :
                  stage4.executiveSummary.readinessLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {stage4.executiveSummary.readinessLevel}
                </p>
                {stage4.executiveSummary.readinessExplanation && (
                  <p className="text-xs text-gray-500 mt-1">{stage4.executiveSummary.readinessExplanation}</p>
                )}
              </div>
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Annual Opportunity</p>
                <p className="text-xl font-bold text-green-700">{stage4.executiveSummary.estimatedAnnualOpportunity}</p>
              </div>
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Projected ROI</p>
                <p className="text-xl font-bold text-blue-700">{stage4.executiveSummary.immediateROI}</p>
              </div>
            </div>
          </div>
        )}

        {/* Key Problems from Report */}
        {stage4?.keyProblems && Array.isArray(stage4.keyProblems) && stage4.keyProblems.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Problems Identified</h2>
            <div className="space-y-4">
              {stage4.keyProblems.map((problem: any, idx: number) => (
                <div key={idx} className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded-r-lg">
                  <p className="font-medium text-gray-900 mb-2">{problem?.problem || 'Problem identified'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {problem?.currentCost && (
                      <div>
                        <span className="text-red-600 font-medium">Current Cost: </span>
                        <span className="text-gray-700">{problem.currentCost}</span>
                      </div>
                    )}
                    {problem?.potentialGain && (
                      <div>
                        <span className="text-green-600 font-medium">Potential Gain: </span>
                        <span className="text-gray-700">{problem.potentialGain}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Solutions from Report */}
        {stage4?.recommendedSolutions && Array.isArray(stage4.recommendedSolutions) && stage4.recommendedSolutions.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stage4.recommendedSolutions.map((solution: any, idx: number) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      #{idx + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm">{solution?.solutionName || solution?.name || 'Solution'}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">{solution?.description || ''}</p>
                  {solution?.implementationTime && (
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-500">{solution.implementationTime}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Where to Start Recommendation */}
        {stage4?.whereToStart && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Where to Start</h2>
            </div>
            <p className="text-xl font-bold mb-2">{stage4.whereToStart.recommendation}</p>
            <p className="text-blue-100 text-sm mb-4">{stage4.whereToStart.targetBottleneck}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-blue-200 text-xs mb-1">Timeline</p>
                <p className="font-medium">{stage4.whereToStart.timelineEstimate}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-blue-200 text-xs mb-1">Expected ROI</p>
                <p className="font-medium">{stage4.whereToStart.expectedROI}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-blue-200 text-xs mb-1">Immediate Impact</p>
                <p className="font-medium text-xs">{stage4.whereToStart.immediateImpact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Legacy Sales Intelligence Components - only show if data exists in expected format */}
        {stage1?.industryProfile && (
          <ProblemSummaryCard
            industryProfile={stage1.industryProfile}
            painPoints={stage1.painPoints}
            businessImpact={stage1.businessImpact}
            monthlyOpportunity={stage1.monthlyOpportunity}
          />
        )}

        {stage2?.recommendedSolutions && (
          <RecommendedToolsGrid
            recommendedSolutions={stage2.recommendedSolutions}
          />
        )}

        {stage2?.recommendedSolutions && (
          <RevenueOpportunityCards
            recommendedSolutions={stage2.recommendedSolutions}
          />
        )}

        {stage3?.financialAnalysis && (
          <FinancialSummaryCards
            financialAnalysis={stage3.financialAnalysis}
          />
        )}

        {stage4?.strategicRecommendations && (
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