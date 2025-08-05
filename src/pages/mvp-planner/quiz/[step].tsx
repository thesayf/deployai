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
} from '@/store/slices/mvpPlannerSlice';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { SaveMVPPlannerProgressRequest } from '@/types/mvp-planner';
import mvpPlannerQuestions from '@/data/mvp-planner-questions.json';

const MVPPlannerQuizStep = () => {
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

  // Get total questions count
  const totalQuestions = mvpPlannerQuestions.questions.length;

  // Ensure component is hydrated before rendering
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const currentQuestion = mvpPlannerQuestions.questions.find(q => q.questionNumber === currentStep) as any;
  const currentAnswer = currentQuestion ? responses[currentQuestion.id] : undefined;

  useEffect(() => {
    // Redirect to landing if no user info or quiz ID
    if ((!userInfo || !quizId) && router.isReady) {
      router.push('/mvp-planner');
      return;
    }

    // Sync URL step with Redux state
    if (step && typeof step === 'string') {
      const stepNumber = parseInt(step, 10);
      if (!isNaN(stepNumber) && stepNumber >= 1 && stepNumber <= totalQuestions) {
        if (stepNumber !== currentStep) {
          dispatch(setCurrentStep(stepNumber));
        }
      } else {
        // Invalid step, redirect to current step
        router.push(`/mvp-planner/quiz/${currentStep}`);
      }
    }
  }, [step, currentStep, userInfo, quizId, router, dispatch, totalQuestions]);

  // Clear validation error when step changes
  useEffect(() => {
    setValidationError(undefined);
  }, [currentStep]);

  const saveProgress = async (questionId: string, answer: any) => {
    if (!quizId) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/mvp-planner/save-progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId,
          questionId,
          answer
        } as SaveMVPPlannerProgressRequest),
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
    
    // Update Redux state
    dispatch(saveResponse({ questionId: currentQuestion.id, answer }));
    
    // Save to backend
    await saveProgress(currentQuestion.id, answer);
    
    // Clear validation error when user answers
    setValidationError(undefined);
  };

  const validateAnswer = () => {
    if (!currentQuestion || !currentQuestion.required) return true;
    
    if (currentAnswer === undefined || currentAnswer === null || currentAnswer === '') {
      setValidationError('This question is required');
      return false;
    }
    
    if (currentQuestion.type === 'text' || currentQuestion.type === 'textarea') {
      const answer = String(currentAnswer);
      if (currentQuestion.minLength && answer.length < currentQuestion.minLength) {
        setValidationError(`Minimum ${currentQuestion.minLength} characters required`);
        return false;
      }
    }
    
    return true;
  };

  const handleNext = async () => {
    if (!currentQuestion) return;
    
    // Validate current answer
    if (!validateAnswer()) {
      return;
    }
    
    // Save current answer if not already saved
    if (currentAnswer !== undefined && currentAnswer !== null) {
      await saveProgress(currentQuestion.id, currentAnswer);
    }
    
    if (currentStep === totalQuestions) {
      // Last question - go to complete page
      router.push('/mvp-planner/quiz/complete');
    } else {
      dispatch(nextStep());
      router.push(`/mvp-planner/quiz/${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch(previousStep());
      router.push(`/mvp-planner/quiz/${currentStep - 1}`);
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        // Only trigger if validation passes
        if (validateAnswer()) {
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

  const progress = Math.round((currentStep / totalQuestions) * 100);

  return (
    <>
      <Head>
        <title>Question {currentStep} of {totalQuestions} | MVP Development Planner</title>
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
              <QuestionCard
                question={currentQuestion}
                currentAnswer={currentAnswer}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentStep === 1}
                isLast={currentStep === totalQuestions}
                isValid={currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== ''}
                validationError={validationError}
              />
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="bg-gray-100 px-4 py-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{progress}% Complete</span>
              <span className="text-xs text-gray-500">MVP Development Planner</span>
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

export default MVPPlannerQuizStep;