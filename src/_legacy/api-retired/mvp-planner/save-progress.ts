import type { NextApiRequest, NextApiResponse } from 'next';
import { SaveMVPPlannerProgressRequest, SaveMVPPlannerProgressResponse } from '@/types/mvp-planner';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveMVPPlannerProgressResponse>
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { quizId, questionId, answer } = req.body as SaveMVPPlannerProgressRequest;

    // Validate required fields
    if (!quizId || !questionId || answer === undefined || answer === null) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const supabase = supabaseAdmin();

    // Get current responses
    const { data: currentData, error: fetchError } = await supabase
      .from('mvp_planner_responses')
      .select('responses')
      .eq('id', quizId)
      .single();

    if (fetchError || !currentData) {
      console.error('Error fetching current responses:', fetchError);
      return res.status(404).json({
        success: false,
        error: 'Quiz session not found',
      });
    }

    // Update responses
    const updatedResponses = {
      ...currentData.responses,
      [questionId]: answer,
    };

    const { error: updateError } = await supabase
      .from('mvp_planner_responses')
      .update({
        responses: updatedResponses,
        updated_at: new Date().toISOString(),
      })
      .eq('id', quizId);

    if (updateError) {
      console.error('Error updating responses:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save progress',
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save progress',
    });
  }
}