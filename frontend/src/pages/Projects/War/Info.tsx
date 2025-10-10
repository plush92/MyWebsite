import React from "react";
import { useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Input } from "@mui/icons-material";
import { startGame, playRound, resetGame, getGameState } from "./apiClient";
import PageLayout from "../../../components/PageLayout";

//Project Props
type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const Info: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rules:
      </Typography>
      <Typography component="div" variant="body2">
        <ul>
          <li>Each player flips the top card of their deck.</li>
          <li>The higher card wins the round and takes both cards.</li>
          <li>
            If the cards are the same rank, a "war" occurs: each player places
            three cards face down and flips another.
          </li>
          <li>The winner of the war takes all the cards.</li>
          <li>The game continues until one player has all the cards.</li>
        </ul>
      </Typography>

      <Box sx={{ mt: 4, display: "flex", gap: 2 }}></Box>
    </Box>
  );
};

export default Info;
