require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testReportEmail() {
  console.log('=== TESTING REPORT EMAIL WITH EXISTING DATA ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Find a report that has completed all stages
  const { data: completedReports } = await supabase
    .from('ai_reports')
    .select('*, quiz_responses!inner(*)')
    .eq('report_status', 'report_generated')
    .not('stage4_report_content', 'is', null)
    .limit(5);

  if (!completedReports || completedReports.length === 0) {
    console.log('No completed reports found');
    return;
  }

  console.log(`Found ${completedReports.length} completed reports:\n`);
  
  completedReports.forEach((report, i) => {
    console.log(`${i + 1}. Report ID: ${report.id}`);
    console.log(`   Access Token: ${report.access_token}`);
    console.log(`   Company: ${report.company_name || 'Not set'}`);
    console.log(`   Has Stage 4 data: ${!!report.stage4_report_content}`);
    console.log(`   Has Final Report: ${!!report.final_report}`);
    console.log(`   Email: ${report.quiz_responses?.email || 'No email'}`);
    console.log('');
  });

  // Pick the first one with an email
  const reportWithEmail = completedReports.find(r => r.quiz_responses?.email);
  
  if (!reportWithEmail) {
    console.log('No reports found with email addresses');
    return;
  }

  console.log(`\nTesting with Report: ${reportWithEmail.id}`);
  console.log(`Email will be sent to: ${reportWithEmail.quiz_responses.email}`);
  console.log(`Report URL: http://localhost:3000/report/${reportWithEmail.access_token}\n`);

  // Option 1: Trigger the email directly (simulating what Step 4 would do)
  console.log('Sending report ready email...');
  
  const emailResponse = await fetch('http://localhost:3000/api/quiz/send-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: reportWithEmail.quiz_responses.email,
      reportUrl: `http://localhost:3000/report/${reportWithEmail.access_token}`,
      companyName: reportWithEmail.company_name || reportWithEmail.quiz_responses.responses?.company || 'Your Company'
    })
  });

  if (emailResponse.ok) {
    console.log('✅ Email sent successfully!');
    const result = await emailResponse.json();
    console.log('Response:', result);
  } else {
    console.log('❌ Email failed');
    const error = await emailResponse.text();
    console.log('Error:', error);
  }

  // Option 2: View the report directly
  console.log(`\n📊 View the report at: http://localhost:3000/report/${reportWithEmail.access_token}`);
}

testReportEmail().catch(console.error);