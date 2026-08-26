import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';

interface AnalyzeRequest {
  quizResponseId: string;
  reportId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('[STEP1-HANDLER] ========== STEP 1 ANALYSIS STARTED ==========');
  console.log('[STEP1-HANDLER] Method:', req.method);
  console.log('[STEP1-HANDLER] Body:', JSON.stringify(req.body));
  
  if (req.method !== 'POST') {
    console.log('[STEP1-HANDLER] ERROR: Wrong method');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    console.log('[STEP1-HANDLER] ERROR: Unauthorized');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { quizResponseId, reportId } = req.body as AnalyzeRequest;
    console.log('[STEP1-HANDLER] Quiz Response ID:', quizResponseId);
    console.log('[STEP1-HANDLER] Report ID:', reportId);

    const supabase = supabaseAdmin();

    // Get quiz responses
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', quizResponseId)
      .single();

    if (quizError || !quizData) {
      console.error('Error fetching quiz data:', quizError);
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Verify report exists
    const { data: existingReport, error: reportCheckError } = await supabase
      .from('ai_reports')
      .select('id, report_status')
      .eq('id', reportId)
      .single();

    if (reportCheckError || !existingReport) {
      console.error('Report not found:', reportId, reportCheckError);
      return res.status(404).json({ error: 'Report not found' });
    }

    console.log('Found existing report:', existingReport);

    // Get provider configuration for Step 1
    console.log('[STEP1-PROVIDER] Getting provider configuration...');
    const stepConfig = AIProviderFactory.getStepConfig(1);
    console.log('[STEP1-PROVIDER] Step config:', JSON.stringify(stepConfig));
    
    const provider = AIProviderFactory.getProvider(stepConfig.provider, stepConfig.model);
    console.log(`[STEP1-PROVIDER] Provider created: ${provider.getName()}`);
    console.log(`[STEP1-PROVIDER] Model: ${stepConfig.model}`);

    // Generate prompt with company name
    const prompt = generateStep1Prompt(quizData.responses, quizData.user_company);
    console.log('[STEP1-PROMPT] Prompt generated, length:', prompt.length);
    console.log('[STEP1-PROMPT] First 200 chars:', prompt.substring(0, 200));

    // Call AI provider
    console.log('[STEP1-AI] About to call AI provider...');
    console.log('[STEP1-AI] Provider type:', stepConfig.provider);
    
    let response;
    try {
      if (stepConfig.provider === 'openai') {
        console.log('[STEP1-AI] Calling OpenAI with reasoning_effort:', stepConfig.reasoning_effort);
        response = await provider.generateCompletion({
          prompt,
          temperature: 0.2,
          reasoning_effort: stepConfig.reasoning_effort,
          verbosity: stepConfig.verbosity,
        });
      } else {
        console.log('[STEP1-AI] Calling Claude');
        response = await provider.generateCompletion({
          prompt,
          maxTokens: 1500, // Claude still needs maxTokens
          temperature: 0.2,
        });
      }
      console.log('[STEP1-AI] AI call completed successfully');
    } catch (aiError) {
      console.error('[STEP1-AI] ERROR calling AI provider:', aiError);
      throw aiError;
    }

    // Extract JSON from response
    const content = response.content;
    console.log('[STEP1-RESPONSE] Content type:', typeof content);
    console.log('[STEP1-RESPONSE] Content length:', content?.length || 0);
    console.log('[STEP1-RESPONSE] Content preview:', content?.substring(0, 200) || 'NO CONTENT');
    
    let problemAnalysis;
    
    if (response.usage) {
      console.log('[STEP1] Token usage:', response.usage);
    }
    
    try {
      problemAnalysis = cleanAndParseJSON(content);
      console.log('[STEP1-PARSE] Successfully parsed problem analysis');
      console.log('Problem analysis keys:', Object.keys(problemAnalysis));
      console.log('Problem analysis sample:', JSON.stringify(problemAnalysis).substring(0, 200));
    } catch (parseError) {
      console.error('Failed to parse AI response in Step 1');
      console.error('Response content:', content);
      throw new Error('Invalid AI response format in Step 1');
    }

    // Log what we're about to save
    console.log('Attempting to save to report ID:', reportId);
    console.log('Data type of problemAnalysis:', typeof problemAnalysis);
    console.log('Is problemAnalysis an object?', problemAnalysis && typeof problemAnalysis === 'object');
    console.log('problemAnalysis keys:', problemAnalysis ? Object.keys(problemAnalysis) : 'null');
    console.log('Full problemAnalysis:', JSON.stringify(problemAnalysis, null, 2));

    // Update report with Step 1 analysis
    console.log('[STEP1-DB] About to update report:', reportId);
    console.log('[STEP1-DB] Update payload - status: stage1_complete');
    console.log('[STEP1-DB] Update payload - has problemAnalysis:', !!problemAnalysis);
    
    const { data: updatedReport, error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: problemAnalysis,
        report_status: 'stage1_complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('id, stage1_problem_analysis, report_status')
      .single();

    if (updateError) {
      console.error('[STEP1-DB] Error updating report:', updateError);
      console.error('[STEP1-DB] Update error details:', JSON.stringify(updateError, null, 2));
      throw updateError;
    }

    // Verify the update worked
    console.log('[STEP1-DB] Update response - report_status:', updatedReport?.report_status);
    console.log('[STEP1-DB] Update response - has stage1_problem_analysis:', !!updatedReport?.stage1_problem_analysis);
    
    // Double-check by fetching the report again
    const { data: verifyReport, error: verifyError } = await supabase
      .from('ai_reports')
      .select('id, report_status, stage1_problem_analysis')
      .eq('id', reportId)
      .single();
    
    console.log('[STEP1-DB-VERIFY] Fetched report status:', verifyReport?.report_status);
    console.log('[STEP1-DB-VERIFY] Has stage1_problem_analysis:', !!verifyReport?.stage1_problem_analysis);
    
    if (verifyReport?.report_status !== 'stage1_complete') {
      console.error('[STEP1-DB-VERIFY] WARNING: Status not updated correctly!');
      console.error('[STEP1-DB-VERIFY] Expected: stage1_complete, Got:', verifyReport?.report_status);
      throw new Error('Failed to update report status to stage1_complete');
    }

    // Only trigger Step 2 if Step 1 succeeded
    console.log('[STEP1->STEP2] Starting Step 2 via pipeline');
    console.log('[STEP1->STEP2] Report ID:', reportId);
    console.log('[STEP1->STEP2] Quiz Response ID:', quizResponseId);
    console.log('[STEP1->STEP2] ProblemAnalysis keys:', Object.keys(problemAnalysis));
    
    // Import and execute Step 2 directly
    import('@/lib/ai-analysis/pipeline').then(({ executeStep2Research }) => {
      executeStep2Research({
        quizResponseId,
        reportId,
        problemAnalysis
      })
      .then(result => {
        if (result.success) {
          console.log('[STEP1->STEP2] SUCCESS - Pipeline completed successfully');
        } else {
          console.error('[STEP1->STEP2] ERROR - Pipeline failed:', result.error);
        }
      })
      .catch(error => {
        console.error('[STEP1->STEP2] CRITICAL ERROR - Failed to execute pipeline');
        console.error('[STEP1->STEP2] Error:', error);
      });
    });

    console.log('[STEP1-HANDLER] Sending success response');
    res.status(200).json({ 
      success: true, 
      message: 'Step 1 analysis complete'
    });
    console.log('[STEP1-HANDLER] ========== STEP 1 COMPLETED SUCCESSFULLY ==========');

  } catch (error) {
    console.error('[STEP1-HANDLER] ========== STEP 1 FAILED ==========');
    console.error('[STEP1-HANDLER] Error type:', error?.constructor?.name);
    console.error('[STEP1-HANDLER] Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[STEP1-HANDLER] Full error:', error);
    
    res.status(500).json({ 
      error: 'Failed to analyze problems',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}