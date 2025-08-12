/**
 * AI Step 2: Tool Research
 * This endpoint handles Stage 2 of the pipeline - researching AI tools with web search
 * Called by Upstash Workflow via context.call() for long-running execution
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AIProviderFactory } from '@/lib/ai-providers/provider-factory';
import { generateStep2Prompt } from '@/prompts/step2-tool-research';
import { cleanAndParseJSON } from '@/utils/clean-json';
import { ProblemAnalysis } from '@/types/ai-analysis-new';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { problemAnalysis } = req.body as {
      problemAnalysis: ProblemAnalysis;
    };

    if (!problemAnalysis) {
      return res.status(400).json({ error: 'Missing problem analysis data' });
    }

    console.log('[AI Step 2] Starting tool research...');
    
    // Get provider configuration for Step 2 (always Claude for web search)
    const step2Config = AIProviderFactory.getStepConfig(2);
    console.log('[AI Step 2] Config:', JSON.stringify(step2Config));
    
    const provider = AIProviderFactory.getProvider(step2Config.provider, step2Config.model);
    console.log(`[AI Step 2] Provider: ${provider.getName()}, model: ${step2Config.model}`);
    
    // Generate the prompt
    const prompt = generateStep2Prompt(problemAnalysis);
    
    // Step 2 always uses Claude with web search capability
    console.log('[AI Step 2] Using Claude Sonnet 4 with web search');
    const response = await provider.generateCompletion({
      prompt,
      maxTokens: 15000,
      temperature: 0.4,
    });

    // Parse the response
    const content = response.content;
    const toolResearch = cleanAndParseJSON(content);

    console.log('[AI Step 2] Research complete, size:', JSON.stringify(toolResearch).length, 'bytes');

    // Return the research
    res.status(200).json({
      success: true,
      data: toolResearch
    });

  } catch (error) {
    console.error('[AI Step 2] Error:', error);
    res.status(500).json({ 
      error: 'Failed to research tools',
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