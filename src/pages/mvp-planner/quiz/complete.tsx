import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '@/store';
import { 
  selectUserInfo, 
  selectQuizId, 
  selectResponses,
  selectTotalScore,
  setSubmitting,
  setProcessingStage,
  setReportId,
  setError,
  resetQuiz
} from '@/store/slices/mvpPlannerSlice';
import { CompleteAnimation } from '@/components/quiz/CompleteAnimation';
import { Button } from '@/components/shared/Button';
import { SubmitMVPPlannerRequest } from '@/types/mvp-planner';

const MVPPlannerComplete = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const userInfo = useAppSelector(selectUserInfo);
  const quizId = useAppSelector(selectQuizId);
  const responses = useAppSelector(selectResponses);
  const totalScore = useAppSelector(selectTotalScore);
  const processingStage = useAppSelector(state => state.mvpPlanner.processingStage);
  const error = useAppSelector(state => state.mvpPlanner.error);
  
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Redirect if no user info or quiz data
    if (!userInfo || !quizId || Object.keys(responses).length === 0) {
      router.push('/mvp-planner');
      return;
    }

    // Auto-submit when page loads
    if (!submitted && processingStage === null) {
      handleSubmit();
    }
  }, [userInfo, quizId, responses, submitted, processingStage]);

  const handleSubmit = async () => {
    if (submitted) return;
    
    setSubmitted(true);
    dispatch(setSubmitting(true));
    dispatch(setProcessingStage('submitting'));
    
    try {
      const response = await fetch('/api/mvp-planner/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId,
          responses,
          totalScore
        } as SubmitMVPPlannerRequest),
      });

      const result = await response.json();

      if (result.success) {
        dispatch(setReportId(result.reportId));
        dispatch(setProcessingStage('generating'));
        
        // Simulate processing time
        setTimeout(() => {
          dispatch(setProcessingStage('complete'));
        }, 2000);
        
        // Redirect to report after a delay
        setTimeout(() => {
          router.push(`/mvp-planner/report/${result.accessToken}`);
        }, 3500);
      } else {
        throw new Error(result.error || 'Failed to submit assessment');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
      dispatch(setProcessingStage(null));
      dispatch(setSubmitting(false));
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    dispatch(setError(null));
    dispatch(setProcessingStage(null));
    handleSubmit();
  };

  const handleStartOver = () => {
    dispatch(resetQuiz());
    router.push('/mvp-planner');
  };

  if (!userInfo || !quizId) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Completing Your MVP Plan | deployAI Studio</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
            {/* Logo */}
            <img src="/logo.png" alt="deployAI" className="h-12 w-auto mx-auto mb-8" />
            
            {/* Conditional content based on state */}
            {error ? (
              <>
                <div className="mb-8">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
                  <p className="text-lg text-gray-600 mb-2">{error}</p>
                  <p className="text-gray-500">Don't worry, your answers have been saved.</p>
                </div>
                
                <div className="space-y-3">
                  <Button onClick={handleRetry} size="large" intent="primary" className="w-full">
                    Try Again
                  </Button>
                  <Button onClick={handleStartOver} size="large" intent="secondary" className="w-full">
                    Start Over
                  </Button>
                </div>
              </>
            ) : (
              <>
                <CompleteAnimation stage={processingStage || 'submitting'} />
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {processingStage === 'complete' ? 'Your MVP Plan is Ready!' : 'Creating Your MVP Plan...'}
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  {processingStage === 'submitting' && 'Analyzing your project requirements...'}
                  {processingStage === 'generating' && 'Generating personalized recommendations...'}
                  {processingStage === 'complete' && `Great work, ${userInfo.firstName}! Your custom MVP development plan is ready.`}
                </p>
                
                {processingStage === 'complete' && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <p className="text-gray-700">
                      You'll be redirected to your plan in a moment...
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default MVPPlannerComplete;