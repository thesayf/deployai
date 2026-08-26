import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reportId } = req.body;
  
  if (!reportId) {
    return res.status(400).json({ error: 'Report ID required' });
  }

  const supabase = supabaseAdmin();
  const testData = { test: "simple", number: 123, timestamp: new Date().toISOString() };

  try {
    // First, verify the report exists and check current values
    const { data: before, error: beforeError } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (beforeError) {
      return res.status(404).json({ error: 'Report not found', details: beforeError });
    }

    console.log('=== BEFORE UPDATE ===');
    console.log('Report exists:', !!before);
    console.log('stage1_problem_analysis:', before.stage1_problem_analysis);
    console.log('stage2_tool_research:', before.stage2_tool_research);
    console.log('industry_context:', before.industry_context); // This works according to user
    console.log('report_status:', before.report_status);

    // Update with simple test data
    console.log('=== ATTEMPTING UPDATE ===');
    console.log('Updating with:', testData);
    
    const { data: updateResult, error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: testData,
        industry_context: 'TEST STRING UPDATE ' + Date.now(), // Test string update too
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('*')
      .single();

    console.log('=== UPDATE RESULT ===');
    console.log('Update error:', updateError);
    console.log('Update succeeded:', !updateError);
    console.log('Returned stage1_problem_analysis:', updateResult?.stage1_problem_analysis);
    console.log('Returned industry_context:', updateResult?.industry_context);

    // Wait a moment then verify
    await new Promise(resolve => setTimeout(resolve, 100));

    const { data: after, error: afterError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, stage2_tool_research, industry_context, updated_at')
      .eq('id', reportId)
      .single();

    console.log('=== AFTER UPDATE (VERIFICATION) ===');
    console.log('Verification error:', afterError);
    console.log('stage1_problem_analysis:', after?.stage1_problem_analysis);
    console.log('industry_context:', after?.industry_context);
    console.log('updated_at changed:', before.updated_at !== after?.updated_at);

    // Try updating stage2 with a stringified version
    const stringified = JSON.stringify(testData);
    const { data: stage2Update, error: stage2Error } = await supabase
      .from('ai_reports')
      .update({
        stage2_tool_research: stringified // Try as string
      })
      .eq('id', reportId)
      .select('stage2_tool_research')
      .single();

    console.log('=== STRINGIFIED UPDATE TEST ===');
    console.log('Stage2 update error:', stage2Error);
    console.log('Stage2 returned:', stage2Update?.stage2_tool_research);

    res.status(200).json({
      reportId,
      before: {
        stage1: before.stage1_problem_analysis,
        stage2: before.stage2_tool_research,
        industry: before.industry_context
      },
      updateAttempt: {
        success: !updateError,
        error: updateError,
        returnedStage1: updateResult?.stage1_problem_analysis,
        returnedIndustry: updateResult?.industry_context
      },
      after: {
        stage1: after?.stage1_problem_analysis,
        stage2: stage2Update?.stage2_tool_research,
        industry: after?.industry_context,
        updatedAtChanged: before.updated_at !== after?.updated_at
      },
      diagnosis: {
        stringFieldsWork: after?.industry_context?.includes('TEST STRING UPDATE'),
        jsonbFieldsWork: !!after?.stage1_problem_analysis,
        dataType: {
          stage1: typeof after?.stage1_problem_analysis,
          stage2: typeof stage2Update?.stage2_tool_research
        }
      }
    });

  } catch (error) {
    console.error('Simple test error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}