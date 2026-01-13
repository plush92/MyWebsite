// War Game API Types

export interface Card {
  rank: string;
  suit: string;
}

export interface Player {
  deck: Card[];
}

export interface GameState {
  players: {
    'player 1': Player;
    'player 2': Player;
  };
  scores: Record<string, number>;
}

export interface GameApiResponse {
  state: GameState;
}

export interface GameRequest {
  player1_name: string;
  player2_name: string;
}
