export interface SubscriptionActivatedEmailData {
  companyName: string;
  ownerEmail: string;
  planName: string;
  planPrice: number;
  currency: string;
  assessmentsIncluded: number;
  overagePrice: number;
  billingCycle: string; // 'monthly' | 'yearly'
  nextBillingDate: string;
  activatedAt: string;
  assessmentLink: string;
  dashboardUrl: string;
}

export function generateSubscriptionActivatedEmail(data: SubscriptionActivatedEmailData): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.planPrice / 100);

  const formattedOverage = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.overagePrice / 100);

  const nextBillingDate = new Date(data.nextBillingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const billingCycleText = data.billingCycle === 'yearly' ? 'year' : 'month';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to deployAI - Subscription Activated</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">🎉</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Welcome to deployAI!</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">Your ${data.planName} subscription is now active</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Congratulations! Your deployAI subscription is now active. You're all set to start delivering professional AI assessments to your clients.</p>

          <!-- Subscription Details Box -->
          <div style="background: #d1fae5; border: 2px solid #10b981; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="font-size: 16px; color: #065f46; margin-bottom: 10px; font-weight: 600;">Active Subscription</div>
              <div style="font-size: 32px; font-weight: bold; color: #059669; margin-bottom: 8px;">
                ${data.planName}
              </div>
              <div style="font-size: 20px; color: #047857; font-weight: 600; margin-bottom: 5px;">
                ${formattedPrice}/${billingCycleText}
              </div>
              <div style="font-size: 14px; color: #065f46;">
                ${data.assessmentsIncluded} assessments included
              </div>
            </div>

            <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 6px;">
              <div style="font-size: 13px; color: #065f46; margin-bottom: 5px; font-weight: 600;">Next Billing Date</div>
              <div style="font-size: 15px; color: #047857; font-weight: 600;">
                ${nextBillingDate}
              </div>
            </div>
          </div>

          <!-- Quick Start Guide -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">🚀 Quick Start Guide</h2>

          <div style="space-y: 15px;">
            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">1</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">Share Your Assessment Link</strong>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Your unique assessment link is ready to share with clients</p>
                <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px; font-family: monospace; color: #333; margin-top: 8px;">
                  ${data.assessmentLink}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">2</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">Monitor Your Dashboard</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Track assessments, view reports, and monitor usage in real-time</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 18px;">
              <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; margin-right: 14px; flex-shrink: 0;">3</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 5px; font-size: 15px;">Deliver Professional Reports</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Each completed assessment generates a comprehensive AI readiness report</p>
              </div>
            </div>
          </div>

          <!-- What's Included -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What's Included in Your Plan</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <ul style="margin: 0; padding-left: 20px; color: #1D3557; font-size: 14px;">
              <li style="margin-bottom: 10px;"><strong>${data.assessmentsIncluded} AI assessments</strong> per ${billingCycleText}</li>
              <li style="margin-bottom: 10px;"><strong>White-label platform</strong> - Your brand, your domain</li>
              <li style="margin-bottom: 10px;"><strong>Professional reports</strong> - Comprehensive AI readiness analysis</li>
              <li style="margin-bottom: 10px;"><strong>Real-time dashboard</strong> - Track all assessments and clients</li>
              <li style="margin-bottom: 10px;"><strong>Automatic overage billing</strong> - Never turn away a client</li>
              <li style="margin-bottom: 10px;"><strong>Email support</strong> - We're here to help</li>
            </ul>
          </div>

          <!-- Overage Billing Info -->
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 10px;">💡 How Overage Billing Works</div>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #78350f;">
              Your assessment link <strong>never stops working</strong>. If you exceed ${data.assessmentsIncluded} assessments in a ${billingCycleText}, additional assessments are automatically billed at ${formattedOverage} each.
            </p>
            <p style="margin: 0; font-size: 14px; color: #78350f;">
              This means you'll never lose a client due to running out of assessments. Overage charges are added to your next invoice.
            </p>
          </div>

          <!-- Key Features Breakdown -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Key Features</h2>

          <div style="margin: 20px 0;">
            <div style="margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 24px; margin-right: 10px;">🔗</span>
                <strong style="color: #333; font-size: 15px;">Unique Assessment Link</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                Share one link with all your clients. We track and organize everything automatically.
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 24px; margin-right: 10px;">📊</span>
                <strong style="color: #333; font-size: 15px;">Real-Time Analytics</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                View completion rates, track usage, and access all reports from your dashboard.
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 24px; margin-right: 10px;">🎨</span>
                <strong style="color: #333; font-size: 15px;">White-Label Branding</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                Your logo, your colors, your domain. Clients see your brand throughout the experience.
              </p>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 24px; margin-right: 10px;">📄</span>
                <strong style="color: #333; font-size: 15px;">Professional Reports</strong>
              </div>
              <p style="margin: 0; font-size: 14px; color: #666; padding-left: 34px;">
                Each assessment generates a detailed AI readiness report with recommendations and roadmap.
              </p>
            </div>
          </div>

          <!-- CTA -->
          <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 15px;">Ready to Get Started?</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">Access your dashboard and start sharing your assessment link</p>
            <a href="${data.dashboardUrl}" style="display: inline-block; background: white; color: #1D3557; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Go to Dashboard</a>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Need help getting started?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We're here to help: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Welcome aboard!<br>
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
