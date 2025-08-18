import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '@/store';
import { 
  selectCurrentStep, 
  selectUserInfo, 
  selectQuizId,
  selectResponses,
  setCurrentStep,
  saveResponse,
  nextStep,
  previousStep
} from '@/store/slices/quizSlice';
import { ModernNavBar } from '@/components/navigation/ModernNavBar';
import { SectionWrapper } from '@/components/section-wrapper';
import { AIQuestionCard } from '@/components/ai-quiz/AIQuestionCard';
import { ProgressBar } from '@/components/progress-bar';
import { getQuestionByStep, validateResponse, calculateProgress, estimateCompletionTime } from '@/utils/quiz-helpers';
import { SaveProgressRequest } from '@/types/quiz';

const QuizStep = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { step } = router.query;
  
  const currentStep = useAppSelector(selectCurrentStep);
  const userInfo = useAppSelector(selectUserInfo);
  const quizId = useAppSelector(selectQuizId);
  const responses = useAppSelector(selectResponses);
  
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | undefined>();
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure component is hydrated before rendering
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const currentQuestion = getQuestionByStep(currentStep);
  const currentAnswer = currentQuestion 
    ? (responses as any)[currentQuestion.id]
    : undefined;
  
  // Debug logging
  useEffect(() => {
    if (currentQuestion) {
      console.log(`[QuizStep] Step ${currentStep} - Question:`, {
        id: currentQuestion.id,
        title: currentQuestion.title,
        type: currentQuestion.type,
        currentAnswer
      });
    } else {
      console.log(`[QuizStep] Step ${currentStep} - NO QUESTION FOUND!`);
    }
  }, [currentStep, currentQuestion, currentAnswer]);

  useEffect(() => {
    // Redirect to landing if no user info or quiz ID
    if ((!userInfo || !quizId) && router.isReady) {
      router.push('/ai-assessment');
      return;
    }

    // Validate quiz session is not stale (check if quizId exists in responses)
    // If we have responses but the current answer format looks wrong, clear state
    if (quizId && Object.keys(responses).length > 0) {
      // Check if any response has undefined or invalid structure
      const hasInvalidResponses = Object.values(responses).some(
        value => value === undefined || value === null || value === ''
      );
      
      if (hasInvalidResponses) {
        console.warn('Invalid quiz state detected, clearing stale data');
        // Don't reset here as it might cause infinite loop
        // Just log the issue for debugging
      }
    }

    // Sync URL step with Redux state
    if (step && typeof step === 'string') {
      const stepNumber = parseInt(step, 10);
      if (!isNaN(stepNumber) && stepNumber >= 1 && stepNumber <= 13) {
        if (stepNumber !== currentStep) {
          dispatch(setCurrentStep(stepNumber));
        }
      } else {
        // Invalid step, redirect to current step
        router.push(`/ai-assessment/quiz/${currentStep}`);
      }
    }
  }, [step, currentStep, userInfo, quizId, router, dispatch, responses]);

  // Clear validation error when step changes
  useEffect(() => {
    setValidationError(undefined);
  }, [currentStep]);

  const saveProgress = async (questionId: string, answer: any) => {
    if (!quizId) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/quiz/save-progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId,
          questionId,
          answer
        } as SaveProgressRequest),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save progress');
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
      // Continue anyway - we save in localStorage too
    } finally {
      setSaving(false);
    }
  };

  const handleAnswer = async (answer: any) => {
    if (!currentQuestion) return;
    
    // Check if this is a change to an existing answer
    const isChangingAnswer = currentAnswer !== undefined && currentAnswer !== answer;
    
    // Update Redux state immediately
    dispatch(saveResponse({ questionId: currentQuestion.id, answer }));
    
    // Clear validation error when user answers
    setValidationError(undefined);
    
    // Auto-advance for single-select questions
    if (currentQuestion.type === 'single-select' && currentStep < 13) {
      if (isChangingAnswer) {
        // Small delay to show visual feedback when changing answer
        setTimeout(() => {
          dispatch(nextStep());
          router.push(`/ai-assessment/quiz/${currentStep + 1}`);
        }, 150);
      } else {
        // Navigate immediately for first-time answers
        dispatch(nextStep());
        router.push(`/ai-assessment/quiz/${currentStep + 1}`);
      }
    }
    
    // Save to backend asynchronously (don't await)
    saveProgress(currentQuestion.id, answer);
  };

  const handleNext = async () => {
    if (!currentQuestion) return;
    
    // Validate current answer
    const validation = validateResponse(currentQuestion.id, currentAnswer);
    if (!validation.valid) {
      setValidationError(validation.error);
      return;
    }
    
    // Save current answer if not already saved
    if (currentAnswer !== undefined && currentAnswer !== null) {
      await saveProgress(currentQuestion.id, currentAnswer);
    }
    
    if (currentStep === 13) {
      // Last question - go to complete page
      router.push('/ai-assessment/quiz/complete');
    } else {
      dispatch(nextStep());
      router.push(`/ai-assessment/quiz/${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch(previousStep());
      router.push(`/ai-assessment/quiz/${currentStep - 1}`);
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        // Only trigger if validation passes
        const isValid = currentQuestion && currentAnswer !== undefined && currentAnswer !== null
          ? validateResponse(currentQuestion.id, currentAnswer).valid
          : false;
        if (isValid) {
          event.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, currentAnswer, currentStep]);

  // Wait for hydration to avoid mismatch
  if (!isHydrated) {
    return null;
  }

  if (!userInfo || !quizId || !currentQuestion) {
    return null; // Will redirect
  }

  const progress = calculateProgress(currentStep);
  const timeRemaining = estimateCompletionTime(currentStep);

  // Check if current answer is valid (or if question is optional)
  const isCurrentAnswerValid = currentQuestion 
    ? validateResponse(currentQuestion.id, currentAnswer).valid
    : false;

  return (
    <>
      <Head>
        <title>Question {currentStep} of 13 | AI Readiness Assessment</title>
      </Head>

      <main className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Top section with logo/brand */}
        <div className="bg-[#457B9D] h-24 flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="deployAI" className="h-10 w-auto filter brightness-0 invert" />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col px-4 py-4 min-h-0 overflow-hidden">
          <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Question - standardized height for up to 2 lines */}
            <div className="min-h-[4.5rem] md:min-h-[6rem] mb-6 flex items-center justify-center flex-shrink-0">
              <h1 className="text-3xl md:text-4xl text-gray-800 text-center">
                {currentQuestion.title}
              </h1>
            </div>
            
            {/* Question card with scrollable content area */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <AIQuestionCard
                question={currentQuestion}
                currentAnswer={currentAnswer}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentStep === 1}
                isLast={currentStep === 13}
                isValid={isCurrentAnswerValid}
                validationError={validationError}
                allResponses={responses}
              />
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="bg-gray-100 px-4 py-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{progress}% Complete</span>
              <span className="text-xs text-gray-500">Powered by deployAI</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-[#457B9D] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default QuizStep;