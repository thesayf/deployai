export interface LimitReachedEmailData {
  companyName: string;
  ownerEmail: string;
  assessmentsLimit: number;
  currentTier: string;
  dashboardUrl: string;
  upgradeUrl: string;
  overagePrice: number;
}

export function generateLimitReachedEmail(data: LimitReachedEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Assessment Limit Reached - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: #f59e0b; padding: 35px 20px; text-align: center;">
          <div style="font-size: 56px; margin-bottom: 10px;">🎯</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Assessment Limit Reached</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">You've used all ${data.assessmentsLimit} assessments in your plan</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Great news! You've reached your monthly assessment limit of <strong>${data.assessmentsLimit} assessments</strong>. This shows your platform is being well-utilized.</p>

          <!-- Status Box -->
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 48px; font-weight: bold; color: #d97706; margin-bottom: 8px;">
              ${data.assessmentsLimit} / ${data.assessmentsLimit}
            </div>
            <div style="font-size: 16px; color: #92400e; font-weight: 600;">All Assessments Used</div>
            <div style="font-size: 14px; color: #78350f; margin-top: 8px;">Current Plan: ${data.currentTier}</div>
          </div>

          <!-- Good News -->
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <span style="font-size: 24px;">✅</span>
              <strong style="color: #065f46; font-size: 16px;">Your Assessment Link Still Works!</strong>
            </div>
            <p style="margin: 0; color: #047857; font-size: 14px;">
              Don't worry - candidates can still take assessments. Additional assessments will be billed as overage at <strong>$${data.overagePrice}/assessment</strong>.
            </p>
          </div>

          <!-- What Happens Next -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 30px 0 15px 0;">What Happens Next?</h2>

          <div style="background: #f8f9fa; padding: 25px; margin: 20px 0; border-radius: 8px;">
            <div style="margin-bottom: 20px;">
              <div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">🔄 Overage Billing Active</div>
              <p style="margin: 0; font-size: 14px; color: #666;">
                Each additional assessment beyond ${data.assessmentsLimit} will be charged at <strong>$${data.overagePrice}</strong>
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">💳 Billing at Period End</div>
              <p style="margin: 0; font-size: 14px; color: #666;">
                All overage charges will be added to your next invoice automatically
              </p>
            </div>

            <div>
              <div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">📧 Monthly Notifications</div>
              <p style="margin: 0; font-size: 14px; color: #666;">
                We'll send you a summary of usage and overage charges each billing period
              </p>
            </div>
          </div>

          <!-- Options -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Optimize Your Costs</h2>

          <p style="margin: 0 0 20px 0; color: #666;">If you're consistently hitting your limit, upgrading might save you money:</p>

          <!-- Upgrade Option -->
          <div style="border: 2px solid #457B9D; padding: 25px; margin: 20px 0; border-radius: 8px; background: #f0f7ff;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <div>
                <div style="font-size: 18px; font-weight: 600; color: #1D3557; margin-bottom: 5px;">💡 Consider Upgrading</div>
                <div style="font-size: 14px; color: #666;">Get more assessments at a lower per-unit cost</div>
              </div>
            </div>

            <ul style="margin: 15px 0; padding-left: 20px; color: #333; font-size: 14px;">
              <li style="margin-bottom: 8px;">Higher assessment limits (up to 400/month)</li>
              <li style="margin-bottom: 8px;">Lower overage rates ($3-$2 vs $${data.overagePrice})</li>
              <li style="margin-bottom: 8px;">Better value for high-volume usage</li>
            </ul>

            <div style="text-align: center; margin-top: 20px;">
              <a href="${data.upgradeUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Compare Plans</a>
            </div>
          </div>

          <!-- Current Plan Option -->
          <div style="padding: 20px; margin: 20px 0; border-radius: 8px; background: #f8f9fa;">
            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 10px;">💼 Stay on Current Plan</div>
            <p style="margin: 0; font-size: 14px; color: #666;">
              No action needed! Continue using assessments and we'll bill overage automatically. Perfect if your usage varies month-to-month.
            </p>
          </div>

          <!-- Dashboard CTA -->
          <div style="text-align: center; margin: 40px 0 30px 0;">
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">View your usage details and billing</p>
            <a href="${data.dashboardUrl}" style="display: inline-block; background: white; color: #457B9D; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; border: 2px solid #457B9D;">Go to Dashboard</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about your plan or billing?</strong>
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
          <p style="margin: 0;">This email was sent to ${data.ownerEmail}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
