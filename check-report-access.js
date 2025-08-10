require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkReportAccess() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // Use anon key like the frontend would
    {
      auth: { autoRefreshToken: false, persistSession: false }
    }
  );

  const accessToken = '009cf829-d30e-4781-94e1-a5d249859f85';
  
  console.log('Checking report with access token:', accessToken);
  
  // Try to fetch the report by access_token (like the page would)
  const { data, error } = await supabase
    .from('ai_reports')
    .select('*')
    .eq('access_token', accessToken)
    .single();

  if (error) {
    console.error('Error fetching report:', error);
  } else if (data) {
    console.log('Report found!');
    console.log('Report ID:', data.id);
    console.log('Status:', data.report_status);
    console.log('Has final report:', !!data.final_report);
    console.log('Access token matches:', data.access_token === accessToken);
  } else {
    console.log('No report found with this access token');
  }

  // Also check all reports with completed status
  console.log('\n=== All completed reports ===');
  const { data: reports } = await supabase
    .from('ai_reports')
    .select('id, access_token, report_status')
    .eq('report_status', 'report_generated')
    .limit(5);

  if (reports) {
    reports.forEach(r => {
      console.log(`ID: ${r.id}`);
      console.log(`Access Token: ${r.access_token}`);
      console.log(`URL: http://localhost:3000/report/${r.access_token}`);
      console.log('---');
    });
  }
}

checkReportAccess().catch(console.error);