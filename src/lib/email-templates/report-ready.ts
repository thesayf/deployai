export interface ReportEmailData {
  firstName: string;
  lastName: string;
  company?: string;
  score: number;
  scoreCategory: string;
  reportUrl: string;
}

export function generateReportReadyEmail(data: ReportEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your AI Business Readiness Report is Ready!</title>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #457B9D 0%, #3a6a89 100%); padding: 40px 30px; text-align: center; color: white; }
        .content { padding: 30px; background: #f9f9f9; }
        .score-display { background: white; padding: 30px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .score-circle { width: 120px; height: 120px; margin: 0 auto 20px; border: 3px solid #457B9D; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; }
        .footer { padding: 30px; background: #1a1a1a; color: white; text-align: center; }
        .button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #457B9D 0%, #3a6a89 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; }
        .button-secondary { display: inline-block; padding: 12px 30px; border: 2px solid #457B9D; color: #457B9D; text-decoration: none; border-radius: 6px; font-weight: bold; }
        ul { text-align: left; max-width: 400px; margin: 0 auto; }
        .report-preview { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your AI Readiness Report is Ready!</h1>
          <p style="font-size: 18px; margin: 0;">Personalized insights for ${data.firstName} at ${data.company || 'your organization'}</p>
        </div>
        
        <div class="content">
          <div class="score-display">
            <div class="score-circle">
              <div>
                <div style="font-size: 36px; font-weight: bold; color: #457B9D;">${data.score}</div>
                <div style="font-size: 14px; color: #666;">out of 50</div>
              </div>
            </div>
            <h2 style="color: #333; margin: 0;">${data.scoreCategory}</h2>
            <p style="color: #666; font-size: 16px;">AI Readiness Level</p>
          </div>
          
          <div class="report-preview">
            <h3>Your Complete Report Includes:</h3>
            <ul>
              <li>Industry-specific AI opportunities tailored to your business</li>
              <li>Personalized implementation roadmap with timelines</li>
              <li>Technology recommendations based on your needs</li>
              <li>ROI projections and cost-benefit analysis</li>
              <li>Competitive advantage strategies</li>
              <li>Risk assessment and mitigation plans</li>
              <li>Next steps and quick wins</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.reportUrl}" class="button" style="color: white;">
              VIEW YOUR COMPLETE REPORT
            </a>
          </div>
          
          <p style="text-align: center; color: #666; font-size: 14px;">
            This report is available for 30 days.<br>
            <a href="${data.reportUrl}" style="color: #457B9D;">Bookmark this link</a> for future reference.
          </p>
          
          <div style="background: #f0f5ff; padding: 20px; border-radius: 8px; margin-top: 30px;">
            <h3 style="margin-top: 0;">What's Next?</h3>
            <p>Your report provides a comprehensive roadmap for AI implementation. Here are your immediate next steps:</p>
            <ol style="text-align: left;">
              <li>Review your personalized recommendations</li>
              <li>Identify quick wins you can implement immediately</li>
              <li>Share the report with your team for alignment</li>
              <li>Schedule a consultation to discuss implementation</li>
            </ol>
          </div>
        </div>
        
        <div class="footer">
          <h3>Ready to Transform Your Business with AI?</h3>
          <p>Our team specializes in implementing the exact solutions recommended in your report.</p>
          <div style="margin: 20px 0;">
            <a href="https://deployai.studio/contact" class="button-secondary" style="color: #457B9D;">
              Schedule a Free Consultation
            </a>
          </div>
          <p style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
            © ${new Date().getFullYear()} deployAI Studio. All rights reserved.<br>
            <a href="https://deployai.studio" style="color: #457B9D;">deployai.studio</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}