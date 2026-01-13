import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Anthropic Claude API endpoint
router.post('/anthropic', async (req, res) => {
  const { message, model = 'claude-3-5-sonnet-20241022' } = req.body;

  if (!process.env.ANTHROPIC_API_KEY) {
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

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    res.json({
      response: data.content[0].text,
      model: model,
      provider: 'anthropic',
    });
  } catch (error) {
    console.error('Anthropic API Error:', error);
    res.status(500).json({ error: 'Failed to get response from Claude' });
  }
});

// OpenAI API endpoint
router.post('/openai', async (req, res) => {
  const { message, model = 'gpt-4' } = req.body;

  if (!process.env.OPENAI_API_KEY) {
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

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    res.json({
      response: data.choices[0].message.content,
      model: model,
      provider: 'openai',
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

// Get AI configuration status
router.get('/status', (req, res) => {
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
