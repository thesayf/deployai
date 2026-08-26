import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector } from '@/store';
import { selectUserInfo, selectReportId } from '@/store/slices/quizSlice';
import { ModernNavBar } from '@/components/navigation/ModernNavBar';
import { SectionWrapper } from '@/components/section-wrapper';

interface ReportStatus {
  reportId: string;
  status: string;
  currentStage: string;
  progress: number;
  accessToken?: string;
  emailSent?: boolean;
  estimatedTimeRemaining?: number;
  reportUrl?: string;
  errorMessage?: string;
}

const ProcessingPage = () => {
  const router = useRouter();
  const userInfo = useAppSelector(selectUserInfo);
  const reportId = useAppSelector(selectReportId);
  const [reportStatus, setReportStatus] = useState<ReportStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Poll for report status
  useEffect(() => {
    if (!reportId) {
      console.log('No report ID found');
      return;
    }

    let pollInterval: NodeJS.Timeout;
    let pollCount = 0;
    const maxPolls = 60; // Max 5 minutes of polling (60 * 5 seconds)

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/reports/status/${reportId}`);
        
        if (!response.ok) {
          throw new Error('Failed to check status');
        }

        const status: ReportStatus = await response.json();
        setReportStatus(status);
        pollCount++;

        // Check if completed or failed
        if (status.status === 'completed') {
          console.log('Report completed!');
          clearInterval(pollInterval);
          
          // Redirect to complete page after a short delay
          setTimeout(() => {
            router.push('/ai-assessment/quiz/complete');
          }, 2000);
        } else if (status.status === 'failed') {
          console.error('Report generation failed');
          clearInterval(pollInterval);
          setError(status.errorMessage || 'Report generation failed');
        } else if (pollCount >= maxPolls) {
          console.error('Polling timeout');
          clearInterval(pollInterval);
          setError('Report generation is taking longer than expected. Please check your email.');
        }
      } catch (err) {
        console.error('Error checking status:', err);
        setError('Failed to check report status');
      }
    };

    // Initial check
    checkStatus();

    // Poll every 5 seconds
    pollInterval = setInterval(checkStatus, 5000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [reportId, router]);

  useEffect(() => {
    // Redirect if no user info
    if (!userInfo) {
      router.push('/ai-assessment');
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Generating Your Report | deployAI Studio</title>
      </Head>

      <ModernNavBar />

      <main className="min-h-screen bg-gray-50">
        <SectionWrapper variant="default" spacing="large">
          <div className="max-w-2xl mx-auto text-center">
            {/* Processing animation placeholder */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 border-4 border-black rounded-full animate-spin border-t-transparent" />
            </div>

            {error ? (
              <>
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                  Processing Error
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  {error}
                </p>
                <button
                  onClick={() => router.push('/ai-assessment')}
                  className="px-6 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4">
                  {reportStatus?.currentStage === 'analyzing' && 'Analyzing Your Business Context...'}
                  {reportStatus?.currentStage === 'curating' && 'Curating AI Tools...'}
                  {reportStatus?.currentStage === 'recommending' && 'Building Recommendations...'}
                  {reportStatus?.currentStage === 'finalizing' && 'Finalizing Your Report...'}
                  {reportStatus?.currentStage === 'completed' && 'Report Ready!'}
                  {(!reportStatus || reportStatus?.currentStage === 'pending') && 'Processing Your Assessment...'}
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                  {reportStatus?.estimatedTimeRemaining && reportStatus.estimatedTimeRemaining > 0
                    ? `Estimated time remaining: ${Math.ceil(reportStatus.estimatedTimeRemaining / 10) * 10} seconds`
                    : 'This typically takes 60-90 seconds. We\'re creating a personalized report based on your unique business needs.'}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-2 mb-8">
                  <div 
                    className="bg-black h-full transition-all duration-500 ease-out"
                    style={{ width: `${reportStatus?.progress || 0}%` }}
                  />
                </div>

                {/* Progress messages */}
                <div className="space-y-3">
                  <div className={`flex items-center justify-center space-x-2 ${
                    reportStatus?.progress && reportStatus.progress >= 25 ? 'text-black' : 'text-gray-400'
                  }`}>
                    <span className="text-2xl">📊</span>
                    <span>Analyzing business context</span>
                    {reportStatus?.progress && reportStatus.progress >= 25 && <span className="text-green-600">✓</span>}
                  </div>
                  <div className={`flex items-center justify-center space-x-2 ${
                    reportStatus?.progress && reportStatus.progress >= 50 ? 'text-black' : 'text-gray-400'
                  }`}>
                    <span className="text-2xl">🔧</span>
                    <span>Curating AI tools</span>
                    {reportStatus?.progress && reportStatus.progress >= 50 && <span className="text-green-600">✓</span>}
                  </div>
                  <div className={`flex items-center justify-center space-x-2 ${
                    reportStatus?.progress && reportStatus.progress >= 75 ? 'text-black' : 'text-gray-400'
                  }`}>
                    <span className="text-2xl">🤖</span>
                    <span>Generating recommendations</span>
                    {reportStatus?.progress && reportStatus.progress >= 75 && <span className="text-green-600">✓</span>}
                  </div>
                  <div className={`flex items-center justify-center space-x-2 ${
                    reportStatus?.progress && reportStatus.progress >= 90 ? 'text-black' : 'text-gray-400'
                  }`}>
                    <span className="text-2xl">📝</span>
                    <span>Finalizing report</span>
                    {reportStatus?.progress && reportStatus.progress >= 90 && <span className="text-green-600">✓</span>}
                  </div>
                  <div className={`flex items-center justify-center space-x-2 ${
                    reportStatus?.status === 'completed' ? 'text-black' : 'text-gray-400'
                  }`}>
                    <span className="text-2xl">📧</span>
                    <span>Sending to your email</span>
                    {reportStatus?.status === 'completed' && <span className="text-green-600">✓</span>}
                  </div>
                </div>

                {reportStatus?.status === 'completed' && (
                  <div className="mt-8 p-4 bg-green-100 border-2 border-green-600 text-green-800">
                    <p className="font-bold">Success! Your report is ready.</p>
                    <p>Redirecting to your report...</p>
                  </div>
                )}
              </>
            )}
          </div>
        </SectionWrapper>
      </main>
    </>
  );
};

export default ProcessingPage;