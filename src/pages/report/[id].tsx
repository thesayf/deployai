import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProfessionalReport } from '@/components/report/ProfessionalReport';
import type { ReportData as ProfessionalReportData } from '@/components/report/types';
import { Loader2, AlertCircle, Lock } from 'lucide-react';
import type { 
  Stage1Analysis, 
  Stage2MarketIntelligence, 
  Stage3FinancialAnalysis, 
  Stage4StrategicRecommendations 
} from '@/types/ai-analysis';

interface ReportData {
  id: string;
  stage1_problem_analysis: Stage1Analysis;
  stage2_tool_research: Stage2MarketIntelligence;
  stage3_tool_selection: Stage3FinancialAnalysis;
  stage4_report_content: Stage4StrategicRecommendations;
  final_report: any;
  report_status: string;
  created_at: string;
  company_name: string;
  quiz_response: {
    user_company: string;
    user_first_name: string;
    user_last_name: string;
  };
}

interface ReportPageProps {
  reportId: string;
  isPublic: boolean;
}

export default function ReportPage({ reportId, isPublic }: ReportPageProps) {
  const router = useRouter();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessKey, setAccessKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_reports')
        .select(`
          id,
          stage1_problem_analysis,
          stage2_tool_research,
          stage3_tool_selection,
          stage4_report_content,
          final_report,
          report_status,
          created_at,
          company_name,
          quiz_responses!inner(
            user_company,
            user_first_name,
            user_last_name
          )
        `)
        .eq('id', reportId)
        .single();

      if (error) {
        console.error('Error fetching report:', error);
        setError('Report not found');
        return;
      }

      if (data.report_status !== 'report_generated' && data.report_status !== 'completed') {
        setError('Report is still being generated. Please check back later.');
        return;
      }

      // Check if we have the final_report data
      if (!data.final_report) {
        setError('Report data is not available yet. Please try again later.');
        return;
      }

      // Transform the data to match our interface
      const reportData: ReportData = {
        ...data,
        quiz_response: Array.isArray(data.quiz_responses) ? data.quiz_responses[0] : data.quiz_responses
      };

      setReport(reportData);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const handleAccessKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, verify the access key
    // For now, we'll use a simple check
    if (accessKey === reportId.slice(0, 8)) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid access key');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border-3 border-black p-8 shadow-hard max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-3 bg-black text-white font-bold uppercase hover:shadow-hard-lg transition-shadow"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // If report is private and not authenticated, show access key form
  if (!isPublic && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border-3 border-black p-8 shadow-hard max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Private Report</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            This report is private. Please enter the access key provided in your email.
          </p>

          <form onSubmit={handleAccessKeySubmit}>
            <input
              type="text"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter access key"
              className="w-full px-4 py-3 border-3 border-black mb-4 font-mono uppercase"
              required
            />
            
            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-white font-bold uppercase hover:shadow-hard-lg transition-shadow"
            >
              Access Report
            </button>
          </form>

          {error && (
            <p className="mt-4 text-red-600 text-center">{error}</p>
          )}
        </div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  const companyName = report.company_name || report.quiz_response.user_company || 
    `${report.quiz_response.user_first_name}'s Company`;

  return (
    <>
      <Head>
        <title>AI Readiness Report - {companyName}</title>
        <meta name="description" content="Your personalized AI readiness assessment and implementation roadmap" />
      </Head>

      <ProfessionalReport
        data={report.final_report as ProfessionalReportData}
        companyName={companyName}
        generatedDate={new Date(report.created_at)}
        variant="executive"
        onScheduleConsultation={() => router.push('/consultation')}
      />

      {/* Footer with actions */}
      <div className="bg-white border-t-3 border-black py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            This report is just the beginning. Let's discuss how to turn these insights into action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-white text-black font-bold uppercase border-3 border-black shadow-hard hover:shadow-hard-lg transition-shadow"
            >
              Print Report
            </button>
            <button
              onClick={() => router.push('/consultation')}
              className="px-8 py-3 bg-black text-white font-bold uppercase border-3 border-black shadow-hard hover:shadow-hard-lg transition-shadow"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const { key } = context.query;

  // Check if this is a public access attempt (with key) or private
  const isPublic = !!key;

  return {
    props: {
      reportId: id as string,
      isPublic
    }
  };
};