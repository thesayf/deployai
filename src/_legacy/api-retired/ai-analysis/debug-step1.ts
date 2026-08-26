import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quizResponseId, reportId } = req.body;
  const debug: any = { steps: [] };

  try {
    const supabase = supabaseAdmin();

    // Step 1: Get quiz data
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', quizResponseId)
      .single();

    debug.steps.push({
      step: 'fetch_quiz',
      success: !quizError,
      hasData: !!quizData,
      error: quizError
    });

    if (!quizData) {
      return res.status(404).json({ error: 'Quiz not found', debug });
    }

    // Step 2: Generate prompt
    const prompt = generateStep1Prompt(quizData.responses);
    debug.steps.push({
      step: 'generate_prompt',
      promptLength: prompt.length,
      promptPreview: prompt.substring(0, 200)
    });

    // Step 3: Call Claude
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    debug.steps.push({
      step: 'claude_response',
      responseLength: content.length,
      first100: content.substring(0, 100),
      last100: content.substring(content.length - 100)
    });

    // Step 4: Parse response
    let problemAnalysis;
    try {
      problemAnalysis = cleanAndParseJSON(content);
      debug.steps.push({
        step: 'parse_json',
        success: true,
        dataType: typeof problemAnalysis,
        keys: Object.keys(problemAnalysis),
        hasBusinessContext: !!problemAnalysis.businessContext,
        hasTopOpportunities: !!problemAnalysis.topOpportunities
      });
    } catch (e) {
      debug.steps.push({
        step: 'parse_json',
        success: false,
        error: e instanceof Error ? e.message : 'Parse failed',
        rawContent: content
      });
      throw e;
    }

    // Step 5: Prepare update
    const updateData = {
      stage1_problem_analysis: problemAnalysis,
      report_status: 'stage1_complete',
      updated_at: new Date().toISOString()
    };

    debug.steps.push({
      step: 'prepare_update',
      updateDataKeys: Object.keys(updateData),
      problemAnalysisType: typeof updateData.stage1_problem_analysis,
      problemAnalysisKeys: Object.keys(updateData.stage1_problem_analysis || {}),
      stringified: JSON.stringify(updateData.stage1_problem_analysis)
    });

    // Step 6: Update database
    const { data: updated, error: updateError } = await supabase
      .from('ai_reports')
      .update(updateData)
      .eq('id', reportId)
      .select('*')
      .single();

    debug.steps.push({
      step: 'database_update',
      success: !updateError,
      error: updateError,
      returnedData: !!updated,
      savedStage1: !!updated?.stage1_problem_analysis,
      savedDataType: typeof updated?.stage1_problem_analysis,
      savedDataKeys: updated?.stage1_problem_analysis ? Object.keys(updated.stage1_problem_analysis) : []
    });

    // Step 7: Read back
    const { data: readBack } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis')
      .eq('id', reportId)
      .single();

    debug.steps.push({
      step: 'read_back',
      hasData: !!readBack?.stage1_problem_analysis,
      dataType: typeof readBack?.stage1_problem_analysis,
      dataValue: readBack?.stage1_problem_analysis
    });

    res.status(200).json({
      success: true,
      debug,
      finalData: readBack?.stage1_problem_analysis
    });

  } catch (error) {
    debug.error = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: 'Debug failed', debug });
  }
}