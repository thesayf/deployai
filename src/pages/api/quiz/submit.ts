import type { NextApiRequest, NextApiResponse } from 'next';
import { SubmitQuizRequest, SubmitQuizResponse, QuizResponseData } from '@/types/quiz';
import { supabaseAdmin } from '@/lib/supabase';
import quizData from '@/data/quiz-questions.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitQuizResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      reportId: '', 
      processingTime: '',
      error: 'Method not allowed' 
    });
  }

  try {
    const { quizId, finalResponses } = req.body as SubmitQuizRequest;

    // Validate required fields
    if (!quizId || !finalResponses) {
      return res.status(400).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Missing required fields',
      });
    }

    // Validate all required questions are answered
    const requiredQuestions = quizData.questions.filter(q => q.required);
    const missingQuestions = requiredQuestions.filter(q => {
      const response = finalResponses[q.id as keyof QuizResponseData];
      return response === undefined || response === null || response === '';
    });

    if (missingQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: `Please answer all required questions. Missing: ${missingQuestions.map(q => q.title).join(', ')}`,
      });
    }

    const supabase = supabaseAdmin();

    // Update quiz with final responses (no scoring)
    const { data: updatedQuiz, error: updateError } = await supabase
      .from('quiz_responses')
      .update({
        responses: finalResponses,
        industry: finalResponses.industry,
        company_size: finalResponses.companySize,
        completed_at: new Date().toISOString(),
      })
      .eq('id', quizId)
      .select()
      .single();

    if (updateError || !updatedQuiz) {
      console.error('Failed to update quiz:', updateError);
      return res.status(500).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Failed to submit quiz',
      });
    }

    // Create AI report record
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .insert({
        quiz_response_id: quizId,
        report_status: 'generating',
      })
      .select('id, access_token')
      .single();

    if (reportError || !report) {
      console.error('Failed to create report:', reportError);
      return res.status(500).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Failed to create report',
      });
    }

    // Trigger AI report generation asynchronously (Step 1 first)
    // We'll return immediately and process in the background
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/ai-analysis/step1-analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
      },
      body: JSON.stringify({
        quizResponseId: quizId,
        reportId: report.id,
      }),
    }).catch(error => {
      console.error('Failed to trigger step 1 analysis:', error);
    });

    res.status(200).json({
      success: true,
      reportId: report.id,
      processingTime: '45-60 seconds',
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      reportId: '',
      processingTime: '',
      error: 'Failed to submit quiz',
    });
  }
}