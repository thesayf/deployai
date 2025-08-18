/**
 * AI Step 3: Tool Curation
 * This endpoint handles Stage 3 of the pipeline - curating and selecting the best tools
 * Called by Upstash Workflow via context.call() for long-running execution
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';
import { generateStep3Prompt } from '@/prompts/step3-tool-curation';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { ProblemAnalysis, ToolResearch } from '@/types/ai-analysis-new';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { problemAnalysis, toolResearch } = req.body as {
      problemAnalysis: ProblemAnalysis;
      toolResearch: ToolResearch;
    };

    if (!problemAnalysis || !toolResearch) {
      return res.status(400).json({ error: 'Missing required analysis data' });
    }

    console.log('[AI Step 3] Starting tool curation...');
    
    // Get provider configuration for Step 3
    const step3Config = AIProviderFactory.getStepConfig(3);
    console.log('[AI Step 3] Config:', JSON.stringify(step3Config));
    
    const provider = AIProviderFactory.getProvider(step3Config.provider, step3Config.model);
    console.log(`[AI Step 3] Provider: ${provider.getName()}, model: ${step3Config.model}`);
    
    // Generate the prompt
    const prompt = generateStep3Prompt(problemAnalysis, toolResearch);
    console.log(`[AI Step 3] Prompt size: ${prompt.length} characters (approx ${Math.ceil(prompt.length / 4)} tokens)`);
    
    // Log if this is a large prompt that will trigger extended timeout
    if (prompt.length > 30000) {
      console.log(`[AI Step 3] Large prompt detected - will use extended 5-minute timeout for processing`);
    }
    
    // Generate completion based on provider type
    let response;
    if (step3Config.provider === 'openai') {
      console.log('[AI Step 3] Using GPT-5 mini');
      response = await provider.generateCompletion({
        prompt,
        temperature: 0.3,
        reasoning_effort: step3Config.reasoning_effort,
        verbosity: step3Config.verbosity,
      });
    } else {
      console.log('[AI Step 3] Using Claude');
      response = await provider.generateCompletion({
        prompt,
        maxTokens: 12000,
        temperature: 0.3,
      });
    }

    // Parse the response
    const content = response.content;
    const curatedTools = cleanAndParseJSON(content);

    console.log('[AI Step 3] Curation complete, size:', JSON.stringify(curatedTools).length, 'bytes');

    // Return the curated tools
    res.status(200).json({
      success: true,
      data: curatedTools
    });

  } catch (error) {
    console.error('[AI Step 3] Error:', error);
    res.status(500).json({ 
      error: 'Failed to curate tools',
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