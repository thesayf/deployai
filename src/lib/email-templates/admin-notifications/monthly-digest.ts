export interface MonthlyDigestEmailData {
  adminEmail: string;
  companyName: string;
  subdomain: string;
  month: string;
  year: number;
  totalAssessments: number;
  assessmentsLimit: number;
  currentTier: string;
  overageCount: number;
  totalRevenue?: number;
  currency?: string;
  topPerformingDays: Array<{ date: string; count: number }>;
  industryBreakdown: Array<{ industry: string; count: number; percentage: number }>;
  companySizeBreakdown: Array<{ size: string; count: number; percentage: number }>;
  averageCompletionTime?: number;
  completionRate?: number;
}

export function generateMonthlyDigestEmail(data: MonthlyDigestEmailData): string {
  const usagePercentage = Math.round((data.totalAssessments / data.assessmentsLimit) * 100);
  const monthYear = `${data.month} ${data.year}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Monthly Report - ${monthYear}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">📈</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Monthly Digest</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">${monthYear}</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Here's your comprehensive monthly report for ${monthYear}. Let's review your assessment platform's performance.</p>

          <!-- Key Metrics Grid -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Month at a Glance</h2>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0 30px 0;">
            <!-- Total Assessments -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 25px; border-radius: 8px; text-align: center;">
              <div style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Total Assessments</div>
              <div style="font-size: 42px; font-weight: bold; color: white;">${data.totalAssessments}</div>
            </div>

            <!-- Usage Percentage -->
            <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 25px; border-radius: 8px; text-align: center;">
              <div style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Usage Rate</div>
              <div style="font-size: 42px; font-weight: bold; color: white;">${usagePercentage}%</div>
            </div>

            ${data.completionRate !== undefined ? `
            <!-- Completion Rate -->
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 25px; border-radius: 8px; text-align: center;">
              <div style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Completion Rate</div>
              <div style="font-size: 42px; font-weight: bold; color: white;">${Math.round(data.completionRate)}%</div>
            </div>
            ` : ''}

            ${data.overageCount > 0 ? `
            <!-- Overage Assessments -->
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 25px; border-radius: 8px; text-align: center;">
              <div style="font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Overage</div>
              <div style="font-size: 42px; font-weight: bold; color: white;">${data.overageCount}</div>
            </div>
            ` : ''}
          </div>

          <!-- Plan Usage -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Plan Usage</h2>

          <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 25px; margin: 20px 0; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <div>
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Current Plan</div>
                <div style="font-size: 22px; font-weight: bold; color: #1D3557;">${data.currentTier}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Monthly Limit</div>
                <div style="font-size: 22px; font-weight: bold; color: #457B9D;">${data.assessmentsLimit}</div>
              </div>
            </div>

            <div style="margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 14px; color: #666;">Used: ${data.totalAssessments}</span>
                <span style="font-size: 14px; color: #666;">${usagePercentage}%</span>
              </div>
              <div style="background: #e0f2fe; height: 12px; border-radius: 6px; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #457B9D 0%, #10b981 100%); height: 100%; width: ${Math.min(usagePercentage, 100)}%;"></div>
              </div>
            </div>

            ${data.overageCount > 0 ? `
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 15px; border-radius: 6px;">
              <div style="font-size: 14px; color: #92400e; font-weight: 600; margin-bottom: 5px;">⚡ Overage Billing Active</div>
              <p style="margin: 0; font-size: 13px; color: #78350f;">
                ${data.overageCount} assessment${data.overageCount !== 1 ? 's' : ''} beyond your plan limit this month. These will be billed automatically.
              </p>
            </div>
            ` : ''}
          </div>

          <!-- Industry Breakdown -->
          ${data.industryBreakdown && data.industryBreakdown.length > 0 ? `
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Industry Breakdown</h2>

          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px;">
            ${data.industryBreakdown.slice(0, 5).map((item, index) => `
              <div style="margin-bottom: ${index < Math.min(data.industryBreakdown.length - 1, 4) ? '15px' : '0'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 14px; color: #92400e; font-weight: 600;">${item.industry}</span>
                  <span style="font-size: 14px; color: #d97706;">
                    <strong>${item.count}</strong> <span style="color: #92400e;">(${item.percentage}%)</span>
                  </span>
                </div>
                <div style="background: #fef3c7; height: 8px; border-radius: 4px; overflow: hidden;">
                  <div style="background: #f59e0b; height: 100%; width: ${item.percentage}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Company Size Breakdown -->
          ${data.companySizeBreakdown && data.companySizeBreakdown.length > 0 ? `
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Company Size Distribution</h2>

          <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 6px;">
            ${data.companySizeBreakdown.map((item, index) => `
              <div style="margin-bottom: ${index < data.companySizeBreakdown.length - 1 ? '15px' : '0'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 14px; color: #065f46; font-weight: 600;">${item.size}</span>
                  <span style="font-size: 14px; color: #059669;">
                    <strong>${item.count}</strong> <span style="color: #065f46;">(${item.percentage}%)</span>
                  </span>
                </div>
                <div style="background: #d1fae5; height: 8px; border-radius: 4px; overflow: hidden;">
                  <div style="background: #10b981; height: 100%; width: ${item.percentage}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Top Performing Days -->
          ${data.topPerformingDays && data.topPerformingDays.length > 0 ? `
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Busiest Days</h2>

          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            ${data.topPerformingDays.slice(0, 5).map((day, index) => {
              const dayDate = new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              });

              return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: white; border-radius: 6px; margin-bottom: ${index < Math.min(data.topPerformingDays.length - 1, 4) ? '10px' : '0'};">
                  <span style="font-size: 14px; color: #333; font-weight: 600;">${dayDate}</span>
                  <div style="background: #457B9D; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: bold;">
                    ${day.count}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ` : ''}

          <!-- Insights & Tips -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">💡 Insights & Tips</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            ${usagePercentage >= 90 ? `
            <div style="margin-bottom: 15px;">
              <div style="font-size: 14px; color: #1D3557; font-weight: 600; margin-bottom: 5px;">🚀 High Engagement!</div>
              <p style="margin: 0; font-size: 13px; color: #457B9D;">
                You're using ${usagePercentage}% of your plan. Consider upgrading to the next tier for better value per assessment.
              </p>
            </div>
            ` : usagePercentage < 50 ? `
            <div style="margin-bottom: 15px;">
              <div style="font-size: 14px; color: #1D3557; font-weight: 600; margin-bottom: 5px;">📊 Growth Opportunity</div>
              <p style="margin: 0; font-size: 13px; color: #457B9D;">
                You're only using ${usagePercentage}% of your plan. Share your assessment link more widely to maximize value!
              </p>
            </div>
            ` : ''}

            ${data.industryBreakdown && data.industryBreakdown.length > 0 ? `
            <div style="${usagePercentage >= 90 || usagePercentage < 50 ? 'border-top: 1px solid #cbd5e1; padding-top: 15px; margin-top: 15px;' : ''}">
              <div style="font-size: 14px; color: #1D3557; font-weight: 600; margin-bottom: 5px;">🎯 Top Industry</div>
              <p style="margin: 0; font-size: 13px; color: #457B9D;">
                ${data.industryBreakdown[0].industry} is your most active sector with ${data.industryBreakdown[0].count} assessments (${data.industryBreakdown[0].percentage}%).
              </p>
            </div>
            ` : ''}
          </div>

          <!-- CTA -->
          <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Ready for Next Month?</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">Keep the momentum going with your AI assessment platform</p>
            <a href="https://${data.subdomain}.deployai.studio/dashboard" style="display: inline-block; background: white; color: #4f46e5; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">View Dashboard</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about your report?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We're here to help: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Thank you for using deployAI,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This monthly digest was sent to ${data.adminEmail}</p>
          <p style="margin: 10px 0 0 0; font-size: 11px;">Monthly digests are sent on the 1st of each month</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
