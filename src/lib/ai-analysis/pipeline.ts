/**
 * AI Analysis Pipeline Module
 * Handles the complete AI analysis flow without server-to-server HTTP calls
 * Supports multiple AI providers (OpenAI GPT-5-mini, Anthropic Claude)
 */

import { supabaseAdmin } from '@/lib/supabase';
import { generateStep2Prompt } from '@/prompts/step2-tool-research';
import { generateStep3Prompt } from '@/prompts/step3-tool-curation';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';
import type { 
  ProblemAnalysis, 
  ToolResearch,
  FinalReport 
} from '@/types/ai-analysis-new';

/**
 * Step 2: Tool Research
 */
export async function executeStep2Research({
  quizResponseId,
  reportId,
  problemAnalysis
}: {
  quizResponseId: string;
  reportId: string;
  problemAnalysis: ProblemAnalysis;
}): Promise<{ success: boolean; error?: string }> {
  console.log('[PIPELINE-STEP2] Starting research');
  console.log('[PIPELINE-STEP2] Report ID:', reportId);
  console.log('[PIPELINE-STEP2] Quiz Response ID:', quizResponseId);

  try {
    const supabase = supabaseAdmin();
    
    // Get provider configuration for Step 2
    const stepConfig = AIProviderFactory.getStepConfig(2);
    const provider = AIProviderFactory.getProvider(stepConfig.provider, stepConfig.model);
    
    console.log(`[PIPELINE-STEP2] Using provider: ${provider.getName()}`);
    console.log(`[PIPELINE-STEP2] Model: ${stepConfig.model}`);
    console.log(`[PIPELINE-STEP2] Step config:`, JSON.stringify(stepConfig));
    console.log(`[PIPELINE-STEP2] ENV reasoning effort for step 2:`, process.env.GPT5_REASONING_EFFORT_STEP2);
    
    const prompt = generateStep2Prompt(problemAnalysis);
    console.log('[PIPELINE-STEP2] Generated prompt length:', prompt.length);

    // Step 2 now uses Claude 4 Sonnet with built-in web search
    console.log('[PIPELINE-STEP2] Using Claude 4 Sonnet for web search');
    const response = await provider.generateWithTools({
      prompt,
      maxTokens: 15000, // Claude needs maxTokens
      tools: [{ type: 'web_search' }], // Claude's web search tool
    });

    const toolResearch = cleanAndParseJSON(response.content) as ToolResearch;
    console.log('[PIPELINE-STEP2] Parsed research - Solutions count:', toolResearch.recommendedSolutions?.length);
    
    if (response.usage) {
      console.log('[PIPELINE-STEP2] Token usage:', response.usage);
    }

    // Save to database
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage2_tool_research: toolResearch,
        report_status: 'stage2_complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('[PIPELINE-STEP2] Failed to save research:', updateError);
      throw updateError;
    }

    console.log('[PIPELINE-STEP2] Research saved successfully');

    // Continue to Step 3
    await executeStep3Curation({
      quizResponseId,
      reportId,
      problemAnalysis,
      toolResearch
    });

    return { success: true };
  } catch (error) {
    console.error('[PIPELINE-STEP2] Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Step 3: Solution Curation
 */
export async function executeStep3Curation({
  quizResponseId,
  reportId,
  problemAnalysis,
  toolResearch
}: {
  quizResponseId: string;
  reportId: string;
  problemAnalysis: ProblemAnalysis;
  toolResearch: ToolResearch;
}): Promise<{ success: boolean; error?: string }> {
  console.log('[PIPELINE-STEP3] Starting curation');
  console.log('[PIPELINE-STEP3] Report ID:', reportId);

  try {
    const supabase = supabaseAdmin();
    
    // Get provider configuration for Step 3
    const stepConfig = AIProviderFactory.getStepConfig(3);
    const provider = AIProviderFactory.getProvider(stepConfig.provider, stepConfig.model);
    
    console.log(`[PIPELINE-STEP3] Using provider: ${provider.getName()}`);
    console.log(`[PIPELINE-STEP3] Model: ${stepConfig.model}`);
    
    const prompt = generateStep3Prompt(problemAnalysis, toolResearch);
    console.log('[PIPELINE-STEP3] Generated prompt length:', prompt.length);

    const response = stepConfig.provider === 'openai'
      ? await provider.generateCompletion({
          prompt,
          temperature: 0.7,
          reasoning_effort: stepConfig.reasoning_effort,
          verbosity: stepConfig.verbosity,
        })
      : await provider.generateCompletion({
          prompt,
          maxTokens: 4000, // Claude still needs maxTokens
          temperature: 0.7,
        });

    const solutionCuration = cleanAndParseJSON(response.content) as any;
    console.log('[PIPELINE-STEP3] Parsed solutions - internal tools:', solutionCuration.internalReference?.tools?.length);
    console.log('[PIPELINE-STEP3] Parsed solutions - client solutions:', solutionCuration.clientSolution?.implementedSolutions?.length);
    
    if (response.usage) {
      console.log('[PIPELINE-STEP3] Token usage:', response.usage);
    }

    // Save to database - keep both internal and client data for our records
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage3_tool_selection: solutionCuration,  // Store complete data including internal references
        report_status: 'stage3_complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('[PIPELINE-STEP3] Failed to save curation:', updateError);
      throw updateError;
    }

    console.log('[PIPELINE-STEP3] Curation saved successfully');

    // Continue to Step 4 - pass ONLY clientSolution to prevent tool name leakage
    await executeStep4Generate({
      quizResponseId,
      reportId,
      problemAnalysis,
      toolResearch,
      clientSolution: solutionCuration.clientSolution  // Pass only client-safe data
    });

    return { success: true };
  } catch (error) {
    console.error('[PIPELINE-STEP3] Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Step 4: Report Generation
 */
export async function executeStep4Generate({
  quizResponseId,
  reportId,
  problemAnalysis,
  toolResearch,
  clientSolution
}: {
  quizResponseId: string;
  reportId: string;
  problemAnalysis: ProblemAnalysis;
  toolResearch: ToolResearch;
  clientSolution: any;  // Client-safe solution data only
}): Promise<{ success: boolean; error?: string }> {
  console.log('[PIPELINE-STEP4] Starting report generation');
  console.log('[PIPELINE-STEP4] Report ID:', reportId);

  try {
    const supabase = supabaseAdmin();
    
    // Get provider configuration for Step 4
    const stepConfig = AIProviderFactory.getStepConfig(4);
    const provider = AIProviderFactory.getProvider(stepConfig.provider, stepConfig.model);
    
    console.log(`[PIPELINE-STEP4] Using provider: ${provider.getName()}`);
    console.log(`[PIPELINE-STEP4] Model: ${stepConfig.model}`);
    
    const prompt = generateStep4Prompt(problemAnalysis, clientSolution);
    console.log('[PIPELINE-STEP4] Generated prompt length:', prompt.length);

    const response = stepConfig.provider === 'openai'
      ? await provider.generateCompletion({
          prompt,
          temperature: 0.7,
          reasoning_effort: stepConfig.reasoning_effort,
          verbosity: stepConfig.verbosity, // High verbosity for comprehensive report
        })
      : await provider.generateCompletion({
          prompt,
          maxTokens: 8000, // Claude still needs maxTokens
          temperature: 0.7,
        });

    const finalReport = cleanAndParseJSON(response.content) as FinalReport;
    console.log('[PIPELINE-STEP4] Report generated successfully');
    
    if (response.usage) {
      console.log('[PIPELINE-STEP4] Token usage:', response.usage);
    }

    // Save to database
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage4_report_content: finalReport,
        report_status: 'completed',
        report_generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('[PIPELINE-STEP4] Failed to save report:', updateError);
      throw updateError;
    }

    console.log('[PIPELINE-STEP4] Report saved successfully');
    console.log('[PIPELINE-STEP4] Report generation complete - email will be sent from frontend');

    return { success: true };
  } catch (error) {
    console.error('[PIPELINE-STEP4] Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}