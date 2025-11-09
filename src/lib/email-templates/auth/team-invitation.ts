export interface TeamInvitationEmailData {
  invitedEmail: string;
  inviterName: string;
  companyName: string;
  role: 'admin' | 'member';
  acceptUrl: string;
  expiresInDays?: number;
}

export function generateTeamInvitationEmail(data: TeamInvitationEmailData): string {
  const expiryDays = data.expiresInDays || 7;
  const roleLabel = data.role === 'admin' ? 'Admin' : 'Team Member';
  const roleDescription = data.role === 'admin'
    ? 'full access to manage settings, billing, and team members'
    : 'access to view assessments and reports';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Invitation - ${data.companyName}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #457B9D 0%, #1D3557 100%); padding: 35px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">👥</div>
          <h1 style="color: white; font-size: 24px; margin: 0;">You've Been Invited!</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <p style="font-size: 16px; margin: 0 0 20px 0;">Hello,</p>

          <p style="margin: 0 0 20px 0;"><strong>${data.inviterName}</strong> has invited you to join their team on deployAI.</p>

          <!-- Invitation Details Box -->
          <div style="background: #f0f7ff; border: 2px solid #457B9D; padding: 25px; margin: 30px 0; border-radius: 8px;">
            <p style="margin: 0 0 15px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Invitation Details</p>

            <div style="margin-bottom: 15px;">
              <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">Organization</p>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1D3557;">${data.companyName}</p>
            </div>

            <div style="margin-bottom: 15px;">
              <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">Your Role</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #457B9D;">${roleLabel}</p>
            </div>

            <div>
              <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">Access Level</p>
              <p style="margin: 0; font-size: 14px; color: #333;">You'll have ${roleDescription}</p>
            </div>
          </div>

          <p style="margin: 0 0 30px 0;">Click the button below to accept the invitation and join the team:</p>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.acceptUrl}" style="display: inline-block; background: #457B9D; color: white; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Accept Invitation</a>
          </div>

          <p style="margin: 30px 0 20px 0; font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
          <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: monospace; color: #333;">
            ${data.acceptUrl}
          </div>

          <!-- What You'll Get -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 25px; margin-top: 30px;">
            <p style="margin: 0 0 15px 0; font-weight: 600; color: #1D3557;">What you'll be able to do:</p>
            ${data.role === 'admin' ? `
              <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 14px;">
                <li style="margin-bottom: 8px;">Manage team members and invitations</li>
                <li style="margin-bottom: 8px;">Configure organization settings</li>
                <li style="margin-bottom: 8px;">View all assessments and reports</li>
                <li style="margin-bottom: 8px;">Manage billing and subscription</li>
                <li style="margin-bottom: 8px;">Access analytics dashboard</li>
              </ul>
            ` : `
              <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 14px;">
                <li style="margin-bottom: 8px;">View assessments and reports</li>
                <li style="margin-bottom: 8px;">Access analytics dashboard</li>
                <li style="margin-bottom: 8px;">Download reports</li>
                <li style="margin-bottom: 8px;">View team activity</li>
              </ul>
            `}
          </div>

          <!-- Warning Box -->
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 30px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              ⏱️ This invitation will expire in <strong>${expiryDays} days</strong>. Please accept it before then to join the team.
            </p>
          </div>

          <!-- Didn't Expect This -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Didn't expect this invitation?</strong><br>
              If you don't know ${data.inviterName} or don't want to join this team, you can safely ignore this email.
            </p>
          </div>

          <p style="margin: 30px 0 0 0;">Best regards,<br>
          <strong>The deployAI Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; color: #999; font-size: 12px;">
          <p style="margin: 0 0 5px 0;">deployAI Studio | AI Assessment Platform</p>
          <p style="margin: 0;">This invitation was sent to ${data.invitedEmail}</p>
        </div>

      </div>
    </body>
    </html>
  `;
}
