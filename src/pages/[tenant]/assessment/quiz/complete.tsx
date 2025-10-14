import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  selectQuizId,
  selectResponses,
  selectUserInfo,
  resetQuiz,
  setSubmitting
} from '@/store/slices/quizSlice';
import { useTenant } from '@/contexts/TenantContext';
import { CompleteAnimation } from '@/components/quiz/CompleteAnimation';
import { PipelineProgress, StageInfo } from '@/components/quiz/PipelineProgress';
import { SubmitQuizRequest } from '@/types/quiz';

type PageState = 'loading' | 'submitting' | 'success' | 'error';

const TenantCompletePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tenant, reportId: urlReportId } = router.query;
  const { tenantContext } = useTenant();

  // Get Redux data if available (for normal flow)
  const quizId = useAppSelector(selectQuizId);
  const responses = useAppSelector(selectResponses);
  const userInfo = useAppSelector(selectUserInfo);

  // Local state for page behavior - start with submitting to show animation
  const [pageState, setPageState] = useState<PageState>('submitting');
  const [error, setError] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [reportAccessToken, setReportAccessToken] = useState<string | null>(null);

  // Pipeline progress state
  const [workflowRunId, setWorkflowRunId] = useState<string | null>(null);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<string>('initializing');
  const [estimatedTime, setEstimatedTime] = useState<number>(60);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Get capitalized business name
  const businessName = userInfo?.company
    ? userInfo.company.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    : 'Your Business';

  const [stageDetails, setStageDetails] = useState<StageInfo[]>([
    {
      id: 'stage1',
      name: 'Requirements',
      description: 'Understanding Your Requirements',
      progress: 25,
      status: 'pending',
      icon: '1'
    },
    {
      id: 'stage2',
      name: 'Solutions',
      description: 'Exploring Strategic Solutions',
      progress: 50,
      status: 'pending',
      icon: '2'
    },
    {
      id: 'stage3',
      name: 'Evaluation',
      description: 'Evaluating Optimal Approaches',
      progress: 75,
      status: 'pending',
      icon: '3'
    },
    {
      id: 'stage4',
      name: 'Roadmap',
      description: 'Finalizing Your Strategic Roadmap',
      progress: 100,
      status: 'pending',
      icon: '4'
    }
  ]);

  // Inspirational quotes from business leaders
  const INSPIRATIONAL_QUOTES = [
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
    { text: "Growth and comfort do not coexist.", author: "Ginni Rometty, IBM" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "The only way to win is to learn faster than everyone else.", author: "Eric Ries" },
    { text: "Be customer-obsessed, not tech-obsessed.", author: "Jeff Bezos" },
    { text: "The heart and soul of a company is creativity and innovation.", author: "Robert Iger, Disney" },
    { text: "Digital transformation is a fundamental reality for businesses today.", author: "Warren Buffett" },
    { text: "In today's era of volatility, agility is the only sustainable advantage.", author: "Jack Welch" },
    { text: "When you innovate, be prepared for everyone telling you you're nuts.", author: "Larry Ellison" },
    { text: "Failure is an option here. If things are not failing, you are not innovating enough.", author: "Elon Musk" },
    { text: "Dream big and know how to translate dreams into reality.", author: "Jack Ma" },
    { text: "There is no alternative to digital transformation. Those that don't adapt will fail.", author: "Jeff Bezos" },
    { text: "Sometimes when you innovate, you make mistakes. It is best to admit them quickly.", author: "Steve Jobs" },
    { text: "It's not the strongest that survives, but the most adaptable to change.", author: "Charles Darwin" }
  ];

  // Use refs to track state
  const hasSubmittedRef = useRef(false);
  const reportIdRef = useRef<string | null>(null);

  useEffect(() => {
    console.log('[TENANT-COMPLETE] Page loaded, checking for data...');

    // If we have a reportId from URL, use it for polling
    if (urlReportId && typeof urlReportId === 'string') {
      console.log('[TENANT-COMPLETE] Found reportId in URL:', urlReportId);
      setReportId(urlReportId);
      reportIdRef.current = urlReportId;
      setWorkflowRunId(`report-${urlReportId}`);
      return;
    }

    // If we have quiz data in Redux, submit it
    if (quizId && userInfo && !hasSubmittedRef.current) {
      console.log('[TENANT-COMPLETE] Found quiz data in Redux, submitting...');
      submitQuiz();
      return;
    }

    // If no data at all, try to get from localStorage as fallback
    const storedReportId = localStorage.getItem('lastReportId');
    if (storedReportId) {
      console.log('[TENANT-COMPLETE] Found reportId in localStorage:', storedReportId);
      setReportId(storedReportId);
      reportIdRef.current = storedReportId;
      setWorkflowRunId(`report-${storedReportId}`);
    } else {
      console.log('[TENANT-COMPLETE] No data available, showing animation anyway');
    }
  }, [urlReportId, quizId, userInfo]);

  const submitQuiz = async () => {
    // Prevent double submission
    if (hasSubmittedRef.current) {
      console.log('[TENANT-COMPLETE] Already submitted, ignoring duplicate call');
      return;
    }

    console.log(`[TENANT-COMPLETE] Starting quiz submission for quiz ID: ${quizId}`);
    hasSubmittedRef.current = true;

    setError(null);

    try {
      console.log('[TENANT-COMPLETE] Making API call to /api/quiz/submit...');
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string,
        },
        body: JSON.stringify({
          quizId: quizId,
          finalResponses: responses
        } as SubmitQuizRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quiz');
      }

      setReportId(data.reportId);
      reportIdRef.current = data.reportId;

      // Store reportId in localStorage for persistence
      localStorage.setItem('lastReportId', data.reportId);

      // Update URL to include reportId without navigation
      router.push(`/${tenant}/assessment/quiz/complete?reportId=${data.reportId}`, undefined, { shallow: true });

      // Set the workflow run ID for polling
      setWorkflowRunId(`report-${data.reportId}`);

      // Clear Redux after successful submission
      dispatch(resetQuiz());

      // Also clear quiz state from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quizState');
      }

      console.log('[TENANT-COMPLETE] Submission successful, polling for progress...');

    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit quiz');
      setPageState('error');
      hasSubmittedRef.current = false;
    }
  };

  // Stage duration estimates (in seconds) - overestimated for better UX
  const STAGE_DURATIONS = {
    stage1: 45,
    stage2: 90,
    stage3: 140,
    stage4: 140
  };

  // Update stage 2 description with business name
  useEffect(() => {
    if (businessName && businessName !== 'Your Business') {
      setStageDetails(prev => prev.map(stage =>
        stage.id === 'stage2'
          ? { ...stage, description: `Exploring Strategic Solutions for ${businessName}` }
          : stage
      ));
    }
  }, [businessName]);

  // Rotate through inspirational quotes
  useEffect(() => {
    if (pageState !== 'submitting') return;

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [pageState]);

  // Animation state refs
  const animationRef = useRef<number>();
  const currentStageRef = useRef(1);
  const stageStartTimeRef = useRef(Date.now());
  const actualProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const lastJumpProgressRef = useRef(0);

  // Start animation and poll database for real progress
  useEffect(() => {
    if (pageState !== 'submitting') {
      return;
    }

    console.log('[TENANT-COMPLETE] Starting animation...');

    let pollInterval: NodeJS.Timeout;

    // Check database for actual field population
    const checkDatabaseProgress = async () => {
      if (!reportIdRef.current) {
        console.log('[TENANT-COMPLETE] No reportId yet, skipping database check');
        return;
      }

      try {
        const response = await fetch(`/api/reports/status/${reportIdRef.current}`, {
          headers: {
            'x-tenant-subdomain': tenant as string,
          },
        });
        if (!response.ok) {
          console.log('[TENANT-COMPLETE] Failed to get report status');
          return;
        }

        const data = await response.json();
        console.log('[TENANT-COMPLETE] Database status:', {
          stage1: data.stage1_populated,
          stage2: data.stage2_populated,
          stage3: data.stage3_populated,
          stage4: data.stage4_populated,
          completed: data.completed
        });

        // Update stage indicators based on field population
        let targetProgress = 0;
        let newStage = currentStageRef.current;

        if (data.stage4_populated || data.completed) {
          targetProgress = 100;
          newStage = 5;
          updateStageIndicators(4, 'completed');

          if (data.accessToken) {
            setReportAccessToken(data.accessToken);
          }
        } else if (data.stage3_populated) {
          if (currentStageRef.current < 4) {
            targetProgress = 75 + Math.random() * 4;
            newStage = 4;
            stageStartTimeRef.current = Date.now();
            updateStageIndicators(3, 'completed');
            updateStageIndicators(4, 'active');
          }
        } else if (data.stage2_populated) {
          if (currentStageRef.current < 3) {
            targetProgress = 50 + Math.random() * 4;
            newStage = 3;
            stageStartTimeRef.current = Date.now();
            updateStageIndicators(2, 'completed');
            updateStageIndicators(3, 'active');
          }
        } else if (data.stage1_populated) {
          if (currentStageRef.current < 2) {
            targetProgress = 25 + Math.random() * 4;
            newStage = 2;
            stageStartTimeRef.current = Date.now();
            updateStageIndicators(1, 'completed');
            updateStageIndicators(2, 'active');
          }
        } else {
          if (currentStageRef.current === 1) {
            updateStageIndicators(1, 'active');
          }
        }

        if (targetProgress > actualProgressRef.current) {
          actualProgressRef.current = targetProgress;
          currentStageRef.current = newStage;
          lastJumpProgressRef.current = targetProgress;

          console.log('[TENANT-COMPLETE] Stage jump detected, new target:', targetProgress);
        }

        // Check if fully complete
        if (data.completed) {
          if (data.accessToken) {
            setReportAccessToken(data.accessToken);
          }

          setTimeout(() => {
            setPageState('success');
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }

            // Auto-redirect to report
            if (data.accessToken) {
              setTimeout(() => {
                router.push(`/report/view/${data.accessToken}`);
              }, 3000);
            }
          }, 1000);
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('[TENANT-COMPLETE] Error checking database:', err);
      }
    };

    // Update stage visual indicators
    const updateStageIndicators = (stageNum: number, status: 'pending' | 'active' | 'completed') => {
      setStageDetails(prev => prev.map((stage, index) => {
        if (index + 1 === stageNum) {
          return { ...stage, status };
        }
        if (index + 1 < stageNum && status === 'completed') {
          return { ...stage, status: 'completed' };
        }
        return stage;
      }));
    };

    // Smooth animation function
    const animateProgress = () => {
      const currentStage = currentStageRef.current;
      if (currentStage > 4) {
        setPipelineProgress(100);
        return;
      }

      const elapsed = (Date.now() - stageStartTimeRef.current) / 1000;
      const stageDuration = STAGE_DURATIONS[`stage${currentStage}` as keyof typeof STAGE_DURATIONS];

      const stageProgress = Math.min(elapsed / stageDuration, 0.99);

      let min, max;
      if (currentStage === 1) {
        min = 0;
        max = 25;
      } else {
        min = lastJumpProgressRef.current || (currentStage === 2 ? 25 : currentStage === 3 ? 50 : 75);
        max = currentStage === 2 ? 50 : currentStage === 3 ? 75 : 100;
      }

      const targetProgress = min + (max - min) * stageProgress;

      displayProgressRef.current = Math.max(targetProgress, actualProgressRef.current);

      setPipelineProgress(Math.round(displayProgressRef.current));

      const totalRemaining = Object.entries(STAGE_DURATIONS)
        .slice(currentStage - 1)
        .reduce((sum, [_, duration]) => sum + duration, 0);
      const currentStageRemaining = Math.max(0, stageDuration - elapsed);
      setEstimatedTime(Math.floor(currentStageRemaining + (totalRemaining - stageDuration)));

      animationRef.current = requestAnimationFrame(animateProgress);
    };

    // Initial stage setup
    updateStageIndicators(1, 'active');
    setCurrentStage('stage1');

    // Start animation
    animateProgress();

    // Check database immediately, then every 2 seconds
    checkDatabaseProgress();
    pollInterval = setInterval(checkDatabaseProgress, 2000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pageState, tenant]);

  return (
    <>
      <Head>
        <title>Assessment Complete | {tenantContext?.tenant.company_name || 'AI Assessment'}</title>
      </Head>

      <main className="h-screen bg-white flex flex-col overflow-hidden">
        {/* Top section with logo/brand */}
        <div className="bg-[#457B9D] h-24 flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt={tenantContext?.tenant.company_name || 'AI Assessment'} className="h-10 w-auto filter brightness-0 invert" />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className={`w-full ${pageState === 'submitting' ? 'max-w-3xl' : 'max-w-md'}`}>
            <div className="bg-white border border-gray-300 rounded-lg p-8 text-center">

              {pageState === 'submitting' && (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Creating Your AI Implementation Report
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Our AI is analyzing your responses and building personalized recommendations
                  </p>

                  <PipelineProgress
                    progress={pipelineProgress}
                    currentStage={currentStage}
                    stages={stageDetails}
                    estimatedTime={estimatedTime}
                    currentQuote={INSPIRATIONAL_QUOTES[currentQuoteIndex]}
                  />
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
                  <p className="text-gray-600 mb-6">
                    Your AI readiness report has been generated
                  </p>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#457B9D]"></div>
                    <p className="text-lg font-medium text-gray-700">
                      Loading your report...
                    </p>
                    <p className="text-sm text-gray-500">
                      You will be redirected automatically
                    </p>
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
              <span className="text-xs text-gray-500">Powered by {tenantContext?.tenant.company_name || 'deployAI'}</span>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.params as { tenant: string };
  const { tenantService } = await import('@/services/tenant');
  const tenantContext = await tenantService.getTenantContext(tenantSlug);

  if (!tenantContext) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default TenantCompletePage;
