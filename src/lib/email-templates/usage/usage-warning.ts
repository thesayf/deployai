export interface UsageWarningEmailData {
  companyName: string;
  ownerEmail: string;
  assessmentsUsed: number;
  assessmentsLimit: number;
  percentageUsed: number;
  currentTier: string;
  dashboardUrl: string;
  upgradeUrl: string;
  overagePrice: number;
}

export function generateUsageWarningEmail(data: UsageWarningEmailData): string {
  const remaining = data.assessmentsLimit - data.assessmentsUsed;
  const isHighWarning = data.percentageUsed >= 90;
  const warningColor = isHighWarning ? '#dc2626' : '#f59e0b';
  const warningBg = isHighWarning ? '#fee2e2' : '#fef3c7';
  const warningIcon = isHighWarning ? '⚠️' : '⏰';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Assessment Usage Alert - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: ${warningColor}; padding: 30px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">${warningIcon}</div>
          <h1 style="color: white; font-size: 24px; margin: 0;">Assessment Usage Alert</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 16px;">${data.percentageUsed}% of your monthly limit used</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">This is a friendly heads-up about your assessment usage for this billing period.</p>

          <!-- Usage Stats Box -->
          <div style="background: ${warningBg}; border-left: 4px solid ${warningColor}; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="margin-bottom: 20px;">
              <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Current Usage</div>
              <div style="font-size: 32px; font-weight: bold; color: ${warningColor};">
                ${data.assessmentsUsed} / ${data.assessmentsLimit}
              </div>
              <div style="font-size: 14px; color: #666;">assessments used</div>
            </div>

            <!-- Progress Bar -->
            <div style="background: white; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 15px;">
              <div style="background: ${warningColor}; height: 100%; width: ${data.percentageUsed}%;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 18px; font-weight: 600; color: ${warningColor};">${remaining} remaining</div>
                <div style="font-size: 13px; color: #666;">until limit reached</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 14px; color: #666;">Current Plan</div>
                <div style="font-size: 16px; font-weight: 600; color: #333; text-transform: capitalize;">${data.currentTier}</div>
              </div>
            </div>
          </div>

          <!-- What Happens Next -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 15px 0;">What happens when you reach your limit?</h2>

          <p style="margin: 0 0 20px 0;">Don't worry - your assessment link won't break! We'll automatically charge for additional assessments:</p>

          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 8px;">Overage Rate</div>
            <div style="font-size: 28px; font-weight: bold; color: #333;">
              $${data.overagePrice.toFixed(2)}
              <span style="font-size: 16px; font-weight: normal; color: #666;">per assessment</span>
            </div>
            <div style="font-size: 13px; color: #666; margin-top: 8px;">Charged automatically at the end of your billing period</div>
          </div>

          <!-- Action Buttons -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 15px 0;">Your Options</h2>

          <div style="margin: 20px 0;">
            <div style="margin-bottom: 15px;">
              <strong style="display: block; margin-bottom: 8px; color: #333;">Option 1: Upgrade Your Plan</strong>
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Get more assessments included at a lower per-assessment cost</p>
              <a href="${data.upgradeUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View Plans & Upgrade</a>
            </div>

            <div style="border-top: 1px solid #e0e0e0; padding-top: 15px;">
              <strong style="display: block; margin-bottom: 8px; color: #333;">Option 2: Continue with Overage Billing</strong>
              <p style="margin: 0; font-size: 14px; color: #666;">No action needed - additional assessments will be billed automatically at $${data.overagePrice}/each</p>
            </div>
          </div>

          <!-- Dashboard CTA -->
          <div style="text-align: center; margin: 40px 0 30px 0; padding: 25px; background: #f0f7ff; border-radius: 8px;">
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">View detailed usage analytics</p>
            <a href="${data.dashboardUrl}" style="display: inline-block; background: white; color: #457B9D; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #457B9D;">Go to Dashboard</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Questions about usage or pricing?</p>
            <p style="margin: 0; font-size: 14px; color: #666;">Contact us at <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a></p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This email was sent to ${data.ownerEmail}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
