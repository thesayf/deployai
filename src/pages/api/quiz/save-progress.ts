import type { NextApiRequest, NextApiResponse } from 'next';
import { SaveProgressRequest, SaveProgressResponse } from '@/types/quiz';
import { supabaseAdmin } from '@/lib/supabase';
import { validateResponse } from '@/utils/scoring';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveProgressResponse>
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { quizId, questionId, answer } = req.body as SaveProgressRequest;

    // Validate required fields
    if (!quizId || !questionId || answer === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Validate the response
    const validation = validateResponse(questionId, answer);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    // Get the current quiz responses
    const supabase = supabaseAdmin();
    
    const { data: quiz, error: fetchError } = await supabase
      .from('quiz_responses')
      .select('responses')
      .eq('id', quizId)
      .single();

    if (fetchError || !quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz session not found',
      });
    }

    // Update the responses object
    const updatedResponses = {
      ...quiz.responses,
      [questionId]: answer,
    };

    // Save the updated responses
    const { error: updateError } = await supabase
      .from('quiz_responses')
      .update({
        responses: updatedResponses,
      })
      .eq('id', quizId);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save progress',
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save progress',
    });
  }
}