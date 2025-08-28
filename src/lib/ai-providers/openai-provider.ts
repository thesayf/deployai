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
    console.log(`[OpenAI-${this.config.model}] ===== GENERATE COMPLETION CALLED =====`);
    console.log(`[OpenAI-${this.config.model}] Prompt length: ${options.prompt.length}`);
    console.log(`[OpenAI-${this.config.model}] Reasoning effort: ${options.reasoning_effort || 'default'}`);
    console.log(`[OpenAI-${this.config.model}] Verbosity: ${options.verbosity || 'default'}`);
    console.log(`[OpenAI-${this.config.model}] Temperature: ${options.temperature}`);

    try {
      console.log(`[OpenAI-${this.config.model}] Building request parameters...`);
      // Build request parameters according to OpenAI Responses API
      const params: any = {
        model: this.config.model || 'gpt-5-mini',
        input: options.prompt,
        text: {
          verbosity: options.verbosity || 'medium',
        },
        reasoning: {
          effort: options.reasoning_effort || 'minimal',
        },
      };
      // Note: Responses API doesn't support max_tokens parameter
      
      console.log(`[OpenAI-${this.config.model}] About to call OpenAI API...`);
      console.log(`[OpenAI-${this.config.model}] Request params:`, {
        model: params.model,
        inputLength: params.input?.length,
        reasoning: params.reasoning,
        text: params.text
      });

      // Add a timeout wrapper (adjust based on model and reasoning effort)
      let timeoutMs = 180000; // Default 180 seconds (3 minutes)
      
      // Special handling for large prompts with medium/high reasoning
      const isLargePrompt = options.prompt.length > 30000;
      
      if (this.config.model === 'gpt-5') {
        timeoutMs = 270000; // 4.5 minutes for gpt-5 full
      } else if ((options.reasoning_effort === 'medium' || options.reasoning_effort === 'high')) {
        // For large prompts with medium/high reasoning, give more time
        if (isLargePrompt) {
          timeoutMs = 390000; // 6.5 minutes for large prompts with complex reasoning
          console.log(`[OpenAI-${this.config.model}] Large prompt detected (${options.prompt.length} chars), using extended 5-minute timeout`);
        } else {
          timeoutMs = 240000; // 4 minutes for normal medium/high reasoning
        }
      }
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`OpenAI API call timed out after ${timeoutMs/1000} seconds`)), timeoutMs)
      );
      
      const apiCallPromise = (this.client as any).responses.create(params);
      
      console.log(`[OpenAI-${this.config.model}] Calling API (${timeoutMs/1000}s timeout)...`);
      const response = await Promise.race([apiCallPromise, timeoutPromise]);

      console.log(`[OpenAI-${this.config.model}] API call successful!`);
      console.log(`[OpenAI-${this.config.model}] Raw response structure:`, {
        hasOutputText: !!response.output_text,
        hasOutput: !!response.output,
        outputIsArray: Array.isArray(response.output),
        outputLength: response.output?.length,
        responseKeys: Object.keys(response || {}),
      });

      // Extract text content from response
      // GPT-5 returns content in response.output_text directly
      let content = '';
      if (response.output_text) {
        content = response.output_text;
        console.log(`[OpenAI-${this.config.model}] Using output_text directly`);
      } else if (response.output && Array.isArray(response.output)) {
        // Fallback: Handle structured output format (for future compatibility)
        console.log(`[OpenAI-${this.config.model}] Processing output array of length:`, response.output.length);
        for (const item of response.output) {
          if (item.type === 'message' && item.content && Array.isArray(item.content)) {
            for (const contentItem of item.content) {
              if (contentItem.type === 'output_text' && contentItem.text) {
                content += contentItem.text;
                console.log(`[OpenAI-${this.config.model}] Found text in message content`);
              }
            }
          }
        }
      } else {
        console.log(`[OpenAI-${this.config.model}] WARNING: No recognized output format!`);
        console.log(`[OpenAI-${this.config.model}] Full response:`, JSON.stringify(response, null, 2).substring(0, 500));
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
    console.log(`[OpenAI-${this.config.model}] ===== GENERATE WITH TOOLS CALLED =====`);
    console.log(`[OpenAI-${this.config.model}] Tools:`, JSON.stringify(options.tools, null, 2));
    console.log(`[OpenAI-${this.config.model}] Reasoning effort:`, options.reasoning_effort);
    console.log(`[OpenAI-${this.config.model}] Verbosity:`, options.verbosity);

    try {
      console.log(`[OpenAI-${this.config.model}] Building request parameters for tools...`);
      // Build request parameters according to OpenAI Responses API
      const params: any = {
        model: this.config.model || 'gpt-5-mini',
        input: options.prompt,
        tools: options.tools || [],
        text: {
          verbosity: options.verbosity || 'medium',
        },
        reasoning: {
          effort: options.reasoning_effort || 'minimal',
        },
      };
      // Note: Responses API doesn't support max_tokens parameter
      
      console.log(`[OpenAI-${this.config.model}] About to call OpenAI API with tools...`);
      console.log(`[OpenAI-${this.config.model}] Request params:`, {
        model: params.model,
        inputLength: params.input?.length,
        reasoning: params.reasoning,
        text: params.text,
        tools: params.tools
      });

      // Add a timeout wrapper (60 seconds for web search)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('OpenAI API call timed out after 60 seconds')), 60000)
      );
      
      const apiCallPromise = (this.client as any).responses.create(params);
      
      console.log(`[OpenAI-${this.config.model}] Calling API (60s timeout for web search)...`);
      const response = await Promise.race([apiCallPromise, timeoutPromise]);

      console.log(`[OpenAI-${this.config.model}] Raw response structure (with tools):`, {
        hasOutputText: !!response.output_text,
        hasOutput: !!response.output,
        outputIsArray: Array.isArray(response.output),
        outputLength: response.output?.length,
        responseKeys: Object.keys(response || {}),
      });

      // Extract text content from response
      // GPT-5 returns content in response.output_text directly (even with tools)
      let content = '';
      if (response.output_text) {
        content = response.output_text;
        console.log(`[OpenAI-${this.config.model}] Using output_text directly (with tools)`);
      } else if (response.output && Array.isArray(response.output)) {
        // Fallback: Handle structured output format (for future compatibility)
        console.log(`[OpenAI-${this.config.model}] Processing output array (with tools), length:`, response.output.length);
        for (const item of response.output) {
          if (item.type === 'message' && item.content && Array.isArray(item.content)) {
            for (const contentItem of item.content) {
              if (contentItem.type === 'output_text' && contentItem.text) {
                content += contentItem.text;
                console.log(`[OpenAI-${this.config.model}] Found text in message content (with tools)`);
              }
            }
          }
        }
      } else {
        console.log(`[OpenAI-${this.config.model}] WARNING: No recognized output format (with tools)!`);
        console.log(`[OpenAI-${this.config.model}] Full response:`, JSON.stringify(response, null, 2).substring(0, 500));
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