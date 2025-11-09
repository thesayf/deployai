export interface SubscriptionUpdatedEmailData {
  companyName: string;
  ownerEmail: string;
  oldPlanName: string;
  newPlanName: string;
  newPlanPrice: number;
  currency: string;
  assessmentsIncluded: number;
  overagePrice: number;
  effectiveDate: string;
  nextBillingDate: string;
  proratedCredit?: number;
  proratedCharge?: number;
  dashboardUrl: string;
  isUpgrade: boolean;
}

export function generateSubscriptionUpdatedEmail(data: SubscriptionUpdatedEmailData): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.newPlanPrice / 100);

  const formattedOverage = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.overagePrice / 100);

  const formattedProrated = data.proratedCredit
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: data.currency.toUpperCase(),
      }).format(data.proratedCredit / 100)
    : data.proratedCharge
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: data.currency.toUpperCase(),
      }).format(data.proratedCharge / 100)
    : null;

  const effectiveDate = new Date(data.effectiveDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const nextBillingDate = new Date(data.nextBillingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const changeType = data.isUpgrade ? 'Upgrade' : 'Update';
  const headerColor = data.isUpgrade ? '#10b981' : '#457B9D';
  const headerGradient = data.isUpgrade
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #457B9D 0%, #1D3557 100%)';
  const emoji = data.isUpgrade ? '🚀' : '🔄';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscription ${changeType} - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: ${headerGradient}; padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">${emoji}</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Plan ${changeType} Confirmed</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">Your subscription has been updated</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Your subscription has been successfully updated. ${data.isUpgrade ? 'You now have access to more assessments and enhanced features.' : 'Your plan changes are now in effect.'}</p>

          <!-- Plan Change Box -->
          <div style="background: ${data.isUpgrade ? '#d1fae5' : '#f0f7ff'}; border: 2px solid ${headerColor}; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="text-align: center;">
              <div style="font-size: 14px; color: #666; margin-bottom: 15px;">Plan Change</div>

              <!-- Old Plan -->
              <div style="background: rgba(255,255,255,0.6); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
                <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Previous Plan</div>
                <div style="font-size: 20px; font-weight: 600; color: #999; text-decoration: line-through;">
                  ${data.oldPlanName}
                </div>
              </div>

              <!-- Arrow -->
              <div style="font-size: 28px; color: ${headerColor}; margin: 10px 0;">↓</div>

              <!-- New Plan -->
              <div style="background: white; padding: 20px; border-radius: 6px; border: 2px solid ${headerColor};">
                <div style="font-size: 13px; color: #666; margin-bottom: 8px;">New Plan</div>
                <div style="font-size: 28px; font-weight: bold; color: ${headerColor}; margin-bottom: 8px;">
                  ${data.newPlanName}
                </div>
                <div style="font-size: 20px; color: #333; font-weight: 600; margin-bottom: 5px;">
                  ${formattedPrice}/month
                </div>
                <div style="font-size: 14px; color: #666;">
                  ${data.assessmentsIncluded} assessments included
                </div>
              </div>

              <!-- Effective Date -->
              <div style="margin-top: 15px; font-size: 13px; color: #666;">
                Effective ${effectiveDate}
              </div>
            </div>
          </div>

          ${formattedProrated ? `
          <!-- Prorated Charges -->
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 10px;">
              ${data.proratedCredit ? '💰 Prorated Credit Applied' : '💳 Prorated Charge'}
            </div>
            <p style="margin: 0; font-size: 14px; color: #78350f;">
              ${data.proratedCredit
                ? `You've received a credit of ${formattedProrated} for the unused portion of your previous plan. This will be applied to your next invoice.`
                : `A prorated charge of ${formattedProrated} has been applied for the remainder of this billing period on your new plan.`
              }
            </p>
          </div>
          ` : ''}

          <!-- What's Changed -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What's Changed</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <div style="font-size: 14px; color: #1D3557; margin-bottom: 5px; font-weight: 600;">📊 Monthly Assessments</div>
              <div style="font-size: 16px; color: #457B9D; font-weight: 600;">
                ${data.assessmentsIncluded} assessments per month
              </div>
              <div style="font-size: 13px; color: #666; margin-top: 4px;">
                Your updated monthly allocation
              </div>
            </div>

            <div style="border-top: 1px solid #cbd5e1; padding-top: 15px; margin-top: 15px;">
              <div style="font-size: 14px; color: #1D3557; margin-bottom: 5px; font-weight: 600;">💵 Monthly Price</div>
              <div style="font-size: 16px; color: #457B9D; font-weight: 600;">
                ${formattedPrice}/month
              </div>
              <div style="font-size: 13px; color: #666; margin-top: 4px;">
                Billed automatically on ${nextBillingDate}
              </div>
            </div>

            <div style="border-top: 1px solid #cbd5e1; padding-top: 15px; margin-top: 15px;">
              <div style="font-size: 14px; color: #1D3557; margin-bottom: 5px; font-weight: 600;">➕ Overage Rate</div>
              <div style="font-size: 16px; color: #457B9D; font-weight: 600;">
                ${formattedOverage} per assessment
              </div>
              <div style="font-size: 13px; color: #666; margin-top: 4px;">
                For assessments beyond your monthly limit
              </div>
            </div>
          </div>

          ${data.isUpgrade ? `
          <!-- Upgrade Benefits -->
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #065f46; margin-bottom: 12px;">✨ ${changeType} Benefits</div>
            <ul style="margin: 0; padding-left: 20px; color: #047857; font-size: 14px;">
              <li style="margin-bottom: 8px;">More assessments to serve more clients</li>
              <li style="margin-bottom: 8px;">Better value per assessment</li>
              <li style="margin-bottom: 8px;">Same great features and support</li>
              <li style="margin-bottom: 8px;">Automatic overage billing (never lose a client)</li>
            </ul>
          </div>
          ` : ''}

          <!-- What Stays the Same -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What Stays the Same</h2>

          <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #666; font-size: 14px;">
            <li style="margin-bottom: 10px;">Your assessment link continues working</li>
            <li style="margin-bottom: 10px;">All historical data and reports remain accessible</li>
            <li style="margin-bottom: 10px;">White-label branding and customization</li>
            <li style="margin-bottom: 10px;">Real-time analytics dashboard</li>
            <li style="margin-bottom: 10px;">Email support and updates</li>
          </ul>

          <!-- Billing Info -->
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 15px;">Billing Information</div>
            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Next Billing Date:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${nextBillingDate}</strong>
            </div>
            <div style="margin-bottom: 12px;">
              <span style="font-size: 14px; color: #666;">Amount:</span>
              <strong style="font-size: 15px; color: #333; margin-left: 8px;">${formattedPrice}</strong>
            </div>
            <div style="font-size: 13px; color: #666; margin-top: 12px;">
              Your payment method on file will be charged automatically
            </div>
          </div>

          <!-- Quick Links -->
          <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Manage Your Subscription</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">View usage, update billing, or change your plan anytime</p>
            <a href="${data.dashboardUrl}/billing" style="display: inline-block; background: white; color: #1D3557; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Go to Billing</a>
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

          <p style="margin: 30px 0 0 0;">${data.isUpgrade ? 'Thank you for upgrading!' : 'Thanks for the update,'}br>
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
