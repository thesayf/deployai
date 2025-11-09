export interface SubscriptionCanceledEmailData {
  companyName: string;
  ownerEmail: string;
  planName: string;
  canceledAt: string;
  accessEndsAt: string;
  daysRemaining: number;
  assessmentsCompleted: number;
  cancellationReason?: string;
  feedbackUrl?: string;
  reactivateUrl: string;
  dashboardUrl: string;
}

export function generateSubscriptionCanceledEmail(data: SubscriptionCanceledEmailData): string {
  const canceledDate = new Date(data.canceledAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const accessEndsDate = new Date(data.accessEndsAt).toLocaleDateString('en-US', {
    weekday: 'long',
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
      <title>Subscription Canceled - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">👋</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Subscription Canceled</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">We're sorry to see you go</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">We've received your cancellation request and wanted to confirm that your subscription has been canceled.</p>

          <!-- Cancellation Status Box -->
          <div style="background: #fee2e2; border: 2px solid #ef4444; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 16px; color: #991b1b; margin-bottom: 10px; font-weight: 600;">Subscription Canceled</div>
            <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-bottom: 8px;">
              ${data.planName}
            </div>
            <div style="font-size: 14px; color: #7f1d1d; margin-bottom: 20px;">
              Canceled on ${canceledDate}
            </div>

            <div style="background: rgba(255,255,255,0.8); padding: 18px; border-radius: 6px;">
              <div style="font-size: 14px; color: #991b1b; margin-bottom: 8px; font-weight: 600;">Access Ends On</div>
              <div style="font-size: 20px; color: #dc2626; font-weight: 700; margin-bottom: 5px;">
                ${accessEndsDate}
              </div>
              <div style="font-size: 14px; color: #7f1d1d;">
                ${data.daysRemaining} day${data.daysRemaining !== 1 ? 's' : ''} of access remaining
              </div>
            </div>
          </div>

          <!-- What Happens Now -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What Happens Now?</h2>

          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">✅ Until ${accessEndsDate}</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                Your assessment link and dashboard remain fully active. You can continue using all features until your paid period ends.
              </p>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 15px; margin-top: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">❌ After ${accessEndsDate}</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                Your assessment link will be deactivated and you'll lose access to your dashboard. All data will be preserved for 30 days in case you change your mind.
              </p>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 15px; margin-top: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">🔄 Reactivation</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                You can reactivate your subscription anytime before ${accessEndsDate} to continue seamlessly. After that, you can still reactivate within 30 days and restore all your data.
              </p>
            </div>
          </div>

          <!-- Your Impact -->
          ${data.assessmentsCompleted > 0 ? `
          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #1D3557; margin-bottom: 12px;">📊 Your Impact with deployAI</div>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #1D3557;">
              During your time with us, you completed:
            </p>
            <div style="font-size: 36px; font-weight: bold; color: #457B9D; margin: 10px 0;">
              ${data.assessmentsCompleted}
            </div>
            <div style="font-size: 15px; color: #1D3557; font-weight: 600;">
              Professional AI Assessments
            </div>
            <p style="margin: 15px 0 0 0; font-size: 13px; color: #666;">
              Thank you for using deployAI to serve your clients.
            </p>
          </div>
          ` : ''}

          <!-- Before You Go -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Before You Go...</h2>

          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #065f46; margin-bottom: 12px;">💡 Did You Know?</div>
            <ul style="margin: 0; padding-left: 20px; color: #047857; font-size: 14px;">
              <li style="margin-bottom: 8px;">You can pause your account instead of canceling (keep your data, stop billing)</li>
              <li style="margin-bottom: 8px;">We offer flexible plans starting at $199/month</li>
              <li style="margin-bottom: 8px;">Overage billing means you never turn away a client</li>
              <li style="margin-bottom: 8px;">All your data, reports, and settings are preserved</li>
            </ul>
          </div>

          <!-- Feedback Request -->
          ${data.feedbackUrl ? `
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 12px;">We'd Love Your Feedback</div>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #666;">
              Help us improve by sharing why you decided to cancel. It only takes 2 minutes.
            </p>
            <a href="${data.feedbackUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Share Feedback</a>
          </div>
          ` : ''}

          <!-- Reactivation CTA -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Changed Your Mind?</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">You can reactivate your subscription anytime before ${accessEndsDate}</p>
            <a href="${data.reactivateUrl}" style="display: inline-block; background: white; color: #059669; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Reactivate Subscription</a>
          </div>

          <!-- Data Retention -->
          <div style="border: 2px solid #e0e0e0; padding: 20px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 12px;">🔒 Your Data is Safe</div>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;">
              We'll keep your data, reports, and settings for <strong>30 days</strong> after ${accessEndsDate}. If you reactivate during this time, everything will be restored exactly as you left it.
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              After 30 days, your data will be permanently deleted as per our data retention policy.
            </p>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about your cancellation or data?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              We're here to help: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">We hope to see you again,<br>
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
