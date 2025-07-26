import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { generateStage4SystemPrompt, generateStage4UserPrompt } from '@/prompts/stage4-strategic';
import { parseStage4Response, extractErrorFromResponse } from '@/utils/ai-parser';
import { QuizResponseData, UserInfo } from '@/types/quiz';

interface GenerateStage4Request {
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
    const { quizResponseId, reportId } = req.body as GenerateStage4Request;

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

    // Get all previous stage data
    const { data: reportData, error: reportError } = await supabase
      .from('ai_reports')
      .select('stage1_analysis, stage2_market, stage3_financial')
      .eq('id', reportId)
      .single();

    if (reportError || !reportData || !reportData.stage1_analysis || !reportData.stage2_market || !reportData.stage3_financial) {
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

    // Stage 4: Strategic Recommendations
    console.log('Starting Stage 4: Strategic Recommendations...');
    const stage4Response = await generateAIContent(
      generateStage4SystemPrompt(),
      generateStage4UserPrompt(responses, reportData.stage1_analysis, reportData.stage2_market, reportData.stage3_financial, userInfo),
      10000
    );

    let stage4Strategic;
    try {
      stage4Strategic = parseStage4Response(stage4Response);
    } catch (parseError) {
      console.error('Failed to parse Stage 4 response:', parseError);
      const errorDetails = extractErrorFromResponse(stage4Response, 4);
      
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
          failed_at_stage: 4,
          error_message: errorDetails.error,
        })
        .eq('id', reportId);
      
      throw new Error(`Stage 4 parsing failed: ${errorDetails.error}`);
    }

    await supabase
      .from('ai_reports')
      .update({
        stage4_strategic: stage4Strategic,
        report_status: 'completed',
      })
      .eq('id', reportId);

    console.log(`Stage 4 complete for report ${reportId} - Report generation finished!`);
    
    // Send report ready email
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
      await fetch(`${baseUrl}/api/reports/send-report-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
        },
        body: JSON.stringify({ reportId }),
      });
      console.log(`Report email sent for ${reportId}`);
    } catch (emailError) {
      console.error('Failed to send report email:', emailError);
    }
    
    res.status(200).json({ 
      success: true,
      stage: 4,
      completed: true 
    });

  } catch (error) {
    console.error('Error generating stage 4:', error);
    res.status(500).json({ 
      error: 'Failed to generate stage 4',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  maxDuration: 90, // 1.5 minutes for strategic recommendations
};