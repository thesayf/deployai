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
    // Generate confirmation email HTML (inline for now, can be moved to template later)
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 40px; }
          .header h1 { color: #212121; margin: 0; font-size: 28px; }
          .progress { background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden; margin: 30px 0; }
          .progress-bar { background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%); height: 100%; width: 30%; animation: pulse 2s ease-in-out infinite; }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
          .content { margin: 30px 0; }
          .timeline { margin: 30px 0; }
          .timeline-item { display: flex; align-items: center; margin: 20px 0; }
          .timeline-icon { width: 40px; height: 40px; background: #f0f0f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; font-size: 20px; }
          .timeline-icon.active { background: #4CAF50; color: white; }
          .timeline-content h3 { margin: 0; font-size: 16px; }
          .timeline-content p { margin: 5px 0; color: #666; font-size: 14px; }
          .cta { background: #212121; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
          .cta h2 { margin: 0 0 10px 0; }
          .cta p { margin: 10px 0; opacity: 0.9; }
          .button { display: inline-block; background: white; color: #212121; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 10px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0; color: #666; }
          .footer h3 { color: #333; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Your AI Assessment is Being Analyzed</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for completing the AI Readiness Assessment${company ? ` for ${company}` : ''}! Our AI is now analyzing your responses to create a comprehensive implementation roadmap.</p>
            
            <div class="progress">
              <div class="progress-bar"></div>
            </div>
            
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-icon active">✓</div>
                <div class="timeline-content">
                  <h3>Assessment Completed</h3>
                  <p>Your responses have been recorded</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-icon">🤖</div>
                <div class="timeline-content">
                  <h3>AI Analysis in Progress</h3>
                  <p>Processing your business requirements</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-icon">📊</div>
                <div class="timeline-content">
                  <h3>Report Generation</h3>
                  <p>Creating your personalized roadmap (${EMAIL_CONFIG.timing.reportGenerationMinutes})</p>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-icon">📧</div>
                <div class="timeline-content">
                  <h3>Delivery</h3>
                  <p>Report will be sent to this email</p>
                </div>
              </div>
            </div>
            
            <div class="cta">
              <h2>What Happens Next?</h2>
              <p>You'll receive your comprehensive AI implementation report in approximately ${EMAIL_CONFIG.timing.reportGenerationMinutes}.</p>
              <p>The report will include:</p>
              <ul style="text-align: left; display: inline-block;">
                <li>AI readiness score for your organization</li>
                <li>Recommended AI tools and solutions</li>
                <li>Implementation timeline and roadmap</li>
                <li>ROI projections and cost analysis</li>
                <li>Risk assessment and mitigation strategies</li>
              </ul>
            </div>
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