import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

// Define the response type
interface QuizStatusResponse {
  status: 'in_progress' | 'completed' | 'generating' | 'ready' | 'error';
  message?: string;
  error?: string;
  reportId?: string;
  accessToken?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizStatusResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error',
      error: 'Method not allowed' 
    });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid quiz ID',
      });
    }

    const supabase = supabaseAdmin();

    // Get quiz response and associated report
    const { data: quiz, error: quizError } = await supabase
      .from('quiz_responses')
      .select(`
        id,
        completed_at,
        ai_reports (
          id,
          report_status,
          access_token,
          problem_analysis,
          tool_research,
          curated_tools,
          final_report,
          created_at,
          updated_at
        )
      `)
      .eq('id', id)
      .single();

    if (quizError || !quiz) {
      return res.status(404).json({
        status: 'error',
        error: 'Quiz not found',
      });
    }

    // If quiz is not completed yet
    if (!quiz.completed_at) {
      return res.status(200).json({
        status: 'pending',
      });
    }

    // Get the report (should be the first one in the array)
    const report = quiz.ai_reports?.[0];

    if (!report) {
      return res.status(200).json({
        status: 'completed',
        message: 'Quiz completed but report not yet generated',
      });
    }

    // Map report status to response status
    let responseStatus: QuizStatusResponse['status'];
    switch (report.report_status) {
      case 'generating':
        responseStatus = 'processing';
        break;
      case 'completed':
        responseStatus = 'completed';
        break;
      case 'failed':
        responseStatus = 'error';
        break;
      default:
        responseStatus = 'processing';
    }

    // Build response based on status
    const response: QuizStatusResponse = {
      status: responseStatus,
    };

    if (responseStatus === 'completed' && report.access_token) {
      response.reportId = report.id;
      response.accessToken = report.access_token;
    } else if (responseStatus === 'error') {
      response.error = 'Report generation failed. Please try again.';
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error checking quiz status:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to check quiz status',
    });
  }
}