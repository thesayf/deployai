require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const reportId = 'f59843bd-c7a9-4b71-b940-72ce16419fe8'; // Latest test

async function checkStatus() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  const { data } = await supabase
    .from('ai_reports')
    .select('*')
    .eq('id', reportId)
    .single();

  console.log('Report Status:', data.report_status);
  console.log('Stage 1:', !!data.stage1_problem_analysis ? '✅' : '❌');
  console.log('Stage 2:', !!data.stage2_tool_research ? '✅' : '❌');
  console.log('Stage 3:', !!data.stage3_tool_selection ? '✅' : '❌');
  console.log('Stage 4:', !!data.stage4_report_content ? '✅' : '❌');
  console.log('Final:', !!data.final_report ? '✅' : '❌');
}

checkStatus();