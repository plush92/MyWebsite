// Frontend Logging Service
// Provides structured logging for the frontend application

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: any;
  userAgent?: string;
  url?: string;
  userId?: string;
  sessionId?: string;
  stack?: string;
}

class LoggerService {
  private sessionId: string;
  private userId?: string;
  private context?: string;
  private logLevel: LogLevel;
  private logBuffer: LogEntry[] = [];
  private maxBufferSize = 100;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.logLevel = this.getLogLevel();

    // In development, expose logger to window for debugging
    if (process.env.NODE_ENV === 'development') {
      (window as any).logger = this;
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private getLogLevel(): LogLevel {
    const env = import.meta.env.MODE || 'development';

    // Check for explicit log level in environment
    const envLogLevel = import.meta.env.VITE_LOG_LEVEL;
    if (envLogLevel) {
      switch (envLogLevel.toUpperCase()) {
        case 'ERROR':
          return LogLevel.ERROR;
        case 'WARN':
          return LogLevel.WARN;
        case 'INFO':
          return LogLevel.INFO;
        case 'DEBUG':
          return LogLevel.DEBUG;
        default:
          break;
      }
    }

    // Default levels based on environment
    switch (env) {
      case 'production':
        return LogLevel.WARN;
      case 'test':
        return LogLevel.ERROR;
      default:
        return LogLevel.DEBUG;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    metadata?: any,
    stack?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      metadata,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.userId,
      sessionId: this.sessionId,
      stack,
    };
  }

  private addToBuffer(entry: LogEntry) {
    this.logBuffer.push(entry);

    // Keep buffer size under control
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift(); // Remove oldest entry
    }
  }

  private formatForConsole(entry: LogEntry): string {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const context = entry.context ? `[${entry.context}]` : '';
    return `${timestamp} ${context} ${entry.message}`;
  }

  private logToConsole(entry: LogEntry) {
    const formattedMessage = this.formatForConsole(entry);

    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formattedMessage, entry.metadata);
        if (entry.stack) console.error(entry.stack);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, entry.metadata);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, entry.metadata);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage, entry.metadata);
        break;
    }
  }

  private async sendToServer(entry: LogEntry) {
    // Only send critical errors to server in production
    if (
      entry.level !== LogLevel.ERROR ||
      import.meta.env.MODE !== 'production'
    ) {
      return;
    }

    try {
      const endpoint = import.meta.env.VITE_LOG_ENDPOINT;
      if (!endpoint) return;

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Fallback to console if server logging fails
      console.error('Failed to send log to server:', error);
    }
  }

  // Set context for all subsequent logs
  setContext(context: string): void {
    this.context = context;
  }

  // Set user ID for tracking
  setUserId(userId: string): void {
    this.userId = userId;
  }

  // Clear current context
  clearContext(): void {
    this.context = undefined;
  }

  // Log methods
  error(message: string, metadata?: any, error?: Error): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const stack = error?.stack || new Error().stack;
    const entry = this.createLogEntry(LogLevel.ERROR, message, metadata, stack);

    this.addToBuffer(entry);
    this.logToConsole(entry);
    this.sendToServer(entry);
  }

  warn(message: string, metadata?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry = this.createLogEntry(LogLevel.WARN, message, metadata);
    this.addToBuffer(entry);
    this.logToConsole(entry);
  }

  info(message: string, metadata?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry = this.createLogEntry(LogLevel.INFO, message, metadata);
    this.addToBuffer(entry);
    this.logToConsole(entry);
  }

  debug(message: string, metadata?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry = this.createLogEntry(LogLevel.DEBUG, message, metadata);
    this.addToBuffer(entry);
    this.logToConsole(entry);
  }

  // Specialized logging methods
  apiRequest(method: string, url: string, data?: any): void {
    this.debug(`API Request: ${method} ${url}`, { method, url, data });
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    const message = `API Response: ${method} ${url} - ${status}`;
    if (status >= 400) {
      this.error(message, { method, url, status, data });
    } else {
      this.debug(message, { method, url, status, data });
    }
  }

  userAction(action: string, data?: any): void {
    this.info(`User Action: ${action}`, { action, ...data });
  }

  performance(operation: string, duration: number, metadata?: any): void {
    this.debug(`Performance: ${operation} took ${duration}ms`, {
      operation,
      duration,
      ...metadata,
    });
  }

  // Get recent logs for debugging
  getRecentLogs(count = 50): LogEntry[] {
    return this.logBuffer.slice(-count);
  }

  // Clear log buffer
  clearBuffer(): void {
    this.logBuffer = [];
  }

  // Export logs for debugging or support
  exportLogs(): string {
    return JSON.stringify(this.logBuffer, null, 2);
  }
}

// Create and export singleton instance
const logger = new LoggerService();
export default logger;

// Convenience exports
export const setLogContext = (context: string) => logger.setContext(context);
export const clearLogContext = () => logger.clearContext();
export const setUserId = (userId: string) => logger.setUserId(userId);

export const logError = (message: string, metadata?: any, error?: Error) =>
  logger.error(message, metadata, error);

export const logWarn = (message: string, metadata?: any) =>
  logger.warn(message, metadata);

export const logInfo = (message: string, metadata?: any) =>
  logger.info(message, metadata);

export const logDebug = (message: string, metadata?: any) =>
  logger.debug(message, metadata);

export const logApiRequest = (method: string, url: string, data?: any) =>
  logger.apiRequest(method, url, data);

export const logApiResponse = (
  method: string,
  url: string,
  status: number,
  data?: any
) => logger.apiResponse(method, url, status, data);

export const logUserAction = (action: string, data?: any) =>
  logger.userAction(action, data);

export const logPerformance = (
  operation: string,
  duration: number,
  metadata?: any
) => logger.performance(operation, duration, metadata);
