require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Report ID to recover
const REPORT_ID = '2bcc84fd-2d90-4ec8-94fe-d52fce5db171';

// Use production URL
const API_BASE_URL = 'https://www.deployai.studio';

async function recoverReport() {
  console.log('=================================');
  console.log('RECOVERING STUCK REPORT');
  console.log('Report ID:', REPORT_ID);
  console.log('API Base URL:', API_BASE_URL);
  console.log('=================================\n');

  try {
    // Step 1: Fetch existing data from database
    console.log('Step 1: Fetching existing stages from database...');
    const { data: report, error: fetchError } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', REPORT_ID)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch report: ${fetchError.message}`);
    }

    if (!report) {
      throw new Error('Report not found');
    }

    console.log('Current status:', report.report_status);
    console.log('Stage 1 complete:', !!report.stage1_problem_analysis);
    console.log('Stage 2 complete:', !!report.stage2_tool_research);
    console.log('Stage 3 complete:', !!report.stage3_tool_selection);
    console.log('Stage 4 complete:', !!report.stage4_report_content);

    // Check what we have
    if (!report.stage1_problem_analysis || !report.stage2_tool_research) {
      throw new Error('Missing Stage 1 or Stage 2 data. Cannot recover.');
    }

    let stage3Data = report.stage3_tool_selection;
    let stage4Data = report.stage4_report_content;

    // Step 2: Run Stage 3 if needed
    if (!stage3Data) {
      console.log('\n=================================');
      console.log('RUNNING STAGE 3: Tool Curation');
      console.log('=================================');
      
      const stage3Response = await fetch(`${API_BASE_URL}/api/ai/step3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemAnalysis: report.stage1_problem_analysis,
          toolResearch: report.stage2_tool_research
        })
      });

      if (!stage3Response.ok) {
        const error = await stage3Response.text();
        throw new Error(`Stage 3 failed: ${error}`);
      }

      const stage3Result = await stage3Response.json();
      stage3Data = stage3Result.data;
      
      console.log('✓ Stage 3 complete');
      console.log('Selected tools count:', stage3Data.selectedTools?.length);

      // Save Stage 3 to database
      const { error: updateError3 } = await supabase
        .from('ai_reports')
        .update({
          stage3_tool_selection: stage3Data,
          report_status: 'stage3_complete',
          updated_at: new Date().toISOString()
        })
        .eq('id', REPORT_ID);

      if (updateError3) {
        console.error('Failed to save Stage 3:', updateError3);
      } else {
        console.log('✓ Stage 3 saved to database');
      }
    } else {
      console.log('\n✓ Stage 3 already complete, using existing data');
    }

    // Step 3: Run Stage 4 if needed
    if (!stage4Data) {
      console.log('\n=================================');
      console.log('RUNNING STAGE 4: Report Generation');
      console.log('=================================');
      
      const stage4Response = await fetch(`${API_BASE_URL}/api/ai/step4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemAnalysis: report.stage1_problem_analysis,
          curatedTools: stage3Data,
          writeUpModel: 'claude-sonnet-4-20250514' // or use process.env.WRITE_UP_MODEL
        })
      });

      if (!stage4Response.ok) {
        const error = await stage4Response.text();
        throw new Error(`Stage 4 failed: ${error}`);
      }

      const stage4Result = await stage4Response.json();
      stage4Data = stage4Result.data;
      
      console.log('✓ Stage 4 complete');
      console.log('Report sections generated');

      // Save Stage 4 to database and mark complete
      const { error: updateError4 } = await supabase
        .from('ai_reports')
        .update({
          stage4_report_content: stage4Data,
          report_status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', REPORT_ID);

      if (updateError4) {
        console.error('Failed to save Stage 4:', updateError4);
      } else {
        console.log('✓ Stage 4 saved to database');
        console.log('✓ Report marked as completed');
      }
    } else {
      console.log('\n✓ Stage 4 already complete, using existing data');
      
      // Just update status if needed
      if (report.report_status !== 'completed') {
        const { error: statusError } = await supabase
          .from('ai_reports')
          .update({
            report_status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('id', REPORT_ID);

        if (!statusError) {
          console.log('✓ Report status updated to completed');
        }
      }
    }

    // Step 4: Trigger email send
    console.log('\n=================================');
    console.log('SENDING REPORT EMAIL');
    console.log('=================================');
    
    // First, fetch the quiz response to get user email
    const { data: quizResponse, error: quizError } = await supabase
      .from('quiz_responses')
      .select('user_email, user_first_name, user_last_name, user_company')
      .eq('id', report.quiz_response_id)
      .single();

    if (quizError || !quizResponse) {
      console.error('Failed to fetch quiz response:', quizError);
      console.log('Skipping email send - no user data found');
    } else {
      console.log('Sending report to:', quizResponse.user_email);
      console.log('Company:', quizResponse.user_company);
      
      const emailResponse = await fetch(`${API_BASE_URL}/api/reports/send-report-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          reportId: REPORT_ID 
        })
      });

      if (!emailResponse.ok) {
        const error = await emailResponse.text();
        console.error('Failed to send email:', error);
      } else {
        console.log('✓ Report email sent successfully');
      }
    }

    console.log('\n=================================');
    console.log('✓ RECOVERY COMPLETE!');
    console.log('=================================');
    console.log('Report ID:', REPORT_ID);
    console.log('Status: completed');
    console.log('View at: https://deployai.studio/report/view/' + report.share_token);

  } catch (error) {
    console.error('\n=================================');
    console.error('❌ RECOVERY FAILED');
    console.error('=================================');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
    
    // Try to mark as failed in database
    await supabase
      .from('ai_reports')
      .update({
        report_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', REPORT_ID);
  }
}

// Run the recovery
console.log('Starting recovery process...\n');
recoverReport();