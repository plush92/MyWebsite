// Mood Tracker Component
// Allows users to log their mood and add notes
// Displays mood history and provides mood insights

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Alert,
} from '@mui/material';
import { Add as AddIcon, TrendingUp, Psychology } from '@mui/icons-material';
import CustomBox from '../../../../components/materialui/CustomBox';
import CustomContainer from '../../../../components/materialui/CustomContainer';
import CustomTextField from '../../../../components/materialui/CustomTextField';
import PageLayout from '../../../../components/PageLayout';

type LayoutProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

interface MoodEntry {
  id: string;
  mood: number;
  moodLabel: string;
  note: string;
  timestamp: Date;
  inspiration?: string;
}

const MOODS = [
  { value: 1, label: '😢 Very Sad', color: '#ef4444' },
  { value: 2, label: '😔 Sad', color: '#f97316' },
  { value: 3, label: '😐 Neutral', color: '#eab308' },
  { value: 4, label: '😊 Happy', color: '#22c55e' },
  { value: 5, label: '😄 Very Happy', color: '#16a34a' },
];

const INSPIRATIONAL_QUOTES = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  'It is during our darkest moments that we must focus to see the light. - Aristotle',
  'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
  'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
];

const MoodTracker: React.FC<LayoutProps> = ({ mode, toggleMode }) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(3);
  const [moodNote, setMoodNote] = useState('');

  // Load mood entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodTracker');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      }));
      setMoodEntries(parsed);
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    if (moodEntries.length > 0) {
      localStorage.setItem('moodTracker', JSON.stringify(moodEntries));
    }
  }, [moodEntries]);

  const handleAddMood = () => {
    const moodData = MOODS.find(m => m.value === selectedMood);
    const randomQuote =
      INSPIRATIONAL_QUOTES[
        Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)
      ];

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      moodLabel: moodData?.label || 'Unknown',
      note: moodNote,
      timestamp: new Date(),
      inspiration: randomQuote,
    };

    setMoodEntries(prev => [newEntry, ...prev]);
    setMoodNote('');
    setSelectedMood(3);
    setDialogOpen(false);
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / moodEntries.length).toFixed(1);
  };

  const getMoodColor = (mood: number) => {
    return MOODS.find(m => m.value === mood)?.color || '#64748b';
  };

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <CustomContainer>
        <CustomBox styleArray={[{ maxWidth: 800, mx: 'auto' }]}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Mood Tracker
          </Typography>

          {/* Mood Statistics */}
          {moodEntries.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <TrendingUp /> Mood Insights
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Typography>
                    <strong>Total Entries:</strong> {moodEntries.length}
                  </Typography>
                  <Typography>
                    <strong>Average Mood:</strong> {getAverageMood()}/5
                  </Typography>
                  <Typography>
                    <strong>Current Streak:</strong>{' '}
                    {moodEntries.length > 0
                      ? Math.min(moodEntries.length, 7)
                      : 0}{' '}
                    days
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Mood History */}
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Psychology /> Recent Mood Entries
              </Typography>

              {moodEntries.length === 0 ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  No mood entries yet. Click the + button to log your first
                  mood!
                </Alert>
              ) : (
                <List>
                  {moodEntries.slice(0, 10).map(entry => (
                    <ListItem key={entry.id} divider>
                      <ListItemText
                        primary={
                          <CustomBox
                            styleArray={[
                              { display: 'flex', alignItems: 'center', gap: 2 },
                            ]}
                          >
                            <Chip
                              label={entry.moodLabel}
                              sx={{
                                backgroundColor: getMoodColor(entry.mood),
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {entry.timestamp.toLocaleDateString()} at{' '}
                              {entry.timestamp.toLocaleTimeString()}
                            </Typography>
                          </CustomBox>
                        }
                        secondary={
                          <CustomBox styleArray={[{ mt: 1 }]}>
                            {entry.note && (
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Note:</strong> {entry.note}
                              </Typography>
                            )}
                            {entry.inspiration && (
                              <Typography
                                variant="body2"
                                sx={{
                                  fontStyle: 'italic',
                                  color: 'text.secondary',
                                  backgroundColor:
                                    mode === 'dark'
                                      ? 'rgba(255,255,255,0.05)'
                                      : 'rgba(0,0,0,0.05)',
                                  p: 1,
                                  borderRadius: 1,
                                  borderLeft: '3px solid',
                                  borderLeftColor: getMoodColor(entry.mood),
                                }}
                              >
                                💡 {entry.inspiration}
                              </Typography>
                            )}
                          </CustomBox>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </CustomBox>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          onClick={() => setDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
        >
          <AddIcon />
        </Fab>

        {/* Add Mood Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>How are you feeling?</DialogTitle>
          <DialogContent>
            <CustomBox styleArray={[{ py: 2 }]}>
              <Typography variant="subtitle1" gutterBottom>
                Select your mood:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
              >
                {MOODS.map(mood => (
                  <Chip
                    key={mood.value}
                    label={mood.label}
                    clickable
                    onClick={() => setSelectedMood(mood.value)}
                    sx={{
                      backgroundColor:
                        selectedMood === mood.value ? mood.color : 'default',
                      color: selectedMood === mood.value ? 'white' : 'inherit',
                      fontWeight:
                        selectedMood === mood.value ? 'bold' : 'normal',
                    }}
                  />
                ))}
              </Stack>

              <CustomTextField
                label="Add a note (optional)"
                multiline
                rows={3}
                fullWidth
                value={moodNote}
                onChange={e => setMoodNote(e.target.value)}
                placeholder="What's on your mind? How was your day?"
              />
            </CustomBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMood} variant="contained">
              Save Mood
            </Button>
          </DialogActions>
        </Dialog>
      </CustomContainer>
    </PageLayout>
  );
};

export default MoodTracker;
