export interface WeeklySummaryEmailData {
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
}

export function generateWeeklySummaryEmail(data: WeeklySummaryEmailData): string {
  const weekStartDate = new Date(data.weekStart).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  const weekEndDate = new Date(data.weekEnd).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const usagePercentage = Math.round((data.assessmentsUsed / data.assessmentsLimit) * 100);
  const hasActivity = data.assessmentsCompleted > 0;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weekly Activity Summary - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">📊</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Weekly Activity Summary</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 16px; font-weight: 600;">${weekStartDate} - ${weekEndDate}</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Here's your weekly activity summary for your AI assessment platform.</p>

          <!-- Key Metrics -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">This Week's Highlights</h2>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0 30px 0;">
            <!-- Assessments Completed -->
            <div style="background: ${hasActivity ? '#d1fae5' : '#f8f9fa'}; border: 2px solid ${hasActivity ? '#10b981' : '#e5e7eb'}; padding: 20px; border-radius: 8px; text-align: center;">
              <div style="font-size: 14px; font-weight: 600; color: #666; margin-bottom: 8px;">Completed</div>
              <div style="font-size: 36px; font-weight: bold; color: ${hasActivity ? '#059669' : '#333'};">${data.assessmentsCompleted}</div>
              <div style="font-size: 13px; color: #666; margin-top: 5px;">assessments</div>
            </div>

            <!-- Monthly Usage -->
            <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 20px; border-radius: 8px; text-align: center;">
              <div style="font-size: 14px; font-weight: 600; color: #666; margin-bottom: 8px;">Monthly Total</div>
              <div style="font-size: 36px; font-weight: bold; color: #457B9D;">${data.assessmentsUsed}</div>
              <div style="font-size: 13px; color: #666; margin-top: 5px;">of ${data.assessmentsLimit}</div>
            </div>
          </div>

          ${hasActivity ? `
          <!-- Recent Assessments -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Recent Completions</h2>

          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            ${data.newAssessments.slice(0, 5).map((assessment, index) => {
              const completedDate = new Date(assessment.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              });

              return `
                <div style="padding: 15px; background: white; border-radius: 6px; margin-bottom: ${index < Math.min(data.newAssessments.length - 1, 4) ? '12px' : '0'}; border-left: 4px solid #10b981;">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div>
                      <strong style="font-size: 15px; color: #333;">${assessment.candidateName}</strong>
                      <div style="font-size: 13px; color: #666; margin-top: 3px;">${assessment.candidateCompany}</div>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-size: 12px; color: #999;">${completedDate}</div>
                    </div>
                  </div>
                  <div style="font-size: 13px; color: #666; margin-bottom: 8px;">${assessment.candidateEmail}</div>
                  <div>
                    <a href="https://${data.subdomain}.deployai.studio/dashboard/assessments/${assessment.assessmentId}" style="color: #457B9D; text-decoration: none; font-size: 13px; font-weight: 600;">View Assessment →</a>
                  </div>
                </div>
              `;
            }).join('')}

            ${data.assessmentsCompleted > 5 ? `
            <div style="text-align: center; margin-top: 15px;">
              <a href="https://${data.subdomain}.deployai.studio/dashboard/assessments" style="color: #457B9D; text-decoration: none; font-size: 14px; font-weight: 600;">View All ${data.assessmentsCompleted} Assessments →</a>
            </div>
            ` : ''}
          </div>
          ` : `
          <!-- No Activity Message -->
          <div style="background: #f8f9fa; border-left: 4px solid #e5e7eb; padding: 20px; margin: 30px 0; border-radius: 6px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">📭</div>
            <div style="font-size: 16px; font-weight: 600; color: #666; margin-bottom: 8px;">No New Assessments This Week</div>
            <p style="margin: 0; font-size: 14px; color: #999;">
              No candidates completed assessments during this period.
            </p>
          </div>
          `}

          ${data.topIndustries && data.topIndustries.length > 0 ? `
          <!-- Top Industries -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Top Industries This Week</h2>

          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px;">
            ${data.topIndustries.map((item, index) => `
              <div style="margin-bottom: ${index < data.topIndustries.length - 1 ? '12px' : '0'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                  <span style="font-size: 14px; color: #92400e; font-weight: 600;">${item.industry}</span>
                  <span style="font-size: 16px; color: #d97706; font-weight: bold;">${item.count}</span>
                </div>
                <div style="background: #fef3c7; height: 6px; border-radius: 3px; overflow: hidden;">
                  <div style="background: #f59e0b; height: 100%; width: ${(item.count / data.assessmentsCompleted) * 100}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Usage Status -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Monthly Usage</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <div style="font-size: 14px; color: #1D3557; margin-bottom: 8px; font-weight: 600;">Assessments Used</div>
              <div style="font-size: 28px; font-weight: bold; color: #457B9D; margin-bottom: 5px;">
                ${data.assessmentsUsed} <span style="font-size: 18px; color: #666; font-weight: normal;">/ ${data.assessmentsLimit}</span>
              </div>
              <div style="background: #e0f2fe; height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden;">
                <div style="background: #457B9D; height: 100%; width: ${Math.min(usagePercentage, 100)}%; transition: width 0.3s ease;"></div>
              </div>
            </div>

            <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 12px;">
              <div style="font-size: 14px; color: #1D3557; margin-bottom: 5px;">
                <strong>${data.currentTier} Plan</strong> • ${Math.max(0, data.assessmentsLimit - data.assessmentsUsed)} remaining
              </div>
              ${data.overageCount > 0 ? `
              <div style="font-size: 13px; color: #d97706; margin-top: 8px;">
                ⚡ ${data.overageCount} overage assessment${data.overageCount !== 1 ? 's' : ''} this month
              </div>
              ` : ''}
            </div>
          </div>

          <!-- Quick Actions -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 15px;">Keep the Momentum Going</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">Share your assessment link to get more insights this week</p>
            <a href="https://${data.subdomain}.deployai.studio/dashboard" style="display: inline-block; background: white; color: #059669; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Go to Dashboard</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions or feedback?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We'd love to hear from you: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This weekly summary was sent to ${data.adminEmail}</p>
          <p style="margin: 10px 0 0 0; font-size: 11px;">Weekly summaries are sent every Monday</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
