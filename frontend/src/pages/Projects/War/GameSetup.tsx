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

//Game Function Props
type GameSetupProps = {
  player1name: string;
  player2name: string;
  handleplayer1NameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleplayer2NameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartGame: () => void;
  handleResetGame: () => void;
};

const GameSetup: React.FC<GameSetupProps> = ({
  player1name,
  player2name,
  handleplayer1NameChange,
  handleplayer2NameChange,
  handleStartGame,
  handleResetGame,
}) => {
  return (
    <Container>
      <Box>
        <TextField
          id="player1name"
          variant="standard"
          label="Player 1 Name"
          size="small"
          value={player1name}
          onChange={handleplayer1NameChange}
        ></TextField>
        <TextField
          id="player2name"
          variant="standard"
          label="Player 2 Name"
          size="small"
          value={player2name}
          onChange={handleplayer2NameChange}
        ></TextField>
      </Box>
      <Box>
        <Button variant="contained" onClick={handleStartGame}>
          Deal
        </Button>
        <Button variant="contained" onClick={handleResetGame}>
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default GameSetup;
