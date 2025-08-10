/**
 * Anthropic Provider Implementation
 * Wraps existing Claude implementation for backward compatibility
 */

import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, AIProviderConfig, AICompletionOptions, AIResponse } from './types';

export class AnthropicProvider extends AIProvider {
  private client: Anthropic;

  constructor(config: AIProviderConfig) {
    super(config);
    this.client = new Anthropic({
      apiKey: config.apiKey,
    });
  }

  getName(): string {
    return 'anthropic';
  }

  async generateCompletion(options: AICompletionOptions): Promise<AIResponse> {
    console.log(`[Anthropic-${this.config.model}] Generating completion`);
    console.log(`[Anthropic-${this.config.model}] Prompt length: ${options.prompt.length}`);

    try {
      const response = await this.client.messages.create({
        model: this.config.model || 'claude-3-haiku-20240307',
        max_tokens: options.maxTokens || 4000,
        temperature: options.temperature || 0.7,
        messages: [
          {
            role: 'user',
            content: options.prompt,
          },
        ],
      });

      const content = response.content[0].type === 'text' 
        ? response.content[0].text 
        : '';

      console.log(`[Anthropic-${this.config.model}] Response received, length: ${content.length}`);

      return {
        content,
        usage: response.usage ? {
          promptTokens: response.usage.input_tokens || 0,
          completionTokens: response.usage.output_tokens || 0,
          totalTokens: (response.usage.input_tokens || 0) + (response.usage.output_tokens || 0),
        } : undefined,
        raw: response,
      };
    } catch (error) {
      console.error(`[Anthropic-${this.config.model}] Error:`, error);
      throw error;
    }
  }

  async generateWithTools(options: AICompletionOptions): Promise<AIResponse> {
    console.log(`[Anthropic-${this.config.model}] Generating with tools (using standard completion)`);
    
    // Claude doesn't support web search tools in the same way as GPT-5
    // For Claude Sonnet 4, we can use the web_search_20250305 tool
    if (this.config.model === 'claude-sonnet-4-20250514' && 
        options.tools?.some(t => t.type === 'web_search')) {
      
      console.log(`[Anthropic-${this.config.model}] Using Claude Sonnet 4 with web search`);
      
      try {
        const response = await this.client.messages.create({
          model: this.config.model,
          max_tokens: options.maxTokens || 15000,
          temperature: options.temperature || 0.3,
          system: "You are an AI tools expert. Use web search to find real, current AI tools and their actual pricing, features, and case studies. Search for specific tools that solve the identified business problems.",
          messages: [
            {
              role: 'user',
              content: options.prompt,
            },
          ],
          tools: [{
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 10,
          }],
        } as any);

        // Handle potential pause_turn for long searches
        let content = '';
        if (response.stop_reason === 'pause_turn') {
          console.log(`[Anthropic-${this.config.model}] Handling pause_turn for long-running web search`);
          
          const continuation = await this.client.messages.create({
            model: this.config.model,
            max_tokens: options.maxTokens || 15000,
            temperature: options.temperature || 0.3,
            messages: [
              { role: 'user', content: options.prompt },
              { role: 'assistant', content: response.content },
            ],
            tools: [{
              type: 'web_search_20250305',
              name: 'web_search',
              max_uses: 10,
            }],
          } as any);
          
          const finalContent = continuation.content.find(c => c.type === 'text');
          content = finalContent ? finalContent.text : '';
        } else {
          const textContent = response.content.find(c => c.type === 'text');
          content = textContent ? textContent.text : '';
        }

        return {
          content,
          usage: response.usage ? {
            promptTokens: response.usage.input_tokens || 0,
            completionTokens: response.usage.output_tokens || 0,
            totalTokens: (response.usage.input_tokens || 0) + (response.usage.output_tokens || 0),
          } : undefined,
          raw: response,
        };
      } catch (error) {
        console.error(`[Anthropic-${this.config.model}] Error with web search:`, error);
        throw error;
      }
    }
    
    // For other models or no tools, use regular completion
    return this.generateCompletion(options);
  }
}