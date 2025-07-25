import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAppSelector } from '@/store';
import { selectUserInfo, selectProcessingStage } from '@/store/slices/quizSlice';
import { ModernNavBar } from '@/components/navigation/ModernNavBar';
import { SectionWrapper } from '@/components/section-wrapper';

const ProcessingPage = () => {
  const router = useRouter();
  const userInfo = useAppSelector(selectUserInfo);
  const processingStage = useAppSelector(selectProcessingStage);

  useEffect(() => {
    // Redirect if no user info
    if (!userInfo) {
      router.push('/ai-assessment');
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Generating Your Report | deployAI Studio</title>
      </Head>

      <ModernNavBar />

      <main className="min-h-screen bg-gray-50">
        <SectionWrapper variant="default" spacing="large">
          <div className="max-w-2xl mx-auto text-center">
            {/* Processing animation placeholder */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 border-4 border-black rounded-full animate-spin border-t-transparent" />
            </div>

            <h1 className="text-3xl font-bold mb-4">
              {processingStage === 'analyzing' && 'Analyzing Your Responses...'}
              {processingStage === 'generating' && 'Generating Your AI Readiness Report...'}
              {!processingStage && 'Processing Your Assessment...'}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              This typically takes 60-90 seconds. We're creating a personalized report based on your unique business needs.
            </p>

            {/* Progress messages */}
            <div className="space-y-3">
              <div className={`flex items-center justify-center space-x-2 ${processingStage === 'analyzing' ? 'text-black' : 'text-gray-400'}`}>
                <span className="text-2xl">📊</span>
                <span>Analyzing business context</span>
              </div>
              <div className={`flex items-center justify-center space-x-2 ${processingStage === 'generating' ? 'text-black' : 'text-gray-400'}`}>
                <span className="text-2xl">🤖</span>
                <span>Generating AI recommendations</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <span className="text-2xl">📧</span>
                <span>Preparing your report</span>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  );
};

export default ProcessingPage;