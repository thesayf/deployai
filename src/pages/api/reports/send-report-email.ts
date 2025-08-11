import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendReportReadyEmail } from '@/lib/email/email-service';

interface SendReportEmailRequest {
  reportId: string;
  userEmail?: string;  // Made optional - can fetch from DB
  firstName?: string;  // Made optional - can fetch from DB
  lastName?: string;   // Made optional - can fetch from DB
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

    console.log('[API] Send report email request received');
    console.log('[API] Report ID:', reportId);
    console.log('[API] User email:', userEmail || 'Will fetch from DB');
    
    // Validate required fields
    if (!reportId) {
      console.error('[API] Missing report ID');
      return res.status(400).json({ error: 'Report ID is required' });
    }

    const supabase = supabaseAdmin();

    // Get report with user data
    console.log('[API] Fetching report and user data...');
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .select(`
        access_token,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company
        )
      `)
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      console.error('[API] Failed to fetch report:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }
    
    console.log('[API] Report access token fetched successfully');
    
    // Extract user data from the joined query
    const userData = Array.isArray(report.quiz_responses) 
      ? report.quiz_responses[0] 
      : report.quiz_responses;
    
    // Use provided data or fallback to DB data
    const finalEmail = userEmail || userData?.user_email;
    const finalFirstName = firstName || userData?.user_first_name || 'there';
    const finalLastName = lastName || userData?.user_last_name || '';
    const finalCompany = company || userData?.user_company;
    
    if (!finalEmail) {
      console.error('[API] No email address available');
      return res.status(400).json({ error: 'No email address found for this report' });
    }

    // Use the email service
    const result = await sendReportReadyEmail({
      reportId,
      userEmail: finalEmail,
      firstName: finalFirstName,
      lastName: finalLastName,
      company: finalCompany,
      accessToken: report.access_token,
      req
    });

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json({ success: true, emailId: result.emailId });
  } catch (error) {
    console.error('Error in send-report-email endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to send report email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}