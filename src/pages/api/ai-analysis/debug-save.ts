import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { reportId } = req.body;
    
    // Debug environment variables
    console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ 
        error: 'Missing environment variables',
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      });
    }

    // Create client directly with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        },
        db: {
          schema: 'public'
        }
      }
    );

    // Test data
    const testData = {
      test: "This is a test",
      timestamp: new Date().toISOString(),
      nested: {
        value: 123,
        array: [1, 2, 3]
      }
    };

    console.log('Attempting to save test data:', testData);
    console.log('To report ID:', reportId);

    // Try update with explicit casting
    const { data, error } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: testData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('id, stage1_problem_analysis, updated_at')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      
      // Check if it's an RLS error
      if (error.code === '42501') {
        console.error('This is an RLS policy violation!');
      }
      
      return res.status(500).json({ 
        error: 'Failed to update',
        supabaseError: error,
        code: error.code,
        message: error.message
      });
    }

    console.log('Update successful!');
    console.log('Returned data:', data);
    console.log('stage1_problem_analysis saved:', data?.stage1_problem_analysis);

    // Double-check by reading back
    const { data: readBack, error: readError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis')
      .eq('id', reportId)
      .single();

    console.log('Read back data:', readBack);
    console.log('Read back error:', readError);

    res.status(200).json({
      success: true,
      updateResult: data,
      readBackResult: readBack,
      dataSaved: !!data?.stage1_problem_analysis,
      dataVerified: !!readBack?.stage1_problem_analysis
    });

  } catch (error) {
    console.error('Debug save error:', error);
    res.status(500).json({ 
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}