import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '@/store';
import { selectCurrentStep, selectUserInfo, setCurrentStep } from '@/store/slices/quizSlice';
import { ModernNavBar } from '@/components/navigation/ModernNavBar';
import { SectionWrapper } from '@/components/section-wrapper';

const QuizStep = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { step } = router.query;
  
  const currentStep = useAppSelector(selectCurrentStep);
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    // Redirect to landing if no user info
    if (!userInfo && router.isReady) {
      router.push('/ai-assessment');
      return;
    }

    // Sync URL step with Redux state
    if (step && typeof step === 'string') {
      const stepNumber = parseInt(step, 10);
      if (!isNaN(stepNumber) && stepNumber >= 1 && stepNumber <= 14) {
        if (stepNumber !== currentStep) {
          dispatch(setCurrentStep(stepNumber));
        }
      } else {
        // Invalid step, redirect to current step
        router.push(`/ai-assessment/quiz/${currentStep}`);
      }
    }
  }, [step, currentStep, userInfo, router, dispatch]);

  if (!userInfo) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Question {currentStep} of 14 | AI Readiness Assessment</title>
      </Head>

      <ModernNavBar />

      <main className="min-h-screen bg-gray-50">
        <SectionWrapper variant="default" spacing="medium">
          <div className="max-w-3xl mx-auto">
            {/* Progress bar will go here */}
            <div className="mb-8">
              <div className="bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 14) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Question {currentStep} of 14
              </p>
            </div>

            {/* Question card will go here */}
            <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
              <h2 className="text-2xl font-bold mb-4">
                Question {currentStep} placeholder
              </h2>
              <p className="text-gray-600">
                Question content will be displayed here...
              </p>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
};

export default QuizStep;