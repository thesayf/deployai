import { supabaseAdmin } from './src/lib/supabase';

const QUIZ_RESPONSE_ID = 'be958d6c-5dbe-4b3d-87cc-474cb544300c';

async function triggerReportGeneration() {
  console.log(`Starting report generation for quiz response: ${QUIZ_RESPONSE_ID}\n`);
  
  const supabase = supabaseAdmin();
  
  try {
    // Get quiz response data
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', QUIZ_RESPONSE_ID)
      .single();

    if (quizError || !quizData) {
      console.error('Failed to fetch quiz data:', quizError);
      return;
    }

    console.log('✓ Found quiz response');
    console.log(`  Company: ${quizData.user_company}`);
    console.log(`  User: ${quizData.user_first_name} ${quizData.user_last_name}`);
    console.log(`  Email: ${quizData.user_email}\n`);

    // Check if report already exists
    const { data: existingReports } = await supabase
      .from('ai_reports')
      .select('id, report_status')
      .eq('quiz_response_id', QUIZ_RESPONSE_ID)
      .order('created_at', { ascending: false });

    let reportId: string;

    if (existingReports && existingReports.length > 0) {
      // Use the latest report
      const latestReport = existingReports[0];
      reportId = latestReport.id;
      console.log(`✓ Found existing report: ${reportId}`);
      console.log(`  Current status: ${latestReport.report_status}\n`);
      
      // Reset the report status
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'generating',
          failed_at_stage: null,
          error_message: null,
          stage1_analysis: null,
          stage2_market: null,
          stage3_financial: null,
          stage4_strategic: null,
        })
        .eq('id', reportId);
        
    } else {
      // Create new report
      const { data: newReport, error: createError } = await supabase
        .from('ai_reports')
        .insert({
          quiz_response_id: QUIZ_RESPONSE_ID,
          report_status: 'generating',
        })
        .select('id')
        .single();

      if (createError || !newReport) {
        console.error('Failed to create report:', createError);
        return;
      }

      reportId = newReport.id;
      console.log(`✓ Created new report: ${reportId}\n`);
    }

    // Trigger Stage 1 generation (which will chain to other stages)
    console.log('Triggering Stage 1 generation...');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/reports/generate-stage1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
      },
      body: JSON.stringify({
        quizResponseId: QUIZ_RESPONSE_ID,
        reportId: reportId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to trigger stage 1: ${error}`);
    }

    console.log(`✅ Stage 1 triggered successfully!`);
    console.log(`   Report ID: ${reportId}`);
    console.log(`   The stages will process sequentially in the background.`);
    console.log(`   Monitor progress at: /report/${reportId}`);
    
  } catch (error) {
    console.error('\n❌ Report generation failed:', error);
  }
}

// Run if API key is set
if (process.env.ANTHROPIC_API_KEY) {
  triggerReportGeneration();
} else {
  console.log('Please set ANTHROPIC_API_KEY environment variable to run report generation');
}