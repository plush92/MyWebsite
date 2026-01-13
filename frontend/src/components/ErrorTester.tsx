import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface ErrorTesterProps {
  onError?: (error: Error) => void;
}

const ErrorTester: React.FC<ErrorTesterProps> = ({ onError }) => {
  const [shouldThrow, setShouldThrow] = useState(false);

  // This will trigger our Error Boundary
  if (shouldThrow) {
    const error = new Error(
      'This is a test error to demonstrate error boundaries!'
    );
    if (onError) {
      onError(error);
    }
    throw error;
  }

  const handleThrowError = () => {
    console.log('🚨 About to throw an error to test our Error Boundary...');
    setShouldThrow(true);
  };

  const handleAsyncError = () => {
    // Simulate an async error (like a failed API call)
    console.log('🌐 Simulating async error...');
    setTimeout(() => {
      throw new Error(
        'Async error - this should appear in console but not be caught by Error Boundary'
      );
    }, 1000);
  };

  return (
    <Box sx={{ p: 2, border: '2px dashed #ff9800', borderRadius: 2, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        🧪 Error Testing Component
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Use these buttons to test different error scenarios:
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleThrowError}
          size="small"
        >
          Throw Render Error
        </Button>

        <Button
          variant="outlined"
          color="warning"
          onClick={handleAsyncError}
          size="small"
        >
          Throw Async Error
        </Button>
      </Box>

      <Typography
        variant="caption"
        display="block"
        sx={{ mt: 2, color: 'text.secondary' }}
      >
        • Render errors will be caught by Error Boundaries
        <br />• Async errors won't be caught (this is normal React behavior)
      </Typography>
    </Box>
  );
};

export default ErrorTester;
