/**
 * Centralized Email Service
 * All email sending logic in one place to ensure consistency and reliability
 */

import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReportReadyEmail } from '@/lib/email-templates/report-ready';
import { getEmailSender, EMAIL_CONFIG } from '@/config/email';
import { getBaseUrl } from '@/lib/utils/environment';
import type { NextApiRequest } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

// Common response type for all email functions
export interface EmailResult {
  success: boolean;
  emailId?: string;
  error?: string;
}

/**
 * Send quiz confirmation email to user
 */
export async function sendConfirmationEmail({
  quizId,
  reportId,
  userEmail,
  firstName,
  lastName,
  company
}: {
  quizId: string;
  reportId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  company?: string;
}): Promise<EmailResult> {
  console.log('[CONFIRMATION-EMAIL] Sending confirmation email');
  console.log('[CONFIRMATION-EMAIL] Quiz ID:', quizId);
  console.log('[CONFIRMATION-EMAIL] Report ID:', reportId);
  console.log('[CONFIRMATION-EMAIL] User email:', userEmail);
  
  try {
    // Fetch quiz data to get industry information
    const supabase = supabaseAdmin();
    const { data: quizData } = await supabase
      .from('quiz_responses')
      .select('industry, company_size')
      .eq('id', quizId)
      .single();

    // Generate confirmation email HTML with original template design
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
          h1 { margin: 0; }
          h3 { color: #333; }
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
              <p style="color: #666;">Our AI is researching solutions specific to your ${quizData?.industry || 'industry'}</p>
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
            
            <p style="margin-top: 30px; padding: 15px; background: #e6f3f7; border-left: 4px solid #457B9D;">
              <strong>Keep an eye on your inbox</strong> - your comprehensive report will arrive shortly!
            </p>
          </div>
          
          <div class="footer">
            <p>Questions? Reply to this email or contact us at hello@deployai.studio</p>
            <p style="font-size: 12px; color: #888; margin-top: 15px;">© ${new Date().getFullYear()} DeployAI. All rights reserved.</p>
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
      return { success: false, error: error.message || 'Failed to send email' };
    }
    
    console.log('[CONFIRMATION-EMAIL] Email sent successfully to:', userEmail);
    console.log('[CONFIRMATION-EMAIL] Email ID:', data?.id);
    
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('[CONFIRMATION-EMAIL] Exception:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send report ready email to user
 */
export async function sendReportReadyEmail({
  reportId,
  userEmail,
  firstName,
  lastName,
  company,
  accessToken,
  req
}: {
  reportId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  company?: string;
  accessToken: string;
  req?: NextApiRequest;
}): Promise<EmailResult> {
  console.log('[REPORT-EMAIL] Sending report ready email');
  console.log('[REPORT-EMAIL] Report ID:', reportId);
  console.log('[REPORT-EMAIL] User email:', userEmail);
  
  try {
    // Generate report URL
    const baseUrl = req ? getBaseUrl(req) : (process.env.NEXT_PUBLIC_APP_URL || 'https://deployai.studio');
    const reportUrl = `${baseUrl}/report/view/${accessToken}`;
    
    console.log('[REPORT-EMAIL] Report URL:', reportUrl);

    // Generate email HTML
    const emailHtml = generateReportReadyEmail({
      firstName,
      lastName,
      company,
      reportUrl
    });

    // Send email
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
      console.error('[REPORT-EMAIL] Failed to send email:', error);
      console.error('[REPORT-EMAIL] Error details:', JSON.stringify(error, null, 2));
      return { success: false, error: error.message || 'Failed to send email' };
    }
    
    console.log('[REPORT-EMAIL] Email sent successfully!');
    console.log('[REPORT-EMAIL] Email ID:', data?.id);

    // Update report to mark email as sent
    const supabase = supabaseAdmin();
    await supabase
      .from('ai_reports')
      .update({
        email_sent_at: new Date().toISOString(),
        report_status: 'completed'
      })
      .eq('id', reportId);
    
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('[REPORT-EMAIL] Exception:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send contact form email
 */
export async function sendContactEmail({
  name,
  company,
  email,
  phone,
  message,
  type
}: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  type: 'company' | 'individual';
}): Promise<EmailResult> {
  console.log('[CONTACT-EMAIL] Sending contact form email');
  console.log('[CONTACT-EMAIL] From:', email);
  
  try {
    const toEmail = 'hello@deployai.studio';
    const fromEmail = 'hello@deployai.studio';

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
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
      console.error('[CONTACT-EMAIL] Failed to send email:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }
    
    console.log('[CONTACT-EMAIL] Email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('[CONTACT-EMAIL] Exception:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}