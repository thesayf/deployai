export interface TrialEndingEmailData {
  companyName: string;
  ownerEmail: string;
  trialEndsAt: string;
  daysRemaining: number;
  assessmentsUsed: number;
  currentTier: string;
  selectPlanUrl: string;
  dashboardUrl: string;
}

export function generateTrialEndingEmail(data: TrialEndingEmailData): string {
  const formattedDate = new Date(data.trialEndsAt).toLocaleDateString('en-US', {
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
      <title>Your Trial is Ending Soon - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">⏰</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Your Trial is Ending Soon</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">${data.daysRemaining} Days Remaining</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Your 14-day free trial is ending soon. We wanted to give you a heads up so you can choose the right plan to continue using deployAI.</p>

          <!-- Trial Status Box -->
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 16px; color: #92400e; margin-bottom: 15px; font-weight: 600;">Trial Ends On</div>
            <div style="font-size: 28px; font-weight: bold; color: #d97706; margin-bottom: 8px;">
              ${formattedDate}
            </div>
            <div style="font-size: 14px; color: #78350f;">
              ${data.daysRemaining} day${data.daysRemaining !== 1 ? 's' : ''} from now
            </div>
          </div>

          <!-- Trial Usage Stats -->
          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #1D3557; margin-bottom: 12px;">📊 Your Trial Activity</div>
            <div style="margin-bottom: 10px;">
              <span style="font-size: 14px; color: #666;">Assessments Completed:</span>
              <strong style="font-size: 18px; color: #457B9D; margin-left: 8px;">${data.assessmentsUsed}</strong>
            </div>
            <div>
              <span style="font-size: 14px; color: #666;">Current Plan:</span>
              <strong style="font-size: 16px; color: #333; margin-left: 8px; text-transform: capitalize;">${data.currentTier} (Trial)</strong>
            </div>
          </div>

          <!-- What Happens Next -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What Happens After Your Trial Ends?</h2>

          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">✅ If You Subscribe</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                Your assessment link continues working seamlessly. All your data, reports, and settings are preserved. You'll be charged monthly based on your chosen plan.
              </p>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">❌ If You Don't Subscribe</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                Your assessment link will be deactivated. You'll lose access to your dashboard and historical data. You can reactivate anytime by subscribing.
              </p>
            </div>
          </div>

          <!-- Pricing Preview -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Choose Your Plan</h2>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0 30px 0;">
            <!-- Starter -->
            <div style="border: 2px solid #e5e7eb; padding: 15px; border-radius: 6px; text-align: center;">
              <div style="font-size: 14px; font-weight: 600; color: #666; margin-bottom: 8px;">Starter</div>
              <div style="font-size: 24px; font-weight: bold; color: #333;">$199</div>
              <div style="font-size: 12px; color: #999; margin-bottom: 10px;">/month</div>
              <div style="font-size: 13px; color: #666;">25 assessments</div>
            </div>

            <!-- Professional -->
            <div style="border: 2px solid #457B9D; padding: 15px; border-radius: 6px; text-align: center; background: #f0f7ff;">
              <div style="font-size: 12px; font-weight: 600; color: #457B9D; margin-bottom: 4px;">MOST POPULAR</div>
              <div style="font-size: 14px; font-weight: 600; color: #1D3557; margin-bottom: 8px;">Professional</div>
              <div style="font-size: 24px; font-weight: bold; color: #457B9D;">$499</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 10px;">/month</div>
              <div style="font-size: 13px; color: #1D3557;">100 assessments</div>
            </div>

            <!-- Scale -->
            <div style="border: 2px solid #e5e7eb; padding: 15px; border-radius: 6px; text-align: center;">
              <div style="font-size: 14px; font-weight: 600; color: #666; margin-bottom: 8px;">Scale</div>
              <div style="font-size: 24px; font-weight: bold; color: #333;">$997</div>
              <div style="font-size: 12px; color: #999; margin-bottom: 10px;">/month</div>
              <div style="font-size: 13px; color: #666;">400 assessments</div>
            </div>
          </div>

          <!-- CTA -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 15px;">Don't Lose Your Progress</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">Select a plan now to keep your assessment link active</p>
            <a href="${data.selectPlanUrl}" style="display: inline-block; background: white; color: #059669; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Select Your Plan</a>
          </div>

          <!-- Benefits Reminder -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 12px 0;">Why Continue with deployAI?</h2>

          <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #666; font-size: 14px;">
            <li style="margin-bottom: 10px;">Keep your white-label AI assessment platform active</li>
            <li style="margin-bottom: 10px;">Professional branded reports for your clients</li>
            <li style="margin-bottom: 10px;">Automatic overage billing (never lose a client)</li>
            <li style="margin-bottom: 10px;">Real-time analytics and insights</li>
            <li style="margin-bottom: 10px;">Email support and ongoing updates</li>
          </ul>

          <!-- Questions -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about pricing or features?</strong>
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
