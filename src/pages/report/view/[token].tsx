import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProfessionalReport } from '@/components/report/ProfessionalReport';
import type { ReportData } from '@/components/report/types';
import { Loader2, AlertCircle } from 'lucide-react';

interface ReportViewPageProps {
  accessToken: string;
}

export default function ReportViewPage({ accessToken }: ReportViewPageProps) {
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      fetchReport();
    }
  }, [accessToken]);

  const fetchReport = async () => {
    try {
      // Fetch report using access token
      const { data, error } = await supabase
        .from('ai_reports')
        .select(`
          id,
          stage4_report_content,
          report_status,
          email_sent_at,
          access_count,
          company_name
        `)
        .eq('access_token', accessToken)
        .single();

      if (error || !data) {
        console.error('Error fetching report:', error);
        setError('Report not found or access denied');
        return;
      }

      if (data.report_status !== 'completed') {
        setError('Your report is still being generated. Please check back in a few minutes.');
        return;
      }

      if (!data.stage4_report_content) {
        setError('Report content is not available yet. Please try again later.');
        return;
      }

      setReport(data);

      // Update access count (fire and forget)
      // Note: access_count and report_accessed_at columns may not exist yet
      // Commenting out for safety, can be enabled when columns are confirmed
      // const updateAccessCount = async () => {
      //   try {
      //     await supabase
      //       .from('ai_reports')
      //       .update({ 
      //         access_count: (data.access_count || 0) + 1,
      //         report_accessed_at: new Date().toISOString()
      //       })
      //       .eq('access_token', accessToken);
      //   } catch (err) {
      //     console.error('Failed to update access count:', err);
      //   }
      // };
      // updateAccessCount();

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your personalized AI report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border-3 border-black p-8 shadow-hard max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Unable to Load Report</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-black text-white font-bold uppercase hover:shadow-hard-lg transition-shadow"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => router.push('/ai-assessment')}
              className="w-full px-6 py-3 bg-white text-black font-bold uppercase border-3 border-black hover:shadow-hard-lg transition-shadow"
            >
              Take Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <>
      <Head>
        <title>AI Readiness Report - {report?.company_name || 'Your Organization'}</title>
        <meta name="description" content="Your personalized AI readiness assessment and implementation roadmap" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Print Header */}
      <div className="bg-white border-b-3 border-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-end">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-white text-black font-medium border-2 border-black hover:shadow-hard transition-all"
            >
              Print Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <ProfessionalReport
        data={report.stage4_report_content as unknown as ReportData}
        companyName={report.company_name || 'Your Organization'}
        generatedDate={report.email_sent_at ? new Date(report.email_sent_at) : new Date()}
        variant="executive"
        onScheduleConsultation={() => {
          window.open('https://calendly.com/deployai-consultation', '_blank');
        }}
      />

      {/* Footer CTA */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Implement These Solutions?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team of AI experts is ready to help you transform these recommendations into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/deployai-consultation', '_blank')}
              className="px-8 py-3 bg-white text-black font-bold uppercase border-3 border-white hover:shadow-hard-lg transition-shadow"
            >
              Schedule Free Consultation
            </button>
            <button
              onClick={() => router.push('/ai-assessment')}
              className="px-8 py-3 bg-transparent text-white font-bold uppercase border-3 border-white hover:bg-white hover:text-black transition-all"
            >
              Take Another Assessment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.params as { token: string };

  if (!token) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      accessToken: token,
    },
  };
};