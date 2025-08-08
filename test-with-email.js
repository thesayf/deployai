require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testWithEmail() {
  console.log('=== TESTING REPORT WITH EMAIL ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Pick a completed report
  const reportId = 'f59843bd-c7a9-4b71-b940-72ce16419fe8'; // One that completed successfully
  const testEmail = 'test@example.com'; // Change this to your email for testing
  
  // Get the report
  const { data: report } = await supabase
    .from('ai_reports')
    .select('*')
    .eq('id', reportId)
    .single();

  if (!report) {
    console.log('Report not found');
    return;
  }

  console.log('Report ID:', report.id);
  console.log('Access Token:', report.access_token);
  console.log('Status:', report.report_status);
  console.log('Has Final Report:', !!report.final_report);
  
  const reportUrl = `http://localhost:3000/report/${report.access_token}`;
  console.log('Report URL:', reportUrl);

  // Update the quiz response to have an email (optional - for future tests)
  if (report.quiz_response_id) {
    await supabase
      .from('quiz_responses')
      .update({ email: testEmail })
      .eq('id', report.quiz_response_id);
    console.log(`\nUpdated quiz response with email: ${testEmail}`);
  }

  // Test the email sending
  console.log('\n=== SENDING REPORT EMAIL ===');
  
  const response = await fetch('http://localhost:3000/api/quiz/send-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: testEmail,
      reportUrl: reportUrl,
      companyName: report.company_name || 'Your Company'
    })
  });

  console.log('Response status:', response.status);
  
  if (response.ok) {
    const result = await response.json();
    console.log('✅ Email sent successfully!');
    console.log('Result:', result);
    console.log(`\nCheck ${testEmail} for the report link`);
  } else {
    const error = await response.text();
    console.log('❌ Email failed:', error);
  }

  console.log(`\n📊 You can also view the report directly at:`);
  console.log(reportUrl);
}

testWithEmail().catch(console.error);