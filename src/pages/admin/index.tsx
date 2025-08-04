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

const AdminDashboard = () => {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthAndFetchSurveys();
  }, []);

  const checkAuthAndFetchSurveys = async () => {
    try {
      // Check if authenticated
      const authResponse = await fetch('/api/admin/auth', {
        credentials: 'include'
      });
      
      if (!authResponse.ok) {
        router.push('/admin/login');
        return;
      }

      // Fetch surveys
      const surveysResponse = await fetch('/api/admin/surveys', {
        credentials: 'include'
      });
      
      if (!surveysResponse.ok) {
        if (surveysResponse.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch surveys');
      }

      const data = await surveysResponse.json();
      setSurveys(data.surveys);
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
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
              <h1 className="text-2xl font-black text-gray-900">MVP Planner Admin</h1>
              <Button onClick={handleLogout} intent="secondary" size="small">
                Logout
              </Button>
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

          {/* Stats Summary */}
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;