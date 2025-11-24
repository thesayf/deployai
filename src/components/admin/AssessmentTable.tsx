import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useTenant } from '@/contexts/TenantContext';
import { useAssessments, type Assessment } from '@/hooks/useAssessments';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  RefreshCw,
  Mail,
  X,
  RotateCw,
  Send
} from 'lucide-react';

const AssessmentTable: React.FC = () => {
  const { tenantContext } = useTenant();
  const { assessments: allAssessments, isLoading, isError, refresh } = useAssessments();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'company' | 'status'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Send assessment modal
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Retry/Resend state
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  const itemsPerPage = 20;

  // Client-side filtering and sorting with useMemo
  const filteredAndSortedAssessments = useMemo(() => {
    let filtered = [...allAssessments];

    // Apply search filter (case-insensitive)
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(
        (a) =>
          a.user_email.toLowerCase().includes(searchLower) ||
          a.user_company.toLowerCase().includes(searchLower) ||
          a.user_first_name.toLowerCase().includes(searchLower) ||
          a.user_last_name.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter with priority logic
    if (statusFilter !== 'all') {
      filtered = filtered.filter((a) => {
        // Priority 1: request_status
        if (statusFilter === 'requested') {
          return a.request_status === 'requested';
        }
        if (statusFilter === 'approved') {
          return a.request_status === 'approved' && !a.report;
        }

        // Priority 2: report status
        return a.report?.status === statusFilter;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'created_at':
          compareValue = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;

        case 'company':
          compareValue = (a.user_company || '').localeCompare(b.user_company || '');
          break;

        case 'status': {
          const statusA = a.request_status || a.report?.status || 'pending';
          const statusB = b.request_status || b.report?.status || 'pending';
          compareValue = statusA.localeCompare(statusB);
          break;
        }
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [allAssessments, search, statusFilter, sortBy, sortOrder]);

  // Client-side pagination
  const paginatedAssessments = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedAssessments.slice(startIndex, endIndex);
  }, [filteredAndSortedAssessments, page]);

  const totalFiltered = filteredAndSortedAssessments.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortBy, sortOrder]);

  // Handle page out of bounds
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleSort = (field: 'created_at' | 'company' | 'status') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      const params = new URLSearchParams({ format });
      if (search) params.append('search', search);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const response = await fetch(`/api/admin/assessments/export?${params}`);

      if (!response.ok) {
        throw new Error('Failed to export assessments');
      }

      if (format === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `assessments-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `assessments-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting assessments:', error);
    }
  };

  const handleSendAssessment = async () => {
    if (!selectedAssessment || !tenantContext) return;

    setIsSending(true);

    try {
      const response = await fetch(`/api/assessment-requests/${selectedAssessment.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
        body: JSON.stringify({
          notes: `Sent from waitlist on ${new Date().toLocaleString()}`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send assessment');
      }

      // Close modal and refresh
      setShowSendModal(false);
      setSelectedAssessment(null);
      await refresh();

      alert(`Assessment sent successfully to ${selectedAssessment.user_email}!`);
    } catch (err: any) {
      console.error('Error sending assessment:', err);
      alert(`Failed to send assessment: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = async (assessmentId: string) => {
    if (!tenantContext) return;

    if (!confirm('Are you sure you want to regenerate this report? This will restart the AI processing.')) {
      return;
    }

    setRetryingId(assessmentId);

    try {
      const response = await fetch(`/api/admin/assessments/${assessmentId}/retry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to retry report generation');
      }

      await refresh();

      alert(result.message || 'Report regeneration started successfully!');
    } catch (err: any) {
      console.error('Error retrying report:', err);
      alert(`Failed to retry report: ${err.message}`);
    } finally {
      setRetryingId(null);
    }
  };

  const handleResendEmail = async (assessmentId: string, userEmail: string) => {
    if (!tenantContext) return;

    if (!confirm(`Are you sure you want to resend the report email to ${userEmail}?`)) {
      return;
    }

    setResendingId(assessmentId);

    try {
      const response = await fetch(`/api/admin/assessments/${assessmentId}/resend-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to resend email');
      }

      await refresh();

      alert(result.message || `Email resent successfully to ${userEmail}!`);
    } catch (err: any) {
      console.error('Error resending email:', err);
      alert(`Failed to resend email: ${err.message}`);
    } finally {
      setResendingId(null);
    }
  };

  const getStatusBadge = useCallback((assessment: Assessment) => {
    // Priority 1: Check request_status (highest priority)
    if (assessment.request_status === 'requested') {
      return (
        <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 text-xs font-bold rounded flex items-center gap-1">
          ⏳ Waitlist
        </span>
      );
    }

    if (assessment.request_status === 'approved' && !assessment.report) {
      return (
        <span className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
          APPROVED
        </span>
      );
    }

    // Priority 2: Check report status
    const reportStatus = assessment.report?.status;
    const statusConfig = {
      completed: { bg: 'bg-green-500', text: 'Completed' },
      generating: { bg: 'bg-yellow-500', text: 'Generating' },
      processing: { bg: 'bg-blue-500', text: 'Processing' },
      failed: { bg: 'bg-red-500', text: 'Failed' },
      pending: { bg: 'bg-gray-500', text: 'Pending' }
    };

    const config = statusConfig[reportStatus as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`${config.bg} text-white px-2 py-1 text-xs font-medium rounded`}>
        {config.text}
      </span>
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Assessments</h1>
          <p className="text-gray-600 mt-2">
            {totalFiltered === allAssessments.length
              ? `Total: ${totalFiltered} assessments`
              : `Showing ${totalFiltered} of ${allAssessments.length} assessments`}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => refresh()}
            disabled={isLoading}
            className="flex items-center gap-2 bg-white font-medium py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh data"
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 bg-white font-medium py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="flex items-center gap-2 bg-white font-medium py-2 px-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Download className="h-5 w-5" />
            Export JSON
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 font-medium bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="requested">⏳ Waitlist</option>
            <option value="completed">Completed</option>
            <option value="generating">Generating</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="text-lg font-medium text-gray-600">Loading assessments...</div>
            <div className="mt-2 text-sm text-gray-500">Please wait</div>
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <div className="text-lg font-medium text-red-600 mb-4">Failed to load assessments</div>
            <button
              onClick={() => refresh()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : paginatedAssessments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 font-medium mb-2">
              {allAssessments.length === 0
                ? 'No assessments yet'
                : 'No assessments match your filters'}
            </p>
            {(search || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort('created_at')}
                    className="w-[13%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Date {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('company')}
                    className="w-[28%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Company {sortBy === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="w-[28%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th
                    onClick={() => handleSort('status')}
                    className="w-[15%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="w-[16%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedAssessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(assessment.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(assessment.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 truncate">{assessment.user_company || 'N/A'}</p>
                        <p className="text-xs text-gray-600 truncate">
                          {assessment.industry} • {assessment.company_size}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 truncate">
                          {assessment.user_first_name} {assessment.user_last_name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{assessment.user_email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(assessment)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {assessment.request_status === 'requested' ? (
                          (() => {
                            // Check if trial user at limit
                            const isTrialing = tenantContext?.tenant.subscription_status === 'trialing';
                            const assessmentsUsed = tenantContext?.tenant.assessments_used || 0;
                            const assessmentsLimit = tenantContext?.tenant.assessments_limit || 0;
                            const atLimit = assessmentsUsed >= assessmentsLimit;

                            // Check if trial has ended
                            const trialEndDate = tenantContext?.tenant.trial_end_date ? new Date(tenantContext.tenant.trial_end_date) : null;
                            const trialEnded = trialEndDate ? trialEndDate < new Date() : false;

                            if (isTrialing && (atLimit || trialEnded)) {
                              // Trial user at limit or trial ended - show upgrade button
                              return (
                                <button
                                  onClick={() => {
                                    window.location.href = `/${tenantContext?.tenant.subdomain}/admin/billing`;
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors"
                                >
                                  <Mail className="h-3 w-3" />
                                  {trialEnded ? 'Trial Ended - Upgrade Now' : 'Trial Assessments Exhausted - Upgrade'}
                                </button>
                              );
                            }

                            // Normal flow - show send assessment button
                            return (
                              <button
                                onClick={() => {
                                  setSelectedAssessment(assessment);
                                  setShowSendModal(true);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors"
                              >
                                <Mail className="h-3 w-3" />
                                Send Assessment - ${tenantContext?.tenant.subscription_tier === 'starter' ? '4' : tenantContext?.tenant.subscription_tier === 'professional' ? '3' : '2'}
                              </button>
                            );
                          })()
                        ) : (
                          <>
                            <Link
                              href={`/${tenantContext?.tenant.subdomain}/admin/assessments/${assessment.id}`}
                              className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              View
                            </Link>

                            {/* Retry button for failed reports */}
                            {assessment.report?.status === 'failed' && (
                              <button
                                onClick={() => handleRetry(assessment.id)}
                                disabled={retryingId === assessment.id}
                                className="flex items-center gap-1 px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Retry report generation"
                              >
                                <RotateCw className={`h-3 w-3 ${retryingId === assessment.id ? 'animate-spin' : ''}`} />
                                {retryingId === assessment.id ? 'Retrying...' : 'Retry'}
                              </button>
                            )}

                            {/* Resend email button for completed reports */}
                            {assessment.report?.status === 'completed' && (
                              <>
                                <Link
                                  href={`/report/view/${assessment.report.access_token}`}
                                  target="_blank"
                                  className="p-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                  title="View report"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                                <button
                                  onClick={() => handleResendEmail(assessment.id, assessment.user_email)}
                                  disabled={resendingId === assessment.id}
                                  className="flex items-center gap-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Resend report email"
                                >
                                  <Send className={`h-3 w-3 ${resendingId === assessment.id ? 'animate-pulse' : ''}`} />
                                  {resendingId === assessment.id ? 'Sending...' : 'Resend'}
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`p-2 border border-gray-200 rounded ${
                    page === 1
                      ? 'bg-gray-100 cursor-not-allowed text-gray-400'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  } transition-colors`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={`p-2 border border-gray-200 rounded ${
                    page === totalPages
                      ? 'bg-gray-100 cursor-not-allowed text-gray-400'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  } transition-colors`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Send Assessment Modal */}
      {showSendModal && selectedAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Send Assessment</h2>
              <button
                onClick={() => {
                  setShowSendModal(false);
                  setSelectedAssessment(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Paused Warning */}
            {tenantContext?.tenant.subscription_status === 'paused' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex gap-2">
                  <span className="text-lg">⏸️</span>
                  <div>
                    <p className="text-sm font-medium text-amber-900">Your account is paused</p>
                    <p className="text-xs text-amber-700 mt-1">
                      This will send one assessment link without unpausing your account
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recipient Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Recipient</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedAssessment.user_first_name} {selectedAssessment.user_last_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{selectedAssessment.user_email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm font-medium text-gray-900">{selectedAssessment.user_company || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Cost Info */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost (overage rate):</span>
                <span className="text-lg font-bold text-gray-900">
                  ${tenantContext?.tenant.subscription_tier === 'starter' ? '4.00' : tenantContext?.tenant.subscription_tier === 'professional' ? '3.00' : '2.00'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {tenantContext?.tenant.subscription_status === 'paused'
                  ? 'Your account will remain paused after sending'
                  : 'One-time charge as overage assessment'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSendModal(false);
                  setSelectedAssessment(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                disabled={isSending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendAssessment}
                disabled={isSending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending...' : `Send for $${tenantContext?.tenant.subscription_tier === 'starter' ? '4' : tenantContext?.tenant.subscription_tier === 'professional' ? '3' : '2'}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentTable;