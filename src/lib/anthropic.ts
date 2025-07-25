import Anthropic from '@anthropic-ai/sdk';

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  console.error('Missing ANTHROPIC_API_KEY environment variable');
}

export const anthropic = new Anthropic({
  apiKey: anthropicApiKey || '',
});

export async function generateAIContent(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 4096
): Promise<string> {
  if (!anthropicApiKey) {
    throw new Error('Anthropic API key not configured');
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: maxTokens,
      temperature: 0.3,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Extract text content from the response
    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format from Anthropic');
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw error;
  }
}

export const AI_MODELS = {
  CLAUDE_3_5_SONNET: 'claude-3-5-sonnet-20241022',
  CLAUDE_3_OPUS: 'claude-3-opus-20240229',
  CLAUDE_3_HAIKU: 'claude-3-haiku-20240307',
} as const;

export type AIModel = typeof AI_MODELS[keyof typeof AI_MODELS];