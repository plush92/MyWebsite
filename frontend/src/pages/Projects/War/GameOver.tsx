import React from 'react';
import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  FormHelperText,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Input } from '@mui/icons-material';
import { startGame, playRound, resetGame, getGameState } from './apiClient';
import PageLayout from '../../../components/PageLayout';

//Project Props
type ProjectProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

type GameOverProps = {
  player1score: number;
  player2score: number;
  player1name: string;
  player2name: string;
  handleRestart: () => void;
  getWinner: () => string | null;
};

const GameOver: React.FC<GameOverProps> = ({
  player1name,
  player2name,
  player1score,
  player2score,
  handleRestart,
  getWinner,
}) => {
  return (
    <Box>
      <Typography variant="h4">Game Over</Typography>
      <Typography>Winner: {getWinner() || 'Tie'}</Typography>

      <Button variant="contained" onClick={handleRestart}>
        Restart Game
      </Button>
    </Box>
  );
};

export default GameOver;
