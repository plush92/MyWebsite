/**
 * AI Service Configuration (Simplified)
 * Handles multiple AI providers including OpenAI and Anthropic Claude
 */

export interface AIProvider {
  name: string;
  apiKey: string | undefined;
  baseURL: string;
  models: string[];
  enabled: boolean;
}

export interface AIConfig {
  providers: {
    openai: AIProvider;
    anthropic: AIProvider;
  };
  defaultProvider: 'openai' | 'anthropic';
  defaultModel: string;
}

// Get AI configuration from environment variables
export const getAIConfig = (): AIConfig => {
  const claudeSonnet45Enabled = import.meta.env.VITE_ENABLE_CLAUDE_SONNET_4_5 === 'true';
  const defaultModel = import.meta.env.VITE_AI_MODEL || 'claude-3-5-sonnet-20241022';

  return {
    providers: {
      openai: {
        name: 'OpenAI',
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        baseURL: 'https://api.openai.com/v1',
        models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
        enabled: !!import.meta.env.VITE_OPENAI_API_KEY,
      },
      anthropic: {
        name: 'Anthropic Claude',
        apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
        baseURL: 'https://api.anthropic.com/v1',
        models: [
          'claude-3-5-sonnet-20241022',
          'claude-3-opus-20240229',
          'claude-3-sonnet-20240229',
          'claude-3-haiku-20240307'
        ],
        enabled: claudeSonnet45Enabled && !!import.meta.env.VITE_ANTHROPIC_API_KEY,
      },
    },
    defaultProvider: claudeSonnet45Enabled ? 'anthropic' : 'openai',
    defaultModel: defaultModel,
  };
};

// Get available AI models
export const getAvailableModels = (): string[] => {
  const config = getAIConfig();
  const models: string[] = [];
  
  if (config.providers.openai.enabled) {
    models.push(...config.providers.openai.models);
  }
  
  if (config.providers.anthropic.enabled) {
    models.push(...config.providers.anthropic.models);
  }
  
  return models;
};

// Get current AI provider status
export const getAIProviderStatus = () => {
  const config = getAIConfig();
  
  return {
    claudeSonnet45Enabled: config.providers.anthropic.enabled && config.defaultProvider === 'anthropic',
    openAIEnabled: config.providers.openai.enabled,
    defaultProvider: config.defaultProvider,
    defaultModel: config.defaultModel,
    availableModels: getAvailableModels(),
  };
};

// Simple AI Client
export class AIClient {
  private config: AIConfig;
  
  constructor() {
    this.config = getAIConfig();
  }
  
  async sendMessage(message: string, model?: string): Promise<string> {
    const selectedModel = model || this.config.defaultModel;
    
    try {
      // For now, we'll make a simple API call to the backend
      const response = await fetch('/api/ai/anthropic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          model: selectedModel,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.response || 'No response received';
    } catch (error) {
      console.error('AI Client Error:', error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  }
}

export const aiClient = new AIClient();