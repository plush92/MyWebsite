/**
 * AI Service Configuration (Simplified)
 * Handles multiple AI providers including OpenAI and Anthropic Claude
 */

import logger, {
  logError,
  logInfo,
  logApiRequest,
  logApiResponse,
} from './logger';

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
  const claudeSonnet45Enabled =
    import.meta.env.VITE_ENABLE_CLAUDE_SONNET_4_5 === 'true';
  const defaultModel =
    import.meta.env.VITE_AI_MODEL || 'claude-3-5-sonnet-20241022';

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
          'claude-3-haiku-20240307',
        ],
        enabled:
          claudeSonnet45Enabled && !!import.meta.env.VITE_ANTHROPIC_API_KEY,
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
    claudeSonnet45Enabled:
      config.providers.anthropic.enabled &&
      config.defaultProvider === 'anthropic',
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
    const provider = this.config.providers[this.config.defaultProvider];

    logInfo('AI request initiated', {
      provider: provider.name,
      model: selectedModel,
      messageLength: message.length,
    });

    try {
      // Determine endpoint based on provider
      const endpoint =
        this.config.defaultProvider === 'anthropic'
          ? '/api/ai/anthropic'
          : '/api/ai/openai';

      const requestData = {
        message,
        model: selectedModel,
      };

      logApiRequest('POST', endpoint, {
        model: selectedModel,
        messageLength: message.length,
      });

      // Check if we're in development mode and backend might not be running
      const baseURL = import.meta.env.DEV ? 'http://localhost:3001' : '';

      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      logApiResponse('POST', endpoint, response.status, {
        ok: response.ok,
        model: selectedModel,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `AI API error: ${response.status} - ${errorData.error || 'Unknown error'}`
        );
      }

      const data = await response.json();
      const aiResponse = data.response || 'No response received';

      logInfo('AI response received successfully', {
        provider: provider.name,
        model: selectedModel,
        responseLength: aiResponse.length,
      });

      return aiResponse;
    } catch (error) {
      logError(
        'AI Client Error',
        {
          provider: provider.name,
          model: selectedModel,
          messageLength: message.length,
        },
        error instanceof Error ? error : undefined
      );

      return `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
    }
  }
}

export const aiClient = new AIClient();
