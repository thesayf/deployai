export interface ReportEmailData {
  firstName: string;
  lastName: string;
  company?: string;
  reportUrl: string;
  industry?: string;
}

export function generateReportReadyEmail(data: ReportEmailData): string {
  // Optimized for better deliverability - simpler HTML, less promotional language
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Assessment Report - ${data.company || 'Analysis Complete'}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white;">
        
        <div style="border-bottom: 3px solid #457B9D; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; font-size: 24px; margin: 0;">Assessment Report Ready</h1>
          <p style="color: #666; margin: 5px 0;">AI Readiness Analysis for ${data.company || 'your organization'}</p>
        </div>
        
        <div style="padding: 0 20px;">
          <p>Hi ${data.firstName},</p>
          
          <p>Thank you for completing the AI readiness assessment. Your personalized analysis report has been generated and is ready for review.</p>
          
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #457B9D;">
            <strong>Report Contents:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Current state analysis</li>
              <li>Industry-specific opportunities</li>
              <li>Implementation roadmap</li>
              <li>Technology recommendations</li>
              <li>Investment projections</li>
              <li>Risk assessment</li>
              <li>Next steps</li>
            </ul>
          </div>
          
          <p>Access your report here:</p>
          <p><a href="${data.reportUrl}" style="color: #457B9D;">View Assessment Report</a></p>
          
          <p style="color: #666; font-size: 14px;">This report will be available for 30 days. We recommend downloading or bookmarking it for future reference.</p>
          
          <p>If you have any questions about your report, please don't hesitate to reach out.</p>
          
          <p>Best regards,<br>
          The deployAI Team</p>
        </div>
        
        <div style="border-top: 1px solid #e0e0e0; margin-top: 40px; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
          <p>deployAI Studio | AI Implementation Consulting<br>
          This is an automated message. Please do not reply directly to this email.</p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}