require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key
);

async function fetchData() {
  // Fetch quiz response
  const { data: quizResponse, error: quizError } = await supabase
    .from('quiz_responses')
    .select('*')
    .eq('id', 'cae3c57f-174f-4c5e-a852-cb541be2f48e')
    .single();
    
  if (quizError) {
    console.error('Quiz fetch error:', quizError);
    return;
  }
  
  // Fetch AI report  
  const { data: aiReport, error: reportError } = await supabase
    .from('ai_reports')
    .select('*')
    .eq('id', 'cd13fc37-1575-4512-a3b4-d4995466ae8e')
    .single();
    
  if (reportError) {
    console.error('Report fetch error:', reportError);
    return;
  }
  
  console.log('=== QUIZ RESPONSE ===');
  console.log(JSON.stringify(quizResponse, null, 2));
  console.log('\n=== COMPANY INFO ===');
  console.log('Email:', quizResponse.user_email);
  console.log('Name:', quizResponse.user_first_name, quizResponse.user_last_name);
  console.log('Company:', quizResponse.user_company);
  console.log('\n=== RESPONSES ===');
  console.log(JSON.stringify(quizResponse.responses, null, 2));
  console.log('\n=== AI REPORT STATUS ===');
  console.log('Report ID:', aiReport.id);
  console.log('Status:', aiReport.report_status);
  if (aiReport.problem_analysis) {
    console.log('\n=== PROBLEM ANALYSIS ===');
    console.log(JSON.stringify(aiReport.problem_analysis, null, 2));
  }
}

fetchData().catch(console.error);