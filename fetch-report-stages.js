const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchReportStages() {
  const reportId = 'cd13fc37-1575-4512-a3b4-d4995466ae8e';
  
  console.log('Fetching report stages for:', reportId);
  
  const { data, error } = await supabase
    .from('ai_reports')
    .select(`
      id,
      report_status,
      created_at,
      updated_at,
      stage1_problem_analysis,
      stage2_tool_research,
      stage3_tool_selection,
      stage4_report_content,
      quiz_response_id
    `)
    .eq('id', reportId)
    .single();
  
  if (error) {
    console.error('Error fetching report:', error);
    return;
  }
  
  if (!data) {
    console.log('No report found with ID:', reportId);
    return;
  }
  
  console.log('\n=== REPORT STATUS ===');
  console.log('Status:', data.report_status);
  console.log('Created:', data.created_at);
  console.log('Updated:', data.updated_at);
  console.log('Quiz ID:', data.quiz_response_id);
  
  // Save each stage to separate files for analysis
  const fs = require('fs');
  
  if (data.stage1_problem_analysis) {
    fs.writeFileSync('stage1-problem-analysis.json', JSON.stringify(data.stage1_problem_analysis, null, 2));
    console.log('\n✓ Stage 1 saved to stage1-problem-analysis.json');
    console.log('  Size:', JSON.stringify(data.stage1_problem_analysis).length, 'bytes');
  }
  
  if (data.stage2_tool_research) {
    fs.writeFileSync('stage2-tool-research.json', JSON.stringify(data.stage2_tool_research, null, 2));
    console.log('✓ Stage 2 saved to stage2-tool-research.json');
    console.log('  Size:', JSON.stringify(data.stage2_tool_research).length, 'bytes');
  }
  
  if (data.stage3_tool_selection) {
    fs.writeFileSync('stage3-tool-selection.json', JSON.stringify(data.stage3_tool_selection, null, 2));
    console.log('✓ Stage 3 saved to stage3-tool-selection.json');
    console.log('  Size:', JSON.stringify(data.stage3_tool_selection).length, 'bytes');
  }
  
  if (data.stage4_report_content) {
    fs.writeFileSync('stage4-report-content.json', JSON.stringify(data.stage4_report_content, null, 2));
    console.log('✓ Stage 4 saved to stage4-report-content.json');
    console.log('  Size:', JSON.stringify(data.stage4_report_content).length, 'bytes');
  }
  
  process.exit(0);
}

fetchReportStages();
