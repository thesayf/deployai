import type { NextApiRequest, NextApiResponse } from 'next';
import { sendContactEmail } from '@/lib/email/email-service';

type Data = {
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Log incoming request
  console.log('Contact API called:', {
    method: req.method,
    body: req.body,
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyStarts: process.env.RESEND_API_KEY?.substring(0, 4),
    apiKeyLength: process.env.RESEND_API_KEY?.length
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, company, email, phone, message, type } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      error: 'Name, email, and message are required' 
    });
  }

  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Use the email service
    const result = await sendContactEmail({
      name,
      company,
      email,
      phone,
      message,
      type: type || 'individual'
    });

    if (!result.success) {
      console.error('Contact email failed:', result.error);
      return res.status(400).json({ 
        message: 'Failed to send email',
        error: result.error || 'Unknown error'
      });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}