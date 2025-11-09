export interface AssessmentCompletedEmailData {
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
}

export function generateAssessmentCompletedEmail(data: AssessmentCompletedEmailData): string {
  const completedDate = new Date(data.completedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  const usagePercentage = Math.round((data.assessmentsUsed / data.assessmentsLimit) * 100);
  const isNearLimit = usagePercentage >= 80;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Assessment Completed - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">✅</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">New Assessment Completed</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">A candidate just finished their assessment</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Great news! A new candidate has completed their AI readiness assessment through your platform.</p>

          <!-- Candidate Info Box -->
          <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #1D3557; margin-bottom: 15px;">👤 Candidate Details</div>

            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Name:</span>
              <strong style="font-size: 16px; color: #333; margin-left: 8px;">${data.candidateFirstName} ${data.candidateLastName}</strong>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Email:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${data.candidateEmail}</strong>
            </div>

            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Company:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${data.candidateCompany}</strong>
            </div>

            ${data.industry ? `
            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Industry:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${data.industry}</strong>
            </div>
            ` : ''}

            ${data.companySize ? `
            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Company Size:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${data.companySize}</strong>
            </div>
            ` : ''}

            <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 12px;">
              <span style="font-size: 14px; color: #666;">Completed:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${completedDate}</strong>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="https://${data.subdomain}.deployai.studio/dashboard/assessments/${data.assessmentId}" style="display: inline-block; background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(69, 123, 157, 0.3); margin: 0 5px 10px 5px;">View Assessment</a>

            <a href="https://${data.subdomain}.deployai.studio/report/${data.reportId}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); margin: 0 5px 10px 5px;">View Report</a>
          </div>

          <!-- Usage Status -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Your Usage This Month</h2>

          <div style="background: ${isNearLimit ? '#fef3c7' : '#f0f7ff'}; border-left: 4px solid ${isNearLimit ? '#f59e0b' : '#457B9D'}; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <div style="font-size: 14px; color: ${isNearLimit ? '#92400e' : '#1D3557'}; margin-bottom: 8px; font-weight: 600;">Assessments Used</div>
              <div style="font-size: 28px; font-weight: bold; color: ${isNearLimit ? '#d97706' : '#457B9D'}; margin-bottom: 5px;">
                ${data.assessmentsUsed} <span style="font-size: 18px; color: ${isNearLimit ? '#78350f' : '#666'}; font-weight: normal;">/ ${data.assessmentsLimit}</span>
              </div>
              <div style="background: ${isNearLimit ? '#fef3c7' : '#e0f2fe'}; height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden;">
                <div style="background: ${isNearLimit ? '#f59e0b' : '#457B9D'}; height: 100%; width: ${Math.min(usagePercentage, 100)}%; transition: width 0.3s ease;"></div>
              </div>
            </div>

            <div style="border-top: 1px solid ${isNearLimit ? '#fed7aa' : '#cbd5e1'}; padding-top: 12px; margin-top: 12px;">
              <div style="font-size: 14px; color: ${isNearLimit ? '#92400e' : '#1D3557'}; margin-bottom: 5px;">
                <strong>${data.currentTier} Plan</strong>
              </div>
              <div style="font-size: 13px; color: ${isNearLimit ? '#78350f' : '#666'};">
                ${isNearLimit
                  ? '⚠️ You\'re approaching your monthly limit. Overage billing will apply automatically for additional assessments.'
                  : '✅ You have plenty of assessments remaining this month.'
                }
              </div>
            </div>
          </div>

          <!-- What's Next -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What Happens Next?</h2>

          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 12px;">
              <div style="font-size: 14px; color: #065f46; margin-bottom: 5px; font-weight: 600;">✅ Report Generated</div>
              <p style="margin: 0; font-size: 13px; color: #047857;">
                The AI analysis report has been automatically generated and emailed to ${data.candidateFirstName}.
              </p>
            </div>

            <div style="border-top: 1px solid #a7f3d0; padding-top: 12px; margin-top: 12px;">
              <div style="font-size: 14px; color: #065f46; margin-bottom: 5px; font-weight: 600;">📊 Review Available</div>
              <p style="margin: 0; font-size: 13px; color: #047857;">
                You can now review the assessment responses and generated report in your dashboard.
              </p>
            </div>

            <div style="border-top: 1px solid #a7f3d0; padding-top: 12px; margin-top: 12px;">
              <div style="font-size: 14px; color: #065f46; margin-bottom: 5px; font-weight: 600;">🤝 Follow Up</div>
              <p style="margin: 0; font-size: 13px; color: #047857;">
                Consider reaching out to ${data.candidateFirstName} to discuss the findings and next steps.
              </p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 15px;">Quick Actions</div>
            <div style="margin-bottom: 10px;">
              <a href="https://${data.subdomain}.deployai.studio/dashboard/assessments" style="color: #457B9D; text-decoration: none; font-size: 14px;">→ View All Assessments</a>
            </div>
            <div style="margin-bottom: 10px;">
              <a href="https://${data.subdomain}.deployai.studio/dashboard" style="color: #457B9D; text-decoration: none; font-size: 14px;">→ Go to Dashboard</a>
            </div>
            <div style="margin-bottom: 10px;">
              <a href="mailto:${data.candidateEmail}" style="color: #457B9D; text-decoration: none; font-size: 14px;">→ Email ${data.candidateFirstName}</a>
            </div>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions or need help?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Contact us: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This notification was sent to ${data.adminEmail}</p>
          <p style="margin: 10px 0 0 0; font-size: 11px;">You're receiving this because you're an admin for ${data.companyName}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
