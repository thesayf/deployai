require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testFullPipeline() {
  console.log('=== TESTING FULL AI PIPELINE ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Use the quiz that has all required data
  const quizId = '9f2fa5af-27b0-4e7b-838f-e506f33caefb';
  const { data: quizResponse } = await supabase
    .from('quiz_responses')
    .select('id')
    .eq('id', quizId)
    .single();

  console.log('Using quiz response:', quizResponse.id);

  // Create a new AI report
  const { data: newReport } = await supabase
    .from('ai_reports')
    .insert({
      quiz_response_id: quizResponse.id,
      report_status: 'generating',
      industry_context: 'pipeline test'
    })
    .select('id, access_token')
    .single();

  const reportId = newReport.id;
  console.log('Created new report for testing:', reportId);
  console.log('Access token:', newReport.access_token);

  // Test Step 1
  console.log('\n=== STEP 1: PROBLEM ANALYSIS ===');
  const step1Response = await fetch('http://localhost:3000/api/ai-analysis/step1-analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key-12345'
    },
    body: JSON.stringify({
      quizResponseId: quizResponse.id,
      reportId: reportId
    })
  });

  if (!step1Response.ok) {
    console.error('Step 1 failed:', step1Response.status);
    return;
  }

  console.log('Step 1 initiated successfully');
  
  // Wait for all steps to complete (they trigger each other)
  console.log('\nWaiting 15 seconds for all 4 steps to complete...');
  await new Promise(resolve => setTimeout(resolve, 15000));

  // Check final state
  console.log('\n=== CHECKING FINAL DATABASE STATE ===');
  const { data: finalReport } = await supabase
    .from('ai_reports')
    .select('*')
    .eq('id', reportId)
    .single();

  console.log('\nReport Status:', finalReport.report_status);
  console.log('\nData saved to each stage:');
  console.log('Stage 1 (Problem Analysis):', !!finalReport.stage1_problem_analysis ? '✅ YES' : '❌ NO');
  console.log('Stage 2 (Tool Research):', !!finalReport.stage2_tool_research ? '✅ YES' : '❌ NO');
  console.log('Stage 3 (Tool Selection):', !!finalReport.stage3_tool_selection ? '✅ YES' : '❌ NO');
  console.log('Stage 4 (Report Content):', !!finalReport.stage4_report_content ? '✅ YES' : '❌ NO');
  console.log('Final Report:', !!finalReport.final_report ? '✅ YES' : '❌ NO');
  console.log('Report HTML:', !!finalReport.report_html ? '✅ YES' : '❌ NO');

  if (finalReport.stage1_problem_analysis) {
    console.log('\nStage 1 data sample:', 
      JSON.stringify(finalReport.stage1_problem_analysis.businessContext));
  }

  if (finalReport.report_status === 'completed') {
    console.log('\n✅ SUCCESS! All stages completed and data saved.');
    console.log(`View report at: http://localhost:3000/report/${newReport.access_token}`);
  } else {
    console.log('\n⚠️  Pipeline may still be processing or encountered an error.');
    console.log('Current status:', finalReport.report_status);
  }
}

testFullPipeline().catch(console.error);