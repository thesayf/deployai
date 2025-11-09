export interface ReportEmailData {
  firstName: string;
  lastName: string;
  company?: string;
  reportUrl: string;
  industry?: string;
  companySize?: string;
}

export function generateReportReadyEmail(data: ReportEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your AI Readiness Report is Ready - ${data.company || 'Analysis Complete'}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">📊</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Your Report is Ready!</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">AI Readiness Analysis Complete</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.firstName},</p>

          <p style="margin: 0 0 20px 0;">Great news! Your personalized AI readiness assessment has been analyzed and your comprehensive report is ready to view.</p>

          <!-- Success Box -->
          <div style="background: #d1fae5; border: 2px solid #10b981; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 20px; font-weight: 600; color: #065f46; margin-bottom: 12px;">✅ Analysis Complete</div>
            <p style="margin: 0; font-size: 14px; color: #047857;">
              Your personalized report for ${data.company || 'your organization'} has been generated
            </p>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="${data.reportUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">View Your Report</a>
          </div>

          <div style="text-align: center; margin: 20px 0 30px 0;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">Or copy and paste this link:</p>
            <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333;">
              ${data.reportUrl}
            </div>
          </div>

          <!-- What's Inside -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What's Inside Your Report</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="space-y: 12px;">
              <div style="display: flex; align-items: start; margin-bottom: 12px;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">📈</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Current State Analysis</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">Detailed assessment of your organization's AI readiness</p>
                </div>
              </div>

              <div style="display: flex; align-items: start; margin-bottom: 12px;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">🎯</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Industry-Specific Opportunities</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">${data.industry ? `Tailored AI use cases for ${data.industry}` : 'Custom AI use cases for your industry'}</p>
                </div>
              </div>

              <div style="display: flex; align-items: start; margin-bottom: 12px;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">🗺️</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Implementation Roadmap</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">Step-by-step plan to deploy AI in your organization</p>
                </div>
              </div>

              <div style="display: flex; align-items: start; margin-bottom: 12px;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">🛠️</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Technology Recommendations</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">Specific tools and platforms suited to your needs</p>
                </div>
              </div>

              <div style="display: flex; align-items: start; margin-bottom: 12px;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">💰</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Investment Projections</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">Budget estimates and expected ROI analysis</p>
                </div>
              </div>

              <div style="display: flex; align-items: start; margin-bottom: 12px;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">⚠️</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Risk Assessment</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">Potential challenges and mitigation strategies</p>
                </div>
              </div>

              <div style="display: flex; align-items: start;">
                <span style="color: #457B9D; font-size: 20px; margin-right: 10px; flex-shrink: 0;">🚀</span>
                <div>
                  <strong style="display: block; color: #1D3557; margin-bottom: 3px; font-size: 14px;">Next Steps</strong>
                  <p style="margin: 0; font-size: 13px; color: #666;">Actionable recommendations to start your AI journey</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Report Features -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Report Features</h2>

          <div style="margin: 20px 0;">
            <div style="margin-bottom: 18px;">
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 24px; margin-right: 10px;">📄</span>
                <strong style="color: #333; font-size: 15px;">Comprehensive PDF Download</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                Download your full report as a PDF for easy sharing and reference
              </p>
            </div>

            <div style="margin-bottom: 18px;">
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 24px; margin-right: 10px;">🔍</span>
                <strong style="color: #333; font-size: 15px;">Interactive Web View</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                Browse your report online with easy navigation and searchable content
              </p>
            </div>

            <div style="margin-bottom: 18px;">
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 24px; margin-right: 10px;">💡</span>
                <strong style="color: #333; font-size: 15px;">Personalized Insights</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                Every recommendation is tailored to your organization's specific situation
              </p>
            </div>
          </div>

          <!-- Important Info -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; margin: 30px 0; border-radius: 6px;">
            <div style="display: flex; align-items: start;">
              <span style="font-size: 20px; margin-right: 10px;">⏰</span>
              <div>
                <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 14px;">Report Access</strong>
                <p style="margin: 0; font-size: 13px; color: #78350f;">
                  Your report will be available for 30 days. We recommend downloading the PDF or bookmarking the link for future reference.
                </p>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 12px 0;">What to Do Next</h2>

          <ol style="margin: 0 0 30px 0; padding-left: 20px; color: #666; font-size: 14px;">
            <li style="margin-bottom: 10px;">Review your personalized report in detail</li>
            <li style="margin-bottom: 10px;">Download the PDF for your records</li>
            <li style="margin-bottom: 10px;">Share relevant sections with your team</li>
            <li style="margin-bottom: 10px;">Consider which recommendations align with your goals</li>
            <li style="margin-bottom: 10px;">Reach out if you need help implementing any strategies</li>
          </ol>

          <!-- Final CTA -->
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 15px 0; font-size: 15px; color: #333; font-weight: 600;">Ready to explore your insights?</p>
            <a href="${data.reportUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Access Your Report</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Have questions about your report?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We're here to help: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This report was generated for ${data.company || 'your organization'}</p>
          <p style="margin: 10px 0 0 0; font-size: 11px;">This is an automated message from your AI readiness assessment</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
