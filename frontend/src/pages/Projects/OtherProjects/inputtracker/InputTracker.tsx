// Displays the current input
// Shows the previous input value
// Counts the number of characters typed
// Auto-saves the input (simulated) — but only after the user stops typing for a second
// Keeps the typing fast and responsive — no unnecessary re-renders

//variables:
//input (prev, current),
// # of characters typed in current

//save the input after user stops typing for 1 second
// no unnecessary re-renders

import React, { useState, useEffect, useRef } from 'react';
import { Typography, Paper, Alert } from '@mui/material';
import CustomTextField from '../../../../components/materialui/CustomTextField';
import CustomBox from '../../../../components/materialui/CustomBox';
import CustomButton from '../../../../components/materialui/CustomButton';
import PageLayout from '../../../../components/PageLayout';

type LayoutProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const InputTracker: React.FC<LayoutProps> = ({ mode, toggleMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  // Update the ref every time inputValue changes
  const prevInputRef = useRef<string>('');
  useEffect(() => {
    prevInputRef.current = inputValue;
  });

  // Show the number of renders
  const renderCount = useRef(1);
  useEffect(() => {
    renderCount.current += 1;
  });

  // Show the time since the last render
  const lastRenderTime = useRef(Date.now());
  useEffect(() => {
    lastRenderTime.current = Date.now();
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setCharCount(value.length);
    setWordCount(value.trim() ? value.trim().split(/\s+/).length : 0);
  };

  // Auto-save functionality with debounce
  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (inputValue) {
      setIsAutoSaving(true);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for 1 second
      timeoutRef.current = setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date().toLocaleTimeString());
        console.log('Auto-saved:', inputValue);
      }, 1000);
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue]);

  const handleClear = () => {
    setInputValue('');
    setCharCount(0);
    setWordCount(0);
    setLastSaved('');
  };

  const handleStaleClick = () => {
    setCharCount(charCount + 1);
    setCharCount(charCount + 1); // uses stale value
  };

  const handleFunctionalClick = () => {
    setCharCount(prev => prev + 1);
    setCharCount(prev => prev + 1); // uses latest value
  };

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <CustomBox
        styleArray={[
          {
            maxWidth: 800,
            mx: 'auto',
            mt: 2,
          },
        ]}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Input Tracker
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This component demonstrates React hooks, state management, and
            performance optimizations.
          </Typography>

          <CustomTextField
            id="inputValue"
            label="Type something here..."
            value={inputValue}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            placeholder="Start typing to see the tracker in action..."
            sx={{ mb: 2 }}
          />

          <CustomBox styleArray={[{ display: 'flex', gap: 2, mb: 2 }]}>
            <CustomButton onClick={handleClear} color="secondary">
              Clear Input
            </CustomButton>
            <CustomButton onClick={handleStaleClick} color="warning">
              Stale Counter +1
            </CustomButton>
            <CustomButton onClick={handleFunctionalClick} color="success">
              Functional Counter +2
            </CustomButton>
          </CustomBox>

          {isAutoSaving && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Auto-saving in progress...
            </Alert>
          )}

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Live Statistics
            </Typography>
            <CustomBox
              styleArray={[
                { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 },
              ]}
            >
              <Typography>
                <strong>Current Input:</strong> "{inputValue || 'Empty'}"
              </Typography>
              <Typography>
                <strong>Previous Input:</strong> "
                {prevInputRef.current || 'None'}"
              </Typography>
              <Typography>
                <strong>Character Count:</strong> {charCount}
              </Typography>
              <Typography>
                <strong>Word Count:</strong> {wordCount}
              </Typography>
              <Typography>
                <strong>Render Count:</strong> {renderCount.current}
              </Typography>
              <Typography>
                <strong>Last Render:</strong>{' '}
                {new Date(lastRenderTime.current).toLocaleTimeString()}
              </Typography>
              {lastSaved && (
                <Typography sx={{ gridColumn: 'span 2' }}>
                  <strong>Last Auto-saved:</strong> {lastSaved}
                </Typography>
              )}
            </CustomBox>
          </Paper>
        </Paper>
      </CustomBox>
    </PageLayout>
  );
};

export default InputTracker;
