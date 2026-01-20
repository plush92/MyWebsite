import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};

// Configure colors
winston.addColors(colors);

// Custom format for development
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Custom format for production
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Determine log level based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Create transports array
const createTransports = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';

  const transports: winston.transport[] = [
    // Console transport
    new winston.transports.Console({
      level: level(),
      format: isDevelopment ? devFormat : prodFormat,
    }),
  ];

  // File transports for production
  if (!isDevelopment) {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');

    transports.push(
      // Error log file
      new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: prodFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),

      // Combined log file
      new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: prodFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    );
  }

  return transports;
};

// Create the logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: createTransports(),
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Add request logging helpers
export const createRequestLogger = (requestId: string) => {
  return {
    info: (message: string, meta?: any) =>
      logger.info(message, { requestId, ...meta }),
    error: (message: string, meta?: any) =>
      logger.error(message, { requestId, ...meta }),
    warn: (message: string, meta?: any) =>
      logger.warn(message, { requestId, ...meta }),
    debug: (message: string, meta?: any) =>
      logger.debug(message, { requestId, ...meta }),
  };
};

// Export different log level functions for convenience
export const logInfo = (message: string, meta?: any) =>
  logger.info(message, meta);
export const logError = (message: string, meta?: any) =>
  logger.error(message, meta);
export const logWarn = (message: string, meta?: any) =>
  logger.warn(message, meta);
export const logDebug = (message: string, meta?: any) =>
  logger.debug(message, meta);
export const logHttp = (message: string, meta?: any) =>
  logger.http(message, meta);

// Export the logger instance
export default logger;

// Health check for logging system
export const isLoggerHealthy = (): boolean => {
  try {
    logger.info('Logger health check');
    return true;
  } catch (error) {
    console.error('Logger health check failed:', error);
    return false;
  }
};
