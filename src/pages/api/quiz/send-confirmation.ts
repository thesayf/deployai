import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { getEmailSender, EMAIL_CONFIG } from '@/config/email';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { 
      quizId, 
      reportId, 
      userEmail, 
      firstName, 
      lastName, 
      company 
    } = req.body as SendConfirmationRequest;

    console.log('[CONFIRMATION-EMAIL] Request received for:', userEmail);
    console.log('[CONFIRMATION-EMAIL] Quiz ID:', quizId);
    console.log('[CONFIRMATION-EMAIL] Report ID:', reportId);

    // Validate required fields
    if (!quizId || !reportId || !userEmail || !firstName || !lastName) {
      console.error('[CONFIRMATION-EMAIL] Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = supabaseAdmin();

    // Verify quiz exists
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('id, industry, company_size')
      .eq('id', quizId)
      .single();

    if (quizError || !quizData) {
      console.error('Failed to fetch quiz data:', quizError);
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Send confirmation email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your AI Assessment is Being Processed</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #457B9D 0%, #3a6a89 100%); padding: 40px 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { padding: 30px; background: #1a1a1a; color: white; text-align: center; }
          .button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #457B9D 0%, #3a6a89 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .score-preview { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Taking the AI Readiness Assessment!</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>Thank you for completing the AI Readiness Assessment${company ? ` for ${company}` : ''}. Our AI is currently analyzing your responses to identify the best opportunities for AI implementation in your business.</p>
            
            <div class="score-preview">
              <h3>Analysis in Progress</h3>
              <p style="font-size: 24px; color: #457B9D; margin: 10px 0;">🔍 Identifying AI Opportunities</p>
              <p style="color: #666;">Our AI is researching solutions specific to your ${quizData.industry || 'industry'}</p>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
              <li><strong>Report Generation:</strong> Your detailed AI strategy report is being generated and will be sent to this email within the next 5-10 minutes.</li>
              <li><strong>Personalized Insights:</strong> Based on your responses, we'll provide industry-specific recommendations and implementation strategies.</li>
              <li><strong>Action Plan:</strong> Your report will include a practical roadmap for AI adoption in your organization.</li>
            </ul>
            
            <p>The report will include:</p>
            <ul>
              <li>Detailed analysis of your AI readiness</li>
              <li>Industry-specific opportunities</li>
              <li>Recommended AI tools and technologies</li>
              <li>Implementation timeline and priorities</li>
              <li>ROI projections and cost estimates</li>
            </ul>
            
            <p>Keep an eye on your inbox - your comprehensive report will arrive shortly!</p>
          </div>
          
          <div class="footer">
            <h3>Need Help Implementing AI?</h3>
            <p>Our team specializes in custom AI solutions for businesses like yours.</p>
            <a href="https://deployai.studio/contact" class="button" style="color: white;">Schedule a Consultation</a>
            <p style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
              © ${new Date().getFullYear()} deployAI Studio. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: [userEmail],
      subject: EMAIL_CONFIG.subjects.confirmation,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'assessment-confirmation' },
        { name: 'quiz_id', value: quizId }
      ]
    });

    if (error) {
      console.error('[CONFIRMATION-EMAIL] Failed to send email:', error);
      console.error('[CONFIRMATION-EMAIL] Error details:', JSON.stringify(error, null, 2));
      console.error('[CONFIRMATION-EMAIL] Attempted to send to:', userEmail);
      console.error('[CONFIRMATION-EMAIL] From address:', getEmailSender('assessment'));
      
      // Check for domain verification issues
      if (error.message?.includes('domain') || error.message?.includes('verify')) {
        console.error('[CONFIRMATION-EMAIL] Domain verification issue detected');
        console.error('[CONFIRMATION-EMAIL] Set USE_FALLBACK_SENDER=true in .env to use fallback sender');
      }
      
      return res.status(500).json({ error: 'Failed to send confirmation email', details: error });
    }
    
    console.log('[CONFIRMATION-EMAIL] Email sent successfully to:', userEmail);
    console.log('[CONFIRMATION-EMAIL] Email ID:', data?.id);

    res.status(200).json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ 
      error: 'Failed to send confirmation email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}