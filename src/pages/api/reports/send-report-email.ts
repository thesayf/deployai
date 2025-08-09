import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReportReadyEmail } from '@/lib/email-templates/report-ready';
import { getEmailSender, EMAIL_CONFIG } from '@/config/email';
import { getBaseUrl } from '@/lib/utils/environment';

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
          industry,
          company_size
        )
      `)
      .eq('id', reportId)
      .single();

    if (reportError || !report || !report.quiz_responses) {
      console.error('Failed to fetch report data:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }

    const quizData = report.quiz_responses;

    // Generate report URL with access token
    const baseUrl = getBaseUrl(req);
    const reportUrl = `${baseUrl}/report/view/${report.access_token}`;
    
    console.log('[REPORT-EMAIL] Sending report email to:', quizData.user_email);
    console.log('[REPORT-EMAIL] Base URL:', baseUrl);
    console.log('[REPORT-EMAIL] Report URL:', reportUrl);

    // Generate email HTML
    const emailHtml = generateReportReadyEmail({
      firstName: quizData.user_first_name,
      lastName: quizData.user_last_name,
      company: quizData.user_company || report.company_name,
      industry: quizData.industry || report.industry_context,
      reportUrl
    });

    // Send email
    const { data, error } = await resend.emails.send({
      from: getEmailSender('reports'),
      to: [quizData.user_email],
      subject: EMAIL_CONFIG.subjects.reportReady(quizData.user_company),
      html: emailHtml,
      tags: [
        { name: 'type', value: 'report-ready' },
        { name: 'industry', value: quizData.industry || 'general' },
        { name: 'company', value: quizData.user_company || 'unknown' },
        { name: 'report_id', value: reportId }
      ]
    });

    if (error) {
      console.error('[REPORT-EMAIL] Failed to send email:', error);
      console.error('[REPORT-EMAIL] Error details:', JSON.stringify(error, null, 2));
      console.error('[REPORT-EMAIL] From address:', getEmailSender('reports'));
      
      // Check for domain verification issues
      if (error.message?.includes('domain') || error.message?.includes('verify')) {
        console.error('[REPORT-EMAIL] Domain verification issue detected');
        console.error('[REPORT-EMAIL] Set USE_FALLBACK_SENDER=true in .env to use fallback sender');
      }
      
      return res.status(500).json({ error: 'Failed to send report email', details: error });
    }
    
    console.log('[REPORT-EMAIL] Email sent successfully. Email ID:', data?.id);

    // Update report to mark email as sent
    await supabase
      .from('ai_reports')
      .update({
        email_sent_at: new Date().toISOString(),
        report_status: 'completed'
      })
      .eq('id', reportId);

    res.status(200).json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Error sending report email:', error);
    res.status(500).json({ 
      error: 'Failed to send report email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}