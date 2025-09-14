import React from "react";
import {
  Box, Button, Card, CardContent, Chip, Container, Grid, Stack,
  Typography, Slider, IconButton, Tooltip
} from "@mui/material";
import PageLayout from "../../../components/PageLayout";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  CardT, Suit, dealNewHand, legalCards, playCardOnTrick, trickIsComplete,
  winnerOfTrick, formatCard, aiBid, aiChooseCard, sortHand, teamName,
} from "./spadesLogic"

type ProjectProps = { mode: "light" | "dark"; toggleMode: () => void };

type Stage = "bidding" | "playing" | "handEnd";

type Trick = {
  leader: number;                 // player index 0..3
  cards: (CardT | null)[];        // length 4; position by player index turn order
  ledSuit?: Suit;
};

type HandState = {
  hands: CardT[][];
  bids: number[];                 // 4 players
  tricksWon: number[];            // 4 players
  spadesBroken: boolean;
  stage: Stage;
  turn: number;                   // 0..3 (who acts next)
  trick: Trick;
  trickNumber: number;            // 0..12
};

const suitColor = (s: Suit) => (s === "H" || s === "D" ? "#e53935" : "#222");

const CardButton: React.FC<{
  c: CardT;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ c, disabled, onClick }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    variant="outlined"
    size="small"
    sx={{
      fontFamily: "ui-monospace, Menlo, monospace",
      minWidth: 48,
      px: 1,
      color: suitColor(c.suit),
      borderColor: suitColor(c.suit),
      bgcolor: disabled ? "action.disabledBackground" : "background.paper",
    }}
  >
    {formatCard(c)}
  </Button>
);

