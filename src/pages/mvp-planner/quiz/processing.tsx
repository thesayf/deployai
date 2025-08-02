import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CompleteAnimation } from '@/components/quiz/CompleteAnimation';

const MVPPlannerProcessing = () => {
  const router = useRouter();

  // This page can be used as a fallback or for direct navigation
  React.useEffect(() => {
    // Redirect to complete page if accessed directly
    const timer = setTimeout(() => {
      router.push('/mvp-planner/quiz/complete');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Processing... | MVP Development Planner</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
            <img src="/logo.png" alt="deployAI" className="h-12 w-auto mx-auto mb-8" />
            
            <CompleteAnimation stage="generating" />
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Processing Your Responses...
            </h1>
            
            <p className="text-lg text-gray-600">
              Please wait while we analyze your project requirements.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default MVPPlannerProcessing;