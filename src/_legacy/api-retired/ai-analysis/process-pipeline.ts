import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { sendConfirmationEmail, sendReportReadyEmail } from '@/lib/email/email-service';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { generateStep2Prompt } from '@/prompts/step2-tool-research';
import { generateStep3Prompt } from '@/prompts/step3-tool-curation';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { ProblemAnalysis, ToolResearch, CuratedTools } from '@/types/ai-analysis-new';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';

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
    if (!process.env.INTERNAL_API_KEY) {
      console.error('[PIPELINE] INTERNAL_API_KEY not set in environment');
      return res.status(500).json({ error: 'Server configuration error: INTERNAL_API_KEY not set' });
    }
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      console.error('[PIPELINE] Invalid API key provided:', apiKey ? 'key provided but incorrect' : 'no key provided');
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

    // Determine which model to use for final report
    const writeUpModel = process.env.WRITE_UP_MODEL || 'claude-4';

    // Note: Not updating status to 'processing' as it's not allowed by DB constraint
    // Status remains as 'generating' during pipeline execution

    let problemAnalysis: ProblemAnalysis | null = report.stage1_problem_analysis;
    let toolResearch: ToolResearch | null = report.stage2_tool_research;
    let curatedTools: CuratedTools | null = report.stage3_tool_selection;
    let finalReport: any = report.stage4_report_content;

    // STAGE 1: Problem Analysis
    if (!problemAnalysis || force) {
      console.log('[PIPELINE] Stage 1: Analyzing problems...');
      
      // Get provider configuration for Step 1
      const step1Config = AIProviderFactory.getStepConfig(1);
      console.log('[PIPELINE] Step 1 config:', JSON.stringify(step1Config));
      
      const step1Provider = AIProviderFactory.getProvider(step1Config.provider, step1Config.model);
      console.log(`[PIPELINE] Step 1 provider: ${step1Provider.getName()}, model: ${step1Config.model}`);
      
      const prompt = generateStep1Prompt(quizData.responses, quizData.user_company);
      
      let response;
      if (step1Config.provider === 'openai') {
        console.log('[PIPELINE] Using GPT-5 mini for Stage 1');
        response = await step1Provider.generateCompletion({
          prompt,
          temperature: 0.3,
          reasoning_effort: step1Config.reasoning_effort,
          verbosity: step1Config.verbosity,
        });
      } else {
        console.log('[PIPELINE] Using Claude for Stage 1');
        response = await step1Provider.generateCompletion({
          prompt,
          maxTokens: 5000,
          temperature: 0.3,
        });
      }

      const content = response.content;
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
      
      // Get provider configuration for Step 2 (always Claude for web search)
      const step2Config = AIProviderFactory.getStepConfig(2);
      console.log('[PIPELINE] Step 2 config:', JSON.stringify(step2Config));
      
      const step2Provider = AIProviderFactory.getProvider(step2Config.provider, step2Config.model);
      console.log(`[PIPELINE] Step 2 provider: ${step2Provider.getName()}, model: ${step2Config.model}`);
      
      const prompt = generateStep2Prompt(problemAnalysis!);
      
      // Step 2 always uses Claude (as defined in factory)
      console.log('[PIPELINE] Using Claude for Stage 2 (web search)');
      const response = await step2Provider.generateCompletion({
        prompt,
        maxTokens: 15000,
        temperature: 0.4,
      });

      const content = response.content;
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
      
      // Get provider configuration for Step 3
      const step3Config = AIProviderFactory.getStepConfig(3);
      console.log('[PIPELINE] Step 3 config:', JSON.stringify(step3Config));
      
      const step3Provider = AIProviderFactory.getProvider(step3Config.provider, step3Config.model);
      console.log(`[PIPELINE] Step 3 provider: ${step3Provider.getName()}, model: ${step3Config.model}`);
      
      const prompt = generateStep3Prompt(problemAnalysis!, toolResearch!);
      
      let response;
      if (step3Config.provider === 'openai') {
        console.log('[PIPELINE] Using GPT-5 mini for Stage 3');
        response = await step3Provider.generateCompletion({
          prompt,
          temperature: 0.3,
          reasoning_effort: step3Config.reasoning_effort,
          verbosity: step3Config.verbosity,
        });
      } else {
        console.log('[PIPELINE] Using Claude for Stage 3');
        response = await step3Provider.generateCompletion({
          prompt,
          maxTokens: 12000,
          temperature: 0.3,
        });
      }

      const content = response.content;
      curatedTools = cleanAndParseJSON(content);

      console.log('[PIPELINE] Stage 3 JSON size:', JSON.stringify(curatedTools).length, 'bytes');

      const { error: updateError } = await supabase
        .from('ai_reports')
        .update({ 
          stage3_tool_selection: curatedTools,
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
      
      // Extract clientSolution from curatedTools structure
      const clientSolution = (curatedTools as any)?.clientSolution || curatedTools;
      const prompt = generateStep4Prompt(problemAnalysis!, clientSolution!);
      let content = '';

      if (writeUpModel === 'gpt-5') {
        console.log('[PIPELINE] Using GPT-5 full for final report');
        // Use GPT-5 full model directly (not mini)
        const gpt5Provider = AIProviderFactory.getProvider('openai', 'gpt-5');
        const response = await gpt5Provider.generateCompletion({
          prompt,
          temperature: 0.3,
          reasoning_effort: 'medium',
          verbosity: 'high',
        });
        content = response.content;
      } else {
        // Get provider configuration for Step 4
        const step4Config = AIProviderFactory.getStepConfig(4);
        console.log('[PIPELINE] Step 4 config:', JSON.stringify(step4Config));
        
        const step4Provider = AIProviderFactory.getProvider(step4Config.provider, step4Config.model);
        console.log(`[PIPELINE] Step 4 provider: ${step4Provider.getName()}, model: ${step4Config.model}`);
        
        if (step4Config.provider === 'openai') {
          console.log('[PIPELINE] Using GPT-5 mini for final report');
          const response = await step4Provider.generateCompletion({
            prompt,
            temperature: 0.3,
            reasoning_effort: step4Config.reasoning_effort,
            verbosity: step4Config.verbosity,
          });
          content = response.content;
        } else {
          console.log('[PIPELINE] Using Claude for final report');
          const response = await step4Provider.generateCompletion({
            prompt,
            maxTokens: 15000,
            temperature: 0.3,
          });
          content = response.content;
        }
      }

      finalReport = cleanAndParseJSON(content);

      console.log('[PIPELINE] Stage 4 JSON size:', JSON.stringify(finalReport).length, 'bytes');

      // First, update the report content
      const { error: contentError } = await supabase
        .from('ai_reports')
        .update({ 
          stage4_report_content: finalReport,
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (contentError) {
        console.error('[PIPELINE] Failed to save Stage 4 content to database:', contentError);
        throw new Error(`Failed to save Stage 4 content: ${contentError.message}`);
      }

      console.log('[PIPELINE] Stage 4 content saved successfully');

      // Then update the status separately
      const { error: statusError } = await supabase
        .from('ai_reports')
        .update({ 
          report_status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (statusError) {
        console.error('[PIPELINE] Failed to update status to completed:', statusError);
        console.error('[PIPELINE] Error details:', statusError.message);
        // Don't throw - content is saved, we can still send the email
        console.log('[PIPELINE] WARNING: Report content saved but status not updated to completed');
      } else {
        console.log('[PIPELINE] Report status updated to completed');
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