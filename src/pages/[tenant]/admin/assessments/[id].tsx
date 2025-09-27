import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getTenantFromRequest } from '@/utils/tenant-helpers';
import { useTenant } from '@/contexts/TenantContext';
import { ArrowLeft, ExternalLink, Clock } from 'lucide-react';

const AdminAssessmentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tenantContext } = useTenant();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchAssessment(id);
    }
  }, [id]);

  const fetchAssessment = async (assessmentId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/assessments/${assessmentId}`);

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
              <p className="text-gray-600 mt-1">ID: {assessment.id}</p>
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

        {/* Status Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Report Status</h2>
          <div className="flex items-center gap-4">
            {getStatusBadge(assessment.report?.status)}
            {assessment.report?.email_sent_at && (
              <p className="text-sm text-gray-600">
                Email sent: {new Date(assessment.report.email_sent_at).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="font-medium text-gray-900">
                {assessment.user_first_name} {assessment.user_last_name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{assessment.user_email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Company</p>
              <p className="font-medium text-gray-900">{assessment.user_company || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Industry</p>
              <p className="font-medium text-gray-900">{assessment.industry || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Company Size</p>
              <p className="font-medium text-gray-900">{assessment.company_size || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Submitted</p>
              <p className="font-medium text-gray-900">
                {new Date(assessment.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Responses */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Assessment Responses</h2>
          <div className="space-y-4">
            {assessment.responses && Object.entries(assessment.responses).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-3">
                <p className="text-sm font-medium text-gray-500">{key}</p>
                <p className="font-bold mt-1">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Timeline</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="font-medium text-gray-900">{new Date(assessment.created_at).toLocaleString()}</p>
              </div>
            </div>
            {assessment.completed_at && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="font-medium text-gray-900">{new Date(assessment.completed_at).toLocaleString()}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">{new Date(assessment.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tenantContext = await getTenantFromRequest(context.req);

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