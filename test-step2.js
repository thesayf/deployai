require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const reportId = '13f15a68-d116-4bb6-8bf2-432a36ed6a33'; // From previous test

async function testStep2() {
  console.log('=== TESTING STEP 2 DIRECTLY ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Get the report with stage1 data
  const { data: report } = await supabase
    .from('ai_reports')
    .select('*, quiz_responses!inner(*)')
    .eq('id', reportId)
    .single();

  console.log('Report status:', report.report_status);
  console.log('Has Stage 1 data:', !!report.stage1_problem_analysis);
  
  if (!report.stage1_problem_analysis) {
    console.error('No Stage 1 data found!');
    return;
  }

  // Call Step 2 directly
  console.log('\nCalling Step 2 endpoint...');
  const response = await fetch('http://localhost:3000/api/ai-analysis/step2-research', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key'
    },
    body: JSON.stringify({
      quizResponseId: report.quiz_response_id,
      reportId: reportId,
      problemAnalysis: report.stage1_problem_analysis
    })
  });

  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const text = await response.text();
    console.error('Error response:', text.substring(0, 500));
    return;
  }

  const result = await response.json();
  console.log('Step 2 response:', result);

  // Wait and check database
  console.log('\nWaiting 5 seconds then checking database...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  const { data: updated } = await supabase
    .from('ai_reports')
    .select('stage2_tool_research, report_status')
    .eq('id', reportId)
    .single();

  console.log('\n=== DATABASE CHECK ===');
  console.log('Report status:', updated.report_status);
  console.log('Stage 2 data saved:', !!updated.stage2_tool_research);
  
  if (updated.stage2_tool_research) {
    console.log('Number of tools found:', updated.stage2_tool_research.tools?.length || 0);
  }
}

testStep2().catch(console.error);