require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testFullSync() {
  console.log('=== TESTING FULL PIPELINE SYNCHRONOUSLY ===\n');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Use good quiz
  const quizId = '9f2fa5af-27b0-4e7b-838f-e506f33caefb';
  
  // Create report
  const { data: report } = await supabase
    .from('ai_reports')
    .insert({ quiz_response_id: quizId, report_status: 'generating' })
    .select('id')
    .single();

  console.log('Report ID:', report.id);

  // Step 1
  console.log('\n=== STEP 1 ===');
  const step1Res = await fetch('http://localhost:3000/api/ai-analysis/step1-analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key'
    },
    body: JSON.stringify({ quizResponseId: quizId, reportId: report.id })
  });
  console.log('Step 1 status:', step1Res.status);

  // Get stage 1 data
  await new Promise(r => setTimeout(r, 2000));
  const { data: afterStep1 } = await supabase
    .from('ai_reports')
    .select('stage1_problem_analysis')
    .eq('id', report.id)
    .single();

  if (!afterStep1.stage1_problem_analysis || Object.keys(afterStep1.stage1_problem_analysis).length === 0) {
    console.error('Stage 1 failed - no data');
    return;
  }

  console.log('Stage 1 complete, has data:', !!afterStep1.stage1_problem_analysis);

  // Step 2 - manually call it
  console.log('\n=== STEP 2 (MANUAL) ===');
  const step2Res = await fetch('http://localhost:3000/api/ai-analysis/step2-research', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key'
    },
    body: JSON.stringify({
      quizResponseId: quizId,
      reportId: report.id,
      problemAnalysis: afterStep1.stage1_problem_analysis
    })
  });
  
  console.log('Step 2 status:', step2Res.status);
  if (!step2Res.ok) {
    const error = await step2Res.text();
    console.error('Step 2 error:', error);
    return;
  }

  // Check result
  await new Promise(r => setTimeout(r, 5000));
  const { data: final } = await supabase
    .from('ai_reports')
    .select('stage1_problem_analysis, stage2_tool_research, stage3_tool_selection, stage4_report_content, report_status')
    .eq('id', report.id)
    .single();

  console.log('\n=== FINAL RESULTS ===');
  console.log('Status:', final.report_status);
  console.log('Stage 1:', !!final.stage1_problem_analysis ? '✅' : '❌');
  console.log('Stage 2:', !!final.stage2_tool_research ? '✅' : '❌');
  console.log('Stage 3:', !!final.stage3_tool_selection ? '✅' : '❌');
  console.log('Stage 4:', !!final.stage4_report_content ? '✅' : '❌');
}

testFullSync().catch(console.error);