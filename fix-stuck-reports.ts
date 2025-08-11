import { supabaseAdmin } from './src/lib/supabase';

async function fixStuckReports() {
  console.log('=== FIXING STUCK REPORTS ===');
  
  const supabase = supabaseAdmin();
  
  // Find reports stuck in 'generating' status
  const { data: stuckReports, error: fetchError } = await supabase
    .from('ai_reports')
    .select('id, report_status, created_at, updated_at, stage1_problem_analysis')
    .eq('report_status', 'generating');
    
  if (fetchError) {
    console.error('Error fetching stuck reports:', fetchError);
    return;
  }
  
  if (!stuckReports || stuckReports.length === 0) {
    console.log('No stuck reports found');
    return;
  }
  
  console.log(`Found ${stuckReports.length} stuck reports in 'generating' status`);
  
  for (const report of stuckReports) {
    console.log(`\nReport ${report.id}:`);
    console.log(`  Created: ${report.created_at}`);
    console.log(`  Updated: ${report.updated_at}`);
    console.log(`  Has Stage 1: ${!!report.stage1_problem_analysis}`);
    
    // Update to 'pending' so cron job will pick it up
    const newStatus = report.stage1_problem_analysis ? 'processing' : 'pending';
    
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({ 
        report_status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', report.id);
      
    if (updateError) {
      console.error(`  ERROR updating report: ${updateError.message}`);
    } else {
      console.log(`  ✅ Updated to '${newStatus}' status`);
    }
  }
  
  console.log('\n=== DONE ===');
}

fixStuckReports().catch(console.error);