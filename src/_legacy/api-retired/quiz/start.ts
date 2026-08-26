import type { NextApiRequest, NextApiResponse } from 'next';
import { StartQuizRequest, StartQuizResponse } from '@/types/quiz';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        quizId: '',
        error: 'Invalid email format',
      });
    }

    // Create quiz session in Supabase
    const supabase = supabaseAdmin();
    
    const { data, error } = await supabase
      .from('quiz_responses')
      .insert({
        user_email: email.toLowerCase(),
        user_first_name: firstName,
        user_last_name: lastName,
        user_company: company || null,
        responses: {},
        started_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        quizId: '',
        error: 'Failed to create quiz session',
      });
    }

    res.status(200).json({
      success: true,
      quizId: data.id,
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