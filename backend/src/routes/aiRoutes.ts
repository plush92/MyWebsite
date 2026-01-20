import express from 'express';
import dotenv from 'dotenv';
import { createRequestLogger } from '../blog/utils/logger.js';

dotenv.config();

const router = express.Router();

// Anthropic Claude API endpoint
router.post('/anthropic', async (req: any, res: any) => {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const { message, model = 'claude-3-5-sonnet-20241022' } = req.body;
  const startTime = Date.now();

  logger.info('Anthropic AI request received', {
    model,
    messageLength: message?.length || 0,
  });

  if (!process.env.ANTHROPIC_API_KEY) {
    logger.error('Anthropic API key not configured');
    return res.status(500).json({
      error: 'Anthropic API key not configured',
      enabled: false,
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.content[0].text;

    logger.info('Anthropic AI response received', {
      model,
      duration,
      responseLength: responseText?.length || 0,
    });

    res.json({
      response: responseText,
      model: model,
      provider: 'anthropic',
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Anthropic API Error', {
      model,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(500).json({ error: 'Failed to get response from Claude' });
  }
});

// OpenAI API endpoint
router.post('/openai', async (req: any, res: any) => {
  const logger = createRequestLogger(req.requestId || 'unknown');
  const { message, model = 'gpt-4' } = req.body;
  const startTime = Date.now();

  logger.info('OpenAI AI request received', {
    model,
    messageLength: message?.length || 0,
  });

  if (!process.env.OPENAI_API_KEY) {
    logger.error('OpenAI API key not configured');
    return res.status(500).json({
      error: 'OpenAI API key not configured',
      enabled: false,
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1000,
      }),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;

    logger.info('OpenAI AI response received', {
      model,
      duration,
      responseLength: responseText?.length || 0,
    });

    res.json({
      response: responseText,
      model: model,
      provider: 'openai',
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('OpenAI API Error', {
      model,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

// Get AI configuration status
router.get('/status', (_req: any, res: any) => {
  const claudeEnabled =
    process.env.ENABLE_CLAUDE_SONNET_4_5 === 'true' &&
    !!process.env.ANTHROPIC_API_KEY;
  const openaiEnabled = !!process.env.OPENAI_API_KEY;
  const defaultModel =
    process.env.DEFAULT_AI_MODEL || 'claude-3-5-sonnet-20241022';

  res.json({
    providers: {
      anthropic: {
        enabled: claudeEnabled,
        models: [
          'claude-3-5-sonnet-20241022',
          'claude-3-opus-20240229',
          'claude-3-sonnet-20240229',
          'claude-3-haiku-20240307',
        ],
      },
      openai: {
        enabled: openaiEnabled,
        models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      },
    },
    defaultProvider: claudeEnabled ? 'anthropic' : 'openai',
    defaultModel: defaultModel,
    claudeSonnet45EnabledForAllClients: claudeEnabled,
  });
});

export default router;
