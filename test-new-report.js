require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testNewReport() {
  console.log('=== CREATING AND TESTING NEW REPORT ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Get a quiz response
  const { data: quizResponse } = await supabase
    .from('quiz_responses')
    .select('id')
    .limit(1)
    .single();

  // Create a new report
  const { data: newReport } = await supabase
    .from('ai_reports')
    .insert({
      quiz_response_id: quizResponse.id,
      report_status: 'generating',
      industry_context: 'new test'
    })
    .select('*')
    .single();

  console.log('Created report:', newReport.id);
  console.log('Initial stage1_problem_analysis:', newReport.stage1_problem_analysis);

  // Call Step 1
  console.log('\nCalling Step 1 API...');
  const response = await fetch('http://localhost:3000/api/ai-analysis/step1-analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key'
    },
    body: JSON.stringify({
      quizResponseId: quizResponse.id,
      reportId: newReport.id
    })
  });

  console.log('Response status:', response.status);
  const result = await response.json();
  console.log('Response:', result);

  // Wait and check
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { data: updated } = await supabase
    .from('ai_reports')
    .select('stage1_problem_analysis, report_status')
    .eq('id', newReport.id)
    .single();

  console.log('\n=== AFTER STEP 1 ===');
  console.log('Report status:', updated.report_status);
  console.log('Stage 1 data type:', typeof updated.stage1_problem_analysis);
  console.log('Stage 1 data:', JSON.stringify(updated.stage1_problem_analysis, null, 2));
}

testNewReport().catch(console.error);