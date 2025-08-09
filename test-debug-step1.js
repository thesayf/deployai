require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testDebugStep1() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Get quiz and create report
  const { data: quiz } = await supabase
    .from('quiz_responses')
    .select('id')
    .limit(1)
    .single();

  const { data: report } = await supabase
    .from('ai_reports')
    .insert({
      quiz_response_id: quiz.id,
      report_status: 'generating'
    })
    .select('id')
    .single();

  console.log('Testing with report:', report.id);

  // Call debug endpoint
  const response = await fetch('http://localhost:3000/api/ai-analysis/debug-step1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quizResponseId: quiz.id,
      reportId: report.id
    })
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

testDebugStep1().catch(console.error);