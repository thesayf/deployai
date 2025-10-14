import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTenant } from '@/contexts/TenantContext';
import { Footer } from '@/components/footer/Footer';

const RequestAssessmentPage = () => {
  const router = useRouter();
  const { tenant } = router.query;
  const { tenantContext } = useTenant();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/assessment-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting request:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <>
        <Head>
          <title>Request Submitted - {tenantContext?.tenant.company_name || 'Assessment'}</title>
        </Head>
        <div className="min-h-screen bg-white flex flex-col">
          <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full">
              {/* Success State */}
              <div className="bg-green-100 border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h1 className="text-3xl font-black uppercase mb-4">
                    Request Submitted!
                  </h1>
                  <p className="text-lg mb-6">
                    Your assessment request has been received.
                  </p>
                  <p className="text-base text-gray-700 mb-8">
                    A consultant from <strong>{tenantContext?.tenant.company_name}</strong> will review your request and send you an assessment link via email shortly.
                  </p>
                  <button
                    onClick={() => router.push(`/${tenant}/admin`)}
                    className="bg-black text-white px-8 py-4 font-bold text-lg border-[3px] border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Request Assessment - {tenantContext?.tenant.company_name || 'Assessment'}</title>
      </Head>
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full">
            {/* Warning Banner */}
            <div className="bg-orange-100 border-[3px] border-black p-6 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h2 className="text-xl font-black uppercase mb-2">
                    Assessment Limit Reached
                  </h2>
                  <p className="text-base">
                    You've used all available assessments for this billing period. Request access below, and your consultant will send you a link.
                  </p>
                </div>
              </div>
            </div>

            {/* Request Form */}
            <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h1 className="text-3xl font-black uppercase mb-6">
                Request Assessment Access
              </h1>
              <p className="text-lg mb-8 text-gray-700">
                Fill out the form below and we'll send you an assessment link shortly.
              </p>

              {error && (
                <div className="bg-red-100 border-[3px] border-red-500 p-4 mb-6">
                  <p className="text-red-700 font-bold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block font-bold text-sm uppercase mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block font-bold text-sm uppercase mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                    placeholder="Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-bold text-sm uppercase mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block font-bold text-sm uppercase mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-[3px] border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                    placeholder="Acme Inc."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-8 py-4 font-bold text-lg border-[3px] border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:active:translate-x-0 disabled:active:translate-y-0"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'REQUEST ASSESSMENT LINK'}
                </button>
              </form>

              {/* Upgrade Option */}
              <div className="mt-8 pt-8 border-t-[3px] border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Need more assessments regularly?
                </p>
                <button
                  onClick={() => router.push(`/${tenant}/admin/billing`)}
                  className="text-black font-bold underline hover:no-underline"
                >
                  Upgrade Your Plan →
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
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

export default RequestAssessmentPage;
