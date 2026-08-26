import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { reportId } = req.body;
    
    if (!reportId) {
      // Create a test report if no ID provided
      const supabase = supabaseAdmin();
      
      // First, get a quiz response to link to
      const { data: quiz } = await supabase
        .from('quiz_responses')
        .select('id')
        .limit(1)
        .single();
      
      if (!quiz) {
        return res.status(400).json({ error: 'No quiz responses found to test with' });
      }
      
      // Create a test report
      const { data: newReport, error: createError } = await supabase
        .from('ai_reports')
        .insert({
          quiz_response_id: quiz.id,
          report_status: 'generating'
        })
        .select('id, access_token')
        .single();
      
      if (createError) {
        return res.status(500).json({ error: 'Failed to create test report', details: createError });
      }
      
      req.body.reportId = newReport.id;
    }

    const supabase = supabaseAdmin();
    const testReportId = req.body.reportId;

    console.log('Testing JSONB save for report:', testReportId);

    // Test 1: Simple object
    const simpleData = { test: 'hello', number: 123 };
    console.log('Test 1: Saving simple object:', simpleData);
    
    const { data: test1, error: error1 } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: simpleData
      })
      .eq('id', testReportId)
      .select('id, stage1_problem_analysis')
      .single();

    console.log('Test 1 result:', test1);
    console.log('Test 1 error:', error1);

    // Test 2: More complex nested object (like our actual data)
    const complexData = {
      businessContext: {
        industry: "E-commerce",
        companySize: "10-50",
        monthlyBudget: "$1000-5000",
        urgency: "1-3 months",
        techCapability: "Basic"
      },
      topOpportunities: [
        {
          problemArea: "Customer Service",
          aiSolutionType: "chatbot",
          problemEvidence: "Slow response times",
          searchKeywords: ["customer service", "chatbot"],
          expectedOutcome: "Faster responses"
        }
      ]
    };
    
    console.log('Test 2: Saving complex object:', complexData);
    
    const { data: test2, error: error2 } = await supabase
      .from('ai_reports')
      .update({
        stage2_tool_research: complexData
      })
      .eq('id', testReportId)
      .select('id, stage2_tool_research')
      .single();

    console.log('Test 2 result:', test2);
    console.log('Test 2 error:', error2);

    // Test 3: Try with JSON.parse(JSON.stringify()) to ensure it's clean JSON
    const cleanedData = JSON.parse(JSON.stringify(complexData));
    console.log('Test 3: Saving cleaned object:', cleanedData);
    
    const { data: test3, error: error3 } = await supabase
      .from('ai_reports')
      .update({
        stage3_tool_selection: cleanedData
      })
      .eq('id', testReportId)
      .select('id, stage3_tool_selection')
      .single();

    console.log('Test 3 result:', test3);
    console.log('Test 3 error:', error3);

    // Test 4: Raw SQL update using Supabase's rpc
    const sqlQuery = `
      UPDATE ai_reports 
      SET stage4_report_content = $1::jsonb
      WHERE id = $2
      RETURNING id, stage4_report_content
    `;
    
    // Note: Supabase doesn't expose raw SQL directly, so we'll try a different approach
    // Let's try using the postgres-js library approach with a direct update
    
    const { data: test4, error: error4 } = await supabase
      .from('ai_reports')
      .update({
        stage4_report_content: complexData,
        updated_at: new Date().toISOString()
      })
      .eq('id', testReportId)
      .select()
      .single();

    console.log('Test 4 result:', test4);
    console.log('Test 4 error:', error4);

    // Final read to see what actually got saved
    const { data: finalRead, error: readError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, stage2_tool_research, stage3_tool_selection, stage4_report_content')
      .eq('id', testReportId)
      .single();

    res.status(200).json({
      reportId: testReportId,
      tests: {
        test1: { data: test1, error: error1 },
        test2: { data: test2, error: error2 },
        test3: { data: test3, error: error3 },
        test4: { data: test4, error: error4 }
      },
      finalData: finalRead,
      finalError: readError
    });

  } catch (error) {
    console.error('Test JSONB error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}