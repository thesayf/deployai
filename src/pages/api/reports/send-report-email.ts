import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendReportReadyEmail } from '@/lib/email/email-service';

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

    console.log('[API] Send report email request received');
    console.log('[API] Report ID:', reportId);
    console.log('[API] User email:', userEmail);
    
    // Validate required fields
    if (!reportId || !userEmail || !firstName || !lastName) {
      console.error('[API] Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = supabaseAdmin();

    // Get report access token for URL generation
    console.log('[API] Fetching report access token...');
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .select('access_token')
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      console.error('[API] Failed to fetch report:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }
    
    console.log('[API] Report access token fetched successfully');

    // Use the email service
    const result = await sendReportReadyEmail({
      reportId,
      userEmail,
      firstName,
      lastName,
      company,
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