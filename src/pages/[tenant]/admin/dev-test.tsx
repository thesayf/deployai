import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { supabaseAdmin } from '@/lib/supabase';

interface TestResult {
  success: boolean;
  quizId?: string;
  reportId?: string;
  testCompany?: string;
  testEmail?: string;
  redirectUrl?: string;
  error?: string;
  details?: string;
}

interface ReportProgress {
  status: string;
  stages: {
    stage1: boolean;
    stage2: boolean;
    stage3: boolean;
    stage4: boolean;
  };
  error?: string;
  updatedAt: string;
}

const DevTestPage = () => {
  const router = useRouter();
  const { tenant } = router.query;
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [progress, setProgress] = useState<ReportProgress | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [pollingActive, setPollingActive] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const runTest = async () => {
    setIsRunning(true);
    setTestResult(null);
    setProgress(null);
    setLogs([]);
    addLog('Starting test assessment...');

    try {
      const response = await fetch('/api/test/run-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string
        }
      });

      const result = await response.json();

      if (result.success) {
        setTestResult(result);
        addLog(`✅ Quiz created: ${result.quizId}`);
        addLog(`📊 Report ID: ${result.reportId}`);
        addLog(`🏢 Test company: ${result.testCompany}`);
        addLog('Starting to poll for progress...');
        startPolling(result.reportId);
      } else {
        setTestResult(result);
        addLog(`❌ Error: ${result.error}`);
        if (result.details) addLog(`Details: ${result.details}`);
        setIsRunning(false);
      }
    } catch (error) {
      addLog(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsRunning(false);
    }
  };

  const checkProgress = async (reportId: string) => {
    try {
      const response = await fetch(`/api/test/check-progress?reportId=${reportId}`);
      const data = await response.json();

      if (data.error) {
        addLog(`⚠️ Progress check error: ${data.error}`);
        return null;
      }

      return data as ReportProgress;
    } catch (error) {
      addLog(`⚠️ Progress fetch error: ${error instanceof Error ? error.message : 'Unknown'}`);
      return null;
    }
  };

  const startPolling = (reportId: string) => {
    setPollingActive(true);
    let lastStatus = '';
    let pollCount = 0;
    const maxPolls = 120; // 6 minutes max (3s intervals)

    const poll = async () => {
      pollCount++;
      const progressData = await checkProgress(reportId);

      if (progressData) {
        setProgress(progressData);

        const stageStatus = `${progressData.stages.stage1 ? '✓' : '○'} ${progressData.stages.stage2 ? '✓' : '○'} ${progressData.stages.stage3 ? '✓' : '○'} ${progressData.stages.stage4 ? '✓' : '○'}`;

        if (progressData.status !== lastStatus) {
          addLog(`Status: ${progressData.status} | Stages: ${stageStatus}`);
          lastStatus = progressData.status;
        }

        if (progressData.status === 'completed') {
          addLog('🎉 Report completed successfully!');
          addLog(`View: ${testResult?.redirectUrl}`);
          setPollingActive(false);
          setIsRunning(false);
          return;
        }

        if (progressData.status === 'failed') {
          addLog(`❌ Report generation failed: ${progressData.error || 'Unknown error'}`);
          setPollingActive(false);
          setIsRunning(false);
          return;
        }
      }

      if (pollCount >= maxPolls) {
        addLog('⏰ Timeout - stopped polling after 6 minutes');
        setPollingActive(false);
        setIsRunning(false);
        return;
      }

      pollingRef.current = setTimeout(poll, 3000);
    };

    poll();
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
    setPollingActive(false);
    setIsRunning(false);
    addLog('Polling stopped manually');
  };

  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearTimeout(pollingRef.current);
      }
    };
  }, []);

  const goToAssessment = () => {
    if (testResult?.redirectUrl) {
      router.push(testResult.redirectUrl);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout title="Dev Test">
        <div className="space-y-6 max-w-4xl">
          {/* Header */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
            <h2 className="text-lg font-bold text-yellow-800">⚠️ Development Testing Page</h2>
            <p className="text-yellow-700 text-sm mt-1">
              This page is for internal testing only. Do not share this URL.
            </p>
          </div>

          {/* Test Button */}
          <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0_0_#000]">
            <h3 className="text-xl font-bold mb-4">Run Test Assessment</h3>
            <p className="text-gray-600 mb-4">
              This will create a test assessment with realistic demo data and trigger the full report generation pipeline.
            </p>
            <div className="flex gap-4">
              <button
                onClick={runTest}
                disabled={isRunning}
                className={`px-6 py-3 font-bold border-3 border-black shadow-[4px_4px_0_0_#000] transition-all ${
                  isRunning
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-400 hover:bg-green-500 hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
                }`}
              >
                {isRunning ? '⏳ Running...' : '🚀 Run Test Assessment'}
              </button>

              {pollingActive && (
                <button
                  onClick={stopPolling}
                  className="px-6 py-3 font-bold border-3 border-black shadow-[4px_4px_0_0_#000] bg-red-400 hover:bg-red-500"
                >
                  ⏹️ Stop Polling
                </button>
              )}

              {testResult?.success && !isRunning && (
                <button
                  onClick={goToAssessment}
                  className="px-6 py-3 font-bold border-3 border-black shadow-[4px_4px_0_0_#000] bg-blue-400 hover:bg-blue-500"
                >
                  📄 View Assessment
                </button>
              )}
            </div>
          </div>

          {/* Progress Display */}
          {progress && (
            <div className="bg-white border-3 border-black p-6 shadow-[4px_4px_0_0_#000]">
              <h3 className="text-lg font-bold mb-4">Report Generation Progress</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  { key: 'stage1', label: 'Stage 1', desc: 'Problem Analysis' },
                  { key: 'stage2', label: 'Stage 2', desc: 'Tool Research' },
                  { key: 'stage3', label: 'Stage 3', desc: 'Tool Selection' },
                  { key: 'stage4', label: 'Stage 4', desc: 'Report Generation' }
                ].map(stage => (
                  <div
                    key={stage.key}
                    className={`p-4 border-2 border-black text-center ${
                      progress.stages[stage.key as keyof typeof progress.stages]
                        ? 'bg-green-200'
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {progress.stages[stage.key as keyof typeof progress.stages] ? '✅' : '⏳'}
                    </div>
                    <div className="font-bold">{stage.label}</div>
                    <div className="text-xs text-gray-600">{stage.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Status: <strong className={
                  progress.status === 'completed' ? 'text-green-600' :
                  progress.status === 'failed' ? 'text-red-600' : 'text-blue-600'
                }>{progress.status}</strong></span>
                <span>Last update: {new Date(progress.updatedAt).toLocaleTimeString()}</span>
              </div>
            </div>
          )}

          {/* Logs */}
          <div className="bg-gray-900 border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <h3 className="text-white font-bold mb-2">📋 Logs</h3>
            <div className="font-mono text-sm text-green-400 h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">Press "Run Test Assessment" to start...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="py-0.5">{log}</div>
                ))
              )}
            </div>
          </div>

          {/* Test Result Details */}
          {testResult && (
            <div className={`border-3 border-black p-4 shadow-[4px_4px_0_0_#000] ${
              testResult.success ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h3 className="font-bold mb-2">
                {testResult.success ? '✅ Test Result' : '❌ Test Failed'}
              </h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.params as { tenant: string };
  const { tenantService } = await import('@/services/tenant');
  const tenantContext = await tenantService.getTenantContext(tenantSlug);

  if (!tenantContext) {
    return { notFound: true };
  }

  return { props: {} };
};

export default DevTestPage;
