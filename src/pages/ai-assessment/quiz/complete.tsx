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
import { PipelineProgress, StageInfo } from '@/components/quiz/PipelineProgress';
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
  const [reportAccessToken, setReportAccessToken] = useState<string | null>(null);
  
  // Pipeline progress state
  const [workflowRunId, setWorkflowRunId] = useState<string | null>(null);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<string>('initializing');
  const [estimatedTime, setEstimatedTime] = useState<number>(60);
  const [stageDetails, setStageDetails] = useState<StageInfo[]>([
    {
      id: 'stage1',
      name: 'Problem Analysis',
      description: 'Analyzing your business context and identifying key opportunities...',
      progress: 25,
      status: 'pending',
      icon: '📊'
    },
    {
      id: 'stage2',
      name: 'Tool Research',
      description: 'Researching AI tools that match your specific needs...',
      progress: 50,
      status: 'pending',
      icon: '🔍'
    },
    {
      id: 'stage3',
      name: 'Solution Curation',
      description: 'Curating personalized solutions with ROI calculations...',
      progress: 75,
      status: 'pending',
      icon: '🎯'
    },
    {
      id: 'stage4',
      name: 'Report Generation',
      description: 'Generating your executive-ready implementation report...',
      progress: 100,
      status: 'pending',
      icon: '📝'
    }
  ]);
  
  // Use a ref to track if submission has already started
  // This prevents double submission in React StrictMode
  const hasSubmittedRef = useRef(false);
  const reportIdRef = useRef<string | null>(null);

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
      reportIdRef.current = data.reportId; // Store in ref for polling
      
      // Set the workflow run ID for polling
      setWorkflowRunId(`report-${data.reportId}`);
      
      // IMMEDIATELY clear Redux after successful submission
      // This prevents stale data if user closes the page
      dispatch(resetQuiz());
      
      // Also clear localStorage directly as a safeguard
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quizState');
      }
      
      // Keep in submitting state to show progress bar
      // Will transition to success when workflow completes
      console.log('[COMPLETE] Submission successful, now in submitting state to show progress');
      console.log('[COMPLETE] Workflow run ID set to:', `report-${data.reportId}`);

    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit quiz');
      setPageState('error');
    }
  };

  // Poll workflow status
  useEffect(() => {
    console.log('[COMPLETE] Polling effect triggered. WorkflowRunId:', workflowRunId, 'PageState:', pageState);
    
    if (!workflowRunId || pageState !== 'submitting') {
      console.log('[COMPLETE] Not polling - missing workflowRunId or not in submitting state');
      return;
    }

    console.log('[COMPLETE] Starting workflow polling for:', workflowRunId);
    
    let pollInterval: NodeJS.Timeout;
    let pollCount = 0;
    const maxPolls = 60; // 2 minutes max (60 * 2 seconds)
    const startTime = Date.now();

    const updateStageStatus = (stageId: string, status: 'pending' | 'active' | 'completed') => {
      setStageDetails(prev => prev.map(stage => {
        if (stage.id === stageId) {
          return { ...stage, status };
        }
        // Mark previous stages as completed when a later stage is active
        const stageIndex = prev.findIndex(s => s.id === stageId);
        const currentIndex = prev.findIndex(s => s.id === stage.id);
        if (status === 'active' && currentIndex < stageIndex) {
          return { ...stage, status: 'completed' };
        }
        return stage;
      }));
    };

    const checkWorkflowStatus = async () => {
      try {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        
        // For first 5 seconds, just show initial progress animation
        // This ensures user sees the progress bar even if report completes quickly
        if (elapsed < 5) {
          const initialProgress = Math.min(15, elapsed * 3);
          setPipelineProgress(initialProgress);
          updateStageStatus('stage1', 'active');
          setCurrentStage('stage1');
          setEstimatedTime(Math.max(0, 60 - elapsed));
          return;
        }
        
        const response = await fetch(`/api/workflow/status/${workflowRunId}`);
        
        if (!response.ok) {
          // If workflow status not found, simulate realistic progress
          // Don't check report completion status to avoid skipping animation
          console.log('[COMPLETE] Workflow status not found (this is normal), simulating progress...');
          
          // Simulate progress based on elapsed time (60-90 seconds total)
          const simulatedProgress = Math.min(95, Math.floor((elapsed / 75) * 100));
          setPipelineProgress(simulatedProgress);
          
          // Update stages based on simulated progress
          if (simulatedProgress >= 25) {
            updateStageStatus('stage1', 'completed');
            updateStageStatus('stage2', 'active');
            setCurrentStage('stage2');
          }
          if (simulatedProgress >= 50) {
            updateStageStatus('stage2', 'completed');
            updateStageStatus('stage3', 'active');
            setCurrentStage('stage3');
          }
          if (simulatedProgress >= 75) {
            updateStageStatus('stage3', 'completed');
            updateStageStatus('stage4', 'active');
            setCurrentStage('stage4');
          }
          
          // Update estimated time
          setEstimatedTime(Math.max(0, 75 - elapsed));
          
          // After 60 seconds, start checking if report is actually complete
          if (elapsed >= 60 && reportIdRef.current) {
            const reportResponse = await fetch(`/api/reports/status/${reportIdRef.current}`);
            if (reportResponse.ok) {
              const reportData = await reportResponse.json();
              
              if (reportData.status === 'completed') {
                // Animate to 100% first
                setPipelineProgress(100);
                updateStageStatus('stage4', 'completed');
                
                // Store the access token if available
                if (reportData.accessToken) {
                  setReportAccessToken(reportData.accessToken);
                }
                
                // Wait a moment for the 100% animation to show
                setTimeout(() => {
                  setPageState('success');
                }, 1000);
                clearInterval(pollInterval);
              }
            }
          }
          
          // Hard timeout after 120 seconds
          if (elapsed >= 120) {
            console.log('[COMPLETE] Timeout reached, assuming complete');
            setPipelineProgress(100);
            updateStageStatus('stage4', 'completed');
            setTimeout(() => {
              setPageState('success');
            }, 1000);
            clearInterval(pollInterval);
          }
          return;
        }

        const data = await response.json();
        console.log('[COMPLETE] Workflow status:', data);

        // Update progress and stage
        setPipelineProgress(data.progress || 0);
        setCurrentStage(data.currentStage || 'initializing');
        
        // Update estimated time
        const estimatedTotal = 75; // 75 seconds average
        setEstimatedTime(Math.max(0, estimatedTotal - elapsed));

        // Update stage statuses
        if (data.currentStage === 'stage1') {
          updateStageStatus('stage1', 'active');
        } else if (data.currentStage === 'stage2') {
          updateStageStatus('stage1', 'completed');
          updateStageStatus('stage2', 'active');
        } else if (data.currentStage === 'stage3') {
          updateStageStatus('stage1', 'completed');
          updateStageStatus('stage2', 'completed');
          updateStageStatus('stage3', 'active');
        } else if (data.currentStage === 'stage4') {
          updateStageStatus('stage1', 'completed');
          updateStageStatus('stage2', 'completed');
          updateStageStatus('stage3', 'completed');
          updateStageStatus('stage4', 'active');
        }

        // Check if completed
        if (data.status === 'completed' || data.progress >= 100) {
          console.log('[COMPLETE] Workflow completed!');
          updateStageStatus('stage1', 'completed');
          updateStageStatus('stage2', 'completed');
          updateStageStatus('stage3', 'completed');
          updateStageStatus('stage4', 'completed');
          setPipelineProgress(100);
          
          // Try to get the report access token
          if (reportIdRef.current) {
            try {
              const reportResponse = await fetch(`/api/reports/status/${reportIdRef.current}`);
              if (reportResponse.ok) {
                const reportData = await reportResponse.json();
                if (reportData.accessToken) {
                  setReportAccessToken(reportData.accessToken);
                  console.log('[COMPLETE] Got report access token:', reportData.accessToken);
                }
              }
            } catch (err) {
              console.error('[COMPLETE] Error fetching report token:', err);
            }
          }
          
          setPageState('success');
          clearInterval(pollInterval);
        } else if (data.status === 'failed') {
          console.error('[COMPLETE] Workflow failed');
          setError('Report generation failed. Please try again.');
          setPageState('error');
          clearInterval(pollInterval);
        }

        pollCount++;
        if (pollCount >= maxPolls) {
          console.log('[COMPLETE] Polling timeout, report should arrive via email');
          // Still mark as success since processing continues in background
          setPageState('success');
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error('[COMPLETE] Error checking workflow status:', err);
        // Continue polling despite errors
      }
    };

    // Initial check
    checkWorkflowStatus();

    // Poll every 2 seconds
    pollInterval = setInterval(checkWorkflowStatus, 2000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [workflowRunId, pageState]); // Removed reportId to prevent effect re-running when it's set

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
                  <p className="text-gray-600 mb-2">
                    Your AI readiness report is being generated and will be sent to:
                  </p>
                  <p className="font-semibold text-gray-800 mb-4">
                    {initialData.userInfo?.email}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    {reportAccessToken 
                      ? 'Your report is ready! Click below to view it.'
                      : 'You should receive it within 5-10 minutes. You can safely close this page.'}
                  </p>
                  <div className="space-y-3">
                    {reportAccessToken && (
                      <button
                        onClick={() => router.push(`/report/view/${reportAccessToken}`)}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        🎯 View Your Report
                      </button>
                    )}
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