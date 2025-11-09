export interface AdminNotificationEmailData {
  adminEmail: string;
  companyName: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateCompany?: string;
  requestId: string;
  requestedAt: string;
  approveUrl: string;
  dashboardUrl: string;
}

export function generateAdminNotificationEmail(data: AdminNotificationEmailData): string {
  const candidateName = `${data.candidateFirstName} ${data.candidateLastName}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Assessment Request - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 35px 20px; text-align: center;">
          <div style="font-size: 56px; margin-bottom: 10px;">🔔</div>
          <h1 style="color: white; font-size: 24px; margin: 0;">New Assessment Request</h1>
          <p style="color: rgba(255,255,255,0.95); margin: 8px 0 0 0; font-size: 16px;">Action required</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.companyName} team,</p>

          <p style="margin: 0 0 20px 0;">You have a new assessment request that needs your review and approval.</p>

          <!-- Candidate Info Card -->
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 15px;">👤 Candidate Information</div>

            <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 12px;">
              <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Name</div>
              <div style="font-size: 18px; font-weight: 600; color: #1D3557;">${candidateName}</div>
            </div>

            <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 12px;">
              <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Email</div>
              <div style="font-size: 15px; color: #333;">
                <a href="mailto:${data.candidateEmail}" style="color: #457B9D; text-decoration: none;">${data.candidateEmail}</a>
              </div>
            </div>

            ${data.candidateCompany ? `
              <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 12px;">
                <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Company</div>
                <div style="font-size: 15px; color: #333;">${data.candidateCompany}</div>
              </div>
            ` : ''}

            <div style="background: white; padding: 15px; border-radius: 6px;">
              <div style="font-size: 13px; color: #666; margin-bottom: 5px;">Requested At</div>
              <div style="font-size: 15px; color: #333;">${new Date(data.requestedAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</div>
            </div>
          </div>

          <!-- Why This Request -->
          <div style="background: #f0f7ff; border-left: 4px solid #457B9D; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 14px; font-weight: 600; color: #1D3557; margin-bottom: 8px;">ℹ️ Why This Request?</div>
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              This candidate attempted to take an assessment but your account has reached its current limit. They've requested access, pending your approval.
            </p>
          </div>

          <!-- Quick Actions -->
          <h2 style="color: #1D3557; font-size: 20px; margin: 30px 0 15px 0;">Take Action</h2>

          <!-- Approve Button -->
          <div style="background: #d1fae5; border: 2px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <div style="margin-bottom: 12px;">
              <strong style="font-size: 16px; color: #065f46;">✅ Approve This Request</strong>
            </div>
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #047857;">
              Approving will generate a unique assessment link and send it directly to ${data.candidateFirstName}.
            </p>
            <div style="text-align: center;">
              <a href="${data.approveUrl}" style="display: inline-block; background: #10b981; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Approve Request</a>
            </div>
          </div>

          <!-- View in Dashboard -->
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Or manage all requests in your dashboard</p>
            <a href="${data.dashboardUrl}" style="display: inline-block; background: white; color: #457B9D; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; border: 2px solid #457B9D;">View Dashboard</a>
          </div>

          <!-- Important Notes -->
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 14px; font-weight: 600; color: #92400e; margin-bottom: 8px;">📊 Billing Note</div>
            <p style="margin: 0; font-size: 13px; color: #78350f;">
              Approving this request will use 1 assessment from your plan. If you're at your limit, this will be billed as an overage at your tier's overage rate.
            </p>
          </div>

          <!-- Support -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about assessment requests?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Contact us at <a href="mailto:hello@deployai.studio" style="color: #457B9D;">hello@deployai.studio</a>
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This notification was sent to ${data.adminEmail}</p>
          <p style="margin: 5px 0 0 0;">Request ID: ${data.requestId}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
