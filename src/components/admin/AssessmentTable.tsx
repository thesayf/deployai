import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useTenant } from '@/contexts/TenantContext';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Filter
} from 'lucide-react';

interface Assessment {
  id: string;
  user_email: string;
  user_company: string;
  user_first_name: string;
  user_last_name: string;
  industry: string;
  company_size: string;
  created_at: string;
  report?: {
    id: string;
    status: string;
    access_token: string;
    email_sent_at: string | null;
  };
}

const AssessmentTable: React.FC = () => {
  const { tenantContext } = useTenant();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'company' | 'status'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchAssessments();
  }, [page, search, statusFilter, sortBy, sortOrder, tenantContext]);

  const fetchAssessments = async () => {
    if (!tenantContext) return;

    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sortBy,
        sortOrder,
      });

      if (search) params.append('search', search);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      // Use absolute URL to ensure correct origin in all environments
      const apiUrl = `${window.location.origin}/api/admin/assessments?${params}`;
      const response = await fetch(apiUrl, {
        headers: {
          'x-tenant-subdomain': tenantContext.tenant.subdomain,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assessments');
      }

      const data = await response.json();
      setAssessments(data.assessments);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Assessments</h1>
          <p className="text-gray-600 mt-2">
            Total: {total} assessments
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex gap-2">
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
        {loading ? (
          <div className="p-8 text-center">
            <div className="text-lg font-medium text-gray-600">Loading...</div>
          </div>
        ) : assessments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 font-medium">No assessments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort('created_at')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Date {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSort('company')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Company {sortBy === 'company' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th
                    onClick={() => handleSort('status')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(assessment.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(assessment.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{assessment.user_company || 'N/A'}</p>
                        <p className="text-xs text-gray-600">
                          {assessment.industry} • {assessment.company_size}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">
                          {assessment.user_first_name} {assessment.user_last_name}
                        </p>
                        <p className="text-xs text-gray-600">{assessment.user_email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(assessment.report?.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/${tenantContext?.tenant.subdomain}/admin/assessments/${assessment.id}`}
                          className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View
                        </Link>
                        {assessment.report?.status === 'completed' && assessment.report?.access_token && (
                          <Link
                            href={`/report/view/${assessment.report.access_token}`}
                            target="_blank"
                            className="p-1 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
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
    </div>
  );
};

export default AssessmentTable;