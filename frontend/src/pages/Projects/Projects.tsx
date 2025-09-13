import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import PageLayout from "../../components/PageLayout";

interface Project {
  name: string;
  path: string;
}

type ProjectProps = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const Projects: React.FC<ProjectProps> = ({mode, toggleMode}) => {
  const projects: Project[] = [
    { name: 'Pygame RPG', path: '/rpg' },
    { name: 'Options Trading Platform', path: '/options'},
    { name: 'Weather', path: '/weather' },
    { name: 'InputTracker', path: '/inputtracker' },
    { name: 'MoodTracker', path: '/moodtracker' },
    { name: 'CensusExplorer', path: '/censusexplorer' },
  ];

  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" py={10}>
      <Typography variant="h3" fontWeight="bold" mb={6}>
        Projects
      </Typography>
      <Typography variant="h6" mb={10} maxWidth={500} textAlign="center">
        Here are the projects I&apos;m working on. Click on any to explore more!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea component={Link} to={project.path}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {project.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
      </PageLayout>
  );
};

export default Projects;