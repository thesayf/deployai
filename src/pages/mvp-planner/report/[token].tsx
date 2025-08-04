import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Footer } from '@/components/footer/Footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { MVPBlueprint } from '@/components/mvp-blueprint';
import { Button } from '@/components/shared/Button';

const MVPPlannerReport = () => {
  const router = useRouter();
  const { token } = router.query;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (token) {
      fetchReport();
    }
  }, [token, retryCount]);

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/mvp-planner/report/${token}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch report');
      }

      if (data.status === 'completed') {
        setReportData(data);
        setLoading(false);
      } else if (data.status === 'failed') {
        setError(data.error || 'Report generation failed');
        setLoading(false);
      } else {
        // Report is still generating, retry after delay
        if (retryCount < 30) { // Max 30 retries (2.5 minutes)
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 5000); // Retry every 5 seconds
        } else {
          setError('Report generation is taking too long. Please try again later.');
          setLoading(false);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Generating your MVP plan...</p>
          <p className="text-sm text-gray-500">This usually takes 30-60 seconds</p>
        </div>
      </div>
    );
  }

  if (error || (!reportData && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'This report may have expired or been removed.'}</p>
          <Button onClick={() => router.push('/mvp-planner')} intent="primary">
            Start New Assessment
          </Button>
        </div>
      </div>
    );
  }

  // Use AI-generated content
  const reportContent = reportData?.content;

  // Check if report content exists and has required data
  if (!reportContent || !reportContent.summary) {
    // Check if it's a validation error
    if (reportContent?.error === true && reportContent?.validationType === 'input_validation') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-2xl w-full mx-4">
            <div className="bg-white p-8 border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6">
                <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-4 text-center uppercase">Input Validation Failed</h1>
              <p className="text-lg text-gray-700 mb-6 text-center">{reportContent.message}</p>
              
              {reportContent.issues && reportContent.issues.length > 0 && (
                <div className="bg-gray-100 p-4 border-2 border-gray-300 mb-6">
                  <h2 className="font-bold text-gray-900 mb-2">Issues Found:</h2>
                  <ul className="list-disc list-inside space-y-1">
                    {reportContent.issues.map((issue: string, index: number) => (
                      <li key={index} className="text-gray-700">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button 
                  onClick={() => window.history.back()} 
                  intent="primary"
                  className="px-8 py-3"
                >
                  Go Back and Fix Issues
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Default loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-yellow-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Still Generating</h1>
          <p className="text-gray-600 mb-4">Your report is being generated. Please refresh the page in a few moments.</p>
          <Button onClick={() => window.location.reload()} intent="primary">
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>{reportContent.summary?.projectName || 'MVP Development Plan'} - deployAI Studio</title>
        <link rel="stylesheet" href="/styles/print.css" />
      </Head>

      {/* Header */}
      <div className="bg-[#212121] py-8 print:hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <img
              src="/logo.png"
              alt="deployAI studio"
              className="h-16 w-auto brightness-0 invert"
            />
            <Button onClick={handlePrint} intent="secondary" size="medium">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Report
            </Button>
          </div>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50">
        <SectionWrapper variant="default" spacing="large">
          <MVPBlueprint 
            summary={reportContent.summary}
            userCapabilities={reportContent.userCapabilities}
            investment={reportContent.investment}
            techStack={reportContent.techStack}
            timeline={reportContent.timeline}
            features={reportContent.features}
          />
          
          {/* Tech Stack Rationale */}
          {reportContent.techStack.stackRationale && (
            <div className="mt-8 p-6 bg-blue-50 border-3 border-black">
              <h3 className="text-xl font-bold mb-3">Why This Tech Stack?</h3>
              <p className="text-gray-700">{reportContent.techStack.stackRationale}</p>
            </div>
          )}
          
          
          {/* Next Steps CTA */}
          <div className="mt-12 p-8 bg-[#212121] text-white text-center print:hidden">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your MVP?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let's turn this plan into reality. Schedule a free consultation to discuss your project.
            </p>
            <Button 
              onClick={() => window.location.href = 'mailto:hello@deployai.studio?subject=MVP Development Inquiry'} 
              intent="primary"
              size="large"
              className="!bg-[#F97316] !border-white"
            >
              Schedule Consultation
            </Button>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
};

export default MVPPlannerReport;