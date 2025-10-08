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
  player1deck: Card[]; //each deck will now be an instance of the Card object (python dictionary)
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
  getWinner: () => string | null;
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
      <Typography>Winner: {getWinner() || "Tie"}</Typography>

      <Button variant="contained" onClick={handleRestart}>
        Restart Game
      </Button>
    </Box>
  );
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
    </PageLayout>
  );
};

export default WarGameWrapper;
