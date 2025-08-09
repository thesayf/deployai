require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const reportId = '945de120-088b-4fd6-85c1-5542ea00dbe9'; // The one from manual test that worked

async function checkStage1Data() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  const { data: report } = await supabase
    .from('ai_reports')
    .select('stage1_problem_analysis')
    .eq('id', reportId)
    .single();

  console.log('Stage 1 data type:', typeof report.stage1_problem_analysis);
  console.log('Stage 1 data:', JSON.stringify(report.stage1_problem_analysis, null, 2));
  
  if (report.stage1_problem_analysis) {
    console.log('\nData structure:');
    console.log('Has businessContext:', !!report.stage1_problem_analysis.businessContext);
    console.log('Has topOpportunities:', !!report.stage1_problem_analysis.topOpportunities);
    
    if (report.stage1_problem_analysis.businessContext) {
      console.log('Business context keys:', Object.keys(report.stage1_problem_analysis.businessContext));
    }
  }
}

checkStage1Data();