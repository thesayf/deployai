export interface EmailVerificationData {
  firstName?: string;
  email: string;
  verificationUrl: string;
  expiresInHours?: number;
}

export function generateEmailVerificationEmail(data: EmailVerificationData): string {
  const greeting = data.firstName ? `Hi ${data.firstName}` : 'Hello';
  const expiryTime = data.expiresInHours || 24;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - deployAI</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 35px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">✉️</div>
          <h1 style="color: white; font-size: 24px; margin: 0;">Verify Your Email Address</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">${greeting},</p>

          <p style="margin: 0 0 20px 0;">Thanks for signing up for deployAI! To complete your registration and access your account, please verify your email address.</p>

          <p style="margin: 0 0 30px 0;">Click the button below to verify <strong>${data.email}</strong>:</p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Verify Email Address</a>
          </div>

          <p style="margin: 30px 0 20px 0; font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
          <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333;">
            ${data.verificationUrl}
          </div>

          <!-- Info Box -->
          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 15px; margin: 30px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #1D3557;">ℹ️ Important Information</p>
            <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 14px;">
              <li style="margin-bottom: 5px;">This link will expire in ${expiryTime} hours</li>
              <li style="margin-bottom: 5px;">You must verify your email to access your account</li>
              <li>If you didn't create this account, please ignore this email</li>
            </ul>
          </div>

          <!-- Why Verify -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #333;">Why verify your email?</p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Email verification helps us ensure the security of your account and enables us to send you important notifications about your assessments and reports.
            </p>
          </div>

          <!-- Need Help -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Having trouble?</strong><br>
              If the button doesn't work or the link has expired, please contact us at <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This is an automated email. Please do not reply.</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
