import "../../styles/Board.css";
import { useState } from 'react';

// Define prop types for the Square component
interface SquareProps {
  value: 'X' | 'O' | null; // Value of the square can either be 'X', 'O', or null
  onSquareClick: () => void; // onSquareClick is a function that doesn't return anything (void)
}

// A single square component. It takes 'value' (X or O or null) and 'onSquareClick' as props.
function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value} {/* Render the value inside the button (either 'X', 'O', or null) */}
    </button>
  );
}

// Define prop types for the Board component
interface BoardProps {
  xIsNext: boolean; // Boolean to indicate if it is X's turn
  squares: (string | null)[]; // An array of 9 values (either 'X', 'O', or null) representing the board state
  onPlay: (nextSquares: (string | null)[]) => void; // Function to update the state with the next board state
}

// Board component that handles the game logic for a 3x3 board.
function Board({ xIsNext, squares, onPlay }: BoardProps) {
  // Function to handle clicking on a square
  function handleClick(i: number) {
    // If there's a winner or the square is already filled, don't do anything
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Copy the squares array and fill the clicked square with 'X' or 'O'
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X'; // If X's turn, set square to 'X'
    } else {
      nextSquares[i] = 'O'; // Otherwise, set square to 'O'
    }

    // Update the parent component (Game) with the new squares state
    onPlay(nextSquares);
  }

  // Determine the winner or the next player's turn
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // If there's a winner, display the winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Otherwise, display the next player
  }

  // Render the board with 3 rows of 3 squares each
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Define prop types for the Game component
interface GameState {
  history: (string | null)[][]; // History of moves, an array of 9 squares
  currentMove: number; // The current move index
}

export default function Game() {
  const [history, setHistory] = useState<GameState['history']>([Array(9).fill(null)]); // History of moves
  const [currentMove, setCurrentMove] = useState<GameState['currentMove']>(0); // Tracks the current move
  const xIsNext = currentMove % 2 === 0; // Determines if it's X's or O's turn
  const currentSquares = history[currentMove]; // The current state of the board

  // Function to handle updating the game state when a square is clicked
  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Slice history to current move
    setHistory(nextHistory); // Update the history with the new board state
    setCurrentMove(nextHistory.length - 1); // Update the current move to the latest one
  }

  // Function to jump to a specific move in history
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove); // Set the current move to the selected move
  }

  // Create a list of buttons that let the player go back to previous moves
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move; // If not the first move, show move number
    } else {
      description = 'Go to game start'; // For the first move, show 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the game board and move history
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol> {/* Display the list of past moves */}
      </div>
    </div>
  );
}

// Helper function to calculate the winner of the game
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // If a line has the same value, return the winner (X or O)
    }
  }
  return null; // If no winner, return null
}
