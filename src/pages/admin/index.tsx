import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@/components/shared/Button';

interface Survey {
  id: string;
  projectName: string;
  userName: string;
  email: string;
  platform: string;
  targetUser: string;
  projectDescription: string;
  packageType: string;
  status: string;
  reportToken: string | null;
  completedAt: string | null;
  createdAt: string;
}

interface Assessment {
  id: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userName: string;
  company: string;
  industry: string;
  status: string;
  reportId: string | null;
  accessToken: string | null;
  emailSent: boolean;
  createdAt: string;
  reportCreatedAt: string | null;
  reportUpdatedAt: string | null;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'mvp' | 'ai'>('mvp');
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      // Check if authenticated
      const authResponse = await fetch('/api/admin/auth', {
        credentials: 'include'
      });
      
      if (!authResponse.ok) {
        router.push('/admin/login');
        return;
      }

      // Fetch both surveys and assessments
      const [surveysResponse, assessmentsResponse] = await Promise.all([
        fetch('/api/admin/surveys', { credentials: 'include' }),
        fetch('/api/admin/assessments', { credentials: 'include' })
      ]);
      
      if (!surveysResponse.ok) {
        if (surveysResponse.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch surveys');
      }

      const surveysData = await surveysResponse.json();
      setSurveys(surveysData.surveys);

      // Assessments might fail if table doesn't exist yet, but don't break the page
      if (assessmentsResponse.ok) {
        const assessmentsData = await assessmentsResponse.json();
        console.log('[ADMIN] Assessments data received:', assessmentsData);
        setAssessments(assessmentsData.assessments);
      } else {
        console.error('[ADMIN] Failed to fetch assessments:', assessmentsResponse.status, await assessmentsResponse.text());
      }
    } catch (err) {
      setError('Failed to load surveys');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleViewReport = (reportToken: string | null) => {
    if (reportToken) {
      window.open(`/mvp-planner/report/${reportToken}`, '_blank');
    }
  };

  const handleViewAIReport = (accessToken: string | null) => {
    if (accessToken) {
      window.open(`/report/view/${accessToken}`, '_blank');
    }
  };

  const copyReportLink = (accessToken: string) => {
    const url = `${window.location.origin}/report/view/${accessToken}`;
    navigator.clipboard.writeText(url);
    // Could add a toast notification here
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'generating':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter assessments based on search and status
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = searchTerm === '' || 
      assessment.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | deployAI</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b-3 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
              <Button onClick={handleLogout} intent="secondary" size="small">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('mvp')}
                className={`py-4 px-1 border-b-3 font-bold transition-colors ${
                  activeTab === 'mvp'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                MVP Planner
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`py-4 px-1 border-b-3 font-bold transition-colors ${
                  activeTab === 'ai'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                AI Assessments
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-300 text-red-800 p-4">
              {error}
            </div>
          )}

          {activeTab === 'mvp' ? (
            // MVP Planner Section
            <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Survey Submissions</h2>
                <div className="text-sm text-gray-600">
                  Total: {surveys.length} submissions
                </div>
              </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left p-3 font-bold">Date</th>
                    <th className="text-left p-3 font-bold">Project</th>
                    <th className="text-left p-3 font-bold">User</th>
                    <th className="text-left p-3 font-bold">Platform</th>
                    <th className="text-left p-3 font-bold">Package</th>
                    <th className="text-left p-3 font-bold">Status</th>
                    <th className="text-left p-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey, index) => (
                    <tr
                      key={survey.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-3 text-sm">
                        {formatDate(survey.createdAt)}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold">{survey.projectName}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">
                          {survey.projectDescription}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm font-medium">{survey.userName}</div>
                        <div className="text-sm text-gray-600">{survey.email}</div>
                      </td>
                      <td className="p-3 text-sm">{survey.platform}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs font-bold border-2 border-black ${
                          survey.packageType.includes('Extended') ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          {survey.packageType}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(survey.status)}`}>
                          {survey.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button
                          onClick={() => handleViewReport(survey.reportToken)}
                          intent="primary"
                          size="small"
                          disabled={!survey.reportToken}
                        >
                          View Report
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {surveys.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No surveys submitted yet
                </div>
              )}
            </div>
          </div>
          ) : (
            // AI Assessments Section
            <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">AI Assessment Submissions</h2>
                  <div className="text-sm text-gray-600">
                    Total: {assessments.length} submissions
                  </div>
                </div>
                
                {/* Search and Filter Bar */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search by company, name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 focus:border-black outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left p-3 font-bold">Date</th>
                      <th className="text-left p-3 font-bold">Company</th>
                      <th className="text-left p-3 font-bold">User</th>
                      <th className="text-left p-3 font-bold">Email</th>
                      <th className="text-left p-3 font-bold">Industry</th>
                      <th className="text-left p-3 font-bold">Status</th>
                      <th className="text-left p-3 font-bold">Report Link</th>
                      <th className="text-left p-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssessments.map((assessment, index) => (
                      <tr
                        key={assessment.id}
                        className={`border-b border-gray-200 hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="p-3 text-sm">
                          {formatDate(assessment.createdAt)}
                        </td>
                        <td className="p-3">
                          <div className="font-semibold">{assessment.company}</div>
                        </td>
                        <td className="p-3 text-sm">{assessment.userName}</td>
                        <td className="p-3">
                          <a href={`mailto:${assessment.userEmail}`} className="text-sm text-blue-600 hover:underline">
                            {assessment.userEmail}
                          </a>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="truncate max-w-xs" title={assessment.industry}>
                            {assessment.industry}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(assessment.status)}`}>
                            {assessment.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {assessment.accessToken && (
                            <button
                              onClick={() => copyReportLink(assessment.accessToken!)}
                              className="text-gray-600 hover:text-black"
                              title="Copy report link"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          )}
                        </td>
                        <td className="p-3">
                          <Button
                            onClick={() => handleViewAIReport(assessment.accessToken)}
                            intent="primary"
                            size="small"
                            disabled={!assessment.accessToken || assessment.status !== 'completed'}
                          >
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAssessments.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'No assessments match your filters' 
                      : 'No assessments submitted yet'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Summary */}
          {activeTab === 'mvp' ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Standard MVPs</h3>
                <div className="text-3xl font-black text-blue-600">
                  {surveys.filter(s => s.packageType.includes('Standard')).length}
                </div>
              </div>
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Extended MVPs</h3>
                <div className="text-3xl font-black text-purple-600">
                  {surveys.filter(s => s.packageType.includes('Extended')).length}
                </div>
              </div>
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Completion Rate</h3>
                <div className="text-3xl font-black text-green-600">
                  {surveys.length > 0 
                    ? Math.round((surveys.filter(s => s.status === 'completed').length / surveys.length) * 100)
                    : 0}%
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Completed Reports</h3>
                <div className="text-3xl font-black text-green-600">
                  {assessments.filter(a => a.status === 'completed').length}
                </div>
              </div>
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Processing</h3>
                <div className="text-3xl font-black text-yellow-600">
                  {assessments.filter(a => a.status === 'processing').length}
                </div>
              </div>
              <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-2">Success Rate</h3>
                <div className="text-3xl font-black text-blue-600">
                  {assessments.length > 0 
                    ? Math.round((assessments.filter(a => a.status === 'completed').length / assessments.length) * 100)
                    : 0}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;