import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { generateStage2SystemPrompt, generateStage2UserPrompt } from '@/prompts/stage2-market';
import { parseStage2Response, extractErrorFromResponse } from '@/utils/ai-parser';
import { QuizResponseData, UserInfo } from '@/types/quiz';

interface GenerateStage2Request {
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
    const { quizResponseId, reportId } = req.body as GenerateStage2Request;

    if (!quizResponseId || !reportId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = supabaseAdmin();

    // Get quiz responses and stage 1 data
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', quizResponseId)
      .single();

    if (quizError || !quizData) {
      console.error('Failed to fetch quiz data:', quizError);
      return res.status(404).json({ error: 'Quiz response not found' });
    }

    // Get stage 1 analysis
    const { data: reportData, error: reportError } = await supabase
      .from('ai_reports')
      .select('stage1_analysis')
      .eq('id', reportId)
      .single();

    if (reportError || !reportData || !reportData.stage1_analysis) {
      console.error('Failed to fetch stage 1 data:', reportError);
      return res.status(404).json({ error: 'Stage 1 data not found' });
    }

    const responses = quizData.responses as QuizResponseData;
    const userInfo: UserInfo = {
      email: quizData.user_email,
      firstName: quizData.user_first_name,
      lastName: quizData.user_last_name,
      company: quizData.user_company,
    };

    // Stage 2: Market Intelligence (with web search)
    console.log('Starting Stage 2: Market Intelligence with web search...');
    const stage2Response = await generateAIContent(
      generateStage2SystemPrompt(),
      generateStage2UserPrompt(responses, reportData.stage1_analysis, userInfo),
      8000,
      [{
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 10  // Allow up to 10 searches for comprehensive market research
      }]
    );

    let stage2Market;
    try {
      stage2Market = parseStage2Response(stage2Response);
    } catch (parseError) {
      console.error('Failed to parse Stage 2 response:', parseError);
      const errorDetails = extractErrorFromResponse(stage2Response, 2);
      
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
          failed_at_stage: 2,
          error_message: errorDetails.error,
        })
        .eq('id', reportId);
      
      throw new Error(`Stage 2 parsing failed: ${errorDetails.error}`);
    }

    await supabase
      .from('ai_reports')
      .update({
        stage2_market: stage2Market,
        report_status: 'stage2_complete',
      })
      .eq('id', reportId);

    console.log(`Stage 2 complete for report ${reportId}`);
    
    // Trigger Stage 3 asynchronously
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/reports/generate-stage3`, {
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
      console.error('Failed to trigger stage 3:', error);
    });
    
    res.status(200).json({ 
      success: true,
      stage: 2,
      nextStage: 3 
    });

  } catch (error) {
    console.error('Error generating stage 2:', error);
    res.status(500).json({ 
      error: 'Failed to generate stage 2',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  maxDuration: 180, // 3 minutes for web search stage
};