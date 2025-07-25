import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { calculateQuizScore } from '@/utils/scoring';
import { 
  generateStage1SystemPrompt, 
  generateStage1AnalysisPrompt 
} from '@/prompts/stage1-assessment';
import { 
  generateStage2SystemPrompt, 
  generateStage2EnhancedPrompt 
} from '@/prompts/stage2-recommendations';
import { QuizResponseData } from '@/types/quiz';

interface GenerateReportRequest {
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
    
    // Calculate score
    const scoreResult = calculateQuizScore(responses);

    try {
      // Generate Stage 1 content
      console.log('Generating Stage 1 AI assessment...');
      const stage1Content = await generateAIContent(
        generateStage1SystemPrompt(),
        generateStage1AnalysisPrompt(responses, scoreResult),
        6000 // Higher token limit for comprehensive analysis
      );

      // Update report with Stage 1 content
      await supabase
        .from('ai_reports')
        .update({
          stage1_content: stage1Content,
          report_status: 'stage1_complete',
          updated_at: new Date().toISOString(),
        })
        .eq('id', reportId);

      // Generate Stage 2 content
      console.log('Generating Stage 2 recommendations...');
      const stage2Content = await generateAIContent(
        generateStage2SystemPrompt(),
        generateStage2EnhancedPrompt(responses, scoreResult, stage1Content),
        8000 // Even higher limit for detailed recommendations
      );

      // Update report with Stage 2 content and mark as complete
      const { error: finalUpdateError } = await supabase
        .from('ai_reports')
        .update({
          stage2_content: stage2Content,
          report_status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', reportId);

      if (finalUpdateError) {
        throw finalUpdateError;
      }

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
        // Don't fail the whole process if email fails
      }
      
      res.status(200).json({ success: true });

    } catch (aiError) {
      console.error('AI generation error:', aiError);
      
      // Update report status to failed
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
          updated_at: new Date().toISOString(),
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