import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '@/store';
import { 
  selectQuizId,
  selectResponses,
  selectUserInfo,
  resetQuiz,
  selectIsSubmitting,
  setSubmitting
} from '@/store/slices/quizSlice';
import { CompleteAnimation } from '@/components/quiz/CompleteAnimation';
import { SubmitQuizRequest } from '@/types/quiz';

const CompletePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const quizId = useAppSelector(selectQuizId);
  const responses = useAppSelector(selectResponses);
  const userInfo = useAppSelector(selectUserInfo);
  const isSubmitting = useAppSelector(selectIsSubmitting);
  
  const [isHydrated, setIsHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedUserInfo] = useState(userInfo); // Save user info before it gets cleared

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Redirect if no quiz data (use savedUserInfo for initial check)
    if (isHydrated && (!savedUserInfo || !quizId)) {
      router.push('/ai-assessment');
      return;
    }

    // Submit quiz if not already submitted
    if (isHydrated && savedUserInfo && quizId && !submitted && !isSubmitting) {
      submitQuiz();
    }
  }, [isHydrated, savedUserInfo, quizId, submitted, isSubmitting]);

  const submitQuiz = async () => {
    if (!quizId || isSubmitting) return;

    dispatch(setSubmitting(true));
    setError(null);

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId,
          finalResponses: responses
        } as SubmitQuizRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quiz');
      }

      setSubmitted(true);
      
      // Send confirmation email (use savedUserInfo since we're about to clear the store)
      try {
        await fetch('/api/quiz/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId,
            reportId: data.reportId,
            userEmail: savedUserInfo?.email || userInfo.email,
            firstName: savedUserInfo?.firstName || userInfo.firstName,
            lastName: savedUserInfo?.lastName || userInfo.lastName,
            company: savedUserInfo?.company || userInfo.company
          }),
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the whole process if email fails
      }
      
      // Clear quiz responses after successful submission
      // This ensures user data is not retained unnecessarily
      // Do this AFTER sending the email
      dispatch(resetQuiz());

    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit quiz');
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  if (!isHydrated) {
    return null;
  }

  // Use savedUserInfo for the check since userInfo gets cleared after submission
  if (!savedUserInfo || !quizId) {
    if (!submitted) {
      return null; // Will redirect only if not submitted
    }
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
              {error ? (
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
                    onClick={() => {
                      setError(null);
                      setSubmitted(false);
                      submitQuiz();
                    }}
                    className="bg-[#457B9D] text-white px-6 py-3 rounded-lg hover:bg-[#3a6a89] transition-colors"
                  >
                    Try Again
                  </button>
                </>
              ) : isSubmitting ? (
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
              ) : (
                <>
                  <CompleteAnimation />
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Complete!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We are generating your report and will send it to your email when it is ready. You may close this page.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/')}
                      className="w-full bg-[#457B9D] text-white px-6 py-3 rounded-lg hover:bg-[#3a6a89] transition-colors"
                    >
                      Return to Homepage
                    </button>
                    <button
                      onClick={() => {
                        // Quiz already reset after successful submission
                        router.push('/ai-assessment');
                      }}
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

        {/* Bottom progress bar - always at 100% */}
        <div className="bg-gray-100 px-4 py-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>100% Complete</span>
              <span className="text-xs text-gray-500">Powered by deployAI</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#457B9D] h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompletePage;