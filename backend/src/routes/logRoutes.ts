import express from 'express';
import { createRequestLogger } from '../blog/utils/logger.js';
import { logInfo, logError, logWarn } from '../blog/utils/logger.js';

const router = express.Router();

// Endpoint for frontend to send logs to backend (useful for production error tracking)
router.post('/', async (req: any, res: any) => {
  const logger = createRequestLogger(req.requestId || 'unknown');

  try {
    const { level, message, metadata, sessionId, userId, url } = req.body;

    // Validate log level
    const validLevels = ['error', 'warn', 'info', 'debug'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        error: 'Invalid log level',
        requestId: req.requestId,
      });
    }

    // Create log entry with frontend context
    const logData = {
      source: 'frontend',
      sessionId,
      userId,
      url,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      ...metadata,
    };

    // Log based on level
    switch (level) {
      case 'error':
        logError(`Frontend: ${message}`, logData);
        break;
      case 'warn':
        logWarn(`Frontend: ${message}`, logData);
        break;
      case 'info':
        logInfo(`Frontend: ${message}`, logData);
        break;
      case 'debug':
        logger.debug(`Frontend: ${message}`, logData);
        break;
    }

    res.json({
      success: true,
      requestId: req.requestId,
    });
  } catch (error) {
    logger.error('Failed to process frontend log', {
      error: error instanceof Error ? error.message : 'Unknown error',
      body: req.body,
    });

    res.status(500).json({
      error: 'Failed to process log',
      requestId: req.requestId,
    });
  }
});

// Endpoint for frontend to get logging configuration
router.get('/config', (req: any, res: any) => {
  const logger = createRequestLogger(req.requestId || 'unknown');

  try {
    const config = {
      logLevel: process.env.LOG_LEVEL || 'warn',
      environment: process.env.NODE_ENV || 'development',
      logEndpoint: '/api/logs',
      enableFrontendReporting:
        process.env.ENABLE_FRONTEND_ERROR_REPORTING === 'true',
    };

    logger.info('Log configuration requested', config);

    res.json(config);
  } catch (error) {
    logger.error('Failed to get log configuration', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(500).json({
      error: 'Failed to get log configuration',
      requestId: req.requestId,
    });
  }
});

export default router;
