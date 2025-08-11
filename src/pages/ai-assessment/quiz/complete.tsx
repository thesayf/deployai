import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '@/store';
import { 
  selectQuizId,
  selectResponses,
  selectUserInfo,
  resetQuiz,
  setSubmitting
} from '@/store/slices/quizSlice';
import { CompleteAnimation } from '@/components/quiz/CompleteAnimation';
import { SubmitQuizRequest } from '@/types/quiz';

type PageState = 'loading' | 'submitting' | 'success' | 'error';

const CompletePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Get Redux data - these will be captured by useState on first render
  const quizId = useAppSelector(selectQuizId);
  const responses = useAppSelector(selectResponses);
  const userInfo = useAppSelector(selectUserInfo);
  
  // Capture Redux data immediately on mount
  const [initialData] = useState(() => {
    // Store the initial values from first render
    return { quizId, responses, userInfo };
  });
  
  // Local state for page behavior
  const [pageState, setPageState] = useState<PageState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  
  // Use a ref to track if submission has already started
  // This prevents double submission in React StrictMode
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    console.log('[COMPLETE] useEffect triggered');
    console.log('[COMPLETE] hasSubmittedRef.current:', hasSubmittedRef.current);
    
    // Check if we have valid data and submit
    if (!initialData.quizId || !initialData.userInfo) {
      console.log('[COMPLETE] No valid data, redirecting to start');
      // No valid data, redirect to start
      router.push('/ai-assessment');
      return;
    }
    
    // Prevent double submission in StrictMode
    if (hasSubmittedRef.current) {
      console.log('[COMPLETE] DUPLICATE PREVENTED: Submission already in progress, skipping duplicate');
      return;
    }
    
    // Mark as submitted and proceed
    console.log('[COMPLETE] First submission, proceeding...');
    hasSubmittedRef.current = true;
    submitQuiz();
  }, []); // Run once on mount

  const submitQuiz = async () => {
    console.log(`[COMPLETE] Starting quiz submission for quiz ID: ${initialData.quizId}`);
    console.log('[COMPLETE] Quiz data:', {
      quizId: initialData.quizId,
      hasResponses: !!initialData.responses,
      hasUserInfo: !!initialData.userInfo,
    });
    
    setPageState('submitting');
    setError(null);

    try {
      // Submit quiz using captured initial data
      console.log('[COMPLETE] Making API call to /api/quiz/submit...');
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: initialData.quizId,
          finalResponses: initialData.responses
        } as SubmitQuizRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quiz');
      }

      setReportId(data.reportId);
      
      // IMMEDIATELY clear Redux after successful submission
      // This prevents stale data if user closes the page
      dispatch(resetQuiz());
      
      // Send confirmation email
      try {
        await fetch('/api/quiz/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: initialData.quizId,
            reportId: data.reportId,
            userEmail: initialData.userInfo?.email || '',
            firstName: initialData.userInfo?.firstName || '',
            lastName: initialData.userInfo?.lastName || '',
            company: initialData.userInfo?.company || ''
          }),
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the whole process if email fails
      }
      
      setPageState('success');
      
      // Start polling for report completion
      startReportPolling(data.reportId, initialData.userInfo);

    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit quiz');
      setPageState('error');
    }
  };

  // Poll for report completion and send email when ready
  const startReportPolling = (reportId: string, userInfo: any) => {
    const maxAttempts = 60; // 5 minutes max (60 * 5 seconds)
    let attempts = 0;
    
    const pollInterval = setInterval(async () => {
      attempts++;
      
      try {
        // Check report status
        const statusResponse = await fetch('/api/reports/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportId }),
        });
        
        if (!statusResponse.ok) {
          console.error('Failed to check report status');
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
          }
          return;
        }
        
        const statusData = await statusResponse.json();
        console.log('Report status:', statusData.status);
        
        // If report is complete, send the email
        if (statusData.status === 'completed' && !statusData.emailSent) {
          console.log('Report complete, sending email...');
          clearInterval(pollInterval);
          
          // Send report ready email
          const emailResponse = await fetch('/api/reports/send-report-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reportId,
              userEmail: userInfo?.email || '',
              firstName: userInfo?.firstName || '',
              lastName: userInfo?.lastName || '',
              company: userInfo?.company || ''
            }),
          });
          
          if (emailResponse.ok) {
            console.log('Report email sent successfully');
          } else {
            console.error('Failed to send report email');
          }
        }
        
        // Stop polling after max attempts
        if (attempts >= maxAttempts) {
          console.log('Max polling attempts reached');
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Error polling for report:', error);
        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  // Render based on page state, not Redux
  if (pageState === 'loading') {
    return null; // Will redirect if no data
  }

  return (
    <>
      <Head>
        <title>Assessment Complete | AI Readiness Assessment</title>
      </Head>

      <main className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Top section with logo/brand */}
        <div className="bg-[#457B9D] h-24 flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="deployAI" className="h-10 w-auto filter brightness-0 invert" />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white border border-gray-300 rounded-lg p-8 text-center">
              
              {pageState === 'submitting' && (
                <>
                  <div className="w-16 h-16 mx-auto mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#457B9D]"></div>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Processing your assessment...
                  </h2>
                  <p className="text-gray-600">
                    Please wait while we submit your responses.
                  </p>
                </>
              )}
              
              {pageState === 'error' && (
                <>
                  <div className="w-16 h-16 mx-auto mb-6 text-red-500">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Something went wrong
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {error}
                  </p>
                  <button
                    onClick={() => submitQuiz()}
                    className="bg-[#457B9D] text-white px-6 py-3 rounded-lg hover:bg-[#3a6a89] transition-colors"
                  >
                    Try Again
                  </button>
                </>
              )}
              
              {pageState === 'success' && (
                <>
                  <CompleteAnimation />
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Complete!
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Your AI readiness report is being generated and will be sent to:
                  </p>
                  <p className="font-semibold text-gray-800 mb-4">
                    {initialData.userInfo?.email}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    You should receive it within 5-10 minutes. You can safely close this page.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/')}
                      className="w-full bg-[#457B9D] text-white px-6 py-3 rounded-lg hover:bg-[#3a6a89] transition-colors"
                    >
                      Return to Homepage
                    </button>
                    <button
                      onClick={() => router.push('/ai-assessment')}
                      className="w-full bg-white text-[#457B9D] border border-[#457B9D] px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Take Another Assessment
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="bg-gray-100 px-4 py-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{pageState === 'success' ? '100% Complete' : 'Processing...'}</span>
              <span className="text-xs text-gray-500">Powered by deployAI</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#457B9D] h-2 rounded-full transition-all duration-300"
                style={{ width: pageState === 'success' ? '100%' : '95%' }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompletePage;