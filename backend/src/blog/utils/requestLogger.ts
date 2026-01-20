import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { logHttp, logError } from './logger.js';

// Extend Express Request to include requestId
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

// Middleware to add request ID
export const addRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.requestId = uuidv4().substring(0, 8); // Short UUID for readability
  res.setHeader('X-Request-ID', req.requestId);
  next();
};

// Custom token for request ID in morgan
morgan.token('requestId', (req: Request) => req.requestId || 'unknown');

// Custom token for response time with colors
morgan.token('colorizedStatus', (_req: Request, res: Response) => {
  const status = res.statusCode;
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // Red
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // Yellow
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // Cyan
  return `\x1b[32m${status}\x1b[0m`; // Green
});

// Development format - colored and detailed
const devFormat =
  ':requestId :method :url :colorizedStatus :response-time ms - :res[content-length] :user-agent';

// Production format - JSON structured
const prodFormat = JSON.stringify({
  requestId: ':requestId',
  method: ':method',
  url: ':url',
  status: ':status',
  responseTime: ':response-time ms',
  contentLength: ':res[content-length]',
  userAgent: ':user-agent',
  remoteAddr: ':remote-addr',
  date: ':date[iso]',
});

// Create morgan middleware based on environment
export const requestLogger = morgan(
  process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
  {
    stream: {
      write: (message: string) => {
        // Remove trailing newline
        const cleanMessage = message.trim();

        // In production, parse JSON and log with structured format
        if (process.env.NODE_ENV === 'production') {
          try {
            const logData = JSON.parse(cleanMessage.replace(/'/g, '"'));
            const status = parseInt(logData.status);

            if (status >= 400) {
              logError('HTTP Request', logData);
            } else {
              logHttp('HTTP Request', logData);
            }
          } catch (error) {
            logHttp(cleanMessage);
          }
        } else {
          // Development: log as-is (already colored)
          logHttp(cleanMessage);
        }
      },
    },
  }
);

// Error logging middleware
export const errorLogger = (
  error: Error,
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const requestId = req.requestId || 'unknown';

  logError('Request Error', {
    requestId,
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
  });

  next(error);
};

// Success logging helper
export const logRequestSuccess = (
  req: Request,
  message: string,
  data?: any
) => {
  const requestId = req.requestId || 'unknown';

  logHttp(message, {
    requestId,
    method: req.method,
    url: req.url,
    ...data,
  });
};

// Database operation logging helper
export const logDatabaseOperation = (
  req: Request,
  operation: string,
  table: string,
  duration?: number,
  recordCount?: number
) => {
  const requestId = req.requestId || 'unknown';

  logHttp('Database Operation', {
    requestId,
    operation,
    table,
    duration: duration ? `${duration}ms` : undefined,
    recordCount,
  });
};

// API response logging helper
export const logApiResponse = (
  req: Request,
  statusCode: number,
  message: string,
  data?: any
) => {
  const requestId = req.requestId || 'unknown';
  const isError = statusCode >= 400;

  const logData = {
    requestId,
    statusCode,
    message,
    method: req.method,
    url: req.url,
    ...data,
  };

  if (isError) {
    logError('API Response Error', logData);
  } else {
    logHttp('API Response Success', logData);
  }
};
