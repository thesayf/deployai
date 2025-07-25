import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ModernNavBar } from '@/components/navigation/ModernNavBar';
import { Footer } from '@/components/footer/Footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

const ReportPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportContent, setReportContent] = useState<string | null>(null);

  useEffect(() => {
    if (token && typeof token === 'string') {
      // Placeholder for fetching report
      // In real implementation, this would call an API endpoint
      setTimeout(() => {
        setLoading(false);
        setReportContent('<h1>Report content will be displayed here</h1>');
      }, 1000);
    }
  }, [token]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Report | deployAI Studio</title>
        </Head>
        <ModernNavBar />
        <main className="min-h-screen bg-gray-50">
          <SectionWrapper variant="default" spacing="large">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-black rounded-full animate-spin border-t-transparent" />
              <p className="text-lg">Loading your report...</p>
            </div>
          </SectionWrapper>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Report Not Found | deployAI Studio</title>
        </Head>
        <ModernNavBar />
        <main className="min-h-screen bg-gray-50">
          <SectionWrapper variant="default" spacing="large">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Report Not Found</h1>
              <p className="text-lg text-gray-600 mb-8">{error}</p>
              <Link href="/ai-assessment">
                <Button>Take the Assessment</Button>
              </Link>
            </div>
          </SectionWrapper>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>AI Readiness Report | deployAI Studio</title>
      </Head>

      <ModernNavBar />

      <main>
        {/* Report header */}
        <SectionWrapper variant="gradient" spacing="large">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              AI Business Readiness Report
            </h1>
            <p className="text-lg">
              Personalized recommendations for your AI transformation journey
            </p>
          </div>
        </SectionWrapper>

        {/* Report content */}
        <SectionWrapper variant="default" spacing="large">
          <div className="max-w-4xl mx-auto">
            {/* Print button */}
            <div className="mb-8 text-right no-print">
              <Button
                onClick={() => window.print()}
                intent="outline"
                size="small"
              >
                Print Report
              </Button>
            </div>

            {/* Report viewer placeholder */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: reportContent || '' }}
            />

            {/* CTA section */}
            <div className="mt-16 p-8 bg-gray-50 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center no-print">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Implement AI in Your Business?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Let's discuss your report and create a custom AI solution for your needs.
              </p>
              <Link href="/contact">
                <Button size="large" intent="cta">
                  Schedule a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ReportPage;