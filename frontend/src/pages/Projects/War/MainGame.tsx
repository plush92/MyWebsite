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

//We're expecting JSON, so "Card" will be a key/value object (or python dictionary)
type Card = {
  rank: string;
  suit: string;
};

type MainGameProps = {
  player1score: number;
  player2score: number;
  player1name: string;
  player2name: string;
  player1deck: Card[]; //each deck will now be an instance of the Card object (python dictionary)
  player2deck: Card[];
  deck: Card[];
  handleEndGame: () => void;
  handlePlayRound: () => void;
};

const MainGame: React.FC<MainGameProps> = ({
  player1name,
  player2name,
  player1score,
  player2score,
  player1deck,
  player2deck,
  deck,
  handlePlayRound,
  handleEndGame,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "background.paper",
        borderRadius: 3,
        p: 4,
        boxShadow: 4,
      }}
    >
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid size={4}>
          <Typography variant="h5">{player1name}</Typography>
          {player1deck.length > 0 ? (
            <Card
              sx={{
                width: 120,
                height: 160,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6">{player1deck[0].rank}</Typography>
              <Typography variant="body2">{player1deck[0].suit}</Typography>
            </Card>
          ) : (
            <Typography>No cards left.</Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            Deck: {player1deck.length} cards
          </Typography>
        </Grid>

        <Grid size={4}>
          <Typography variant="h5">{player2name}</Typography>
          {player2deck.length > 0 ? (
            <Card
              sx={{
                width: 120,
                height: 160,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6">{player2deck[0].rank}</Typography>
              <Typography variant="body2">{player2deck[0].suit}</Typography>
            </Card>
          ) : (
            <Typography>No cards left.</Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            Deck: {player2deck.length} cards
          </Typography>
        </Grid>

        <Grid size={12} sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlayRound}
            sx={{ mx: 1 }}
          >
            Play Round
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleEndGame}
            sx={{ mx: 1 }}
          >
            End Game
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainGame;
