import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/store';
import { openEmailModal, closeEmailModal, setUserInfo, setQuizId, resetQuiz } from '@/store/slices/quizSlice';
import Image from 'next/image';
import { Footer } from '@/components/footer/Footer';
import { LogoTrustBanner } from '@/components/logo-trust-banner';
import { AssessmentLanding } from '@/components/assessment-landing';
import { AIAssessmentModal } from '@/components/ai-assessment-modal';
import { useTenant } from '@/contexts/TenantContext';

// Define the form data type for AI assessment
interface AIAssessmentFormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

const TenantAssessmentLanding = () => {
  const router = useRouter();
  const { tenant, token } = router.query;
  const { tenantContext } = useTenant();
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(state => state.quiz.isModalOpen);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCheckingLimit, setIsCheckingLimit] = React.useState(true);
  const [approvedRequestId, setApprovedRequestId] = React.useState<string | null>(null);

  // Check assessment limit and handle approved token
  React.useEffect(() => {
    if (!tenantContext || !tenant) return;

    const checkAccess = async () => {
      try {
        // If token provided, verify it's an approved request
        if (token && typeof token === 'string') {
          const response = await fetch(`/api/assessment-requests/${token}/verify`, {
            headers: {
              'x-tenant-subdomain': tenant as string,
            },
          });

          if (response.ok) {
            const { approved, quizId } = await response.json();
            if (approved) {
              // Valid approved token - set quiz ID and allow access
              setApprovedRequestId(quizId);
              dispatch(setQuizId(quizId));
              setIsCheckingLimit(false);
              return;
            }
          }
        }

        // No valid token - check if tenant can create assessment
        const response = await fetch('/api/tenant/can-create-assessment', {
          headers: {
            'x-tenant-subdomain': tenant as string,
          },
        });

        const { canCreate, reason } = await response.json();

        if (!canCreate) {
          // Cannot create - redirect to request page with reason
          router.push(`/${tenant}/assessment/request?reason=${reason || 'limit_reached'}`);
          return;
        }

        setIsCheckingLimit(false);
      } catch (error) {
        console.error('Error checking assessment access:', error);
        setIsCheckingLimit(false);
      }
    };

    checkAccess();
  }, [tenant, token, tenantContext, router, dispatch]);

  const handleModalSubmit = async (data: AIAssessmentFormData) => {
    setIsSubmitting(true);

    try {
      // If this is an approved request, use the existing quiz ID
      if (approvedRequestId) {
        // Save user info to Redux (might already be set, but ensure it's updated)
        dispatch(setUserInfo({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
        }));

        // Quiz ID already set from token verification
        // Close modal and navigate to first question
        dispatch(closeEmailModal());
        router.push(`/${tenant}/assessment/quiz/1`);
        return;
      }

      // Normal flow: Reset any existing quiz state to ensure clean start
      dispatch(resetQuiz());

      // Also clear localStorage directly as a safeguard
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quizState');
      }

      // Call the start quiz API with tenant context
      const response = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string,
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

        // Navigate to first question (tenant-specific route)
        router.push(`/${tenant}/assessment/quiz/1`);
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

  // Show loading state while checking access
  if (isCheckingLimit) {
    return (
      <>
        <Head>
          <title>Loading... | {tenantContext?.tenant.company_name || 'AI Assessment'}</title>
        </Head>
        <div className="min-h-screen bg-[#212121] flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl font-bold mb-4">Checking assessment access...</div>
            <div className="animate-pulse">Please wait</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>AI Business Readiness Assessment | {tenantContext?.tenant.company_name || 'AI Assessment'}</title>
        <meta
          name="description"
          content="Discover your business's AI readiness with our free 3-minute assessment. Get a personalized score and implementation roadmap for AI transformation."
        />
        <meta property="og:title" content={`AI Business Readiness Assessment | ${tenantContext?.tenant.company_name || 'AI Assessment'}`} />
        <meta property="og:description" content="Take our free 3-minute assessment to discover if your business is ready for AI implementation. Get personalized recommendations." />
        <meta property="og:type" content="website" />
      </Head>

      <main>
        <AssessmentLanding
          companyName={tenantContext?.tenant.company_name}
          brandColor={tenantContext?.tenant.brand_color}
          logoUrl={tenantContext?.tenant.logo_url}
          tagline={tenantContext?.tenant.tagline}
        />

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
      <AIAssessmentModal
        isOpen={isModalOpen}
        onClose={() => dispatch(closeEmailModal())}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get tenant from URL path parameter
  const { tenant: tenantSlug } = context.params as { tenant: string };

  // Import tenant service
  const { tenantService } = await import('@/services/tenant');

  // Get tenant context
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

export default TenantAssessmentLanding;
