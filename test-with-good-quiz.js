require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testWithGoodQuiz() {
  console.log('=== TESTING WITH QUIZ THAT HAS DATA ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Use the quiz that has data
  const quizId = 'be958d6c-5dbe-4b3d-87cc-474cb544300c'; // Quiz 3 with data
  
  // Create a new report
  const { data: newReport } = await supabase
    .from('ai_reports')
    .insert({
      quiz_response_id: quizId,
      report_status: 'generating'
    })
    .select('id')
    .single();

  console.log('Created report:', newReport.id);
  console.log('Using quiz:', quizId);

  // Call Step 1
  console.log('\nCalling Step 1...');
  const response = await fetch('http://localhost:3000/api/ai-analysis/step1-analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key'
    },
    body: JSON.stringify({
      quizResponseId: quizId,
      reportId: newReport.id
    })
  });

  console.log('Response status:', response.status);
  const result = await response.json();
  console.log('Response:', result);

  // Wait for processing
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Check database
  const { data: updated } = await supabase
    .from('ai_reports')
    .select('stage1_problem_analysis, stage2_tool_research, report_status')
    .eq('id', newReport.id)
    .single();

  console.log('\n=== RESULTS ===');
  console.log('Report status:', updated.report_status);
  console.log('Stage 1 has data:', !!updated.stage1_problem_analysis && Object.keys(updated.stage1_problem_analysis).length > 0);
  console.log('Stage 2 has data:', !!updated.stage2_tool_research);
  
  if (updated.stage1_problem_analysis && Object.keys(updated.stage1_problem_analysis).length > 0) {
    console.log('\nStage 1 data structure:');
    console.log('- Business context:', updated.stage1_problem_analysis.businessContext);
    console.log('- Number of opportunities:', updated.stage1_problem_analysis.topOpportunities?.length);
  }

  // Wait more to see if Stage 2 completes
  if (updated.report_status === 'stage1_complete') {
    console.log('\nWaiting 10 more seconds for Stage 2...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    const { data: final } = await supabase
      .from('ai_reports')
      .select('stage2_tool_research, report_status')
      .eq('id', newReport.id)
      .single();
    
    console.log('\nFinal status:', final.report_status);
    console.log('Stage 2 has data:', !!final.stage2_tool_research);
  }
}

testWithGoodQuiz().catch(console.error);