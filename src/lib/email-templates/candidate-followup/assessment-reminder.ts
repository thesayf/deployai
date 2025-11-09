export interface AssessmentReminderEmailData {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany: string;
  companyName: string;
  startedAt: string;
  assessmentLink: string;
  daysAgo: number;
  expiresInDays?: number;
}

export function generateAssessmentReminderEmail(data: AssessmentReminderEmailData): string {
  const startedDate = new Date(data.startedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Complete Your AI Assessment - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">⏰</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Your Assessment is Waiting</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px; font-weight: 600;">Just a few minutes to complete</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.candidateFirstName},</p>

          <p style="margin: 0 0 20px 0;">We noticed you started the AI readiness assessment from ${data.companyName} on ${startedDate}, but didn't get a chance to finish. No worries! Your progress has been saved and you can complete it anytime.</p>

          <!-- Status Box -->
          <div style="background: #fff7ed; border: 2px solid #f59e0b; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 15px;">
              <div style="font-size: 18px; font-weight: 600; color: #92400e; margin-bottom: 8px;">Assessment Status</div>
              <div style="font-size: 32px; font-weight: bold; color: #d97706;">In Progress</div>
            </div>

            <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 6px; margin-top: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 14px; color: #92400e;">Started:</span>
                <strong style="font-size: 14px; color: #78350f;">${startedDate}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 14px; color: #92400e;">Company:</span>
                <strong style="font-size: 14px; color: #78350f;">${data.candidateCompany}</strong>
              </div>
              ${data.expiresInDays ? `
              <div style="display: flex; justify-content: space-between; border-top: 1px solid #fed7aa; padding-top: 8px; margin-top: 8px;">
                <span style="font-size: 14px; color: #92400e;">Expires in:</span>
                <strong style="font-size: 14px; color: #d97706;">${data.expiresInDays} days</strong>
              </div>
              ` : ''}
            </div>
          </div>

          <!-- Why Complete -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Why Complete Your Assessment?</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: start;">
                <span style="color: #457B9D; font-size: 24px; margin-right: 12px; flex-shrink: 0;">📊</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 5px; font-size: 15px;">Personalized Insights</strong>
                  <p style="margin: 0; font-size: 14px; color: #666;">
                    Get a comprehensive analysis of your organization's AI readiness tailored to your specific industry and size.
                  </p>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid #cbd5e1; padding-top: 15px; margin-top: 15px; margin-bottom: 15px;">
              <div style="display: flex; align-items: start;">
                <span style="color: #457B9D; font-size: 24px; margin-right: 12px; flex-shrink: 0;">🎯</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 5px; font-size: 15px;">Actionable Roadmap</strong>
                  <p style="margin: 0; font-size: 14px; color: #666;">
                    Receive a step-by-step implementation plan with specific technologies and strategies for your business.
                  </p>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid #cbd5e1; padding-top: 15px; margin-top: 15px;">
              <div style="display: flex; align-items: start;">
                <span style="color: #457B9D; font-size: 24px; margin-right: 12px; flex-shrink: 0;">💡</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 5px; font-size: 15px;">Strategic Advantage</strong>
                  <p style="margin: 0; font-size: 14px; color: #666;">
                    Understand exactly where AI can drive the most value in your organization and stay ahead of the competition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Reminder -->
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #065f46; margin-bottom: 10px;">⚡ Quick & Easy</div>
            <p style="margin: 0; font-size: 14px; color: #047857;">
              The assessment takes just <strong>10-15 minutes</strong> to complete. All your previous answers have been saved, so you can pick up right where you left off!
            </p>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="${data.assessmentLink}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 56px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">Complete Assessment</a>
          </div>

          <div style="text-align: center; margin: 20px 0 30px 0;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">Or copy and paste this link:</p>
            <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333;">
              ${data.assessmentLink}
            </div>
          </div>

          <!-- What to Expect -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What Happens After You Complete?</h2>

          <div style="space-y: 15px;">
            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">1</div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #333;">
                  <strong>Instant Processing:</strong> Our AI analyzes your responses in about 1 minute
                </p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">2</div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #333;">
                  <strong>Report Delivery:</strong> You'll receive your comprehensive report via email
                </p>
              </div>
            </div>

            <div style="display: flex; align-items: start;">
              <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">3</div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #333;">
                  <strong>Access Anytime:</strong> View and download your report for 30 days
                </p>
              </div>
            </div>
          </div>

          ${data.expiresInDays && data.expiresInDays <= 7 ? `
          <!-- Urgency Message -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; margin: 30px 0; border-radius: 6px;">
            <div style="display: flex; align-items: start;">
              <span style="font-size: 20px; margin-right: 10px;">⏰</span>
              <div>
                <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 14px;">Link Expiring Soon</strong>
                <p style="margin: 0; font-size: 13px; color: #78350f;">
                  Your assessment link expires in ${data.expiresInDays} day${data.expiresInDays !== 1 ? 's' : ''}. Complete it soon to get your personalized AI readiness report!
                </p>
              </div>
            </div>
          </div>
          ` : ''}

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions or technical issues?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We're here to help: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Looking forward to sharing your insights,<br>
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
