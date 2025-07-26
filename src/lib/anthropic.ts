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
  maxTokens: number = 4096,
  tools?: any[]
): Promise<string> {
  if (!anthropicApiKey) {
    throw new Error('Anthropic API key not configured');
  }

  try {
    const messageParams: any = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      temperature: 0.3,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    };

    // Add tools if provided
    if (tools && tools.length > 0) {
      messageParams.tools = tools;
    }

    const response = await anthropic.messages.create(messageParams);

    // Extract text content from the response
    // Note: When using tools like web_search, the response may contain multiple content blocks
    // including tool use results. We concatenate all text content.
    let fullContent = '';
    for (const content of response.content) {
      if (content.type === 'text') {
        fullContent += content.text;
      }
    }

    if (fullContent) {
      return fullContent;
    }

    throw new Error('No text content in response from Anthropic');
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw error;
  }
}

export const AI_MODELS = {
  CLAUDE_SONNET_4: 'claude-sonnet-4-20250514',
  CLAUDE_OPUS_4: 'claude-opus-4-20250514',
  CLAUDE_3_5_SONNET: 'claude-3-5-sonnet-20241022',
  CLAUDE_3_OPUS: 'claude-3-opus-20240229',
  CLAUDE_3_HAIKU: 'claude-3-haiku-20240307',
} as const;

export type AIModel = typeof AI_MODELS[keyof typeof AI_MODELS];