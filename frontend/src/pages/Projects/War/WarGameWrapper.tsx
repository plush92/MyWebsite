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
  FormHelperText,
} from "@mui/material";
import { Input } from "@mui/icons-material";

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

type GameSetupProps = {
  player1name: string;
  player2name: string;
  handleplayer1NameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleplayer2NameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartGame: () => void;
};

type MainGameProps = {
  player1score: number;
  player2score: number;
  player1name: string;
  player2name: string;
  player1deck: string[];
  player2deck: string[];
  deck: string[];
  handleEndGame: () => void;
};

type GameOverProps = {
  player1score: number;
  player2score: number;
  player1name: string;
  player2name: string;
  handleRestart: () => void;
};

const GameSetup: React.FC<GameSetupProps> = ({
  player1name,
  player2name,
  handleplayer1NameChange,
  handleplayer2NameChange,
  handleStartGame,
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
      </Box>
    </Container>
  );
};

const MainGame: React.FC<MainGameProps> = ({
  player1name,
  player2name,
  player1score,
  player2score,
  player1deck,
  player2deck,
  deck,
  handleEndGame,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid size={4}>
        <Typography variant="h2">{player1name}</Typography>
        <Typography variant="h2">{player1score}</Typography>
      </Grid>
      <Grid size={4}>
        <Typography variant="h2">{player2name}</Typography>
        <Typography variant="h2">{player2score}</Typography>
      </Grid>
      <Grid>
        <Container fixed>
          {player1deck}
          {deck}
          {player2deck}
        </Container>
      </Grid>
    </Grid>
  );
};

const GameOver: React.FC<GameOverProps> = ({
  player1name,
  player2name,
  player1score,
  player2score,
  handleRestart,
}) => {
  return <Box>Temporary Box</Box>;
};

const WarGameWrapper: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  const [gamePhase, setGamePhase] = useState<"setup" | "main" | "end">("setup");
  const [player1name, setPlayer1name] = useState("Player 1");
  const [player2name, setPlayer2name] = useState("Player 2");
  const [player1score, setPlayer1score] = useState(0);
  const [player2score, setPlayer2score] = useState(0);
  const [player1deck, setPlayer1deck] = useState<string[]>([]);
  const [player2deck, setPlayer2deck] = useState<string[]>([]);
  const [deck, setDeck] = useState<string[]>([]);

  const handleplayer1NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1name(e.target.value);
  };

  const handleplayer2NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2name(e.target.value);
  };

  const handleStartGame = () => {
    setGamePhase("main");
  };

  function handleEndGame() {
    setGamePhase("end");
  }
  //set gamePhase = "finished"
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
  return (
    <>
      {gamePhase === "setup" && (
        <GameSetup
          player1name={player1name}
          player2name={player2name}
          handleplayer1NameChange={handleplayer1NameChange}
          handleplayer2NameChange={handleplayer2NameChange}
          handleStartGame={handleStartGame}
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
        />
      )}
    </>
  );
};

export default WarGameWrapper;
