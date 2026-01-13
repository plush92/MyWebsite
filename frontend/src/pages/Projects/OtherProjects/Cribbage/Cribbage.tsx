// 52 cards, make a separate file (images for cards?), J Q K = 10, A = 1
// 6 cards to each player, 1 starter card
// each player selects 2 cards for the crib
// players alternate turns placing a card in the center,
// 15 for 2, run for 3, double for 2, trip for 3, go for 1, 31 max before count resets
//have rules displayed at the top
//don't use AI

// Start button, cards for each player, prompt to select 2 for crib, alternating cribs for each turn
// middle game - non crib person places card, other player places card
// score must update depending on card.
// numbered scoring (add board + peg later)
// make frontend first! - two containers to split the p1 p2 hands + middle container for cards + left for

//1. Pick a card to select dealer (lowest card is dealer)
//2. cards are dealt (non dealer is issued card first, then alternate until 6 are issued to each player)
//3. select 2 cards to send to the crib
//4. non-dealer cuts deck (optional), starter card appears, non-dealer plays card first
//5. dealer issues card, normal play until cards are exhausted
//6. score is counted, crib score is counted, total score is counted, scores are updated. score is automatically counted?
//7. process restarts, game repeats until one playet scores 121
//keep it simple!!!!

import React from 'react';
import { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { CARD_DICT } from './Cards';

type ProjectProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const Cribbage: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  const [card, setCard] = React.useState<{
    label: string;
    fips: string;
  } | null>(null);
};

export default Cribbage;
