import type { NextApiRequest, NextApiResponse } from 'next';
import { sendConfirmationEmail } from '@/lib/email/email-service';

interface SendConfirmationRequest {
  quizId: string;
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
    const { quizId, reportId, userEmail, firstName, lastName, company } = req.body as SendConfirmationRequest;

    console.log('[API] Send confirmation request received');
    console.log('[API] Quiz ID:', quizId);
    console.log('[API] Report ID:', reportId);
    
    // Validate required fields
    if (!quizId || !reportId || !userEmail || !firstName || !lastName) {
      console.error('[API] Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use the email service
    const result = await sendConfirmationEmail({
      quizId,
      reportId,
      userEmail,
      firstName,
      lastName,
      company
    });

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json({ success: true, emailId: result.emailId });
  } catch (error) {
    console.error('Error in send-confirmation endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to send confirmation email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}