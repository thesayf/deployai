import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    hasApiKey: !!process.env.RESEND_API_KEY
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

    // In development/test mode, Resend only allows sending to verified emails
    const toEmail = process.env.NODE_ENV === 'production' 
      ? 'hello@deployai.studio'
      : 'rudihinds@gmail.com'; // Use your verified email for testing

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's default from address
      to: toEmail,
      reply_to: email, // Set reply-to as the user's email
      subject: `New ${type === 'company' ? 'Company' : 'Individual'} Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${type === 'company' ? 'Company' : 'Individual'}</p>
        <p><strong>Name:</strong> ${name}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Type: ${type === 'company' ? 'Company' : 'Individual'}
        Name: ${name}
        ${company ? `Company: ${company}` : ''}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ 
        message: 'Failed to send email',
        error: error.message 
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