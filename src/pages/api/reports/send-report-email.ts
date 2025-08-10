import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReportReadyEmail } from '@/lib/email-templates/report-ready';
import { getEmailSender, EMAIL_CONFIG } from '@/config/email';
import { getBaseUrl } from '@/lib/utils/environment';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendReportEmailRequest {
  reportId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportId, userEmail, firstName, lastName, company } = req.body as SendReportEmailRequest;

    console.log('[SEND-REPORT-EMAIL] Request received');
    console.log('[SEND-REPORT-EMAIL] Report ID:', reportId);
    console.log('[SEND-REPORT-EMAIL] User email:', userEmail);
    
    // Validate required fields (similar to confirmation email)
    if (!reportId || !userEmail || !firstName || !lastName) {
      console.error('[SEND-REPORT-EMAIL] Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = supabaseAdmin();

    // Get report access token for URL generation
    console.log('[SEND-REPORT-EMAIL] Fetching report access token...');
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .select('access_token')
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      console.error('[SEND-REPORT-EMAIL] Failed to fetch report:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }
    
    console.log('[SEND-REPORT-EMAIL] Report access token fetched successfully');

    // Generate report URL with access token
    const baseUrl = getBaseUrl(req);
    const reportUrl = `${baseUrl}/report/view/${report.access_token}`;
    
    console.log('[SEND-REPORT-EMAIL] Base URL:', baseUrl);
    console.log('[SEND-REPORT-EMAIL] Report URL:', reportUrl);

    // Generate email HTML (using passed user data)
    const emailHtml = generateReportReadyEmail({
      firstName: firstName,
      lastName: lastName,
      company: company,
      reportUrl
    });

    // Send email
    console.log('[SEND-REPORT-EMAIL] Sending email via Resend...');
    console.log('[SEND-REPORT-EMAIL] To:', userEmail);
    
    const { data, error } = await resend.emails.send({
      from: getEmailSender('reports'),
      to: [userEmail],
      subject: EMAIL_CONFIG.subjects.reportReady(company),
      html: emailHtml,
      tags: [
        { name: 'type', value: 'report-ready' },
        { name: 'report_id', value: reportId }
      ]
    });

    if (error) {
      console.error('[SEND-REPORT-EMAIL] Failed to send email:', error);
      console.error('[SEND-REPORT-EMAIL] Error details:', JSON.stringify(error, null, 2));
      
      // Check for domain verification issues
      if (error.message?.includes('domain') || error.message?.includes('verify')) {
        console.error('[SEND-REPORT-EMAIL] Domain verification issue detected');
        console.error('[SEND-REPORT-EMAIL] Set USE_FALLBACK_SENDER=true in .env to use fallback sender');
      }
      
      return res.status(500).json({ error: 'Failed to send report email', details: error });
    }
    
    console.log('[SEND-REPORT-EMAIL] Email sent successfully!');
    console.log('[SEND-REPORT-EMAIL] Email ID:', data?.id);

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