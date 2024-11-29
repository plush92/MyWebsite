import { Link } from 'react-router-dom';

// Define a type for the project objects
interface Project {
  name: string; // The name of the project
  path: string; // The route path associated with the project
}

// Define the functional component with React.FC
const Projects: React.FC = () => {
  // Define the project data with explicit typing
  const projects: Project[] = [
    { name: 'Tic-Tac-Toe Game', path: '/tic-tac-toe' },
    { name: 'Weather', path: '/weather' },
    { name: 'Econ Dashboard', path: '/econ' },
    { name: 'Crypto Dashboard', path: '/crypto' },
    { name: 'Legislation Dashboard', path: '/legislation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <p className="text-lg mb-10 max-w-lg text-center">
        Here are the projects I&apos;m working on. Click on any to explore more!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {projects.map((project, index) => (
          <Link 
            key={index} 
            to={project.path}
            className="bg-white text-black rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 hover:rotate-1 p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-semibold">{project.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
