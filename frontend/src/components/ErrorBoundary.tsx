import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Basic Error Boundary Component
 *
 * This catches JavaScript errors in child components and displays
 * a user-friendly error message instead of crashing the whole app
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // This lifecycle method catches errors and updates state
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  // This lifecycle method is called when an error is caught
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error details
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Save error info to state for debugging
    this.setState({
      error,
      errorInfo,
    });

    // Call the optional error handler prop
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  // Method to reset the error state (useful for retry functionality)
  resetError = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render() {
    if (this.state.hasError) {
      // If there's a custom fallback component, use it
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        );
      }

      // Default error UI
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          padding={3}
          textAlign="center"
        >
          <ErrorOutline
            sx={{
              fontSize: 48,
              color: 'error.main',
              marginBottom: 2,
            }}
          />

          <Typography variant="h5" gutterBottom color="error">
            Oops! Something went wrong
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 3 }}
          >
            We encountered an unexpected error. Don't worry, the rest of the
            site is still working.
          </Typography>

          <Alert severity="error" sx={{ marginBottom: 2, maxWidth: 400 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Alert>

          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={this.resetError}
            sx={{ marginTop: 2 }}
          >
            Try Again
          </Button>

          {/* Show error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <Box sx={{ marginTop: 3, textAlign: 'left', maxWidth: 600 }}>
              <Typography variant="subtitle2" gutterBottom>
                Error Details (Development Only):
              </Typography>
              <Box
                component="pre"
                sx={{
                  backgroundColor: 'grey.100',
                  padding: 1,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  maxHeight: 200,
                }}
              >
                {this.state.error?.stack}
              </Box>
            </Box>
          )}
        </Box>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
