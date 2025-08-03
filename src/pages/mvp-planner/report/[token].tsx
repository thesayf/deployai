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
          />
          
          {/* Tech Stack Rationale */}
          {reportContent.techStack.stackRationale && (
            <div className="mt-8 p-6 bg-blue-50 border-3 border-black">
              <h3 className="text-xl font-bold mb-3">Why This Tech Stack?</h3>
              <p className="text-gray-700">{reportContent.techStack.stackRationale}</p>
            </div>
          )}
          
          {/* Features Breakdown */}
          {reportContent.features && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Feature Details</h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4">Core Features (Included in Base Package)</h4>
                <div className="space-y-3">
                  {reportContent.features.core.map((feature: any, index: number) => (
                    <div key={index} className="p-4 bg-white border-3 border-black">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-bold">{feature.name}</h5>
                          <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                        </div>
                        <span className={`ml-4 px-3 py-1 text-xs font-bold uppercase ${
                          feature.complexity === 'simple' ? 'bg-green-200' :
                          feature.complexity === 'complex' ? 'bg-red-200' : 'bg-yellow-200'
                        }`}>
                          {feature.complexity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {reportContent.features.additional.length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold mb-4">Additional Features</h4>
                  <div className="space-y-3">
                    {reportContent.features.additional.map((feature: any, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 border-3 border-black">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-bold">{feature.name}</h5>
                            <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <span className={`px-3 py-1 text-xs font-bold uppercase ${
                              feature.complexity === 'simple' ? 'bg-green-200' :
                              feature.complexity === 'complex' ? 'bg-red-200' : 'bg-yellow-200'
                            }`}>
                              {feature.complexity}
                            </span>
                            <p className="text-sm font-bold mt-2">+$3,333</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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