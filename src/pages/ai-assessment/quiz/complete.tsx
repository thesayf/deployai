import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import { selectUserInfo, selectTotalScore } from '@/store/slices/quizSlice';
import { ModernNavBar } from '@/components/navigation/ModernNavBar';
import { Footer } from '@/components/footer/Footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/shared/Button';
import { ScoreCategory } from '@/types/quiz';

const CompletePage = () => {
  const router = useRouter();
  const userInfo = useAppSelector(selectUserInfo);
  const totalScore = useAppSelector(selectTotalScore);

  useEffect(() => {
    // Redirect if no user info
    if (!userInfo) {
      router.push('/ai-assessment');
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }

  // Determine score category
  const getScoreCategory = (score: number): ScoreCategory => {
    if (score >= 35) return 'High AI Readiness';
    if (score >= 25) return 'Medium AI Readiness';
    return 'Early Stage';
  };

  const category = getScoreCategory(totalScore);

  return (
    <>
      <Head>
        <title>Assessment Complete | deployAI Studio</title>
      </Head>

      <ModernNavBar />

      <main>
        <SectionWrapper variant="default" spacing="large">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-4xl text-white">✓</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">
              Assessment Complete!
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Thank you, {userInfo.firstName}! Your personalized AI readiness report has been sent to {userInfo.email}.
            </p>

            {/* Score preview */}
            <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Your AI Readiness Score</h2>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2">
                {totalScore}/50
              </div>
              <p className="text-lg font-semibold">{category}</p>
            </div>

            {/* Next steps */}
            <div className="space-y-4">
              <p className="text-lg">
                Check your email for your complete report including:
              </p>
              <ul className="text-left max-w-md mx-auto space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Industry-specific AI opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Personalized implementation roadmap</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Technology recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Next steps and action items</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-12 space-y-4">
              <Link href="/contact">
                <Button size="large" intent="cta">
                  Schedule a Free Consultation
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                Ready to implement AI in your business? Let's discuss your results.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
};

export default CompletePage;