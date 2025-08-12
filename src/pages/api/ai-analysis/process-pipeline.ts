import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendConfirmationEmail, sendReportReadyEmail } from '@/lib/email/email-service';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { generateStep2Prompt } from '@/prompts/step2-tool-research';
import { generateStep3Prompt } from '@/prompts/step3-tool-curation';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { ProblemAnalysis, ToolResearch, CuratedTools } from '@/types/ai-analysis-new';

interface ProcessRequest {
  reportId: string;
  force?: boolean; // Force reprocessing even if completed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security (skip in development for local calls)
  const apiKey = req.headers['x-api-key'];
  const isLocalCall = req.headers.host?.includes('localhost') || req.headers.host?.includes('127.0.0.1');
  
  if (process.env.NODE_ENV === 'production' || !isLocalCall) {
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const { reportId, force = false } = req.body as ProcessRequest;
  
  if (!reportId) {
    return res.status(400).json({ error: 'Report ID required' });
  }

  const startTime = Date.now();
  console.log('[PIPELINE] Starting processing for report:', reportId);
  console.log('[PIPELINE] Force reprocess:', force);

  const supabase = supabaseAdmin();

  try {
    // Fetch report with quiz data
    const { data: report, error: fetchError } = await supabase
      .from('ai_reports')
      .select(`
        *,
        quiz_responses!inner(
          id,
          responses,
          user_email,
          user_first_name,
          user_last_name,
          user_company,
          industry,
          company_size
        )
      `)
      .eq('id', reportId)
      .single();

    if (fetchError || !report) {
      console.error('[PIPELINE] Failed to fetch report:', fetchError);
      return res.status(404).json({ error: 'Report not found' });
    }

    // Extract quiz data
    const quizData = Array.isArray(report.quiz_responses) 
      ? report.quiz_responses[0] 
      : report.quiz_responses;

    if (!quizData) {
      console.error('[PIPELINE] No quiz data found for report');
      return res.status(400).json({ error: 'No quiz data found' });
    }

    console.log('[PIPELINE] Current report status:', report.report_status);
    console.log('[PIPELINE] Quiz response ID:', quizData.id);

    // Check if already completed and not forcing
    if (report.report_status === 'completed' && !force) {
      console.log('[PIPELINE] Report already completed, skipping');
      return res.status(200).json({ 
        success: true, 
        message: 'Report already completed',
        status: 'completed'
      });
    }

    // Initialize AI clients
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    // Determine which model to use for final report
    const writeUpModel = process.env.WRITE_UP_MODEL || 'claude-4';

    // Update status to processing
    await supabase
      .from('ai_reports')
      .update({ 
        report_status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    let problemAnalysis: ProblemAnalysis | null = report.stage1_problem_analysis;
    let toolResearch: ToolResearch | null = report.stage2_tool_research;
    let curatedTools: CuratedTools | null = report.stage3_curated_tools;
    let finalReport: any = report.stage4_report_content;

    // STAGE 1: Problem Analysis
    if (!problemAnalysis || force) {
      console.log('[PIPELINE] Stage 1: Analyzing problems...');
      
      const prompt = generateStep1Prompt(quizData.responses, quizData.user_company);
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 5000,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }]
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      problemAnalysis = cleanAndParseJSON(content);

      // Log for debugging
      console.log('[PIPELINE] Stage 1 JSON size:', JSON.stringify(problemAnalysis).length, 'bytes');

      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({ 
          stage1_problem_analysis: problemAnalysis,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (updateError) {
        console.error('[PIPELINE] Failed to save Stage 1 to database:', updateError);
        throw new Error(`Failed to save Stage 1: ${updateError.message}`);
      }

      console.log('[PIPELINE] Stage 1 complete and saved');
    }

    // STAGE 2: Tool Research
    if (!toolResearch || force) {
      console.log('[PIPELINE] Stage 2: Researching tools...');
      
      const prompt = generateStep2Prompt(problemAnalysis!);
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 15000,
        temperature: 0.4,
        messages: [{ role: 'user', content: prompt }]
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      toolResearch = cleanAndParseJSON(content);

      console.log('[PIPELINE] Stage 2 JSON size:', JSON.stringify(toolResearch).length, 'bytes');

      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({ 
          stage2_tool_research: toolResearch,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (updateError) {
        console.error('[PIPELINE] Failed to save Stage 2 to database:', updateError);
        throw new Error(`Failed to save Stage 2: ${updateError.message}`);
      }

      console.log('[PIPELINE] Stage 2 complete and saved');
    }

    // STAGE 3: Curated Tools
    if (!curatedTools || force) {
      console.log('[PIPELINE] Stage 3: Curating tools...');
      
      const prompt = generateStep3Prompt(problemAnalysis!, toolResearch!);
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 12000,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }]
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      curatedTools = cleanAndParseJSON(content);

      console.log('[PIPELINE] Stage 3 JSON size:', JSON.stringify(curatedTools).length, 'bytes');

      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({ 
          stage3_curated_tools: curatedTools,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (updateError) {
        console.error('[PIPELINE] Failed to save Stage 3 to database:', updateError);
        throw new Error(`Failed to save Stage 3: ${updateError.message}`);
      }

      console.log('[PIPELINE] Stage 3 complete and saved');
    }

    // STAGE 4: Final Report Generation
    if (!finalReport || force) {
      console.log('[PIPELINE] Stage 4: Generating final report...');
      
      const prompt = generateStep4Prompt(problemAnalysis!, curatedTools!);
      let content = '';

      if (writeUpModel === 'gpt-5') {
        console.log('[PIPELINE] Using GPT-5 for final report');
        const response = await openai.chat.completions.create({
          model: 'gpt-5',
          messages: [
            {
              role: 'system',
              content: 'You are an AI business consultant creating professional reports. You must return only valid JSON without any explanations or markdown. The output must be a JSON object.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_completion_tokens: 25000,
          response_format: { type: "json_object" },
          reasoning_effort: "medium",
          verbosity: "medium"
        } as any);

        content = response.choices[0].message.content || '';
      } else {
        console.log('[PIPELINE] Using Claude for final report');
        const response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 15000,
          temperature: 0.3,
          messages: [{ role: 'user', content: prompt }]
        });

        content = response.content[0].type === 'text' ? response.content[0].text : '';
      }

      finalReport = cleanAndParseJSON(content);

      console.log('[PIPELINE] Stage 4 JSON size:', JSON.stringify(finalReport).length, 'bytes');

      // Update report with final content and mark as completed
      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({ 
          stage4_report_content: finalReport,
          report_status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (updateError) {
        console.error('[PIPELINE] Failed to save Stage 4 to database:', updateError);
        throw new Error(`Failed to save Stage 4: ${updateError.message}`);
      }

      console.log('[PIPELINE] Stage 4 complete and saved');
    }

    // Send report ready email (only if not already sent)
    if (!report.email_sent_at || force) {
      console.log('[PIPELINE] Sending report ready email...');
      
      const emailResult = await sendReportReadyEmail({
        reportId,
        userEmail: quizData.user_email,
        firstName: quizData.user_first_name || 'there',
        lastName: quizData.user_last_name || '',
        company: quizData.user_company,
        accessToken: report.access_token,
        req
      });

      if (emailResult.success) {
        console.log('[PIPELINE] Email sent successfully:', emailResult.emailId);
        // Note: email_sent_at is updated by the sendReportReadyEmail function
      } else {
        console.error('[PIPELINE] Failed to send email:', emailResult.error);
        // Don't fail the whole pipeline for email failure
      }
    }

    const totalTime = (Date.now() - startTime) / 1000;
    console.log('[PIPELINE] Processing complete in', totalTime, 'seconds');

    res.status(200).json({ 
      success: true, 
      message: 'Pipeline processing complete',
      status: 'completed',
      processingTime: totalTime
    });

  } catch (error) {
    console.error('[PIPELINE] Critical error:', error);
    
    // Mark report as failed
    await supabase
      .from('ai_reports')
      .update({
        report_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    res.status(500).json({ 
      error: 'Pipeline processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}