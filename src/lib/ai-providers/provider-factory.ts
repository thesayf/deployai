/**
 * AI Provider Factory
 * Creates and manages AI provider instances based on configuration
 */

import { AIProvider, AIProviderConfig } from './types';
import { OpenAIProvider } from './openai-provider';
import { AnthropicProvider } from './anthropic-provider';

export type ProviderType = 'openai' | 'anthropic';

export interface StepConfig {
  provider?: ProviderType;
  model?: string;
  reasoning_effort?: 'minimal' | 'low' | 'medium' | 'high';
  verbosity?: 'low' | 'medium' | 'high';
}

export class AIProviderFactory {
  private static providers: Map<string, AIProvider> = new Map();

  /**
   * Get or create an AI provider instance
   */
  static getProvider(type?: ProviderType, modelOverride?: string): AIProvider {
    // Use environment variable if type not specified
    const providerType = type || (process.env.AI_PROVIDER as ProviderType) || 'openai';
    
    // Create a unique key for caching
    const key = `${providerType}-${modelOverride || 'default'}`;
    
    // Return cached provider if exists
    if (this.providers.has(key)) {
      return this.providers.get(key)!;
    }

    // Create new provider
    let provider: AIProvider;
    
    switch (providerType) {
      case 'openai':
        provider = new OpenAIProvider({
          apiKey: process.env.OPENAI_API_KEY!,
          model: modelOverride || 'gpt-5-mini',
        });
        break;
        
      case 'anthropic':
        provider = new AnthropicProvider({
          apiKey: process.env.ANTHROPIC_API_KEY!,
          model: modelOverride,
        });
        break;
        
      default:
        throw new Error(`Unknown provider type: ${providerType}`);
    }

    // Cache and return
    this.providers.set(key, provider);
    return provider;
  }

  /**
   * Get provider configuration for a specific step
   */
  static getStepConfig(step: 1 | 2 | 3 | 4): StepConfig {
    const provider = (process.env.AI_PROVIDER as ProviderType) || 'openai';
    
    if (provider === 'openai') {
      switch (step) {
        case 1:
          return {
            provider: 'openai',
            model: 'gpt-5-mini',
            reasoning_effort: (process.env.GPT5_REASONING_EFFORT_STEP1 as any) || 'minimal',
            verbosity: (process.env.GPT5_VERBOSITY as any) || 'medium',
          };
        case 2:
          return {
            provider: 'openai',
            model: 'gpt-5-mini',
            reasoning_effort: (process.env.GPT5_REASONING_EFFORT_STEP2 as any) || 'minimal',
            verbosity: (process.env.GPT5_VERBOSITY as any) || 'medium',
          };
        case 3:
          return {
            provider: 'openai',
            model: 'gpt-5-mini',
            reasoning_effort: (process.env.GPT5_REASONING_EFFORT_STEP3 as any) || 'medium',
            verbosity: (process.env.GPT5_VERBOSITY as any) || 'medium',
          };
        case 4:
          return {
            provider: 'openai',
            model: 'gpt-5-mini',
            reasoning_effort: (process.env.GPT5_REASONING_EFFORT_STEP4 as any) || 'high',
            verbosity: 'high', // Always high for final report
          };
      }
    } else {
      // Anthropic/Claude configuration
      switch (step) {
        case 1:
          return {
            provider: 'anthropic',
            model: 'claude-sonnet-4-20250514',
          };
        case 2:
          return {
            provider: 'anthropic',
            model: 'claude-sonnet-4-20250514', // With web search
          };
        case 3:
          return {
            provider: 'anthropic',
            model: 'claude-3-haiku-20240307',
          };
        case 4:
          return {
            provider: 'anthropic',
            model: 'claude-3-sonnet-20240229',
          };
      }
    }
  }

  /**
   * Clear cached providers
   */
  static clearCache(): void {
    this.providers.clear();
  }
}