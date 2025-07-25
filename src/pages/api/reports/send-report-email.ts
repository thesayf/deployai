import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReportReadyEmail } from '@/lib/email-templates/report-ready';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendReportEmailRequest {
  reportId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { reportId } = req.body as SendReportEmailRequest;

    if (!reportId) {
      return res.status(400).json({ error: 'Missing report ID' });
    }

    const supabase = supabaseAdmin();

    // Get report and quiz data
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .select(`
        *,
        quiz_responses (
          user_email,
          user_first_name,
          user_last_name,
          user_company,
          total_score
        )
      `)
      .eq('id', reportId)
      .single();

    if (reportError || !report || !report.quiz_responses) {
      console.error('Failed to fetch report data:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }

    const quizData = report.quiz_responses;

    // Determine score category
    let scoreCategory = 'Early Stage';
    if (quizData.total_score >= 35) {
      scoreCategory = 'High AI Readiness';
    } else if (quizData.total_score >= 25) {
      scoreCategory = 'Medium AI Readiness';
    }

    // Generate report URL
    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/${report.access_token}`;

    // Generate email HTML
    const emailHtml = generateReportReadyEmail({
      firstName: quizData.user_first_name,
      lastName: quizData.user_last_name,
      company: quizData.user_company,
      score: quizData.total_score,
      scoreCategory,
      reportUrl
    });

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'AI Reports <reports@deployai.studio>',
      to: [quizData.user_email],
      subject: `Your AI Business Readiness Report is Ready! (Score: ${quizData.total_score}/50)`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'report-ready' },
        { name: 'score', value: quizData.total_score.toString() },
        { name: 'score_category', value: scoreCategory.toLowerCase().replace(' ', '_') },
        { name: 'report_id', value: reportId }
      ]
    });

    if (error) {
      console.error('Failed to send email:', error);
      return res.status(500).json({ error: 'Failed to send report email' });
    }

    res.status(200).json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Error sending report email:', error);
    res.status(500).json({ 
      error: 'Failed to send report email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}