export interface PaymentFailedEmailData {
  companyName: string;
  ownerEmail: string;
  amountDue: number;
  currency: string;
  failedAt: string;
  retryDate?: string;
  gracePeriodDays: number;
  updatePaymentUrl: string;
  dashboardUrl: string;
  currentTier: string;
}

export function generatePaymentFailedEmail(data: PaymentFailedEmailData): string {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.amountDue / 100);

  const failedDate = new Date(data.failedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const retryDate = data.retryDate
    ? new Date(data.retryDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Failed - Action Required</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">⚠️</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Payment Failed</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">Action Required</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">We attempted to process your payment but it was unsuccessful. Your assessment platform is still active, but we need you to update your payment information to avoid service interruption.</p>

          <!-- Payment Failed Box -->
          <div style="background: #fee2e2; border: 2px solid #ef4444; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="font-size: 16px; color: #991b1b; margin-bottom: 10px; font-weight: 600;">Payment Declined</div>
              <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin-bottom: 8px;">
                ${formattedAmount}
              </div>
              <div style="font-size: 14px; color: #7f1d1d;">
                ${data.currentTier} Plan - Failed on ${failedDate}
              </div>
            </div>

            ${retryDate ? `
            <div style="background: rgba(255,255,255,0.8); padding: 15px; border-radius: 6px; text-align: center;">
              <div style="font-size: 13px; color: #991b1b; margin-bottom: 5px; font-weight: 600;">Automatic Retry Scheduled</div>
              <div style="font-size: 14px; color: #7f1d1d;">
                We'll automatically retry your payment on ${retryDate}
              </div>
            </div>
            ` : ''}
          </div>

          <!-- CTA -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="color: white; font-size: 20px; font-weight: 600; margin-bottom: 15px;">Update Your Payment Method</div>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">Update your card details to continue using deployAI</p>
            <a href="${data.updatePaymentUrl}" style="display: inline-block; background: white; color: #059669; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Update Payment Method</a>
          </div>

          <!-- Why This Happened -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Common Reasons for Payment Failure</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <ul style="margin: 0; padding-left: 20px; color: #1D3557; font-size: 14px;">
              <li style="margin-bottom: 10px;">Card has expired or been replaced</li>
              <li style="margin-bottom: 10px;">Insufficient funds in account</li>
              <li style="margin-bottom: 10px;">Card reached its limit</li>
              <li style="margin-bottom: 10px;">Bank flagged as suspicious transaction</li>
              <li style="margin-bottom: 10px;">Billing address doesn't match card on file</li>
            </ul>
          </div>

          <!-- What Happens Next -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">What Happens Next?</h2>

          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">📅 Grace Period</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                You have ${data.gracePeriodDays} days to update your payment method. During this time, your assessment link and dashboard remain fully active.
              </p>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 15px; margin-top: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">🔄 Automatic Retries</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                ${retryDate
                  ? `We'll automatically attempt to process your payment again on ${retryDate}. However, we recommend updating your payment method now to avoid any issues.`
                  : 'We\'ll attempt to process your payment again in a few days. However, we recommend updating your payment method now to avoid any issues.'
                }
              </p>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 15px; margin-top: 15px;">
              <strong style="display: block; color: #92400e; margin-bottom: 5px; font-size: 15px;">⚠️ After Grace Period</strong>
              <p style="margin: 0; font-size: 14px; color: #78350f;">
                If payment isn't received within ${data.gracePeriodDays} days, your assessment link will be paused and you'll lose access to your dashboard and historical data.
              </p>
            </div>
          </div>

          <!-- Account Status -->
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #065f46; margin-bottom: 10px;">✅ Your Account is Still Active</div>
            <p style="margin: 0; font-size: 14px; color: #047857;">
              Don't worry - your assessment link is still working and your clients can still complete assessments. We just need you to update your payment method to keep everything running smoothly.
            </p>
          </div>

          <!-- Quick Steps -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 12px 0;">Quick Steps to Fix This</h2>

          <div style="space-y: 15px;">
            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">1</div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #333;">Click the "Update Payment Method" button above</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">2</div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #333;">Enter your updated card details</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">3</div>
              <div>
                <p style="margin: 0; font-size: 14px; color: #333;">We'll automatically process the payment once updated</p>
              </div>
            </div>
          </div>

          <!-- Need Help -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Need help or have questions about your billing?</strong>
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
