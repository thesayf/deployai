import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/store';
import { openEmailModal, closeEmailModal, setUserInfo, setQuizId } from '@/store/slices/mvpPlannerSlice';
import Image from 'next/image';
import { Footer } from '@/components/footer/Footer';
import { LogoTrustBanner } from '@/components/logo-trust-banner';
import { MVPPlannerLanding } from '@/components/mvp-planner-landing';
import { EmailCaptureModal } from '@/components/email-capture-modal';
import { MVPPlannerEmailCaptureFormData } from '@/types/mvp-planner';

const MVPPlannerPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(state => state.mvpPlanner.isModalOpen);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleModalSubmit = async (data: MVPPlannerEmailCaptureFormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the start quiz API
      const response = await fetch('/api/mvp-planner/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Save user info to Redux
        dispatch(setUserInfo({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
        }));
        
        // Save quiz ID
        dispatch(setQuizId(result.quizId));
        
        // Close modal
        dispatch(closeEmailModal());
        
        // Navigate to first question
        router.push('/mvp-planner/quiz/1');
      } else {
        console.error('Failed to start quiz:', result.error);
        alert('Failed to start assessment. Please try again.');
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>MVP Development Planner | deployAI Studio</title>
        <meta 
          name="description" 
          content="Plan your MVP development with our free assessment tool. Get personalized recommendations for building your minimum viable product." 
        />
        <meta property="og:title" content="MVP Development Planner | deployAI Studio" />
        <meta property="og:description" content="Take our free assessment to plan your MVP development. Get personalized recommendations and timeline estimates." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Logo Header */}
      <div className="bg-[#212121] py-8">
        <div className="container mx-auto px-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="deployAI studio"
            width={220}
            height={80}
            className="h-16 w-auto brightness-0 invert"
          />
        </div>
      </div>

      <main className="bg-[#212121] min-h-screen">
        <MVPPlannerLanding 
          onStartPlanner={() => dispatch(openEmailModal())}
        />
        
        {/* Methodology Credibility */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-lg text-gray-700">
              <span className="font-bold">Built for founders and product teams:</span> Our MVP planner helps you scope, 
              prioritize, and budget for your minimum viable product. Get clarity on technical requirements, timeline, 
              and development approach in minutes.
            </p>
          </div>
        </div>
        
        <LogoTrustBanner />
      </main>

      <Footer />

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeEmailModal())}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default MVPPlannerPage;