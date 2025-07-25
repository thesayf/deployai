import type { NextApiRequest, NextApiResponse } from 'next';
import { StartQuizRequest, StartQuizResponse } from '@/types/quiz';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StartQuizResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, quizId: '', error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, company } = req.body as StartQuizRequest;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        quizId: '',
        error: 'Missing required fields',
      });
    }

    // TODO: Create quiz session in Supabase
    // For now, return a mock response
    const mockQuizId = `quiz_${Date.now()}`;

    res.status(200).json({
      success: true,
      quizId: mockQuizId,
    });
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({
      success: false,
      quizId: '',
      error: 'Failed to start quiz',
    });
  }
}