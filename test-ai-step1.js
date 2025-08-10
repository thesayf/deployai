require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const reportId = '945de120-088b-4fd6-85c1-5542ea00dbe9';

async function testAIStep1() {
  console.log('=== TEST AI STEP 1 DIRECTLY ===');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Get quiz response ID
  const { data: report } = await supabase
    .from('ai_reports')
    .select('quiz_response_id')
    .eq('id', reportId)
    .single();

  console.log('Quiz response ID:', report.quiz_response_id);

  // Call the AI step 1 endpoint
  console.log('\nCalling AI Step 1 endpoint...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai-analysis/step1-analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key'
      },
      body: JSON.stringify({
        quizResponseId: report.quiz_response_id,
        reportId: reportId
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const text = await response.text();
      console.log('Error response:', text.substring(0, 500));
      return;
    }

    const result = await response.json();
    console.log('Step 1 response:', result);

    // Wait a moment then check the database
    console.log('\nWaiting 2 seconds then checking database...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { data: updated } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, report_status')
      .eq('id', reportId)
      .single();

    console.log('\n=== DATABASE CHECK ===');
    console.log('Report status:', updated.report_status);
    console.log('stage1_problem_analysis saved:', !!updated.stage1_problem_analysis);
    console.log('Data:', updated.stage1_problem_analysis);

  } catch (error) {
    console.error('Error calling endpoint:', error);
  }
}

testAIStep1();