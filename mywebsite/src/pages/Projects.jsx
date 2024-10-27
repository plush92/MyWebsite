import { Link } from 'react-router-dom';

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <p>Here are the projects I&apos;m working on...</p>
      
      <div>
        <h2>Tic-Tac-Toe Game</h2>
        <Link to="/tic-tac-toe">Play Tic Tac Toe</Link>
        <h2>Weather</h2>
        <Link to="/weather">Weather</Link>
      </div>
    </div>
  );
}

export default Projects;