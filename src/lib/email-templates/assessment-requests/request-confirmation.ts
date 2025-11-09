export interface RequestConfirmationEmailData {
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  companyName: string;
  requestedAt: string;
}

export function generateRequestConfirmationEmail(data: RequestConfirmationEmailData): string {
  const candidateName = `${data.candidateFirstName} ${data.candidateLastName}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Assessment Request Received - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 35px 20px; text-align: center;">
          <div style="font-size: 56px; margin-bottom: 10px;">✉️</div>
          <h1 style="color: white; font-size: 24px; margin: 0;">Request Received</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">We've received your assessment request</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hi ${data.candidateFirstName},</p>

          <p style="margin: 0 0 20px 0;">Thank you for your interest in taking the AI readiness assessment from <strong>${data.companyName}</strong>.</p>

          <!-- Status Box -->
          <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
            <div style="font-size: 18px; font-weight: 600; color: #1D3557; margin-bottom: 12px;">📋 Request Status</div>
            <div style="display: inline-block; background: #fef3c7; border: 2px solid #f59e0b; padding: 8px 16px; border-radius: 20px; font-weight: 600; color: #92400e; font-size: 14px;">
              PENDING APPROVAL
            </div>
            <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">
              Your request is being reviewed by the ${data.companyName} team
            </p>
          </div>

          <!-- What Happens Next -->
          <h2 style="color: #1D3557; font-size: 18px; margin: 30px 0 15px 0;">What Happens Next?</h2>

          <div style="space-y: 15px;">
            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">1</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">Review</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">The ${data.companyName} team will review your request</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">2</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">Approval</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">If approved, you'll receive an email with your assessment link</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">3</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">Complete Assessment</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Take the assessment at your convenience (typically 10-15 minutes)</p>
              </div>
            </div>

            <div style="display: flex; align-items: start; margin-bottom: 15px;">
              <div style="background: #457B9D; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0;">4</div>
              <div>
                <strong style="display: block; color: #333; margin-bottom: 4px;">Receive Report</strong>
                <p style="margin: 0; font-size: 14px; color: #666;">Get your personalized AI readiness analysis report</p>
              </div>
            </div>
          </div>

          <!-- Request Details -->
          <div style="background: #f8f9fa; padding: 20px; margin: 30px 0; border-radius: 6px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Request Details</div>

            <div style="margin-bottom: 10px;">
              <span style="font-size: 13px; color: #666;">Name:</span>
              <strong style="font-size: 14px; color: #333; margin-left: 8px;">${candidateName}</strong>
            </div>

            <div style="margin-bottom: 10px;">
              <span style="font-size: 13px; color: #666;">Email:</span>
              <strong style="font-size: 14px; color: #333; margin-left: 8px;">${data.candidateEmail}</strong>
            </div>

            <div>
              <span style="font-size: 13px; color: #666;">Requested:</span>
              <strong style="font-size: 14px; color: #333; margin-left: 8px;">${new Date(data.requestedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</strong>
            </div>
          </div>

          <!-- Info Box -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 6px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>⏱️ Response Time:</strong> You should hear back within 1-2 business days. If your request is approved, you'll receive a separate email with your unique assessment link.
            </p>
          </div>

          <!-- Contact Info -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              <strong>Questions about your request?</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #666;">
              Please contact the ${data.companyName} team directly for any inquiries about your assessment request.
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong><br>
          <span style="font-size: 13px; color: #666;">on behalf of ${data.companyName}</span></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This email was sent to ${data.candidateEmail}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
