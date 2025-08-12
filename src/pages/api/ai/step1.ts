/**
 * AI Step 1: Problem Analysis
 * This endpoint handles Stage 1 of the pipeline - analyzing business problems
 * Called by Upstash Workflow via context.call() for long-running execution
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { QuizResponseData } from '@/types/quiz';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { responses, company } = req.body as {
      responses: QuizResponseData;
      company: string;
    };

    if (!responses || !company) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    console.log('[AI Step 1] Starting problem analysis...');
    
    // Get provider configuration for Step 1
    const step1Config = AIProviderFactory.getStepConfig(1);
    console.log('[AI Step 1] Config:', JSON.stringify(step1Config));
    
    const provider = AIProviderFactory.getProvider(step1Config.provider, step1Config.model);
    console.log(`[AI Step 1] Provider: ${provider.getName()}, model: ${step1Config.model}`);
    
    // Generate the prompt
    const prompt = generateStep1Prompt(responses, company);
    
    // Generate completion based on provider type
    let response;
    if (step1Config.provider === 'openai') {
      console.log('[AI Step 1] Using GPT-5 mini');
      response = await provider.generateCompletion({
        prompt,
        temperature: 0.3,
        reasoning_effort: step1Config.reasoning_effort,
        verbosity: step1Config.verbosity,
      });
    } else {
      console.log('[AI Step 1] Using Claude');
      response = await provider.generateCompletion({
        prompt,
        maxTokens: 5000,
        temperature: 0.3,
      });
    }

    // Parse the response
    const content = response.content;
    const problemAnalysis = cleanAndParseJSON(content);

    console.log('[AI Step 1] Analysis complete, size:', JSON.stringify(problemAnalysis).length, 'bytes');

    // Return the analysis
    res.status(200).json({
      success: true,
      data: problemAnalysis
    });

  } catch (error) {
    console.error('[AI Step 1] Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze problems',
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