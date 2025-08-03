import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow internal calls
  const internalKey = req.headers['x-internal-api-key'];
  if (internalKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, projectName, accessToken } = req.body;

    if (!email || !firstName || !projectName || !accessToken) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/mvp-planner/report/${accessToken}`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your MVP Development Plan is Ready</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 8px 8px 0px rgba(0, 0, 0, 1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">
                deployAI studio
              </h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #212121; font-size: 28px; margin: 0 0 10px 0; font-weight: 800;">
                Hey ${firstName}! 🎉
              </h2>
              
              <p style="color: #212121; font-size: 20px; line-height: 1.5; margin: 0 0 30px 0; font-weight: 600;">
                Your MVP development plan for <strong>${projectName}</strong> is ready!
              </p>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                We've analyzed your requirements and created a comprehensive development plan including:
              </p>
              
              <ul style="color: #666666; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                <li><strong>Detailed cost breakdown</strong> with feature prioritization</li>
                <li><strong>Recommended tech stack</strong> optimized for your needs</li>
                <li><strong>4-week development timeline</strong> with weekly deliverables</li>
                <li><strong>Monthly running costs</strong> with service breakdown</li>
                <li><strong>User capabilities</strong> for your MVP</li>
              </ul>
              
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 40px 0;">
                <tr>
                  <td>
                    <a href="${reportUrl}" style="display: inline-block; background-color: #F97316; color: #ffffff; text-decoration: none; padding: 16px 32px; font-size: 18px; font-weight: 700; border: 3px solid #000000; box-shadow: 4px 4px 0px rgba(0, 0, 0, 1); text-transform: uppercase;">
                      View Your MVP Plan →
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                This report will be available for 30 days. We recommend downloading or printing it for your records.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 30px 40px; text-align: center; border-top: 3px solid #000000;">
              <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                Ready to build your MVP? Reply to this email to schedule a consultation.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} deployAI studio. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const emailText = `
Hey ${firstName}!

Your MVP development plan for ${projectName} is ready!

We've analyzed your requirements and created a comprehensive development plan including:
- Detailed cost breakdown with feature prioritization
- Recommended tech stack optimized for your needs
- 4-week development timeline with weekly deliverables
- Monthly running costs with service breakdown
- User capabilities for your MVP

View your plan here: ${reportUrl}

This report will be available for 30 days. We recommend downloading or printing it for your records.

Ready to build your MVP? Reply to this email to schedule a consultation.

Best regards,
deployAI studio team
    `;

    const { error } = await resend.emails.send({
      from: 'deployAI studio <noreply@deployai.studio>',
      to: email,
      subject: `Your MVP Development Plan for ${projectName} is Ready!`,
      html: emailHtml,
      text: emailText,
      tags: [
        {
          name: 'category',
          value: 'mvp-planner-report',
        },
      ],
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in send-report-email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}