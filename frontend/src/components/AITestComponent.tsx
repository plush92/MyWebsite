import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Chip,
  Stack,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { aiClient, getAIProviderStatus } from '../../services/aiService';

const AITestComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [providerStatus, setProviderStatus] = useState<any>(null);

  useEffect(() => {
    const status = getAIProviderStatus();
    setProviderStatus(status);
    setSelectedModel(status.defaultModel);
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const aiResponse = await aiClient.sendMessage(message, selectedModel);
      setResponse(aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value);
  };

  if (!providerStatus) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI Assistant - Claude Sonnet 4.5 Enabled
          </Typography>

          {/* Status Display */}
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip
              label={`Claude Sonnet 4.5: ${providerStatus.claudeSonnet45Enabled ? 'Enabled' : 'Disabled'}`}
              color={providerStatus.claudeSonnet45Enabled ? 'success' : 'error'}
            />
            <Chip
              label={`OpenAI: ${providerStatus.openAIEnabled ? 'Enabled' : 'Disabled'}`}
              color={providerStatus.openAIEnabled ? 'success' : 'error'}
            />
            <Chip
              label={`Default: ${providerStatus.defaultProvider}`}
              color="primary"
            />
          </Stack>

          {/* Model Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>AI Model</InputLabel>
            <Select
              value={selectedModel}
              label="AI Model"
              onChange={handleModelChange}
            >
              {providerStatus.availableModels.map((model: string) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Message Input */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ask the AI anything..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="Try asking: 'Explain what Claude Sonnet 4.5 is and its capabilities'"
          />

          {/* Send Button */}
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={loading || !message.trim()}
            fullWidth
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Message'}
          </Button>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Response Display */}
          {response && (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI Response:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {response}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Configuration Info */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Configuration:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Claude Sonnet 4.5 for all clients:{' '}
              {providerStatus.claudeSonnet45Enabled
                ? '✅ Enabled'
                : '❌ Disabled'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Default Model: {providerStatus.defaultModel}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Available Models: {providerStatus.availableModels.length}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AITestComponent;