const Spades: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  const [state, setState] = React.useState<HandState>(() => {
    const hands = dealNewHand();
    hands.forEach(sortHand);
    return {
      hands,
      bids: [0, 0, 0, 0],
      tricksWon: [0, 0, 0, 0],
      spadesBroken: false,
      stage: "bidding",
      turn: 0, // South (you) starts bidding; leader set after first trick resolved
      trick: { leader: 0, cards: [null, null, null, null] },
      trickNumber: 0,
    };
  });

  const [yourBid, setYourBid] = React.useState(4);

  // Start hand after all bids chosen
  const confirmBids = () => {
    const aiBids = [0, 0, 0];
    aiBids[0] = aiBid(state.hands[1]); // West
    aiBids[1] = aiBid(state.hands[2]); // North
    aiBids[2] = aiBid(state.hands[3]); // East
    setState((s) => ({
      ...s,
      bids: [yourBid, aiBids[0], aiBids[1], aiBids[2]],
      stage: "playing",
      // Leader of first trick: traditionally player with 2 of clubs. Simpler: South starts.
      turn: 0,
      trick: { leader: 0, cards: [null, null, null, null] },
    }));
  };

  // Auto-play AI turns until it is your turn or trick/hand ends
  React.useEffect(() => {
    if (state.stage !== "playing") return;
    if (state.turn === 0) return; // your move
    const t = setTimeout(() => {
      setState((s) => {
        if (s.stage !== "playing" || s.turn === 0) return s;
        const p = s.turn;
        const hand = s.hands[p];
        const legals = legalCards(hand, s.trick, s.spadesBroken);
        const play = aiChooseCard(hand, legals, s.trick, s.spadesBroken);
        const { trick, spadesBroken } = playCardOnTrick(s.trick, play, p, s.spadesBroken);
        // remove from hand
        const newHands = s.hands.map((h, i) => (i === p ? h.filter((c) => c.id !== play.id) : h));
        let nextTurn = (p + 1) % 4;
        let nextState: HandState = { ...s, hands: newHands, trick, spadesBroken, turn: nextTurn };

        // Resolve trick if complete
        if (trickIsComplete(trick)) {
          const winIdx = winnerOfTrick(trick);
          const tricksWon = [...nextState.tricksWon];
          tricksWon[winIdx] += 1;
          const trickNumber = nextState.trickNumber + 1;
          const done = trickNumber >= 13;

          nextState = {
            ...nextState,
            tricksWon,
            trickNumber,
            trick: { leader: winIdx, cards: [null, null, null, null] },
            turn: winIdx,
            stage: done ? "handEnd" : "playing",
          };
        }

        return nextState;
      });
    }, 350);
    return () => clearTimeout(t);
  }, [state.stage, state.turn, state.trick, state.spadesBroken, state.trickNumber]);

  const onPlayYourCard = (c: CardT) => {
    if (state.stage !== "playing" || state.turn !== 0) return;
    const legals = legalCards(state.hands[0], state.trick, state.spadesBroken);
    if (!legals.some((x) => x.id === c.id)) return;

    setState((s) => {
      const { trick, spadesBroken } = playCardOnTrick(s.trick, c, 0, s.spadesBroken);
      const newHands = s.hands.map((h, i) => (i === 0 ? h.filter((x) => x.id !== c.id) : h));
      let nextTurn = 1;

      let nextState: HandState = { ...s, hands: newHands, trick, spadesBroken, turn: nextTurn };

      // If trick completes right away (you’re last to play)
      if (trickIsComplete(trick)) {
        const winIdx = winnerOfTrick(trick);
        const tricksWon = [...nextState.tricksWon];
        tricksWon[winIdx] += 1;
        const trickNumber = nextState.trickNumber + 1;
        const done = trickNumber >= 13;
        nextState = {
          ...nextState,
          tricksWon,
          trickNumber,
          trick: { leader: winIdx, cards: [null, null, null, null] },
          turn: winIdx,
          stage: done ? "handEnd" : "playing",
        };
      }

      return nextState;
    });
  };

  const startNewHand = () => {
    const hands = dealNewHand();
    hands.forEach(sortHand);
    setState({
      hands,
      bids: [0, 0, 0, 0],
      tricksWon: [0, 0, 0, 0],
      spadesBroken: false,
      stage: "bidding",
      turn: 0,
      trick: { leader: 0, cards: [null, null, null, null] },
      trickNumber: 0,
    });
    setYourBid(4);
  };

  const yourHand = state.hands[0];
  const yourLegals = state.stage === "playing" && state.turn === 0
    ? legalCards(yourHand, state.trick, state.spadesBroken)
    : [];

  const teamSouthNorth = state.tricksWon[0] + state.tricksWon[2];
  const teamWestEast = state.tricksWon[1] + state.tricksWon[3];
  const bidSN = state.bids[0] + state.bids[2];
  const bidWE = state.bids[1] + state.bids[3];

  const scoreLine = (made: number, bid: number) =>
    made >= bid ? `${10 * bid} + ${made - bid} bags` : `-${10 * bid}`;

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, flexWrap: "wrap" }}>
          <Typography variant="h4" sx={{ mr: 1 }}>Spades (single hand)</Typography>
          <Tooltip title="New hand">
            <IconButton onClick={startNewHand}><RefreshIcon /></IconButton>
          </Tooltip>
          <Chip label={`Trick ${Math.min(13, state.trickNumber + 1)} / 13`} />
          <Chip label={`Spades ${state.spadesBroken ? "Broken" : "Not Broken"}`} />
        </Stack>

        {/* Table layout: show other players’ counts/bids/tricks */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {["You (South)", "West (AI)", "North (AI)", "East (AI)"].map((name, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2">{name}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                    <Chip size="small" label={`Bid ${state.bids[i]}`} />
                    <Chip size="small" label={`Won ${state.tricksWon[i]}`} />
                    {state.turn === i && <Chip size="small" color="primary" label="Turn" />}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {state.stage === "bidding" && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Your Bid</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Choose how many tricks you expect to take (0–13).
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Slider
                  min={0}
                  max={13}
                  step={1}
                  value={yourBid}
                  onChange={(_, v) => setYourBid(v as number)}
                  sx={{ maxWidth: 300 }}
                />
                <Chip label={yourBid} />
                <Button variant="contained" onClick={confirmBids}>Lock Bids</Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Current trick display */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Current Trick</Typography>
            <Grid container spacing={1}>
              {["South (You)", "West (AI)", "North (AI)", "East (AI)"].map((label, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  <Box sx={{ mt: 1, minHeight: 40 }}>
                    {state.trick.cards[i] ? (
                      <CardButton c={state.trick.cards[i]!} disabled />
                    ) : (
                      <Chip size="small" label="—" />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Your hand */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Your Hand</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {yourHand.map((c) => {
                const canPlay = yourLegals.some((l) => l.id === c.id);
                return (
                  <CardButton
                    key={c.id}
                    c={c}
                    disabled={state.stage !== "playing" || state.turn !== 0 || !canPlay}
                    onClick={() => onPlayYourCard(c)}
                  />
                );
              })}
            </Stack>
          </CardContent>
        </Card>

        {/* Hand end summary */}
        {state.stage === "handEnd" && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>Hand Result</Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                <Chip color="primary" label={`${teamName(0)} made ${teamSouthNorth} (bid ${bidSN}) → ${scoreLine(teamSouthNorth, bidSN)}`} />
                <Chip color="warning" label={`${teamName(1)} made ${teamWestEast} (bid ${bidWE}) → ${scoreLine(teamWestEast, bidWE)}`} />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button variant="contained" onClick={startNewHand}>Play Again</Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </PageLayout>
  );
};

export default Spades;