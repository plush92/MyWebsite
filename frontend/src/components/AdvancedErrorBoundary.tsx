import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ErrorOutline,
  Refresh,
  BugReport,
  ExpandMore,
} from '@mui/icons-material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  eventId?: string;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{
    error?: Error;
    resetError: () => void;
  }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo, eventId: string) => void;
  maxRetries?: number;
  name?: string; // Name of the component/section being protected
}

/**
 * Advanced Error Boundary with Professional Features
 *
 * Features:
 * - Error logging with unique IDs for tracking
 * - Retry functionality with limits
 * - Different UI based on error type
 * - Development-friendly error details
 * - User-friendly error reporting
 */
class AdvancedErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeoutId?: NodeJS.Timeout;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate unique error ID for tracking
    const eventId = `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return {
      hasError: true,
      error,
      eventId,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError, name } = this.props;
    const { eventId } = this.state;

    // Enhanced logging
    console.group(
      `🚨 Error Boundary Caught Error (${name || 'Unknown Component'})`
    );
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Event ID:', eventId);
    console.groupEnd();

    // Save error info to state
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler (could send to error reporting service)
    if (onError && eventId) {
      onError(error, errorInfo, eventId);
    }

    // In a real app, you'd send this to an error reporting service
    this.reportErrorToService(error, errorInfo, eventId || 'unknown');
  }

  // Simulate error reporting (in real app, this would send to Sentry, LogRocket, etc.)
  private reportErrorToService = (
    error: Error,
    errorInfo: React.ErrorInfo,
    eventId: string
  ) => {
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      console.log('📊 Reporting error to service:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        eventId,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Reset error state with retry logic
  resetError = () => {
    const maxRetries = this.props.maxRetries || 3;
    const newRetryCount = this.state.retryCount + 1;

    if (newRetryCount <= maxRetries) {
      console.log(`🔄 Retrying... (Attempt ${newRetryCount}/${maxRetries})`);

      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: newRetryCount,
      });

      // Auto-retry after a delay for first retry
      if (newRetryCount === 1) {
        this.retryTimeoutId = setTimeout(() => {
          console.log('⏰ Auto-retry timeout completed');
        }, 1000);
      }
    } else {
      console.log('❌ Max retries exceeded');
      alert('Maximum retry attempts exceeded. Please refresh the page.');
    }
  };

  // Clear retry timeout on unmount
  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  // Determine error type for different handling
  private getErrorType = (
    error: Error
  ): 'network' | 'chunk' | 'render' | 'unknown' => {
    const message = error.message.toLowerCase();

    if (message.includes('fetch') || message.includes('network')) {
      return 'network';
    }
    if (message.includes('chunk') || message.includes('loading')) {
      return 'chunk';
    }
    if (message.includes('render') || message.includes('component')) {
      return 'render';
    }
    return 'unknown';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallbackComponent) {
        const FallbackComponent = this.props.fallbackComponent;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        );
      }

      const { error, eventId, retryCount } = this.state;
      const { maxRetries = 3, name } = this.props;
      const errorType = this.getErrorType(error!);

      // Different error messages based on type
      const errorMessages = {
        network:
          'Network connection issue. Please check your internet connection.',
        chunk:
          'Failed to load application resources. This may be due to a recent update.',
        render:
          'Component rendering error. There may be an issue with the data being displayed.',
        unknown: 'An unexpected error occurred in the application.',
      };

      const errorSolutions = {
        network: 'Try refreshing the page or check your internet connection.',
        chunk: 'Please refresh the page to load the latest version.',
        render: 'Try again or contact support if the problem persists.',
        unknown: 'Please try again or refresh the page.',
      };

      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          padding={4}
          textAlign="center"
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <ErrorOutline
            sx={{ fontSize: 64, color: 'error.main', marginBottom: 2 }}
          />

          <Typography variant="h4" gutterBottom color="error.main">
            {name ? `${name} Error` : 'Something went wrong'}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 2, maxWidth: 500 }}
          >
            {errorMessages[errorType]}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 3 }}
          >
            {errorSolutions[errorType]}
          </Typography>

          <Box
            display="flex"
            gap={1}
            alignItems="center"
            sx={{ marginBottom: 3 }}
          >
            <Chip
              icon={<BugReport />}
              label={`Error ID: ${eventId}`}
              size="small"
              variant="outlined"
              color="error"
            />
            <Chip
              label={`Type: ${errorType}`}
              size="small"
              variant="outlined"
            />
            {retryCount > 0 && (
              <Chip
                label={`Retries: ${retryCount}/${maxRetries}`}
                size="small"
                variant="outlined"
                color="warning"
              />
            )}
          </Box>

          <Box display="flex" gap={2} sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={this.resetError}
              disabled={retryCount >= maxRetries}
            >
              {retryCount >= maxRetries ? 'Max Retries Reached' : 'Try Again'}
            </Button>

            <Button variant="outlined" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </Box>

          {/* Expandable error details for development */}
          {process.env.NODE_ENV === 'development' && (
            <Accordion sx={{ width: '100%', maxWidth: 800 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle2">
                  Error Details (Development Only)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box textAlign="left">
                  <Typography variant="subtitle2" gutterBottom>
                    Error Message:
                  </Typography>
                  <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error?.message}
                  </Alert>

                  <Typography variant="subtitle2" gutterBottom>
                    Stack Trace:
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: 'grey.100',
                      padding: 2,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      overflow: 'auto',
                      maxHeight: 300,
                      marginBottom: 2,
                    }}
                  >
                    {error?.stack}
                  </Box>

                  {this.state.errorInfo && (
                    <>
                      <Typography variant="subtitle2" gutterBottom>
                        Component Stack:
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          backgroundColor: 'grey.100',
                          padding: 2,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          overflow: 'auto',
                          maxHeight: 200,
                        }}
                      >
                        {this.state.errorInfo.componentStack}
                      </Box>
                    </>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default AdvancedErrorBoundary;
