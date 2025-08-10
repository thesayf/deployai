/**
 * OpenAI Provider Implementation
 * Uses GPT-5-mini with Responses API
 */

import OpenAI from 'openai';
import { AIProvider, AIProviderConfig, AICompletionOptions, AIResponse } from './types';

export class OpenAIProvider extends AIProvider {
  private client: OpenAI;

  constructor(config: AIProviderConfig) {
    super(config);
    this.client = new OpenAI({
      apiKey: config.apiKey,
    });
  }

  getName(): string {
    return 'openai';
  }

  async generateCompletion(options: AICompletionOptions): Promise<AIResponse> {
    console.log(`[OpenAI-${this.config.model}] Generating completion`);
    console.log(`[OpenAI-${this.config.model}] Prompt length: ${options.prompt.length}`);
    console.log(`[OpenAI-${this.config.model}] Reasoning effort: ${options.reasoning_effort || 'default'}`);
    console.log(`[OpenAI-${this.config.model}] Verbosity: ${options.verbosity || 'default'}`);

    try {
      // Build request parameters
      const params: any = {
        model: this.config.model || 'gpt-5-mini',
        input: options.prompt,
      };

      // Add optional parameters if they exist
      if (options.reasoning_effort) {
        params.reasoning_effort = options.reasoning_effort;
      }
      if (options.verbosity) {
        params.verbosity = options.verbosity;
      }
      if (options.maxTokens) {
        params.max_tokens = options.maxTokens;
      }

      const response = await (this.client as any).responses.create(params);

      // Extract text content from response
      let content = '';
      if (response.output_text) {
        content = response.output_text;
      } else if (response.output && Array.isArray(response.output)) {
        // Handle structured output format
        for (const item of response.output) {
          if (item.content) {
            for (const contentItem of item.content) {
              if (contentItem.text) {
                content += contentItem.text;
              }
            }
          }
        }
      }

      console.log(`[OpenAI-${this.config.model}] Response received, length: ${content.length}`);

      return {
        content,
        usage: response.usage ? {
          promptTokens: response.usage.prompt_tokens || 0,
          completionTokens: response.usage.completion_tokens || 0,
          totalTokens: response.usage.total_tokens || 0,
        } : undefined,
        raw: response,
      };
    } catch (error) {
      console.error(`[OpenAI-${this.config.model}] Error:`, error);
      throw error;
    }
  }

  async generateWithTools(options: AICompletionOptions): Promise<AIResponse> {
    console.log(`[OpenAI-${this.config.model}] Generating with tools`);
    console.log(`[OpenAI-${this.config.model}] Tools:`, options.tools?.map(t => t.type).join(', '));

    try {
      // Build request parameters
      const params: any = {
        model: this.config.model || 'gpt-5-mini',
        input: options.prompt,
        tools: options.tools || [],
      };

      // Add optional parameters if they exist
      if (options.reasoning_effort) {
        params.reasoning_effort = options.reasoning_effort;
      }
      if (options.verbosity) {
        params.verbosity = options.verbosity;
      }
      if (options.maxTokens) {
        params.max_tokens = options.maxTokens;
      }

      const response = await (this.client as any).responses.create(params);

      // Extract text content from response
      let content = '';
      if (response.output_text) {
        content = response.output_text;
      } else if (response.output && Array.isArray(response.output)) {
        // Handle structured output format with tool results
        for (const item of response.output) {
          if (item.content) {
            for (const contentItem of item.content) {
              if (contentItem.text) {
                content += contentItem.text;
              }
            }
          }
        }
      }

      console.log(`[OpenAI-${this.config.model}] Response with tools received, length: ${content.length}`);

      return {
        content,
        usage: response.usage ? {
          promptTokens: response.usage.prompt_tokens || 0,
          completionTokens: response.usage.completion_tokens || 0,
          totalTokens: response.usage.total_tokens || 0,
        } : undefined,
        raw: response,
      };
    } catch (error) {
      console.error(`[OpenAI-${this.config.model}] Error with tools:`, error);
      throw error;
    }
  }
}