export interface WelcomeEmailData {
  firstName?: string;
  companyName: string;
  subdomain: string;
  dashboardUrl: string;
  assessmentLink: string;
}

export function generateWelcomeEmail(data: WelcomeEmailData): string {
  const greeting = data.firstName ? `Hi ${data.firstName}` : 'Welcome';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to deployAI - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; font-size: 28px; margin: 0 0 10px 0;">Welcome to deployAI!</h1>
          <p style="color: #E0E0E0; margin: 0; font-size: 16px;">Your AI assessment platform is ready</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">${greeting},</p>

          <p style="margin: 0 0 20px 0;">Thank you for signing up for deployAI! Your white-label AI assessment platform for <strong>${data.companyName}</strong> is now active.</p>

          <!-- Trial Info Box -->
          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 30px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #1D3557;">🎉 Your 14-Day Free Trial Has Started</p>
            <p style="margin: 0; color: #333; font-size: 14px;">Full access to all features. No credit card required. Cancel anytime.</p>
          </div>

          <!-- Quick Start Steps -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 30px 0 15px 0;">Quick Start Guide</h2>

          <div style="margin: 20px 0;">
            <div style="display: flex; align-items: start; margin-bottom: 20px;">
              <div style="background: #457B9D; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
              <div>
                <strong style="display: block; margin-bottom: 5px;">Access Your Dashboard</strong>
                <p style="margin: 0; color: #666; font-size: 14px;">View analytics, manage assessments, and configure settings</p>
                <a href="${data.dashboardUrl}" style="display: inline-block; margin-top: 8px; color: #457B9D; text-decoration: none; font-weight: 500;">Go to Dashboard →</a>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 20px;">
              <div style="background: #457B9D; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
              <div>
                <strong style="display: block; margin-bottom: 5px;">Try Your Assessment</strong>
                <p style="margin: 0; color: #666; font-size: 14px;">Experience what your clients will see when they take the assessment</p>
                <a href="${data.assessmentLink}" style="display: inline-block; margin-top: 8px; color: #457B9D; text-decoration: none; font-weight: 500;">Test Assessment →</a>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 20px;">
              <div style="background: #457B9D; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
              <div>
                <strong style="display: block; margin-bottom: 5px;">Share With Your Clients</strong>
                <p style="margin: 0; color: #666; font-size: 14px;">Your unique assessment link:</p>
                <code style="display: block; margin-top: 8px; padding: 10px; background: #f5f5f5; border-radius: 4px; font-size: 13px; word-break: break-all;">${data.assessmentLink}</code>
              </div>
            </div>
          </div>

          <!-- Features Highlight -->
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 6px;">
            <h3 style="color: #1D3557; font-size: 18px; margin: 0 0 15px 0;">What's Included</h3>
            <ul style="margin: 0; padding-left: 20px; color: #333;">
              <li style="margin-bottom: 8px;">AI-powered assessment analysis</li>
              <li style="margin-bottom: 8px;">Branded reports for your clients</li>
              <li style="margin-bottom: 8px;">Real-time analytics dashboard</li>
              <li style="margin-bottom: 8px;">Automatic email notifications</li>
              <li style="margin-bottom: 8px;">Secure, scalable infrastructure</li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="${data.dashboardUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Get Started Now</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Need help getting started?</p>
            <p style="margin: 0; font-size: 14px; color: #666;">Email us at <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a> and we'll be happy to assist.</p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">You're receiving this because you created an account at deployai.studio</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
