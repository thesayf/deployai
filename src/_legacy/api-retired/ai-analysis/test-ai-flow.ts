import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reportId, skipAI = false } = req.body;
  
  if (!reportId) {
    return res.status(400).json({ error: 'Report ID required' });
  }

  const results: any = {
    reportId,
    steps: []
  };

  try {
    const supabase = supabaseAdmin();

    // Step 1: Get the report and quiz data
    const { data: report, error: reportError } = await supabase
      .from('ai_reports')
      .select('*, quiz_responses!inner(*)')
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      return res.status(404).json({ error: 'Report not found', details: reportError });
    }

    results.steps.push({
      step: 'fetch_report',
      success: true,
      data: {
        reportId: report.id,
        hasQuizResponse: !!report.quiz_responses,
        currentStatus: report.report_status,
        existingStage1: !!report.stage1_problem_analysis
      }
    });

    // Step 2: Test with mock data first
    const mockData = {
      businessContext: {
        industry: "Test Industry",
        companySize: "10-50",
        monthlyBudget: "$1000-5000",
        urgency: "1-3 months",
        techCapability: "Basic"
      },
      topOpportunities: [
        {
          problemArea: "Test Problem",
          aiSolutionType: "test-solution",
          problemEvidence: "Test evidence",
          searchKeywords: ["test", "keywords"],
          expectedOutcome: "Test outcome"
        }
      ]
    };

    console.log('Testing with mock data:', mockData);

    const { data: mockUpdate, error: mockError } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: mockData,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('id, stage1_problem_analysis')
      .single();

    results.steps.push({
      step: 'mock_data_update',
      success: !mockError,
      data: {
        savedSuccessfully: !!mockUpdate?.stage1_problem_analysis,
        error: mockError,
        returned: mockUpdate
      }
    });

    // Step 3: Verify mock data persisted
    const { data: verifyMock, error: verifyMockError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis')
      .eq('id', reportId)
      .single();

    results.steps.push({
      step: 'verify_mock_data',
      success: !!verifyMock?.stage1_problem_analysis,
      data: {
        dataPersisted: !!verifyMock?.stage1_problem_analysis,
        dataValue: verifyMock?.stage1_problem_analysis
      }
    });

    // Step 4: If mock data works and skipAI is false, try with real AI
    if (!skipAI && verifyMock?.stage1_problem_analysis) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY!,
      });

      const prompt = generateStep1Prompt(report.quiz_responses.responses);
      
      console.log('Calling Claude with prompt length:', prompt.length);

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        temperature: 0.2,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      
      results.steps.push({
        step: 'ai_response',
        success: true,
        data: {
          responseLength: content.length,
          first100Chars: content.substring(0, 100),
          last100Chars: content.substring(content.length - 100)
        }
      });

      // Parse the AI response
      let parsedData;
      try {
        parsedData = cleanAndParseJSON(content);
        results.steps.push({
          step: 'parse_ai_response',
          success: true,
          data: {
            parsedKeys: Object.keys(parsedData),
            dataType: typeof parsedData,
            isObject: parsedData && typeof parsedData === 'object'
          }
        });
      } catch (parseError) {
        results.steps.push({
          step: 'parse_ai_response',
          success: false,
          error: parseError instanceof Error ? parseError.message : 'Parse failed',
          rawContent: content
        });
        throw parseError;
      }

      // Update with AI data
      console.log('Updating with AI data...');
      const { data: aiUpdate, error: aiError } = await supabase
        .from('ai_reports')
        .update({
          stage2_tool_research: parsedData,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId)
        .select('id, stage2_tool_research')
        .single();

      results.steps.push({
        step: 'ai_data_update',
        success: !aiError,
        data: {
          savedSuccessfully: !!aiUpdate?.stage2_tool_research,
          error: aiError,
          returned: aiUpdate
        }
      });

      // Verify AI data persisted
      const { data: verifyAI, error: verifyAIError } = await supabase
        .from('ai_reports')
        .select('stage2_tool_research')
        .eq('id', reportId)
        .single();

      results.steps.push({
        step: 'verify_ai_data',
        success: !!verifyAI?.stage2_tool_research,
        data: {
          dataPersisted: !!verifyAI?.stage2_tool_research,
          dataValue: verifyAI?.stage2_tool_research
        }
      });
    }

    // Final check - read all JSONB columns
    const { data: finalCheck, error: finalError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, stage2_tool_research, stage3_tool_selection, stage4_report_content')
      .eq('id', reportId)
      .single();

    results.finalState = {
      stage1HasData: !!finalCheck?.stage1_problem_analysis,
      stage2HasData: !!finalCheck?.stage2_tool_research,
      stage3HasData: !!finalCheck?.stage3_tool_selection,
      stage4HasData: !!finalCheck?.stage4_report_content,
      values: finalCheck
    };

    res.status(200).json({
      success: true,
      results,
      diagnosis: {
        mockDataWorks: results.steps.find((s: any) => s.step === 'verify_mock_data')?.success,
        aiDataWorks: results.steps.find((s: any) => s.step === 'verify_ai_data')?.success,
        likelyIssue: !results.steps.find((s: any) => s.step === 'verify_mock_data')?.success 
          ? 'JSONB columns not accepting any data'
          : !results.steps.find((s: any) => s.step === 'verify_ai_data')?.success
          ? 'Issue with AI response parsing or data structure'
          : 'Data appears to be saving correctly'
      }
    });

  } catch (error) {
    console.error('Test flow error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      results
    });
  }
}