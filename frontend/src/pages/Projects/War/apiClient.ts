const API_BASE = "http://localhost:8000";

export interface GameRequest {
  player1: string;
  player2: string;
}

// Start a new game
export async function startGame(req: GameRequest) {
  const res = await fetch(`${API_BASE}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error("Failed to start game");
  return res.json();
}

// Play a round
export async function playRound() {
  const res = await fetch(`${API_BASE}/play_round`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to play round");
  return res.json();
}

// Reset game
export async function resetGame(player1: string, player2: string) {
  const res = await fetch(
    `${API_BASE}/reset?player1_name=${player1}&player2_name=${player2}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("Failed to reset game");
  return res.json();
}

// Get current game state
export async function getGameState() {
  const res = await fetch(`${API_BASE}/game`);
  if (!res.ok) throw new Error("Failed to get game state");
  return res.json();
}
