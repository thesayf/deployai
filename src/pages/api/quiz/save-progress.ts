import type { NextApiRequest, NextApiResponse } from 'next';
import { SaveProgressRequest, SaveProgressResponse } from '@/types/quiz';

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
    if (!quizId || questionId === undefined || answer === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // TODO: Save progress to Supabase
    // For now, return success
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