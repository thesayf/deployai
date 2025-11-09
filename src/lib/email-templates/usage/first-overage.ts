export interface FirstOverageEmailData {
  companyName: string;
  ownerEmail: string;
  assessmentsLimit: number;
  assessmentsUsed: number;
  overageCount: number;
  overagePrice: number;
  currentOverageCharge: number;
  currentTier: string;
  dashboardUrl: string;
  upgradeUrl: string;
}

export function generateFirstOverageEmail(data: FirstOverageEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Overage Billing Active - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 35px 20px; text-align: center;">
          <div style="font-size: 56px; margin-bottom: 10px;">📊</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Overage Billing Active</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">You've exceeded your plan's assessment limit</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">You've just used your first assessment beyond your plan limit. Your assessment platform continues to work seamlessly, and additional usage will be billed automatically.</p>

          <!-- Usage Stats -->
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="font-size: 14px; color: #92400e; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Current Usage</div>
              <div style="font-size: 42px; font-weight: bold; color: #d97706;">
                ${data.assessmentsUsed}
              </div>
              <div style="font-size: 14px; color: #92400e; margin-top: 5px;">
                assessments used this period
              </div>
            </div>

            <div style="border-top: 1px solid #fbbf24; padding-top: 15px; display: flex; justify-content: space-around; text-align: center;">
              <div>
                <div style="font-size: 22px; font-weight: 600; color: #059669;">${data.assessmentsLimit}</div>
                <div style="font-size: 12px; color: #666;">Included</div>
              </div>
              <div>
                <div style="font-size: 22px; font-weight: 600; color: #d97706;">${data.overageCount}</div>
                <div style="font-size: 12px; color: #666;">Overage</div>
              </div>
            </div>
          </div>

          <!-- Overage Billing Info -->
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 12px;">💳 Automatic Billing Active</div>

            <div style="margin-bottom: 15px;">
              <div style="font-size: 13px; color: #78350f; margin-bottom: 5px;">Overage Rate</div>
              <div style="font-size: 24px; font-weight: bold; color: #d97706;">
                $${data.overagePrice.toFixed(2)}
                <span style="font-size: 14px; font-weight: normal;">per assessment</span>
              </div>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 15px;">
              <div style="font-size: 13px; color: #78350f; margin-bottom: 5px;">Current Overage Charges</div>
              <div style="font-size: 28px; font-weight: bold; color: #d97706;">
                $${data.currentOverageCharge.toFixed(2)}
              </div>
              <div style="font-size: 13px; color: #78350f; margin-top: 5px;">
                ${data.overageCount} overage assessment${data.overageCount > 1 ? 's' : ''} × $${data.overagePrice.toFixed(2)}
              </div>
            </div>
          </div>

          <!-- Key Points -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 30px 0 15px 0;">How Overage Billing Works</h2>

          <div style="space-y: 15px;">
            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">1</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">No Service Interruption</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Your assessment link continues working normally - no disruption to your workflow</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">2</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">Transparent Pricing</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Each additional assessment costs $${data.overagePrice}, tracked in real-time</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">3</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">Billing at Period End</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">All overage charges are added to your next monthly invoice automatically</p>
              </div>
            </div>
          </div>

          <!-- Upgrade Option -->
          <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 15px;">
              <div style="font-size: 20px; font-weight: 600; color: #1D3557; margin-bottom: 8px;">💡 Save Money with an Upgrade</div>
              <p style="margin: 0; font-size: 14px; color: #666;">
                If you consistently use more than ${data.assessmentsLimit} assessments, upgrading could reduce your per-assessment cost
              </p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px;">
              <div style="font-size: 13px; color: #666; margin-bottom: 10px; text-align: center;">Example Savings</div>
              <div style="display: flex; justify-content: space-around; text-align: center;">
                <div>
                  <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Current: ${data.currentTier}</div>
                  <div style="font-size: 18px; font-weight: 600; color: #d97706;">$${data.overagePrice}/ea</div>
                </div>
                <div style="padding: 0 15px; color: #ccc; font-size: 20px;">→</div>
                <div>
                  <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Higher Tiers</div>
                  <div style="font-size: 18px; font-weight: 600; color: #059669;">$2-3/ea</div>
                </div>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${data.upgradeUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Compare Plans & Upgrade</a>
            </div>
          </div>

          <!-- Dashboard CTA -->
          <div style="text-align: center; margin: 40px 0 30px 0;">
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">Track your usage and overage charges</p>
            <a href="${data.dashboardUrl}" style="display: inline-block; background: white; color: #457B9D; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #457B9D;">View Dashboard</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #333;">Questions about overage billing?</p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We're here to help you optimize your plan: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
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
