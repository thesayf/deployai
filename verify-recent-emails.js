const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkRecentEmails() {
  const { data, error } = await supabase
    .from('ai_reports')
    .select(`
      id,
      email_sent_at,
      report_status,
      quiz_responses\!inner(
        user_email,
        user_first_name,
        user_last_name
      )
    `)
    .not('email_sent_at', 'is', null)
    .order('email_sent_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Recent emails sent:');
  console.log('==================');
  data?.forEach(report => {
    const user = Array.isArray(report.quiz_responses) 
      ? report.quiz_responses[0] 
      : report.quiz_responses;
    console.log(`
Report ID: ${report.id}
Email sent at: ${report.email_sent_at}
Sent to: ${user.user_email}
Name: ${user.user_first_name} ${user.user_last_name}
Status: ${report.report_status}
---`);
  });
}

checkRecentEmails();
