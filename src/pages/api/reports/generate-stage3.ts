import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { generateStage3SystemPrompt, generateStage3UserPrompt } from '@/prompts/stage3-financial';
import { parseStage3Response, extractErrorFromResponse } from '@/utils/ai-parser';
import { QuizResponseData, UserInfo } from '@/types/quiz';

interface GenerateStage3Request {
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
    const { quizResponseId, reportId } = req.body as GenerateStage3Request;

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

    // Get stage 1 and 2 data
    const { data: reportData, error: reportError } = await supabase
      .from('ai_reports')
      .select('stage1_analysis, stage2_market')
      .eq('id', reportId)
      .single();

    if (reportError || !reportData || !reportData.stage1_analysis || !reportData.stage2_market) {
      console.error('Failed to fetch previous stage data:', reportError);
      return res.status(404).json({ error: 'Previous stage data not found' });
    }

    const responses = quizData.responses as QuizResponseData;
    const userInfo: UserInfo = {
      email: quizData.user_email,
      firstName: quizData.user_first_name,
      lastName: quizData.user_last_name,
      company: quizData.user_company,
    };

    // Stage 3: Financial Analysis
    console.log('Starting Stage 3: Financial Analysis...');
    const stage3Response = await generateAIContent(
      generateStage3SystemPrompt(),
      generateStage3UserPrompt(responses, reportData.stage1_analysis, reportData.stage2_market, userInfo),
      8000
    );

    let stage3Financial;
    try {
      stage3Financial = parseStage3Response(stage3Response);
    } catch (parseError) {
      console.error('Failed to parse Stage 3 response:', parseError);
      const errorDetails = extractErrorFromResponse(stage3Response, 3);
      
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
          failed_at_stage: 3,
          error_message: errorDetails.error,
        })
        .eq('id', reportId);
      
      throw new Error(`Stage 3 parsing failed: ${errorDetails.error}`);
    }

    await supabase
      .from('ai_reports')
      .update({
        stage3_financial: stage3Financial,
        report_status: 'stage3_complete',
      })
      .eq('id', reportId);

    console.log(`Stage 3 complete for report ${reportId}`);
    
    // Trigger Stage 4 asynchronously
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/reports/generate-stage4`, {
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
      console.error('Failed to trigger stage 4:', error);
    });
    
    res.status(200).json({ 
      success: true,
      stage: 3,
      nextStage: 4 
    });

  } catch (error) {
    console.error('Error generating stage 3:', error);
    res.status(500).json({ 
      error: 'Failed to generate stage 3',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  maxDuration: 60, // 1 minute for financial analysis
};