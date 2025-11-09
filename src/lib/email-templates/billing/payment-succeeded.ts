export interface PaymentSucceededEmailData {
  companyName: string;
  ownerEmail: string;
  amountPaid: number;
  currency: string;
  paidAt: string;
  currentTier: string;
  nextBillingDate: string;
  assessmentsIncluded: number;
  assessmentsUsed: number;
  overageCharges?: number;
  invoiceUrl?: string;
  dashboardUrl: string;
}

export function generatePaymentSucceededEmail(data: PaymentSucceededEmailData): string {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(data.amountPaid / 100);

  const formattedOverage = data.overageCharges
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: data.currency.toUpperCase(),
      }).format(data.overageCharges / 100)
    : null;

  const paidDate = new Date(data.paidAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const nextBillingDate = new Date(data.nextBillingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const basePrice = data.overageCharges
    ? (data.amountPaid - data.overageCharges) / 100
    : data.amountPaid / 100;

  const formattedBase = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
  }).format(basePrice);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Received - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 10px;">✅</div>
          <h1 style="color: white; font-size: 26px; margin: 0;">Payment Received</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">Thank you for your payment</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">Your payment has been successfully processed. This email serves as your receipt for this transaction.</p>

          <!-- Payment Success Box -->
          <div style="background: #d1fae5; border: 2px solid #10b981; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 16px; color: #065f46; margin-bottom: 10px; font-weight: 600;">Payment Confirmed</div>
            <div style="font-size: 36px; font-weight: bold; color: #059669; margin-bottom: 8px;">
              ${formattedAmount}
            </div>
            <div style="font-size: 14px; color: #047857; margin-bottom: 15px;">
              Paid on ${paidDate}
            </div>
            ${data.invoiceUrl ? `
            <div style="margin-top: 15px;">
              <a href="${data.invoiceUrl}" style="display: inline-block; background: white; color: #059669; padding: 10px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; border: 2px solid #10b981;">Download Invoice</a>
            </div>
            ` : ''}
          </div>

          <!-- Payment Breakdown -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Payment Breakdown</h2>

          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 15px; color: #1D3557; font-weight: 600;">${data.currentTier} Plan</span>
              <span style="font-size: 16px; color: #333; font-weight: 600;">${formattedBase}</span>
            </div>
            <div style="margin-bottom: 12px; font-size: 13px; color: #666;">
              ${data.assessmentsIncluded} assessments included per month
            </div>

            ${data.overageCharges && data.overageCharges > 0 ? `
            <div style="border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 12px;">
              <div style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 14px; color: #1D3557;">Overage Charges</span>
                <span style="font-size: 15px; color: #333; font-weight: 600;">${formattedOverage}</span>
              </div>
              <div style="font-size: 13px; color: #666;">
                ${data.assessmentsUsed - data.assessmentsIncluded} assessments over limit
              </div>
            </div>

            <div style="border-top: 2px solid #457B9D; padding-top: 12px; margin-top: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 16px; color: #1D3557; font-weight: 700;">Total Paid</span>
                <span style="font-size: 18px; color: #457B9D; font-weight: 700;">${formattedAmount}</span>
              </div>
            </div>
            ` : ''}
          </div>

          <!-- Usage Summary -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 35px 0 15px 0;">Current Billing Period</h2>

          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 6px;">
            <div style="margin-bottom: 12px;">
              <div style="font-size: 14px; color: #92400e; margin-bottom: 5px; font-weight: 600;">Assessments Used</div>
              <div style="font-size: 24px; font-weight: bold; color: #d97706;">
                ${data.assessmentsUsed} <span style="font-size: 16px; color: #78350f; font-weight: normal;">/ ${data.assessmentsIncluded}</span>
              </div>
              <div style="background: #fef3c7; height: 8px; border-radius: 4px; margin-top: 10px; overflow: hidden;">
                <div style="background: #f59e0b; height: 100%; width: ${Math.min((data.assessmentsUsed / data.assessmentsIncluded) * 100, 100)}%; transition: width 0.3s ease;"></div>
              </div>
            </div>

            <div style="border-top: 1px solid #fed7aa; padding-top: 12px; margin-top: 12px;">
              <div style="font-size: 14px; color: #92400e; margin-bottom: 5px; font-weight: 600;">Next Billing Date</div>
              <div style="font-size: 16px; color: #78350f; font-weight: 600;">
                ${nextBillingDate}
              </div>
              <div style="font-size: 13px; color: #92400e; margin-top: 4px;">
                Your card will be charged automatically
              </div>
            </div>
          </div>

          <!-- Account Status -->
          <div style="background: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 16px; font-weight: 600; color: #065f46; margin-bottom: 10px;">✅ Your Account is Active</div>
            <p style="margin: 0; font-size: 14px; color: #047857;">
              Your assessment platform is fully operational. Your clients can continue completing assessments, and all features are available.
            </p>
          </div>

          <!-- What You Get -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 12px 0;">What's Included in Your ${data.currentTier} Plan</h2>

          <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #666; font-size: 14px;">
            <li style="margin-bottom: 10px;">${data.assessmentsIncluded} AI assessments per month</li>
            <li style="margin-bottom: 10px;">White-label assessment platform</li>
            <li style="margin-bottom: 10px;">Professional branded reports</li>
            <li style="margin-bottom: 10px;">Automatic overage billing (never lose a client)</li>
            <li style="margin-bottom: 10px;">Real-time analytics dashboard</li>
            <li style="margin-bottom: 10px;">Email support and updates</li>
          </ul>

          <!-- Quick Links -->
          <div style="background: #f8f9fa; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 15px;">Quick Links</div>
            <div style="margin-bottom: 10px;">
              <a href="${data.dashboardUrl}" style="color: #457B9D; text-decoration: none; font-size: 14px;">→ View Dashboard</a>
            </div>
            ${data.invoiceUrl ? `
            <div style="margin-bottom: 10px;">
              <a href="${data.invoiceUrl}" style="color: #457B9D; text-decoration: none; font-size: 14px;">→ Download Invoice</a>
            </div>
            ` : ''}
            <div style="margin-bottom: 10px;">
              <a href="${data.dashboardUrl}/billing" style="color: #457B9D; text-decoration: none; font-size: 14px;">→ Manage Billing</a>
            </div>
          </div>

          <!-- Questions -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about your billing or need help?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Contact us: <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Thank you for being a valued customer,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This email was sent to ${data.ownerEmail}</p>
          <p style="margin: 10px 0 0 0;">Payment ID: ${data.paidAt}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
