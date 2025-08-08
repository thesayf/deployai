import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportId } = req.body;
    
    if (!reportId) {
      return res.status(400).json({ error: 'Missing reportId' });
    }

    const supabase = supabaseAdmin();

    // Test 1: Can we read the report?
    const { data: report, error: readError } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (readError) {
      console.error('Read error:', readError);
      return res.status(500).json({ 
        error: 'Failed to read report',
        details: readError 
      });
    }

    console.log('Current report:', report);

    // Test 2: Try to update with a simple object
    const testData = {
      test: 'hello',
      nested: {
        value: 123,
        array: [1, 2, 3]
      }
    };

    const { data: updated1, error: updateError1 } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: testData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('id, stage1_problem_analysis')
      .single();

    if (updateError1) {
      console.error('Update error 1:', updateError1);
      return res.status(500).json({ 
        error: 'Failed to update with object',
        details: updateError1 
      });
    }

    console.log('After object update:', updated1);

    // Test 3: Try to update with stringified JSON
    const { data: updated2, error: updateError2 } = await supabase
      .from('ai_reports')
      .update({
        stage2_tool_research: testData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('id, stage2_tool_research')
      .single();

    if (updateError2) {
      console.error('Update error 2:', updateError2);
      return res.status(500).json({ 
        error: 'Failed to update with stringified JSON',
        details: updateError2 
      });
    }

    console.log('After stringified update:', updated2);

    // Test 4: Read back to verify
    const { data: final, error: finalError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, stage2_tool_research')
      .eq('id', reportId)
      .single();

    res.status(200).json({ 
      success: true,
      original: report,
      afterObjectUpdate: updated1,
      afterStringUpdate: updated2,
      finalRead: final
    });

  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}