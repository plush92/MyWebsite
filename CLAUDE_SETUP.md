# Claude Sonnet 4.5 Integration

This project now includes **Claude Sonnet 4.5** as the default AI assistant, enabled for all clients.

## 🚀 Quick Start

Run the startup script to get both servers running with Claude enabled:

```bash
./start-dev.sh
```

## 🔑 API Setup

To enable Claude Sonnet 4.5:

1. **Get your Anthropic API key** from [Anthropic Console](https://console.anthropic.com/)
2. **Add to backend/.env:**
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ENABLE_CLAUDE_SONNET_4_5=true
   DEFAULT_AI_MODEL=claude-3-5-sonnet-20241022
   ```
3. **Add to frontend/.env:**
   ```
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   VITE_ENABLE_CLAUDE_SONNET_4_5=true
   VITE_AI_MODEL=claude-3-5-sonnet-20241022
   ```

## 🧪 Testing Claude Integration

1. **Start the servers:** `./start-dev.sh`
2. **Visit:** http://localhost:5173/projects
3. **Click:** "AI Assistant (Claude Sonnet 4.5)"
4. **Test the integration** with sample questions

## 📊 AI Configuration Status

Check the current AI configuration:

- **API Status:** GET `http://localhost:3001/api/ai/status`
- **Frontend Status:** Visit the AI Test page for real-time status

## 🤖 Available AI Models

### Anthropic Claude

- `claude-3-5-sonnet-20241022` (Default - Latest Sonnet 4.5)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`

### OpenAI (Fallback)

- `gpt-4`
- `gpt-4-turbo`
- `gpt-3.5-turbo`

## 🏗️ Architecture

### Frontend (`/frontend/src/services/aiService.ts`)

- Handles multiple AI providers
- Automatic fallback to OpenAI if Claude unavailable
- Environment-based configuration

### Backend (`/backend/src/routes/aiRoutes.ts`)

- Claude API integration via Anthropic REST API
- OpenAI integration for fallback
- Status endpoint for configuration checking

## 🔧 Configuration Options

### Environment Variables

| Variable                   | Description                   | Default                      |
| -------------------------- | ----------------------------- | ---------------------------- |
| `ENABLE_CLAUDE_SONNET_4_5` | Enable Claude for all clients | `true`                       |
| `DEFAULT_AI_MODEL`         | Default model to use          | `claude-3-5-sonnet-20241022` |
| `ANTHROPIC_API_KEY`        | Your Anthropic API key        | Required                     |

### Client Configuration

The system automatically:

- ✅ **Enables Claude Sonnet 4.5 for all clients** when properly configured
- ✅ **Falls back to OpenAI** if Claude is unavailable
- ✅ **Shows real-time status** of all AI providers
- ✅ **Allows model selection** from available options

## 🚀 Production Deployment

For production deployment:

1. **Set environment variables** in your hosting platform
2. **Secure API keys** using platform-specific secrets management
3. **Configure CORS** for your production domain
4. **Monitor usage** through Anthropic Console

## 📝 Usage Example

```typescript
import { aiClient } from './services/aiService';

// Send message to Claude Sonnet 4.5
const response = await aiClient.sendMessage(
  'Explain quantum computing in simple terms',
  'claude-3-5-sonnet-20241022'
);
```

## ✅ Status Verification

Claude Sonnet 4.5 is **enabled for all clients** when:

- ✅ `ENABLE_CLAUDE_SONNET_4_5=true`
- ✅ `ANTHROPIC_API_KEY` is configured
- ✅ API status returns `claudeSonnet45EnabledForAllClients: true`
- ✅ Frontend shows "Claude Sonnet 4.5: Enabled" chip
