export interface PasswordResetEmailData {
  firstName?: string;
  email: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

export function generatePasswordResetEmail(data: PasswordResetEmailData): string {
  const greeting = data.firstName ? `Hi ${data.firstName}` : 'Hello';
  const expiryTime = data.expiresInMinutes || 60;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - deployAI</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: #457B9D; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; font-size: 24px; margin: 0;">Reset Your Password</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">${greeting},</p>

          <p style="margin: 0 0 20px 0;">We received a request to reset the password for your deployAI account associated with <strong>${data.email}</strong>.</p>

          <p style="margin: 0 0 30px 0;">Click the button below to create a new password:</p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Reset Password</a>
          </div>

          <p style="margin: 30px 0 20px 0; font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
          <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333;">
            ${data.resetUrl}
          </div>

          <!-- Warning Box -->
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 30px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #856404;">⚠️ Important Security Information</p>
            <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 14px;">
              <li style="margin-bottom: 5px;">This link will expire in ${expiryTime} minutes</li>
              <li style="margin-bottom: 5px;">This link can only be used once</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
          </div>

          <!-- Didn't Request -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Didn't request a password reset?</strong><br>
              If you didn't make this request, you can safely ignore this email. Your password will not be changed.
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This is an automated security email. Please do not reply.</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
