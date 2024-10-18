import Board from "../components/TicTacToe/Board";

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <p>Here are the projects I&apos;m working on...</p>
      
      <div>
        <h2>Tic-Tac-Toe Game</h2>
        {/* Render the TicTacToe Board */}
        <Board />
      </div>
    </div>
  );
}


export default Projects;