export interface FeedbackRequestEmailData {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany: string;
  companyName: string;
  reportViewedAt: string;
  feedbackUrl: string;
  reportUrl: string;
}

export function generateFeedbackRequestEmail(data: FeedbackRequestEmailData): string {
  const viewedDate = new Date(data.reportViewedAt).toLocaleDateString('en-US', {
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
      <title>We'd Love Your Feedback - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">💭</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">We'd Love Your Feedback</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px;">Help us improve your experience</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.candidateFirstName},</p>

          <p style="margin: 0 0 20px 0;">Thank you for completing the AI readiness assessment with ${data.companyName}. We hope you found your personalized report insightful and valuable!</p>

          <!-- Report Info -->
          <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 20px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 15px; color: #1D3557; margin-bottom: 12px;">
              <strong>Your Assessment Report</strong>
            </div>
            <div style="font-size: 14px; color: #666; margin-bottom: 8px;">
              Company: <strong style="color: #333;">${data.candidateCompany}</strong>
            </div>
            <div style="font-size: 14px; color: #666; margin-bottom: 15px;">
              Viewed: <strong style="color: #333;">${viewedDate}</strong>
            </div>
            <div>
              <a href="${data.reportUrl}" style="color: #457B9D; text-decoration: none; font-size: 14px; font-weight: 600;">View Your Report Again →</a>
            </div>
          </div>

          <!-- Feedback Request -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Share Your Thoughts</h2>

          <p style="margin: 0 0 20px 0;">We're constantly working to improve our AI assessment platform. Your feedback helps us deliver better insights and recommendations for organizations like yours.</p>

          <div style="background: #faf5ff; border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #6b21a8; margin-bottom: 12px;">We'd love to know:</div>
            <ul style="margin: 0; padding-left: 20px; color: #7c3aed; font-size: 14px;">
              <li style="margin-bottom: 8px;">How valuable did you find the assessment?</li>
              <li style="margin-bottom: 8px;">Were the recommendations clear and actionable?</li>
              <li style="margin-bottom: 8px;">What aspects were most helpful for your organization?</li>
              <li style="margin-bottom: 8px;">How can we make the experience even better?</li>
            </ul>
          </div>

          <!-- CTA -->
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Quick 2-Minute Survey</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">Your input makes a real difference</p>
            <a href="${data.feedbackUrl}" style="display: inline-block; background: white; color: #7c3aed; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Share Feedback</a>
          </div>

          <!-- Benefits of Feedback -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 12px 0;">Why Your Feedback Matters</h2>

          <div style="margin: 20px 0;">
            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <span style="color: #8b5cf6; font-size: 20px; margin-right: 10px; flex-shrink: 0;">✨</span>
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong style="color: #333;">Better Insights:</strong> Your feedback helps us refine our AI analysis to provide even more accurate and relevant recommendations.
              </p>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <span style="color: #8b5cf6; font-size: 20px; margin-right: 10px; flex-shrink: 0;">🎯</span>
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong style="color: #333;">Improved Experience:</strong> We use your input to make the assessment process smoother and more valuable for future users.
              </p>
            </div>

            <div style="display: flex; align-items: start;">
              <span style="color: #8b5cf6; font-size: 20px; margin-right: 10px; flex-shrink: 0;">🤝</span>
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong style="color: #333;">Shape the Future:</strong> Your voice directly influences how we develop new features and capabilities.
              </p>
            </div>
          </div>

          <!-- Alternative Link -->
          <div style="background: #f8f9fa; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;">
              Or copy and paste this link to share your feedback:
            </p>
            <div style="background: white; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333; border: 1px solid #e5e7eb;">
              ${data.feedbackUrl}
            </div>
          </div>

          <!-- Thank You -->
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 6px; text-align: center;">
            <div style="font-size: 16px; font-weight: 600; color: #065f46; margin-bottom: 8px;">Thank You!</div>
            <p style="margin: 0; font-size: 14px; color: #047857;">
              We appreciate you taking the time to help us improve. Every piece of feedback counts!
            </p>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions or need additional support?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Contact ${data.companyName}: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
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
