require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const REPORT_ID = '2bcc84fd-2d90-4ec8-94fe-d52fce5db171';

async function runStagesLocally() {
  console.log('=================================');
  console.log('RUNNING STAGES LOCALLY');
  console.log('Report ID:', REPORT_ID);
  console.log('=================================\n');

  try {
    // Step 1: Fetch the existing data
    console.log('Fetching existing data from database...');
    const { data: report, error } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', REPORT_ID)
      .single();

    if (error || !report) {
      throw new Error(`Failed to fetch report: ${error?.message}`);
    }

    console.log('Current status:', report.report_status);
    console.log('Stage 1 exists:', !!report.stage1_problem_analysis);
    console.log('Stage 2 exists:', !!report.stage2_tool_research);
    console.log('Stage 3 exists:', !!report.stage3_tool_selection);
    console.log('Stage 4 exists:', !!report.stage4_report_content);

    // Save the existing stages to files for inspection
    if (report.stage1_problem_analysis) {
      fs.writeFileSync('stage1-existing.json', JSON.stringify(report.stage1_problem_analysis, null, 2));
      console.log('Saved Stage 1 to stage1-existing.json');
    }
    if (report.stage2_tool_research) {
      fs.writeFileSync('stage2-existing.json', JSON.stringify(report.stage2_tool_research, null, 2));
      console.log('Saved Stage 2 to stage2-existing.json');
    }

    // Step 2: Run Stage 3 locally using the prompt generation
    if (!report.stage3_tool_selection && report.stage1_problem_analysis && report.stage2_tool_research) {
      console.log('\n=================================');
      console.log('RUNNING STAGE 3 LOCALLY');
      console.log('=================================');
      
      // Import the prompt generator
      const { generateStep3Prompt } = require('./src/prompts/step3-tool-curation');
      
      // Generate the prompt
      const prompt = generateStep3Prompt(report.stage1_problem_analysis, report.stage2_tool_research);
      
      // Save prompt for inspection
      fs.writeFileSync('stage3-prompt.txt', prompt);
      console.log('Saved Stage 3 prompt to stage3-prompt.txt');
      console.log('Prompt length:', prompt.length, 'characters');
      
      // Call OpenAI directly
      console.log('Calling OpenAI API directly...');
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an AI business consultant specializing in tool curation. Always return valid JSON only, no markdown formatting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 12000
      });

      const responseContent = completion.choices[0].message.content;
      
      // Clean and parse JSON
      const { cleanAndParseJSON } = require('./src/utils/clean-json');
      const stage3Data = cleanAndParseJSON(responseContent);
      
      // Save Stage 3 result
      fs.writeFileSync('stage3-result.json', JSON.stringify(stage3Data, null, 2));
      console.log('✓ Stage 3 complete, saved to stage3-result.json');
      
      // Update database
      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({
          stage3_tool_selection: stage3Data,
          report_status: 'stage3_complete',
          updated_at: new Date().toISOString()
        })
        .eq('id', REPORT_ID);

      if (!updateError) {
        console.log('✓ Stage 3 saved to database');
        report.stage3_tool_selection = stage3Data; // Update local copy
      } else {
        console.error('Failed to save Stage 3:', updateError);
      }
    }

    // Step 3: Run Stage 4 locally
    if (!report.stage4_report_content && report.stage1_problem_analysis && report.stage3_tool_selection) {
      console.log('\n=================================');
      console.log('RUNNING STAGE 4 LOCALLY');
      console.log('=================================');
      
      // Import the prompt generator
      const { generateStep4Prompt } = require('./src/prompts/step4-report-generation');
      
      // Generate the prompt
      const prompt = generateStep4Prompt(report.stage1_problem_analysis, report.stage3_tool_selection);
      
      // Save prompt for inspection
      fs.writeFileSync('stage4-prompt.txt', prompt);
      console.log('Saved Stage 4 prompt to stage4-prompt.txt');
      console.log('Prompt length:', prompt.length, 'characters');
      
      // Call OpenAI directly
      console.log('Calling OpenAI API for Stage 4...');
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an AI consultant creating a comprehensive business report. Always return valid JSON only, no markdown formatting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 15000
      });

      const responseContent = completion.choices[0].message.content;
      
      // Clean and parse JSON
      const { cleanAndParseJSON } = require('./src/utils/clean-json');
      const stage4Data = cleanAndParseJSON(responseContent);
      
      // Save Stage 4 result
      fs.writeFileSync('stage4-result.json', JSON.stringify(stage4Data, null, 2));
      console.log('✓ Stage 4 complete, saved to stage4-result.json');
      
      // Update database
      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({
          stage4_report_content: stage4Data,
          report_status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', REPORT_ID);

      if (!updateError) {
        console.log('✓ Stage 4 saved to database');
        console.log('✓ Report marked as COMPLETED');
      } else {
        console.error('Failed to save Stage 4:', updateError);
      }
    }

    console.log('\n=================================');
    console.log('✓ PROCESS COMPLETE');
    console.log('=================================');
    
    // Fetch the share token
    const { data: finalReport } = await supabase
      .from('ai_reports')
      .select('share_token')
      .eq('id', REPORT_ID)
      .single();
      
    if (finalReport?.share_token) {
      console.log('\nView report at:');
      console.log('https://deployai.studio/report/view/' + finalReport.share_token);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

// Run it
runStagesLocally();