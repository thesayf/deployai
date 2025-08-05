import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/store';
import { openEmailModal, closeEmailModal, setUserInfo, setQuizId } from '@/store/slices/quizSlice';
import Image from 'next/image';
import { Footer } from '@/components/footer/Footer';
import { LogoTrustBanner } from '@/components/logo-trust-banner';
import { AssessmentLanding } from '@/components/assessment-landing';
import { EmailCaptureModal } from '@/components/email-capture-modal';
import { EmailCaptureFormData } from '@/types/quiz';

const AIAssessmentLanding = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(state => state.quiz.isModalOpen);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleModalSubmit = async (data: EmailCaptureFormData) => {
    setIsSubmitting(true);
    
    try {
      // Call the start quiz API
      const response = await fetch('/api/quiz/start', {
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
          lastName: '', // Not collected in this form
          company: '', // Not collected in this form
        }));
        
        // Save quiz ID
        dispatch(setQuizId(result.quizId));
        
        // Close modal
        dispatch(closeEmailModal());
        
        // Navigate to first question
        router.push('/ai-assessment/quiz/1');
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
        <title>AI Business Readiness Assessment | deployAI Studio</title>
        <meta 
          name="description" 
          content="Discover your business's AI readiness with our free 3-minute assessment. Get a personalized score and implementation roadmap for AI transformation." 
        />
        <meta property="og:title" content="AI Business Readiness Assessment | deployAI Studio" />
        <meta property="og:description" content="Take our free 3-minute assessment to discover if your business is ready for AI implementation. Get personalized recommendations." />
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
        <AssessmentLanding />
        
        {/* Methodology Credibility */}
        <div className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-lg text-gray-700">
              <span className="font-bold">Why industry leaders trust our assessment:</span> We've distilled methodologies from 
              McKinsey's AI Trust Model, BCG's DRI Framework, and Deloitte's IntelligentOps into a rapid diagnostic tool that 
              delivers the same strategic insights in minutes, not months.
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

export default AIAssessmentLanding;