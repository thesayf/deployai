import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { calculateQuizScore } from '@/utils/scoring';
import { generateStage1SystemPrompt, generateStage1UserPrompt } from '@/prompts/stage1-intelligence';
import { generateStage2SystemPrompt, generateStage2UserPrompt } from '@/prompts/stage2-market';
import { generateStage3SystemPrompt, generateStage3UserPrompt } from '@/prompts/stage3-financial';
import { generateStage4SystemPrompt, generateStage4UserPrompt } from '@/prompts/stage4-strategic';
import { 
  parseStage1Response, 
  parseStage2Response, 
  parseStage3Response, 
  parseStage4Response,
  extractErrorFromResponse 
} from '@/utils/ai-parser';
import { QuizResponseData, UserInfo } from '@/types/quiz';

interface GenerateReportRequest {
  quizResponseId: string;
  reportId: string;
}

// Helper function to update report with error info
async function updateReportError(
  supabase: any,
  reportId: string,
  stage: number,
  errorMessage: string
) {
  await supabase
    .from('ai_reports')
    .update({
      report_status: 'failed',
      failed_at_stage: stage,
      error_message: errorMessage,
    })
    .eq('id', reportId);
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
    const { quizResponseId, reportId } = req.body as GenerateReportRequest;

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

    try {
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
        await updateReportError(supabase, reportId, 1, errorDetails.error);
        throw new Error(`Stage 1 parsing failed: ${errorDetails.error}`);
      }

      await supabase
        .from('ai_reports')
        .update({
          stage1_analysis: stage1Analysis,
          report_status: 'stage1_complete',
        })
        .eq('id', reportId);

      // Stage 2: Market Intelligence (with web search)
      console.log('Starting Stage 2: Market Intelligence with web search...');
      const stage2Response = await generateAIContent(
        generateStage2SystemPrompt(),
        generateStage2UserPrompt(responses, stage1Analysis, userInfo),
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
        await updateReportError(supabase, reportId, 2, errorDetails.error);
        throw new Error(`Stage 2 parsing failed: ${errorDetails.error}`);
      }

      await supabase
        .from('ai_reports')
        .update({
          stage2_market: stage2Market,
          report_status: 'stage2_complete',
        })
        .eq('id', reportId);

      // Stage 3: Financial Analysis
      console.log('Starting Stage 3: Financial Analysis...');
      const stage3Response = await generateAIContent(
        generateStage3SystemPrompt(),
        generateStage3UserPrompt(responses, stage1Analysis, stage2Market, userInfo),
        8000
      );

      let stage3Financial;
      try {
        stage3Financial = parseStage3Response(stage3Response);
      } catch (parseError) {
        console.error('Failed to parse Stage 3 response:', parseError);
        const errorDetails = extractErrorFromResponse(stage3Response, 3);
        await updateReportError(supabase, reportId, 3, errorDetails.error);
        throw new Error(`Stage 3 parsing failed: ${errorDetails.error}`);
      }

      await supabase
        .from('ai_reports')
        .update({
          stage3_financial: stage3Financial,
          report_status: 'stage3_complete',
        })
        .eq('id', reportId);

      // Stage 4: Strategic Recommendations
      console.log('Starting Stage 4: Strategic Recommendations...');
      const stage4Response = await generateAIContent(
        generateStage4SystemPrompt(),
        generateStage4UserPrompt(responses, stage1Analysis, stage2Market, stage3Financial, userInfo),
        10000
      );

      let stage4Strategic;
      try {
        stage4Strategic = parseStage4Response(stage4Response);
      } catch (parseError) {
        console.error('Failed to parse Stage 4 response:', parseError);
        const errorDetails = extractErrorFromResponse(stage4Response, 4);
        await updateReportError(supabase, reportId, 4, errorDetails.error);
        throw new Error(`Stage 4 parsing failed: ${errorDetails.error}`);
      }

      await supabase
        .from('ai_reports')
        .update({
          stage4_strategic: stage4Strategic,
          report_status: 'completed',
        })
        .eq('id', reportId);

      console.log(`Report ${reportId} generated successfully`);
      
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
      
      res.status(200).json({ success: true });

    } catch (aiError) {
      console.error('AI generation error:', aiError);
      
      // Update report status to failed if not already updated
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
        })
        .eq('id', reportId);

      throw aiError;
    }

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ 
      error: 'Failed to generate report',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Configure longer timeout for AI generation
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    // Increase timeout to 5 minutes for AI generation
    responseLimit: false,
  },
  maxDuration: 300, // 5 minutes for Vercel
};