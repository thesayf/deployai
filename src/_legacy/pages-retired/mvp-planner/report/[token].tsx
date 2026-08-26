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
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'analyzing' | 'generating' | 'finalizing'>('analyzing');

  useEffect(() => {
    if (token) {
      fetchReport();
    }
  }, [token, retryCount]);

  // Progress bar animation
  useEffect(() => {
    if (loading) {
      const duration = 60000; // 60 seconds
      const interval = 100; // Update every 100ms
      const increment = (100 / duration) * interval;
      
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + increment, 95); // Cap at 95% until actually complete
          
          // Update stage based on progress
          if (newProgress < 30) {
            setStage('analyzing');
          } else if (newProgress < 70) {
            setStage('generating');
          } else {
            setStage('finalizing');
          }
          
          return newProgress;
        });
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [loading]);

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/mvp-planner/report/${token}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch report');
      }

      if (data.status === 'completed') {
        setReportData(data);
        setProgress(100);
        // Small delay to show 100% before transitioning
        setTimeout(() => {
          setLoading(false);
        }, 500);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white p-8 md:p-12 border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* Logo */}
            <div className="text-center mb-8">
              <img src="/logo.png" alt="deployAI" className="h-12 w-auto mx-auto" />
            </div>
            
            {/* Progress Animation */}
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                {stage === 'analyzing' && (
                  <svg className="w-20 h-20 text-blue-500" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                )}
                {stage === 'generating' && (
                  <svg className="w-20 h-20 text-orange-500 animate-pulse" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {stage === 'finalizing' && (
                  <svg className="w-20 h-20 text-green-500" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2">
                {stage === 'analyzing' && 'Analyzing Your Requirements...'}
                {stage === 'generating' && 'Generating Your Custom MVP Plan...'}
                {stage === 'finalizing' && 'Finalizing Your Blueprint...'}
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                {stage === 'analyzing' && 'Understanding your project needs and goals'}
                {stage === 'generating' && 'Creating detailed technical specifications'}
                {stage === 'finalizing' && 'Adding final touches to your plan'}
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-4 border-2 border-black">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Stage Indicators */}
            <div className="flex justify-between mb-6">
              <div className={`text-center ${stage === 'analyzing' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto mb-1 border-2 ${stage === 'analyzing' ? 'border-blue-600 bg-blue-100' : 'border-gray-300'} rounded-full flex items-center justify-center`}>
                  1
                </div>
                <span className="text-xs">Analyze</span>
              </div>
              <div className={`text-center ${stage === 'generating' ? 'text-orange-600' : stage === 'finalizing' ? 'text-gray-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto mb-1 border-2 ${stage === 'generating' ? 'border-orange-600 bg-orange-100' : stage === 'finalizing' ? 'border-gray-600' : 'border-gray-300'} rounded-full flex items-center justify-center`}>
                  2
                </div>
                <span className="text-xs">Generate</span>
              </div>
              <div className={`text-center ${stage === 'finalizing' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 mx-auto mb-1 border-2 ${stage === 'finalizing' ? 'border-green-600 bg-green-100' : 'border-gray-300'} rounded-full flex items-center justify-center`}>
                  3
                </div>
                <span className="text-xs">Finalize</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              Your personalized MVP blueprint is being created with AI precision
            </p>
          </div>
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
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Your Custom MVP Development Blueprint
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your requirements, we've created a detailed development plan and investment breakdown for {reportContent.summary.projectName}.
            </p>
          </div>

          <MVPBlueprint 
            summary={reportContent.summary}
            userCapabilities={reportContent.userCapabilities}
            investment={reportContent.investment}
            techStack={reportContent.techStack}
            timeline={reportContent.timeline}
            features={reportContent.features}
          />
          
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