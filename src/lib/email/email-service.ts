/**
 * Centralized Email Service
 * All email sending logic in one place to ensure consistency and reliability
 */

import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReportReadyEmail } from '@/lib/email-templates/report-ready';
import { generateWelcomeEmail } from '@/lib/email-templates/auth/welcome';
import { generatePasswordResetEmail } from '@/lib/email-templates/auth/password-reset';
import { generateEmailVerificationEmail } from '@/lib/email-templates/auth/email-verification';
import { generateTeamInvitationEmail } from '@/lib/email-templates/auth/team-invitation';
import { generateUsageWarningEmail } from '@/lib/email-templates/usage/usage-warning';
import { generateLimitReachedEmail } from '@/lib/email-templates/usage/limit-reached';
import { generateFirstOverageEmail } from '@/lib/email-templates/usage/first-overage';
import { generateRequestConfirmationEmail } from '@/lib/email-templates/assessment-requests/request-confirmation';
import { generateAdminNotificationEmail } from '@/lib/email-templates/assessment-requests/admin-notification';
import { generateApprovalEmail } from '@/lib/email-templates/assessment-requests/approval-email';
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
  industry,
  companySize,
  accessToken,
  req
}: {
  reportId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  company?: string;
  industry?: string;
  companySize?: string;
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
      industry,
      companySize,
      reportUrl
    });

    // Send email - using 'assessment' sender which is verified and working
    const { data, error } = await resend.emails.send({
      from: getEmailSender('assessment'),  // Changed to use assessment@ which is verified
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

/**
 * Send welcome email to new user after signup
 */
export async function sendWelcomeEmail({
  email,
  firstName,
  companyName,
  subdomain,
}: {
  email: string;
  firstName?: string;
  companyName: string;
  subdomain: string;
}): Promise<EmailResult> {
  console.log('[WELCOME-EMAIL] Sending welcome email to:', email);

  try {
    const baseUrl = getBaseUrl();
    const dashboardUrl = `${baseUrl}/${subdomain}/admin`;
    const assessmentLink = `${baseUrl}/${subdomain}/assessment`;

    const emailHtml = generateWelcomeEmail({
      firstName,
      companyName,
      subdomain,
      dashboardUrl,
      assessmentLink,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: email,
      subject: `Welcome to deployAI - Your Account is Ready!`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'welcome' },
        { name: 'subdomain', value: subdomain },
      ],
    });

    if (result.error) {
      console.error('[WELCOME-EMAIL] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[WELCOME-EMAIL] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[WELCOME-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail({
  email,
  firstName,
  resetToken,
  expiresInMinutes = 60,
}: {
  email: string;
  firstName?: string;
  resetToken: string;
  expiresInMinutes?: number;
}): Promise<EmailResult> {
  console.log('[PASSWORD-RESET-EMAIL] Sending password reset email to:', email);

  try {
    const baseUrl = getBaseUrl();
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

    const emailHtml = generatePasswordResetEmail({
      firstName,
      email,
      resetUrl,
      expiresInMinutes,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: email,
      subject: 'Reset Your Password - deployAI',
      html: emailHtml,
      tags: [
        { name: 'type', value: 'password_reset' },
      ],
    });

    if (result.error) {
      console.error('[PASSWORD-RESET-EMAIL] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[PASSWORD-RESET-EMAIL] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[PASSWORD-RESET-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send email verification email
 */
export async function sendEmailVerificationEmail({
  email,
  firstName,
  verificationToken,
  expiresInHours = 24,
}: {
  email: string;
  firstName?: string;
  verificationToken: string;
  expiresInHours?: number;
}): Promise<EmailResult> {
  console.log('[EMAIL-VERIFICATION] Sending verification email to:', email);

  try {
    const baseUrl = getBaseUrl();
    const verificationUrl = `${baseUrl}/auth/verify-email?token=${verificationToken}`;

    const emailHtml = generateEmailVerificationEmail({
      firstName,
      email,
      verificationUrl,
      expiresInHours,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: email,
      subject: 'Verify Your Email Address - deployAI',
      html: emailHtml,
      tags: [
        { name: 'type', value: 'email_verification' },
      ],
    });

    if (result.error) {
      console.error('[EMAIL-VERIFICATION] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[EMAIL-VERIFICATION] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[EMAIL-VERIFICATION] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send team invitation email
 */
export async function sendTeamInvitationEmail({
  invitedEmail,
  inviterName,
  companyName,
  role,
  invitationToken,
  expiresInDays = 7,
}: {
  invitedEmail: string;
  inviterName: string;
  companyName: string;
  role: 'admin' | 'member';
  invitationToken: string;
  expiresInDays?: number;
}): Promise<EmailResult> {
  console.log('[TEAM-INVITATION] Sending invitation email to:', invitedEmail);

  try {
    const baseUrl = getBaseUrl();
    const acceptUrl = `${baseUrl}/auth/accept-invitation?token=${invitationToken}`;

    const emailHtml = generateTeamInvitationEmail({
      invitedEmail,
      inviterName,
      companyName,
      role,
      acceptUrl,
      expiresInDays,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: invitedEmail,
      subject: `${inviterName} invited you to join ${companyName} on deployAI`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'team_invitation' },
        { name: 'role', value: role },
      ],
    });

    if (result.error) {
      console.error('[TEAM-INVITATION] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[TEAM-INVITATION] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[TEAM-INVITATION] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send usage warning email (80% or 90% limit reached)
 */
export async function sendUsageWarningEmail({
  tenantId,
  companyName,
  ownerEmail,
  assessmentsUsed,
  assessmentsLimit,
  percentageUsed,
  currentTier,
  overagePrice,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  assessmentsUsed: number;
  assessmentsLimit: number;
  percentageUsed: number;
  currentTier: string;
  overagePrice: number;
  subdomain: string;
}): Promise<EmailResult> {
  console.log('[USAGE-WARNING] Sending usage warning email:', {
    companyName,
    percentageUsed,
    assessmentsUsed,
    assessmentsLimit,
  });

  try {
    const baseUrl = getBaseUrl();
    const dashboardUrl = `${baseUrl}/${subdomain}/admin/settings/billing`;
    const upgradeUrl = `${baseUrl}/${subdomain}/admin/billing/select-plan`;

    const emailHtml = generateUsageWarningEmail({
      companyName,
      ownerEmail,
      assessmentsUsed,
      assessmentsLimit,
      percentageUsed,
      currentTier,
      dashboardUrl,
      upgradeUrl,
      overagePrice,
    });

    const threshold = percentageUsed >= 90 ? 90 : 80;

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `${threshold}% Assessment Limit Reached - ${companyName}`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'usage_warning' },
        { name: 'tenant_id', value: tenantId },
        { name: 'threshold', value: threshold.toString() },
      ],
    });

    if (result.error) {
      console.error('[USAGE-WARNING] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[USAGE-WARNING] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[USAGE-WARNING] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send limit reached email (100% of assessments used)
 */
export async function sendLimitReachedEmail({
  tenantId,
  companyName,
  ownerEmail,
  assessmentsLimit,
  currentTier,
  overagePrice,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  assessmentsLimit: number;
  currentTier: string;
  overagePrice: number;
  subdomain: string;
}): Promise<EmailResult> {
  console.log('[LIMIT-REACHED] Sending limit reached email:', {
    companyName,
    assessmentsLimit,
  });

  try {
    const baseUrl = getBaseUrl();
    const dashboardUrl = `${baseUrl}/${subdomain}/admin/settings/billing`;
    const upgradeUrl = `${baseUrl}/${subdomain}/admin/billing/select-plan`;

    const emailHtml = generateLimitReachedEmail({
      companyName,
      ownerEmail,
      assessmentsLimit,
      currentTier,
      dashboardUrl,
      upgradeUrl,
      overagePrice,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `Assessment Limit Reached - ${companyName}`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'limit_reached' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    if (result.error) {
      console.error('[LIMIT-REACHED] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[LIMIT-REACHED] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[LIMIT-REACHED] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send first overage notification email
 */
export async function sendFirstOverageEmail({
  tenantId,
  companyName,
  ownerEmail,
  assessmentsLimit,
  assessmentsUsed,
  overageCount,
  overagePrice,
  currentOverageCharge,
  currentTier,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  assessmentsLimit: number;
  assessmentsUsed: number;
  overageCount: number;
  overagePrice: number;
  currentOverageCharge: number;
  currentTier: string;
  subdomain: string;
}): Promise<EmailResult> {
  console.log('[FIRST-OVERAGE] Sending first overage notification:', {
    companyName,
    assessmentsUsed,
    overageCount,
    currentOverageCharge,
  });

  try {
    const baseUrl = getBaseUrl();
    const dashboardUrl = `${baseUrl}/${subdomain}/admin/settings/billing`;
    const upgradeUrl = `${baseUrl}/${subdomain}/admin/billing/select-plan`;

    const emailHtml = generateFirstOverageEmail({
      companyName,
      ownerEmail,
      assessmentsLimit,
      assessmentsUsed,
      overageCount,
      overagePrice,
      currentOverageCharge,
      currentTier,
      dashboardUrl,
      upgradeUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `Overage Billing Active - ${companyName}`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'first_overage' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    if (result.error) {
      console.error('[FIRST-OVERAGE] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[FIRST-OVERAGE] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[FIRST-OVERAGE] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send assessment request confirmation email to candidate
 */
export async function sendRequestConfirmationEmail({
  candidateFirstName,
  candidateLastName,
  candidateEmail,
  companyName,
  requestedAt,
}: {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  companyName: string;
  requestedAt: string;
}): Promise<EmailResult> {
  console.log('[REQUEST-CONFIRMATION] Sending confirmation to:', candidateEmail);

  try {
    const emailHtml = generateRequestConfirmationEmail({
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      companyName,
      requestedAt,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: candidateEmail,
      subject: `Assessment Request Received - ${companyName}`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'assessment_request_confirmation' },
      ],
    });

    if (result.error) {
      console.error('[REQUEST-CONFIRMATION] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[REQUEST-CONFIRMATION] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[REQUEST-CONFIRMATION] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send admin notification email for new assessment request
 */
export async function sendAdminNotificationEmail({
  adminEmail,
  companyName,
  candidateFirstName,
  candidateLastName,
  candidateEmail,
  candidateCompany,
  requestId,
  requestedAt,
  subdomain,
}: {
  adminEmail: string;
  companyName: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany?: string;
  requestId: string;
  requestedAt: string;
  subdomain: string;
}): Promise<EmailResult> {
  console.log('[ADMIN-NOTIFICATION] Sending notification to admin:', adminEmail);

  try {
    const baseUrl = getBaseUrl();
    const approveUrl = `${baseUrl}/${subdomain}/admin/assessment-requests?action=approve&id=${requestId}`;
    const dashboardUrl = `${baseUrl}/${subdomain}/admin/assessment-requests`;

    const emailHtml = generateAdminNotificationEmail({
      adminEmail,
      companyName,
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      candidateCompany,
      requestId,
      requestedAt,
      approveUrl,
      dashboardUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: adminEmail,
      subject: `New Assessment Request from ${candidateFirstName} ${candidateLastName}`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'assessment_request_admin_notification' },
        { name: 'request_id', value: requestId },
      ],
    });

    if (result.error) {
      console.error('[ADMIN-NOTIFICATION] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[ADMIN-NOTIFICATION] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[ADMIN-NOTIFICATION] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send assessment approval email with link to candidate
 */
export async function sendApprovalEmail({
  candidateFirstName,
  candidateLastName,
  candidateEmail,
  companyName,
  assessmentLink,
  approvedAt,
  expiresInDays = 30,
}: {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  companyName: string;
  assessmentLink: string;
  approvedAt: string;
  expiresInDays?: number;
}): Promise<EmailResult> {
  console.log('[APPROVAL-EMAIL] Sending approval to:', candidateEmail);

  try {
    const emailHtml = generateApprovalEmail({
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      companyName,
      assessmentLink,
      approvedAt,
      expiresInDays,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: candidateEmail,
      subject: `Your Assessment is Ready - ${companyName}`,
      html: emailHtml,
      tags: [
        { name: 'type', value: 'assessment_request_approved' },
      ],
    });

    if (result.error) {
      console.error('[APPROVAL-EMAIL] Resend error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[APPROVAL-EMAIL] Email sent successfully, ID:', result.data?.id);
    return { success: true, emailId: result.data?.id };
  } catch (error) {
    console.error('[APPROVAL-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================================================
// Billing/Subscription Emails
// ============================================================================

/**
 * Send trial ending notification email (3 days before trial ends)
 */
export async function sendTrialEndingEmail({
  tenantId,
  companyName,
  ownerEmail,
  trialEndsAt,
  daysRemaining,
  assessmentsUsed,
  currentTier,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  trialEndsAt: string;
  daysRemaining: number;
  assessmentsUsed: number;
  currentTier: string;
  subdomain: string;
}): Promise<EmailResult> {
  try {
    const { generateTrialEndingEmail } = await import('../email-templates/billing/trial-ending');

    const dashboardUrl = `https://${subdomain}.deployai.studio/dashboard`;
    const selectPlanUrl = `https://${subdomain}.deployai.studio/dashboard/billing`;

    const htmlContent = generateTrialEndingEmail({
      companyName,
      ownerEmail,
      trialEndsAt,
      daysRemaining,
      assessmentsUsed,
      currentTier,
      selectPlanUrl,
      dashboardUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `⏰ Your trial ends in ${daysRemaining} days - Select your plan`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'billing' },
        { name: 'type', value: 'trial-ending' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[TRIAL-ENDING-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[TRIAL-ENDING-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send payment failed notification email
 */
export async function sendPaymentFailedEmail({
  tenantId,
  companyName,
  ownerEmail,
  amountDue,
  currency,
  failedAt,
  retryDate,
  gracePeriodDays,
  currentTier,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  amountDue: number;
  currency: string;
  failedAt: string;
  retryDate?: string;
  gracePeriodDays: number;
  currentTier: string;
  subdomain: string;
}): Promise<EmailResult> {
  try {
    const { generatePaymentFailedEmail } = await import('../email-templates/billing/payment-failed');

    const dashboardUrl = `https://${subdomain}.deployai.studio/dashboard`;
    const updatePaymentUrl = `https://${subdomain}.deployai.studio/dashboard/billing`;

    const htmlContent = generatePaymentFailedEmail({
      companyName,
      ownerEmail,
      amountDue,
      currency,
      failedAt,
      retryDate,
      gracePeriodDays,
      updatePaymentUrl,
      dashboardUrl,
      currentTier,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `⚠️ Payment Failed - Action Required`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'billing' },
        { name: 'type', value: 'payment-failed' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[PAYMENT-FAILED-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[PAYMENT-FAILED-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send payment succeeded confirmation email (receipt)
 */
export async function sendPaymentSucceededEmail({
  tenantId,
  companyName,
  ownerEmail,
  amountPaid,
  currency,
  paidAt,
  currentTier,
  nextBillingDate,
  assessmentsIncluded,
  assessmentsUsed,
  overageCharges,
  invoiceUrl,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  amountPaid: number;
  currency: string;
  paidAt: string;
  currentTier: string;
  nextBillingDate: string;
  assessmentsIncluded: number;
  assessmentsUsed: number;
  overageCharges?: number;
  invoiceUrl?: string;
  subdomain: string;
}): Promise<EmailResult> {
  try {
    const { generatePaymentSucceededEmail } = await import('../email-templates/billing/payment-succeeded');

    const dashboardUrl = `https://${subdomain}.deployai.studio/dashboard`;

    const htmlContent = generatePaymentSucceededEmail({
      companyName,
      ownerEmail,
      amountPaid,
      currency,
      paidAt,
      currentTier,
      nextBillingDate,
      assessmentsIncluded,
      assessmentsUsed,
      overageCharges,
      invoiceUrl,
      dashboardUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `✅ Payment Received - ${companyName}`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'billing' },
        { name: 'type', value: 'payment-succeeded' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[PAYMENT-SUCCEEDED-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[PAYMENT-SUCCEEDED-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send subscription activated welcome email
 */
export async function sendSubscriptionActivatedEmail({
  tenantId,
  companyName,
  ownerEmail,
  planName,
  planPrice,
  currency,
  assessmentsIncluded,
  overagePrice,
  billingCycle,
  nextBillingDate,
  activatedAt,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  planName: string;
  planPrice: number;
  currency: string;
  assessmentsIncluded: number;
  overagePrice: number;
  billingCycle: string;
  nextBillingDate: string;
  activatedAt: string;
  subdomain: string;
}): Promise<EmailResult> {
  try {
    const { generateSubscriptionActivatedEmail } = await import('../email-templates/billing/subscription-activated');

    const dashboardUrl = `https://${subdomain}.deployai.studio/dashboard`;
    const assessmentLink = `https://${subdomain}.deployai.studio/assessment`;

    const htmlContent = generateSubscriptionActivatedEmail({
      companyName,
      ownerEmail,
      planName,
      planPrice,
      currency,
      assessmentsIncluded,
      overagePrice,
      billingCycle,
      nextBillingDate,
      activatedAt,
      assessmentLink,
      dashboardUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `🎉 Welcome to deployAI - Your ${planName} subscription is active`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'billing' },
        { name: 'type', value: 'subscription-activated' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[SUBSCRIPTION-ACTIVATED-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[SUBSCRIPTION-ACTIVATED-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send subscription updated notification email
 */
export async function sendSubscriptionUpdatedEmail({
  tenantId,
  companyName,
  ownerEmail,
  oldPlanName,
  newPlanName,
  newPlanPrice,
  currency,
  assessmentsIncluded,
  overagePrice,
  effectiveDate,
  nextBillingDate,
  proratedCredit,
  proratedCharge,
  isUpgrade,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  oldPlanName: string;
  newPlanName: string;
  newPlanPrice: number;
  currency: string;
  assessmentsIncluded: number;
  overagePrice: number;
  effectiveDate: string;
  nextBillingDate: string;
  proratedCredit?: number;
  proratedCharge?: number;
  isUpgrade: boolean;
  subdomain: string;
}): Promise<EmailResult> {
  try {
    const { generateSubscriptionUpdatedEmail } = await import('../email-templates/billing/subscription-updated');

    const dashboardUrl = `https://${subdomain}.deployai.studio/dashboard`;

    const htmlContent = generateSubscriptionUpdatedEmail({
      companyName,
      ownerEmail,
      oldPlanName,
      newPlanName,
      newPlanPrice,
      currency,
      assessmentsIncluded,
      overagePrice,
      effectiveDate,
      nextBillingDate,
      proratedCredit,
      proratedCharge,
      dashboardUrl,
      isUpgrade,
    });

    const changeType = isUpgrade ? 'Upgrade' : 'Update';
    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `${isUpgrade ? '🚀' : '🔄'} Subscription ${changeType} Confirmed - ${newPlanName}`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'billing' },
        { name: 'type', value: 'subscription-updated' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[SUBSCRIPTION-UPDATED-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[SUBSCRIPTION-UPDATED-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send subscription canceled notification email
 */
export async function sendSubscriptionCanceledEmail({
  tenantId,
  companyName,
  ownerEmail,
  planName,
  canceledAt,
  accessEndsAt,
  daysRemaining,
  assessmentsCompleted,
  cancellationReason,
  feedbackUrl,
  subdomain,
}: {
  tenantId: string;
  companyName: string;
  ownerEmail: string;
  planName: string;
  canceledAt: string;
  accessEndsAt: string;
  daysRemaining: number;
  assessmentsCompleted: number;
  cancellationReason?: string;
  feedbackUrl?: string;
  subdomain: string;
}): Promise<EmailResult> {
  try {
    const { generateSubscriptionCanceledEmail } = await import('../email-templates/billing/subscription-canceled');

    const dashboardUrl = `https://${subdomain}.deployai.studio/dashboard`;
    const reactivateUrl = `https://${subdomain}.deployai.studio/dashboard/billing`;

    const htmlContent = generateSubscriptionCanceledEmail({
      companyName,
      ownerEmail,
      planName,
      canceledAt,
      accessEndsAt,
      daysRemaining,
      assessmentsCompleted,
      cancellationReason,
      feedbackUrl,
      reactivateUrl,
      dashboardUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: ownerEmail,
      subject: `👋 Subscription Canceled - We're sorry to see you go`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'billing' },
        { name: 'type', value: 'subscription-canceled' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[SUBSCRIPTION-CANCELED-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[SUBSCRIPTION-CANCELED-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================================================
// Admin Notification Emails
// ============================================================================

/**
 * Send assessment completed notification email to admin
 */
export async function sendAssessmentCompletedNotification({
  tenantId,
  adminEmail,
  companyName,
  candidateFirstName,
  candidateLastName,
  candidateEmail,
  candidateCompany,
  industry,
  companySize,
  completedAt,
  assessmentId,
  reportId,
  subdomain,
  assessmentsUsed,
  assessmentsLimit,
  currentTier,
}: {
  tenantId: string;
  adminEmail: string;
  companyName: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany: string;
  industry?: string;
  companySize?: string;
  completedAt: string;
  assessmentId: string;
  reportId: string;
  subdomain: string;
  assessmentsUsed: number;
  assessmentsLimit: number;
  currentTier: string;
}): Promise<EmailResult> {
  try {
    const { generateAssessmentCompletedEmail } = await import('../email-templates/admin-notifications/assessment-completed');

    const htmlContent = generateAssessmentCompletedEmail({
      adminEmail,
      companyName,
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      candidateCompany,
      industry,
      companySize,
      completedAt,
      assessmentId,
      reportId,
      subdomain,
      assessmentsUsed,
      assessmentsLimit,
      currentTier,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: adminEmail,
      subject: `✅ New Assessment Completed - ${candidateFirstName} ${candidateLastName}`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'admin-notification' },
        { name: 'type', value: 'assessment-completed' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[ASSESSMENT-COMPLETED-NOTIFICATION] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[ASSESSMENT-COMPLETED-NOTIFICATION] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send weekly activity summary email to admin
 */
export async function sendWeeklySummaryEmail({
  tenantId,
  adminEmail,
  companyName,
  subdomain,
  weekStart,
  weekEnd,
  assessmentsCompleted,
  newAssessments,
  assessmentsUsed,
  assessmentsLimit,
  currentTier,
  overageCount,
  topIndustries,
}: {
  tenantId: string;
  adminEmail: string;
  companyName: string;
  subdomain: string;
  weekStart: string;
  weekEnd: string;
  assessmentsCompleted: number;
  newAssessments: Array<{
    candidateName: string;
    candidateEmail: string;
    candidateCompany: string;
    completedAt: string;
    assessmentId: string;
  }>;
  assessmentsUsed: number;
  assessmentsLimit: number;
  currentTier: string;
  overageCount: number;
  topIndustries: Array<{ industry: string; count: number }>;
}): Promise<EmailResult> {
  try {
    const { generateWeeklySummaryEmail } = await import('../email-templates/admin-notifications/weekly-summary');

    const htmlContent = generateWeeklySummaryEmail({
      adminEmail,
      companyName,
      subdomain,
      weekStart,
      weekEnd,
      assessmentsCompleted,
      newAssessments,
      assessmentsUsed,
      assessmentsLimit,
      currentTier,
      overageCount,
      topIndustries,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: adminEmail,
      subject: `📊 Weekly Summary - ${assessmentsCompleted} assessment${assessmentsCompleted !== 1 ? 's' : ''} this week`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'admin-notification' },
        { name: 'type', value: 'weekly-summary' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[WEEKLY-SUMMARY-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[WEEKLY-SUMMARY-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send monthly digest email to admin
 */
export async function sendMonthlyDigestEmail({
  tenantId,
  adminEmail,
  companyName,
  subdomain,
  month,
  year,
  totalAssessments,
  assessmentsLimit,
  currentTier,
  overageCount,
  topPerformingDays,
  industryBreakdown,
  companySizeBreakdown,
  averageCompletionTime,
  completionRate,
}: {
  tenantId: string;
  adminEmail: string;
  companyName: string;
  subdomain: string;
  month: string;
  year: number;
  totalAssessments: number;
  assessmentsLimit: number;
  currentTier: string;
  overageCount: number;
  topPerformingDays: Array<{ date: string; count: number }>;
  industryBreakdown: Array<{ industry: string; count: number; percentage: number }>;
  companySizeBreakdown: Array<{ size: string; count: number; percentage: number }>;
  averageCompletionTime?: number;
  completionRate?: number;
}): Promise<EmailResult> {
  try {
    const { generateMonthlyDigestEmail } = await import('../email-templates/admin-notifications/monthly-digest');

    const htmlContent = generateMonthlyDigestEmail({
      adminEmail,
      companyName,
      subdomain,
      month,
      year,
      totalAssessments,
      assessmentsLimit,
      currentTier,
      overageCount,
      topPerformingDays,
      industryBreakdown,
      companySizeBreakdown,
      averageCompletionTime,
      completionRate,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: adminEmail,
      subject: `📈 Monthly Digest - ${month} ${year} Report`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'admin-notification' },
        { name: 'type', value: 'monthly-digest' },
        { name: 'tenant_id', value: tenantId },
      ],
    });

    console.log('[MONTHLY-DIGEST-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[MONTHLY-DIGEST-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================================================
// Candidate Follow-up Emails
// ============================================================================

/**
 * Send feedback request email to candidate after they view their report
 */
export async function sendFeedbackRequestEmail({
  candidateFirstName,
  candidateLastName,
  candidateEmail,
  candidateCompany,
  companyName,
  reportViewedAt,
  feedbackUrl,
  reportUrl,
}: {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany: string;
  companyName: string;
  reportViewedAt: string;
  feedbackUrl: string;
  reportUrl: string;
}): Promise<EmailResult> {
  try {
    const { generateFeedbackRequestEmail } = await import('../email-templates/candidate-followup/feedback-request');

    const htmlContent = generateFeedbackRequestEmail({
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      candidateCompany,
      companyName,
      reportViewedAt,
      feedbackUrl,
      reportUrl,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: candidateEmail,
      subject: `💭 Share your thoughts on your AI assessment - ${companyName}`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'candidate-followup' },
        { name: 'type', value: 'feedback-request' },
      ],
    });

    console.log('[FEEDBACK-REQUEST-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[FEEDBACK-REQUEST-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send assessment reminder email to candidate who started but didn't complete
 */
export async function sendAssessmentReminderEmail({
  candidateFirstName,
  candidateLastName,
  candidateEmail,
  candidateCompany,
  companyName,
  startedAt,
  assessmentLink,
  daysAgo,
  expiresInDays,
}: {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany: string;
  companyName: string;
  startedAt: string;
  assessmentLink: string;
  daysAgo: number;
  expiresInDays?: number;
}): Promise<EmailResult> {
  try {
    const { generateAssessmentReminderEmail } = await import('../email-templates/candidate-followup/assessment-reminder');

    const htmlContent = generateAssessmentReminderEmail({
      candidateFirstName,
      candidateLastName,
      candidateEmail,
      candidateCompany,
      companyName,
      startedAt,
      assessmentLink,
      daysAgo,
      expiresInDays,
    });

    const result = await resend.emails.send({
      from: getEmailSender('assessment'),
      to: candidateEmail,
      subject: `⏰ Complete Your AI Assessment - ${companyName}`,
      html: htmlContent,
      tags: [
        { name: 'category', value: 'candidate-followup' },
        { name: 'type', value: 'assessment-reminder' },
      ],
    });

    console.log('[ASSESSMENT-REMINDER-EMAIL] Sent successfully:', result.data?.id);
    return { success: true };
  } catch (error) {
    console.error('[ASSESSMENT-REMINDER-EMAIL] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}