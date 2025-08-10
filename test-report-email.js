// Test script to send report email for a specific report ID
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

const REPORT_ID = '58da03d0-e01d-451f-822b-9222949188ea';

async function testReportEmail() {
  console.log('Testing report email for ID:', REPORT_ID);
  
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Fetch report and user data
  console.log('\n1. Fetching report and user data...');
  const { data: reportWithUser, error: fetchError } = await supabase
    .from('ai_reports')
    .select(`
      id,
      access_token,
      report_status,
      email_sent_at,
      quiz_response_id,
      quiz_responses!inner(
        user_email,
        user_first_name,
        user_last_name,
        user_company
      )
    `)
    .eq('id', REPORT_ID)
    .single();

  if (fetchError) {
    console.error('Error fetching report:', fetchError);
    return;
  }

  if (!reportWithUser) {
    console.error('Report not found');
    return;
  }

  console.log('Report found:');
  console.log('- Report ID:', reportWithUser.id);
  console.log('- Access Token:', reportWithUser.access_token);
  console.log('- Status:', reportWithUser.report_status);
  console.log('- Email sent at:', reportWithUser.email_sent_at);
  
  const userData = Array.isArray(reportWithUser.quiz_responses) 
    ? reportWithUser.quiz_responses[0] 
    : reportWithUser.quiz_responses;
    
  console.log('\nUser data:');
  console.log('- Email:', userData?.user_email);
  console.log('- Name:', userData?.user_first_name, userData?.user_last_name);
  console.log('- Company:', userData?.user_company);

  if (!userData?.user_email) {
    console.error('\nERROR: No email address found for this report');
    return;
  }

  // Send the email
  console.log('\n2. Sending report email...');
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const firstName = userData.user_first_name || 'there';
    const company = userData.user_company ? ` for ${userData.user_company}` : '';
    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/view/${reportWithUser.access_token}`;
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="border: 3px solid #000; background: #fff; padding: 40px; margin: 20px 0;">
    <h1 style="color: #000; font-size: 28px; margin-bottom: 20px; font-weight: 900;">YOUR AI ASSESSMENT REPORT IS READY!</h1>
    
    <p style="font-size: 16px; margin: 20px 0;">
      Hi ${firstName},
    </p>
    
    <p style="font-size: 16px; margin: 20px 0;">
      Great news! Your personalized AI assessment report${company} is now ready to view.
    </p>
    
    <p style="font-size: 16px; margin: 20px 0;">
      We've analyzed your responses and created a comprehensive report with:
    </p>
    
    <ul style="font-size: 16px; margin: 20px 0; padding-left: 20px;">
      <li>Custom AI solutions tailored to your needs</li>
      <li>Implementation roadmap and timeline</li>
      <li>Cost estimates and ROI projections</li>
      <li>Technology recommendations</li>
    </ul>
    
    <div style="text-align: center; margin: 40px 0;">
      <a href="${reportUrl}" 
         style="display: inline-block; background: #FF5E1A; color: white; padding: 16px 32px; text-decoration: none; font-weight: bold; font-size: 18px; border: 3px solid #000; box-shadow: 4px 4px 0 #000; text-transform: uppercase;">
        VIEW YOUR REPORT
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin: 20px 0;">
      This link is unique to you and will remain accessible for 30 days.
    </p>
    
    <div style="border-top: 2px solid #000; margin-top: 40px; padding-top: 20px;">
      <p style="font-size: 14px; color: #666; margin: 10px 0;">
        <strong>Questions?</strong> Reply to this email or contact us at hello@deployai.studio
      </p>
    </div>
  </div>
</body>
</html>`;

    const emailData = {
      from: 'DeployAI <hello@deployai.studio>',
      to: userData.user_email,
      subject: `Your AI Assessment Report is Ready, ${firstName}!`,
      html: emailHtml
    };

    console.log('\nSending email to:', userData.user_email);
    console.log('Report URL:', reportUrl);
    
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('\nFailed to send email:', error);
    } else {
      console.log('\nEmail sent successfully!');
      console.log('Email ID:', data.id);
      
      // Update the database
      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({
          email_sent_at: new Date().toISOString()
        })
        .eq('id', REPORT_ID);
        
      if (updateError) {
        console.error('Failed to update email_sent_at:', updateError);
      } else {
        console.log('Database updated with email_sent_at timestamp');
      }
    }
  } catch (error) {
    console.error('\nError sending email:', error);
  }
}

// Run the test
testReportEmail().catch(console.error);