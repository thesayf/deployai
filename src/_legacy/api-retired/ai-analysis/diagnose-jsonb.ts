import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { reportId } = req.body;
    
    if (!reportId) {
      return res.status(400).json({ error: 'Report ID required' });
    }

    const results: any = {};

    // Test 1: Check environment variables
    results.envCheck = {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      serviceKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length
    };

    // Test 2: Create service client with explicit schema
    const supabaseService = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

    // Test 3: Check if report exists
    const { data: existingReport, error: fetchError } = await supabaseService
      .from('ai_reports')
      .select('*')
      .eq('id', reportId)
      .single();

    results.reportExists = !!existingReport;
    results.fetchError = fetchError;
    
    if (!existingReport) {
      return res.status(404).json({ error: 'Report not found', results });
    }

    // Log current state of JSONB columns
    results.currentData = {
      stage1: existingReport.stage1_problem_analysis,
      stage2: existingReport.stage2_tool_research,
      stage3: existingReport.stage3_tool_selection,
      stage4: existingReport.stage4_report_content
    };

    // Test 4: Simple JSONB update with service role
    const testData = {
      test: "Direct service role test",
      timestamp: new Date().toISOString(),
      data: { nested: true, value: 123 }
    };

    console.log('Attempting JSONB update with:', testData);

    const { data: updateResult, error: updateError } = await supabaseService
      .from('ai_reports')
      .update({
        stage1_problem_analysis: testData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('id, stage1_problem_analysis, updated_at')
      .single();

    results.updateAttempt = {
      success: !updateError,
      error: updateError,
      returnedData: updateResult
    };

    // Test 5: Immediately read back to verify
    const { data: verifyData, error: verifyError } = await supabaseService
      .from('ai_reports')
      .select('stage1_problem_analysis')
      .eq('id', reportId)
      .single();

    results.verification = {
      dataPresent: !!verifyData?.stage1_problem_analysis,
      data: verifyData?.stage1_problem_analysis,
      error: verifyError
    };

    // Test 6: Try with supabaseAdmin function
    const adminClient = supabaseAdmin();
    
    const testData2 = {
      test: "Admin function test",
      timestamp: new Date().toISOString()
    };

    const { data: adminUpdate, error: adminError } = await adminClient
      .from('ai_reports')
      .update({
        stage2_tool_research: testData2
      })
      .eq('id', reportId)
      .select('stage2_tool_research')
      .single();

    results.adminFunctionTest = {
      success: !adminError,
      error: adminError,
      returnedData: adminUpdate
    };

    // Test 7: Check RLS policies
    const { data: policies, error: policyError } = await supabaseService
      .rpc('check_rls_policies', { 
        table_name: 'ai_reports' 
      });

    results.rlsPolicies = {
      data: policies,
      error: policyError
    };

    // Test 8: Try updating a different column type (non-JSONB)
    const { data: textUpdate, error: textError } = await supabaseService
      .from('ai_reports')
      .update({
        report_status: 'test_status_' + Date.now()
      })
      .eq('id', reportId)
      .select('report_status')
      .single();

    results.nonJsonbUpdate = {
      success: !textError,
      data: textUpdate,
      error: textError
    };

    // Final diagnosis
    results.diagnosis = {
      canReadReport: !!existingReport,
      canUpdateNonJsonb: !textError,
      canUpdateJsonbWithServiceRole: !updateError,
      jsonbDataPersists: !!verifyData?.stage1_problem_analysis,
      likelyIssue: !verifyData?.stage1_problem_analysis 
        ? 'JSONB data not persisting despite successful update response'
        : 'JSONB updates working correctly'
    };

    res.status(200).json({
      success: true,
      reportId,
      results
    });

  } catch (error) {
    console.error('Diagnose error:', error);
    res.status(500).json({ 
      error: 'Diagnosis failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}