import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reportId } = req.body;
  
  if (!reportId) {
    return res.status(400).json({ error: 'Report ID required' });
  }

  // Direct Supabase client with service role
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  try {
    // Step 1: Read current state
    console.log('Step 1: Reading current state...');
    const { data: before, error: readError1 } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, stage2_tool_research, updated_at')
      .eq('id', reportId)
      .single();
    
    if (readError1) {
      return res.status(404).json({ error: 'Report not found', details: readError1 });
    }

    console.log('Before update:', {
      stage1: before.stage1_problem_analysis,
      stage2: before.stage2_tool_research,
      updated_at: before.updated_at
    });

    // Step 2: Update with JSONB data
    const jsonData = {
      test: "JSONB test",
      timestamp: new Date().toISOString(),
      random: Math.random(),
      nested: {
        level1: {
          level2: "deeply nested"
        }
      }
    };

    console.log('Step 2: Updating with:', jsonData);
    
    const { data: updateResult, error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: jsonData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('stage1_problem_analysis, updated_at')
      .single();

    console.log('Update result:', updateResult);
    console.log('Update error:', updateError);

    // Step 3: Read again to verify
    console.log('Step 3: Verifying update...');
    const { data: after, error: readError2 } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, updated_at')
      .eq('id', reportId)
      .single();

    console.log('After update:', {
      stage1: after?.stage1_problem_analysis,
      updated_at: after?.updated_at
    });

    // Step 4: Try with JSON.stringify
    const stringifiedData = JSON.stringify(jsonData);
    console.log('Step 4: Trying with stringified JSON...');
    
    const { data: stringUpdate, error: stringError } = await supabase
      .from('ai_reports')
      .update({
        stage2_tool_research: stringifiedData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('stage2_tool_research')
      .single();

    console.log('String update result:', stringUpdate);
    console.log('String update error:', stringError);

    // Step 5: Try raw SQL with RPC (if available)
    console.log('Step 5: Attempting raw SQL update...');
    const { data: rpcResult, error: rpcError } = await supabase.rpc('update_jsonb_column', {
      report_id: reportId,
      column_name: 'stage3_tool_selection',
      json_data: jsonData
    }).single();

    console.log('RPC result:', rpcResult);
    console.log('RPC error:', rpcError);

    // Final read
    const { data: final, error: finalError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, stage2_tool_research, stage3_tool_selection, stage4_report_content')
      .eq('id', reportId)
      .single();

    res.status(200).json({
      reportId,
      before: {
        stage1: before.stage1_problem_analysis,
        stage2: before.stage2_tool_research
      },
      updateAttempts: {
        directObject: {
          success: !updateError,
          returned: updateResult?.stage1_problem_analysis,
          error: updateError
        },
        stringified: {
          success: !stringError,
          returned: stringUpdate?.stage2_tool_research,
          error: stringError
        },
        rpc: {
          success: !rpcError,
          result: rpcResult,
          error: rpcError
        }
      },
      after: {
        stage1: after?.stage1_problem_analysis,
        stage2: final?.stage2_tool_research,
        stage3: final?.stage3_tool_selection,
        stage4: final?.stage4_report_content
      },
      diagnosis: {
        dataBeforeUpdate: !!before.stage1_problem_analysis || !!before.stage2_tool_research,
        updateReturnsData: !!updateResult?.stage1_problem_analysis,
        dataAfterUpdate: !!after?.stage1_problem_analysis,
        dataPersisted: after?.stage1_problem_analysis !== null && after?.stage1_problem_analysis !== undefined
      }
    });

  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}