import React from "react";
import {
  Box, Button, Card, CardContent, Chip, Container, Divider, Grid,
  List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography
} from "@mui/material";
import PageLayout from "../../../components/PageLayout";

type ProjectProps = { mode: "light" | "dark"; toggleMode: () => void };
type Role = "agent" | "spy";
type Stage = "setup" | "reveal" | "teamSelect" | "teamVote" | "missionVote" | "roundResult" | "gameOver";

type Player = { id: number; name: string; role: Role };

const spyCountByPlayers: Record<number, number> = {
  5: 2, 6: 2, 7: 3, 8: 3, 9: 3, 10: 4
};

// Team sizes for rounds 1..5 by player count
const teamSizes: Record<number, number[]> = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5],
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const AgentsVsSpies: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  const [stage, setStage] = React.useState<Stage>("setup");
  const [playerCount, setPlayerCount] = React.useState(5);
  const [names, setNames] = React.useState<string[]>(["P1","P2","P3","P4","P5"]);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [leaderIdx, setLeaderIdx] = React.useState(0);
  const [roundIdx, setRoundIdx] = React.useState(0); // 0..4
  const [rejectedInRow, setRejectedInRow] = React.useState(0);
  const [score, setScore] = React.useState({ agents: 0, spies: 0 });

  const [selectedTeam, setSelectedTeam] = React.useState<number[]>([]);
  const [teamVotes, setTeamVotes] = React.useState<Record<number, boolean>>({});
  const [missionVotes, setMissionVotes] = React.useState<number[]>([]); // count of fails collected

  const currentTeamSize = teamSizes[playerCount]?.[roundIdx] ?? 2;
  const needsTwoFails = playerCount >= 7 && roundIdx === 3; // mission 4 rule

  const resetAll = () => {
    setStage("setup");
    setPlayers([]);
    setLeaderIdx(0);
    setRoundIdx(0);
    setRejectedInRow(0);
    setScore({ agents: 0, spies: 0 });
    setSelectedTeam([]);
    setTeamVotes({});
    setMissionVotes([]);
  };

  const startGame = () => {
    const spies = spyCountByPlayers[playerCount];
    const roles: Role[] = shuffle([
      ...Array(spies).fill("spy" as Role),
      ...Array(playerCount - spies).fill("agent" as Role),
    ]);
    const roster: Player[] = roles.map((r, i) => ({ id: i, name: names[i] || `P${i+1}`, role: r }));
    setPlayers(roster);
    setLeaderIdx(0);
    setRoundIdx(0);
    setRejectedInRow(0);
    setScore({ agents: 0, spies: 0 });
    setSelectedTeam([]);
    setTeamVotes({});
    setMissionVotes([]);
    setStage("reveal");
  };

  const nextLeader = (curr: number) => (curr + 1) % playerCount;

  // UI helpers
  const toggleTeamMember = (id: number) => {
    setSelectedTeam((t) =>
      t.includes(id) ? t.filter(x => x !== id) : (t.length < currentTeamSize ? [...t, id] : t)
    );
  };

  const everyoneVotedTeam = Object.keys(teamVotes).length === playerCount;
  const teamApproved = () => {
    const approvals = Object.values(teamVotes).filter(Boolean).length;
    return approvals > playerCount / 2;
  };

  const handleTeamVoteFor = (pid: number, approve: boolean) => {
    setTeamVotes(v => ({ ...v, [pid]: approve }));
  };

  const handleMissionVote = (isFail: boolean) => {
    setMissionVotes(v => [...v, isFail ? 1 : 0]);
  };

  const finishMissionIfReady = () => {
    if (missionVotes.length === selectedTeam.length) {
      const fails = missionVotes.reduce((a, b) => a + b, 0);
      const spiesWinRound = needsTwoFails ? fails >= 2 : fails >= 1;
      if (spiesWinRound) {
        setScore(s => ({ ...s, spies: s.spies + 1 }));
      } else {
        setScore(s => ({ ...s, agents: s.agents + 1 }));
      }
      setStage("roundResult");
    }
  };

  React.useEffect(() => {
    if (stage === "missionVote") finishMissionIfReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionVotes, stage]);

  // Render
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          <Chip label={`Round ${roundIdx + 1}/5`} />
          <Chip label={`Leader: ${players[leaderIdx]?.name ?? "-"}`} />
          <Chip label={`Score — Agents ${score.agents} : ${score.spies} Spies`} color={score.agents > score.spies ? "primary" : (score.spies > score.agents ? "warning" : "default")} />
          {playerCount >= 7 && roundIdx === 3 && <Chip label="This mission needs 2 fails" color="warning" />}
        </Stack>

        {stage === "setup" && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>Setup</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: "center" }}>
                <TextField
                  type="number"
                  label="Players"
                  inputProps={{ min: 5, max: 10 }}
                  value={playerCount}
                  onChange={(e) => {
                    const v = Math.max(5, Math.min(10, Number(e.target.value || 5)));
                    setPlayerCount(v);
                    setNames((prev) => {
                      const arr = [...prev];
                      while (arr.length < v) arr.push(`P${arr.length+1}`);
                      return arr.slice(0, v);
                    });
                  }}
                  sx={{ width: 120 }}
                />
                <Typography color="text.secondary">Spies: {spyCountByPlayers[playerCount] ?? "-"}</Typography>
              </Stack>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                {Array.from({ length: playerCount }).map((_, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <TextField
                      fullWidth
                      label={`Player ${i + 1} name`}
                      value={names[i] ?? ""}
                      onChange={(e) => {
                        const copy = [...names];
                        copy[i] = e.target.value;
                        setNames(copy);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button variant="contained" onClick={startGame}>Start</Button>
            </CardContent>
          </Card>
        )}

        {stage === "reveal" && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>Role Reveal (hotseat)</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Pass the device. Each player taps their name to reveal their role privately.
              </Typography>
              <List>
                {players.map(p => (
                  <ListItem key={p.id} disablePadding>
                    <ListItemButton onClick={() => alert(`${p.name}: You are a ${p.role.toUpperCase()}. ${p.role==="spy" ? "Spies know each other in a real game." : ""}`)}>
                      <ListItemText primary={p.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" onClick={() => setStage("teamSelect")}>
                Continue to Mission {roundIdx + 1}
              </Button>
            </CardContent>
          </Card>
        )}

        {stage === "teamSelect" && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Mission {roundIdx + 1}: Leader {players[leaderIdx]?.name} select {currentTeamSize} players
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Tap to toggle selection. Team size limit enforced.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                {selectedTeam.map(id => <Chip key={id} label={players[id]?.name} />)}
              </Stack>
              <Grid container spacing={1}>
                {players.map(p => (
                  <Grid item xs={6} sm={4} key={p.id}>
                    <Button
                      fullWidth
                      variant={selectedTeam.includes(p.id) ? "contained" : "outlined"}
                      onClick={() => toggleTeamMember(p.id)}
                    >
                      {p.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  disabled={selectedTeam.length !== currentTeamSize}
                  onClick={() => { setTeamVotes({}); setStage("teamVote"); }}
                >
                  Propose Team
                </Button>
                <Button variant="text" onClick={() => { setSelectedTeam([]); }}>
                  Clear
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {stage === "teamVote" && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>Team Approval Vote</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Pass the device. Each player votes Approve or Reject.
              </Typography>
              <List>
                {players.map(p => (
                  <ListItem key={p.id}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button size="small" onClick={() => handleTeamVoteFor(p.id, true)} disabled={p.id in teamVotes}>Approve</Button>
                        <Button size="small" color="warning" onClick={() => handleTeamVoteFor(p.id, false)} disabled={p.id in teamVotes}>Reject</Button>
                      </Stack>
                    }>
                    <ListItemText
                      primary={p.name}
                      secondary={p.id in teamVotes ? (teamVotes[p.id] ? "Approved" : "Rejected") : "Waiting…"}
                    />
                  </ListItem>
                ))}
              </List>
              {everyoneVotedTeam && (
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography sx={{ mb: 1 }}>
                    Result: {teamApproved() ? "Approved — Proceed to mission" : "Rejected — Next leader"}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (teamApproved()) {
                          setMissionVotes([]);
                          setStage("missionVote");
                        } else {
                          const next = nextLeader(leaderIdx);
                          const rej = rejectedInRow + 1;
                          if (rej >= 5) {
                            // Auto win for spies after 5 rejections
                            setScore(s => ({ ...s, spies: s.spies + 1 }));
                            setStage("roundResult");
                          } else {
                            setLeaderIdx(next);
                            setRejectedInRow(rej);
                            setTeamVotes({});
                            setSelectedTeam([]);
                            setStage("teamSelect");
                          }
                        }
                      }}
                    >
                      Continue
                    </Button>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {stage === "missionVote" && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>Mission Vote (team members only)</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Pass to each team member privately. Agents may only choose Success; Spies may choose Success or Fail.
              </Typography>
              <List>
                {selectedTeam.map(id => {
                  const p = players[id];
                  const voted = missionVotes.length > selectedTeam.indexOf(id);
                  return (
                    <ListItem key={id}
                      secondaryAction={
                        !voted && (
                          <Stack direction="row" spacing={1}>
                            <Button size="small" onClick={() => handleMissionVote(false)}>Success</Button>
                            <Button size="small" color="warning" onClick={() => handleMissionVote(true)}>Fail</Button>
                          </Stack>
                        )
                      }>
                      <ListItemText
                        primary={p.name}
                        secondary={voted ? "Voted" : "Awaiting vote"}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Typography variant="body2" color="text.secondary">
                Votes are secret. The result reveals only the number of fails.
              </Typography>
            </CardContent>
          </Card>
        )}

        {stage === "roundResult" && (
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>Mission Result</Typography>
              <Typography sx={{ mb: 2 }}>
                Fails: {missionVotes.reduce((a,b)=>a+b,0)} {needsTwoFails ? "(2 fails needed to sabotage)" : ""}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={`Agents ${score.agents}`} color="primary" />
                <Chip label={`Spies ${score.spies}`} color="warning" />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={() => {
                  if (score.agents >= 3 || score.spies >= 3 || roundIdx === 4) {
                    setStage("gameOver");
                  } else {
                    setRoundIdx(r => r + 1);
                    setLeaderIdx(l => nextLeader(l));
                    setRejectedInRow(0);
                    setSelectedTeam([]);
                    setTeamVotes({});
                    setMissionVotes([]);
                    setStage("teamSelect");
                  }
                }}>
                  {score.agents >= 3 || score.spies >= 3 || roundIdx === 4 ? "See Winner" : "Next Mission"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {stage === "gameOver" && (
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {score.agents > score.spies ? "Agents Win" : (score.spies > score.agents ? "Spies Win" : "Game Over")}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Roles (for debrief):
              </Typography>
              <List>
                {players.map(p => (
                  <ListItem key={p.id}><ListItemText primary={`${p.name} — ${p.role.toUpperCase()}`} /></ListItem>
                ))}
              </List>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={resetAll}>Play Again</Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </PageLayout>
  );
};

export default AgentsVsSpies;