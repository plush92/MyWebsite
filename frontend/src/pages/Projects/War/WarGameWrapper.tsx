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

//Project Props
type ProjectProps = {
  mode: "light" | "dark";
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
  player1deck: Card[]; //each deck will now be an instance of the Card object
  player2deck: Card[];
  deck: Card[];
  handleEndGame: () => void;
  handlePlayRound: () => void;
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
    <Grid container spacing={2}>
      <Grid size={4}>
        <Typography variant="h5">{player1name} Deck</Typography>
        {player1deck.map((card, i) => (
          <Typography key={i}>
            {card.rank} of {card.suit}
          </Typography>
        ))}
      </Grid>

      <Grid size={4}>
        <Typography variant="h5">{player2name} Deck</Typography>
        {player2deck.map((card, i) => (
          <Typography key={i}>
            {card.rank} of {card.suit}
          </Typography>
        ))}
      </Grid>

      <Grid size={4}>
        <Typography variant="h2">
          {player1score} - {player2score}
        </Typography>
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
    // Handle both direct response and nested state
    const gameData = data.state || data;

    setPlayer1deck(gameData.players["player 1"].deck || []);
    setPlayer2deck(gameData.players["player 2"].deck || []);
    setDeck([]); // or gameData.deck if you have a shared deck
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
        />
      )}
    </PageLayout>
  );
};

export default WarGameWrapper;
