const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function fixStuckReport() {
  const reportId = 'b97964b2-3519-4c88-9e0e-3a3c5e449d99';
  
  console.log('=====================================');
  console.log('Fixing stuck report:', reportId);
  console.log('=====================================\n');
  
  // First, let's check the current state by calling the API
  try {
    // Check if we can just re-run the pipeline
    console.log('Attempting to re-run the pipeline with force flag...');
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
    const apiKey = process.env.INTERNAL_API_KEY || '';
    
    console.log('Using base URL:', baseUrl);
    console.log('API Key available:', apiKey ? 'Yes' : 'No');
    
    const response = await fetch(`${baseUrl}/api/ai-analysis/process-pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        reportId: reportId,
        force: true
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ SUCCESS: Pipeline completed!');
      console.log('Result:', result);
      console.log('\nThe report should now be completed and the email sent.');
      return;
    } else {
      const error = await response.text();
      console.log('\n❌ Pipeline failed:', error);
      console.log('\nWill try manual fix next...');
    }
  } catch (error) {
    console.error('Error calling pipeline:', error.message);
    console.log('\nWill try manual fix...');
  }
  
  // If pipeline failed, try manual database update
  console.log('\n=====================================');
  console.log('Attempting manual database fix...');
  console.log('=====================================\n');
  
  const { createClient } = require('@supabase/supabase-js');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials!');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'Missing');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Check current report state
  const { data: report, error: fetchError } = await supabase
    .from('ai_reports')
    .select(`
      id,
      report_status,
      stage1_problem_analysis,
      stage2_tool_research,
      stage3_tool_selection,
      stage4_report_content,
      access_token,
      email_sent_at,
      quiz_response_id
    `)
    .eq('id', reportId)
    .single();
  
  if (fetchError || !report) {
    console.error('Failed to fetch report:', fetchError);
    return;
  }
  
  console.log('Current report status:', report.report_status);
  console.log('Access token:', report.access_token);
  console.log('\nStage completion status:');
  console.log('- Stage 1 (Problem Analysis):', report.stage1_problem_analysis ? '✅ Complete' : '❌ Missing');
  console.log('- Stage 2 (Tool Research):', report.stage2_tool_research ? '✅ Complete' : '❌ Missing');
  console.log('- Stage 3 (Tool Selection):', report.stage3_tool_selection ? '✅ Complete' : '❌ Missing');
  console.log('- Stage 4 (Report Content):', report.stage4_report_content ? '✅ Complete' : '❌ Missing');
  console.log('- Email sent:', report.email_sent_at ? `✅ Sent at ${report.email_sent_at}` : '❌ Not sent');
  
  // If Stage 4 content exists, just update the status
  if (report.stage4_report_content) {
    console.log('\n✅ Stage 4 content exists! Updating status to completed...');
    
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        report_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);
    
    if (updateError) {
      console.error('Failed to update status:', updateError);
      return;
    }
    
    console.log('✅ Status updated to completed!');
    
    // Now send the email if not already sent
    if (!report.email_sent_at) {
      console.log('\nSending report ready email...');
      
      // Get quiz data for email
      const { data: quiz } = await supabase
        .from('quiz_responses')
        .select('user_email, user_first_name, user_last_name, user_company')
        .eq('id', report.quiz_response_id)
        .single();
      
      if (quiz && quiz.user_email) {
        console.log('Sending email to:', quiz.user_email);
        
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
        const emailResponse = await fetch(`${baseUrl}/api/reports/send-report-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            reportId: reportId,
            userEmail: quiz.user_email,
            firstName: quiz.user_first_name || 'there',
            lastName: quiz.user_last_name || '',
            company: quiz.user_company || '',
            accessToken: report.access_token
          })
        });
        
        if (emailResponse.ok) {
          console.log('✅ Email sent successfully!');
        } else {
          console.error('Failed to send email:', await emailResponse.text());
        }
      }
    }
    
    console.log('\n=====================================');
    console.log('✅ Report fixed successfully!');
    console.log('=====================================');
    console.log(`\nReport URL: ${process.env.NEXT_PUBLIC_APP_URL || 'https://deployai.studio'}/report/view/${report.access_token}`);
    
  } else {
    console.log('\n❌ Stage 4 content is missing. Need to run the full pipeline.');
    console.log('Please run the pipeline with force=true to regenerate the report.');
  }
}

// Run the fix
fixStuckReport().catch(console.error);