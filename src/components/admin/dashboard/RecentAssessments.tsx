import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface Assessment {
  id: string;
  user_email: string;
  user_company: string;
  user_first_name: string;
  user_last_name: string;
  created_at: string;
  report?: {
    id: string;
    status: string;
    access_token: string;
  };
}

interface RecentAssessmentsProps {
  assessments: Assessment[];
  tenantSubdomain: string;
}

const RecentAssessments: React.FC<RecentAssessmentsProps> = ({ assessments, tenantSubdomain }) => {
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

  if (assessments.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Assessments</h2>
          <div className="text-center py-8">
            <p className="text-gray-600 font-medium">No assessments yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Share your assessment link to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Assessments</h2>
          <Link
            href={`/${tenantSubdomain}/admin/assessments`}
            className="flex items-center gap-2 font-medium text-sm text-blue-600 hover:text-blue-800"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-gray-900">
                      {assessment.user_company || 'Unknown Company'}
                    </p>
                    {getStatusBadge(assessment.report?.status)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {assessment.user_first_name} {assessment.user_last_name} • {assessment.user_email}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(assessment.created_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {assessment.report?.status === 'completed' && assessment.report?.access_token && (
                    <Link
                      href={`/report/view/${assessment.report.access_token}`}
                      target="_blank"
                      className="p-2 border border-gray-200 bg-white rounded hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  )}
                  <Link
                    href={`/${tenantSubdomain}/admin/assessments/${assessment.id}`}
                    className="p-2 border border-gray-200 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAssessments;