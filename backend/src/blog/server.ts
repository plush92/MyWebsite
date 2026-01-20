// filepath: /Users/brendanduffy/Documents/MyWebsite/backend/blog/src/server.ts
// to run server: cd '/Users/brendanduffy/Documents/MyWebsite/backend'
// then run 'node dist/blog/server.js'
import express from 'express';
import dotenv from 'dotenv';
import postRouter from './routes/postRoutes.js';
import aiRouter from '../routes/aiRoutes.js';
import logRouter from '../routes/logRoutes.js';
import cors from 'cors';
import { logInfo, logError, isLoggerHealthy } from './utils/logger.js';
import {
  addRequestId,
  requestLogger,
  errorLogger,
} from './utils/requestLogger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Health check for logging system
if (!isLoggerHealthy()) {
  console.error('⚠️  Logger system failed to initialize');
  process.exit(1);
}

logInfo('🚀 Starting Blog Server', {
  environment: process.env.NODE_ENV || 'development',
  port: PORT,
});

// Configure CORS with environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Logging middleware (add request ID first)
app.use(addRequestId);
app.use(requestLogger);

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    requestId: req.requestId,
    uptime: process.uptime(),
  });
});

app.use('/api/posts', postRouter);
app.use('/api/ai', aiRouter);
app.use('/api/logs', logRouter);

// Error logging middleware (must be after routes)
app.use(errorLogger);

// Global error handler
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const statusCode = (error as any).statusCode || 500;
    res.status(statusCode).json({
      error: {
        message: error.message,
        requestId: req.requestId,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
      },
    });
  }
);

const server = app.listen(PORT, () => {
  logInfo('✅ Blog Server Started Successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    allowedOrigins,
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logInfo('📴 SIGTERM received, shutting down gracefully');
  server.close(() => {
    logInfo('💤 Process terminated');
    process.exit(0);
  });
});

process.on('uncaughtException', error => {
  logError('💥 Uncaught Exception', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logError('💥 Unhandled Promise Rejection', { reason, promise });
  process.exit(1);
});
