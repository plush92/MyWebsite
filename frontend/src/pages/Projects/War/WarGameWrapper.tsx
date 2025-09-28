//state handling (player names, game phase)
//deciding which child components to render (setup screen, main game, or game over screen)

import React from "react";
import { useState } from "react";
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
} from "@mui/material";

const GamePhase = ["setup", "playing", "finished"];

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

//GameSetup - inputs for player names, 'deal' button
const WarGameWrapper: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  const [player1name, setPlayer1name] = useState("");
  const [player2name, setPlayer2name] = useState("");

  const handleplayer1NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1name(e.target.value);
  };

  const handleplayer2NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2name(e.target.value);
  };
};

export default WarGameWrapper;
