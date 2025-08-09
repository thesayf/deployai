import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';

interface AnalyzeRequest {
  quizResponseId: string;
  reportId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { quizResponseId, reportId } = req.body as AnalyzeRequest;

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

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt with company name
    const prompt = generateStep1Prompt(quizData.responses, quizData.user_company);

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract JSON from response
    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    let problemAnalysis;
    
    try {
      problemAnalysis = cleanAndParseJSON(content);
      console.log('Step 1 - Successfully parsed problem analysis');
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
      console.error('Error updating report:', updateError);
      console.error('Update error details:', JSON.stringify(updateError, null, 2));
      throw updateError;
    }

    // Verify the update worked
    console.log('Update successful, returned data:', updatedReport);
    console.log('Saved stage1_problem_analysis:', updatedReport?.stage1_problem_analysis ? 'Data exists' : 'No data');
    
    if (!updatedReport?.stage1_problem_analysis) {
      console.error('WARNING: Data was not saved to database!');
      console.error('Attempted to save:', problemAnalysis);
    }

    // Trigger Step 2 (Tool Research)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.host}`;
    const step2Url = `${baseUrl}/api/ai-analysis/step2-research`;
    
    console.log('[STEP1->STEP2] Starting Step 2 trigger');
    console.log('[STEP1->STEP2] URL:', step2Url);
    console.log('[STEP1->STEP2] Report ID:', reportId);
    console.log('[STEP1->STEP2] Quiz Response ID:', quizResponseId);
    console.log('[STEP1->STEP2] ProblemAnalysis keys:', Object.keys(problemAnalysis));
    console.log('[STEP1->STEP2] API Key present:', !!process.env.INTERNAL_API_KEY);
    
    fetch(step2Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key-12345',
      },
      body: JSON.stringify({
        quizResponseId,
        reportId,
        problemAnalysis
      }),
    })
    .then(res => {
      console.log('[STEP1->STEP2] Response received. Status:', res.status);
      console.log('[STEP1->STEP2] Response headers:', res.headers);
      if (!res.ok) {
        return res.text().then(text => {
          console.error('[STEP1->STEP2] ERROR - Non-OK response:', res.status);
          console.error('[STEP1->STEP2] ERROR - Response body:', text.substring(0, 1000));
        });
      } else {
        console.log('[STEP1->STEP2] SUCCESS - Step 2 triggered successfully');
      }
    })
    .catch(error => {
      console.error('[STEP1->STEP2] CRITICAL ERROR - Failed to trigger Step 2');
      console.error('[STEP1->STEP2] Error type:', error.name);
      console.error('[STEP1->STEP2] Error message:', error.message);
      console.error('[STEP1->STEP2] Error stack:', error.stack);
    });

    res.status(200).json({ 
      success: true, 
      message: 'Step 1 analysis complete'
    });

  } catch (error) {
    console.error('Error in step 1 analysis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze problems',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}