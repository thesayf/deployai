export interface ApprovalEmailData {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  companyName: string;
  assessmentLink: string;
  approvedAt: string;
  expiresInDays?: number;
}

export function generateApprovalEmail(data: ApprovalEmailData): string {
  const expiryDays = data.expiresInDays || 30;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Assessment Approved - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">🎉</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Request Approved!</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">Your assessment is ready</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.candidateFirstName},</p>

          <p style="margin: 0 0 20px 0;">Great news! Your assessment request has been approved by the <strong>${data.companyName}</strong> team.</p>

          <!-- Success Box -->
          <div style="background: #d1fae5; border: 2px solid #10b981; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 20px; font-weight: 600; color: #065f46; margin-bottom: 12px;">✅ You're All Set!</div>
            <p style="margin: 0; font-size: 14px; color: #047857;">
              Your unique assessment link is ready. Click below to begin.
            </p>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="${data.assessmentLink}" style="display: inline-block; background: #10b981; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">Start Assessment</a>
          </div>

          <div style="text-align: center; margin: 20px 0 30px 0;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">Or copy and paste this link:</p>
            <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333;">
              ${data.assessmentLink}
            </div>
          </div>

          <!-- What to Expect -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What to Expect</h2>

          <div style="space-y: 15px;">
            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">1</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">15 Quick Questions</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Answer questions about your organization's current state and AI readiness</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">2</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">10-15 Minutes</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">The assessment takes most people about 10-15 minutes to complete</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">3</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">Instant Results</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Our AI analyzes your responses and generates your report in about 1 minute</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">4</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">Detailed Report</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Receive a comprehensive analysis with recommendations tailored to your organization</p>
              </div>
            </div>
          </div>

          <!-- Report Contents Preview -->
          <div style="background: #f0f7ff; padding: 25px; margin: 30px 0; border-radius: 8px; border-left: 4px solid #457B9D;">
            <div style="font-size: 16px; font-weight: 600; color: #1D3557; margin-bottom: 12px;">📊 Your Report Will Include:</div>
            <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 14px;">
              <li style="margin-bottom: 8px;">Current AI readiness score and analysis</li>
              <li style="margin-bottom: 8px;">Industry-specific opportunities and use cases</li>
              <li style="margin-bottom: 8px;">Step-by-step implementation roadmap</li>
              <li style="margin-bottom: 8px;">Technology and vendor recommendations</li>
              <li style="margin-bottom: 8px;">Investment projections and ROI estimates</li>
              <li style="margin-bottom: 8px;">Risk assessment and mitigation strategies</li>
            </ul>
          </div>

          <!-- Important Info -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; margin: 30px 0; border-radius: 6px;">
            <div style="display: flex; align-items: start;">
              <span style="font-size: 20px; margin-right: 10px;">⏰</span>
              <div>
                <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 14px;">Link Expires in ${expiryDays} Days</strong>
                <p style="margin: 0; font-size: 13px; color: #78350f;">
                  This assessment link is unique to you and will expire on ${new Date(new Date(data.approvedAt).getTime() + expiryDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Please complete it at your earliest convenience.
                </p>
              </div>
            </div>
          </div>

          <!-- Tips -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 12px 0;">💡 Tips for Success</h2>
          <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #666; font-size: 14px;">
            <li style="margin-bottom: 8px;">Set aside 15 uninterrupted minutes</li>
            <li style="margin-bottom: 8px;">Answer based on your current organizational state</li>
            <li style="margin-bottom: 8px;">Be honest - there are no wrong answers</li>
            <li style="margin-bottom: 8px;">You'll receive your report via email immediately after submission</li>
          </ul>

          <!-- Final CTA -->
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 15px 0; font-size: 15px; color: #333; font-weight: 600;">Ready to get started?</p>
            <a href="${data.assessmentLink}" style="display: inline-block; background: #10b981; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Begin Assessment Now</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Need help or have questions?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Contact the ${data.companyName} team or reach out to us at <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong><br>
          <span style="font-size: 13px; color: #666;">on behalf of ${data.companyName}</span></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This email was sent to ${data.candidateEmail}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
