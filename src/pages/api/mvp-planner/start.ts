import type { NextApiRequest, NextApiResponse } from 'next';
import { StartMVPPlannerRequest, StartMVPPlannerResponse } from '@/types/mvp-planner';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureMVPPlannerTables } from '@/lib/mvp-planner-init';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StartMVPPlannerResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, quizId: '', error: 'Method not allowed' });
  }

  try {
    // Check if tables exist
    const tablesExist = await ensureMVPPlannerTables();
    if (!tablesExist) {
      return res.status(500).json({
        success: false,
        quizId: '',
        error: 'Database not initialized. Please contact support.',
      });
    }
    
    const { email, firstName, lastName, company } = req.body as StartMVPPlannerRequest;

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
      .from('mvp_planner_responses')
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
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return res.status(500).json({
        success: false,
        quizId: '',
        error: error.message || 'Failed to create quiz session',
      });
    }

    res.status(200).json({
      success: true,
      quizId: data.id,
    });
  } catch (error) {
    console.error('Error starting MVP planner:', error);
    res.status(500).json({
      success: false,
      quizId: '',
      error: 'Failed to start planner',
    });
  }
}