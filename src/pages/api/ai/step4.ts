/**
 * AI Step 4: Report Generation
 * This endpoint handles Stage 4 of the pipeline - generating the final executive report
 * Called by Upstash Workflow via context.call() for long-running execution
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { problemAnalysis, curatedTools, writeUpModel } = req.body as {
      problemAnalysis: ProblemAnalysis;
      curatedTools: CuratedTools;
      writeUpModel?: string;
    };

    if (!problemAnalysis || !curatedTools) {
      return res.status(400).json({ error: 'Missing required analysis data' });
    }

    console.log('[AI Step 4] Starting report generation...');
    
    // Generate the prompt
    const prompt = generateStep4Prompt(problemAnalysis, curatedTools);
    
    // Determine which model to use for final report
    const modelChoice = writeUpModel || process.env.WRITE_UP_MODEL || 'claude-4';
    let content = '';

    if (modelChoice === 'gpt-5') {
      console.log('[AI Step 4] Using GPT-5 full for final report');
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
      console.log('[AI Step 4] Config:', JSON.stringify(step4Config));
      
      const provider = AIProviderFactory.getProvider(step4Config.provider, step4Config.model);
      console.log(`[AI Step 4] Provider: ${provider.getName()}, model: ${step4Config.model}`);
      
      if (step4Config.provider === 'openai') {
        console.log('[AI Step 4] Using GPT-5 mini for final report');
        const response = await provider.generateCompletion({
          prompt,
          temperature: 0.3,
          reasoning_effort: step4Config.reasoning_effort,
          verbosity: step4Config.verbosity,
        });
        content = response.content;
      } else {
        console.log('[AI Step 4] Using Claude for final report');
        const response = await provider.generateCompletion({
          prompt,
          maxTokens: 15000,
          temperature: 0.3,
        });
        content = response.content;
      }
    }

    // Parse the response
    const finalReport = cleanAndParseJSON(content);

    console.log('[AI Step 4] Report generation complete, size:', JSON.stringify(finalReport).length, 'bytes');

    // Return the final report
    res.status(200).json({
      success: true,
      data: finalReport
    });

  } catch (error) {
    console.error('[AI Step 4] Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate report',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Increase timeout for this endpoint
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    // This endpoint can run longer via QStash
    externalResolver: true,
  },
};