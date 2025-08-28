require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createNewReport() {
  try {
    // Load the generated outputs from our test
    const problemAnalysis = JSON.parse(fs.readFileSync('./test-outputs/step1-analysis.json', 'utf-8'));
    const toolResearch = JSON.parse(fs.readFileSync('./test-outputs/step2-research.json', 'utf-8'));
    const curatedTools = JSON.parse(fs.readFileSync('./test-outputs/step3-curated.json', 'utf-8'));
    const finalReport = JSON.parse(fs.readFileSync('./test-outputs/step4-report.json', 'utf-8'));
    
    // Quiz response ID from the original data
    const quizResponseId = 'cae3c57f-174f-4c5e-a852-cb541be2f48e';
    
    // Generate a unique access token
    const accessToken = generateAccessToken();
    
    // Create the new AI report record with correct column names
    const { data, error } = await supabase
      .from('ai_reports')
      .insert({
        quiz_response_id: quizResponseId,
        stage1_problem_analysis: problemAnalysis,
        stage2_tool_research: toolResearch,
        stage3_tool_selection: curatedTools,
        stage4_report_content: finalReport,
        final_report: finalReport,
        report_status: 'completed',
        access_token: accessToken,
        company_name: 'Adisco Locs Stylist Ltd',
        industry_context: 'Hair and beauty salon specializing in dreadlocks and natural hair styling',
        report_generated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating report:', error);
      return;
    }
    
    console.log('✅ NEW REPORT CREATED SUCCESSFULLY!');
    console.log('=====================================\n');
    console.log('Report ID:', data.id);
    console.log('Quiz Response ID:', data.quiz_response_id);
    console.log('Status:', data.report_status);
    console.log('Access Token:', data.access_token);
    console.log('Created At:', data.created_at);
    console.log('\n📊 Report Summary:');
    console.log('- Company: Adisco Locs Stylist Ltd');
    console.log('- Industry: Hair & Beauty Salon');
    console.log('- Annual Opportunity: £20,100');
    console.log('- Recommended Solutions: 3');
    console.log('- ROI: 59% return on investment');
    console.log('- Payback Period: 6-8 months');
    
    console.log('\n🔗 Report Access URL:');
    console.log(`http://localhost:3000/ai-assessment/report/${data.access_token}`);
    console.log('\n📧 Email Link for Customer:');
    console.log(`Send this link to enordaryee@yahoo.com:`);
    console.log(`https://deployai.co/ai-assessment/report/${data.access_token}`);
    
    // Also update the quiz_response to mark it as having a new report
    const { error: updateError } = await supabase
      .from('quiz_responses')
      .update({ 
        updated_at: new Date().toISOString()
      })
      .eq('id', quizResponseId);
    
    if (updateError) {
      console.error('Warning: Could not update quiz_response timestamp:', updateError);
    }
    
    return data;
    
  } catch (error) {
    console.error('Fatal error:', error);
  }
}

function generateAccessToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Run the script
createNewReport();