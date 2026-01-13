/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_WEATHER_API_URL?: string;
  readonly VITE_CONGRESS_API_URL?: string;

  // External API Keys
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_ANTHROPIC_API_KEY?: string;

  // AI Configuration
  readonly VITE_AI_MODEL?: string;
  readonly VITE_ENABLE_CLAUDE_SONNET_4_5?: string;

  // Environment
  readonly VITE_NODE_ENV: string;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG_MODE: string;

  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
