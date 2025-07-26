import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { calculateQuizScore } from '@/utils/scoring';
import { generateStage1SystemPrompt, generateStage1UserPrompt } from '@/prompts/stage1-intelligence';
import { parseStage1Response, extractErrorFromResponse } from '@/utils/ai-parser';
import { QuizResponseData, UserInfo } from '@/types/quiz';

interface GenerateStage1Request {
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

  // Verify internal API key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { quizResponseId, reportId } = req.body as GenerateStage1Request;

    if (!quizResponseId || !reportId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = supabaseAdmin();

    // Get quiz responses
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', quizResponseId)
      .single();

    if (quizError || !quizData) {
      console.error('Failed to fetch quiz data:', quizError);
      return res.status(404).json({ error: 'Quiz response not found' });
    }

    const responses = quizData.responses as QuizResponseData;
    const userInfo: UserInfo = {
      email: quizData.user_email,
      firstName: quizData.user_first_name,
      lastName: quizData.user_last_name,
      company: quizData.user_company,
    };
    
    // Calculate score
    const scoreResult = calculateQuizScore(responses);

    // Stage 1: Intelligence Analysis
    console.log('Starting Stage 1: Intelligence Analysis...');
    const stage1Response = await generateAIContent(
      generateStage1SystemPrompt(),
      generateStage1UserPrompt(responses, scoreResult, userInfo),
      6000
    );

    let stage1Analysis;
    try {
      stage1Analysis = parseStage1Response(stage1Response);
    } catch (parseError) {
      console.error('Failed to parse Stage 1 response:', parseError);
      const errorDetails = extractErrorFromResponse(stage1Response, 1);
      
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
          failed_at_stage: 1,
          error_message: errorDetails.error,
        })
        .eq('id', reportId);
      
      throw new Error(`Stage 1 parsing failed: ${errorDetails.error}`);
    }

    await supabase
      .from('ai_reports')
      .update({
        stage1_analysis: stage1Analysis,
        report_status: 'stage1_complete',
      })
      .eq('id', reportId);

    console.log(`Stage 1 complete for report ${reportId}`);
    
    // Trigger Stage 2 asynchronously
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/reports/generate-stage2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
      },
      body: JSON.stringify({
        quizResponseId,
        reportId,
      }),
    }).catch(error => {
      console.error('Failed to trigger stage 2:', error);
    });
    
    res.status(200).json({ 
      success: true,
      stage: 1,
      nextStage: 2 
    });

  } catch (error) {
    console.error('Error generating stage 1:', error);
    res.status(500).json({ 
      error: 'Failed to generate stage 1',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  maxDuration: 60, // 1 minute should be plenty for stage 1
};