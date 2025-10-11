//state handling (player names, game phase)
//deciding which child components to render (setup screen, main game, or game over screen)

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

import GameSetup from "./GameSetup";
import MainGame from "./MainGame";
import GameOver from "./GameOver";
import Info from "./Info";

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

const WarGameWrapper: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  //State Management
  const [gamePhase, setGamePhase] = useState<"setup" | "main" | "end">("setup");
  const [player1name, setPlayer1name] = useState("Player 1");
  const [player2name, setPlayer2name] = useState("Player 2");
  const [player1score, setPlayer1score] = useState(0);
  const [player2score, setPlayer2score] = useState(0);
  const [player1deck, setPlayer1deck] = useState<Card[]>([]);
  const [player2deck, setPlayer2deck] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);

  //Functions
  function updateStateFromResponse(data: any) {
    const gameData = data.state || data;
    setPlayer1deck(gameData.players["player 1"].deck || []);
    setPlayer2deck(gameData.players["player 2"].deck || []);
    setDeck([]);
    setPlayer1score(gameData.scores[player1name] || 0);
    setPlayer2score(gameData.scores[player2name] || 0);
  }

  const handleplayer1NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1name(e.target.value);
  };

  const handleplayer2NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2name(e.target.value);
  };

  const handleStartGame = async () => {
    const data = await startGame({
      player1: player1name,
      player2: player2name,
    });
    console.log(data);
    updateStateFromResponse(data);
    setGamePhase("main");
  };

  const handlePlayRound = async () => {
    const data = await playRound();
    updateStateFromResponse(data);
  };

  const handleResetGame = async () => {
    const data = await resetGame(player1name, player2name);
    updateStateFromResponse(data);
    setGamePhase("main");
  };

  const handleGetGameState = async () => {
    const data = await getGameState();
    updateStateFromResponse(data);
  };

  function handleEndGame() {
    setGamePhase("end");
  }

  function handleRestart() {
    setPlayer1name("Player 1");
    setPlayer2name("Player 2");
    setPlayer1score(0);
    setPlayer2score(0);
    setPlayer1deck([]);
    setPlayer2deck([]);
    setDeck([]);
    setGamePhase("setup");
  }

  function getWinner(): string | null {
    if (player1deck.length === 0 && player2deck.length === 0) return null;
    if (player1deck.length === 0) return player2name;
    if (player2deck.length === 0) return player1name;
    if (player1deck.length > player2deck.length) return player1name;
    if (player2deck.length > player1deck.length) return player2name;
    return null;
  }
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      {gamePhase === "setup" && (
        <GameSetup
          player1name={player1name}
          player2name={player2name}
          handleplayer1NameChange={handleplayer1NameChange}
          handleplayer2NameChange={handleplayer2NameChange}
          handleStartGame={handleStartGame}
          handleResetGame={handleResetGame}
        />
      )}

      {gamePhase === "main" && (
        <MainGame
          player1name={player1name}
          player2name={player2name}
          player1score={player1score}
          player2score={player2score}
          player1deck={player1deck}
          player2deck={player2deck}
          deck={deck}
          handlePlayRound={handlePlayRound}
          handleEndGame={handleEndGame}
        />
      )}

      {gamePhase === "end" && (
        <GameOver
          player1name={player1name}
          player2name={player2name}
          player1score={player1score}
          player2score={player2score}
          handleRestart={handleRestart}
          getWinner={getWinner}
        />
      )}

      <Info></Info>
    </PageLayout>
  );
};

export default WarGameWrapper;
