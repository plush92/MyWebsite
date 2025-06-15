import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';

interface Project {
  name: string;
  path: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    { name: 'Weather', path: '/weather' },
    { name: 'Econ Dashboard', path: '/econ' },
    { name: 'Crypto Dashboard', path: '/crypto' },
    { name: 'Legislation Dashboard', path: '/legislation' },
  ];

  return (
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
  );
};

export default Projects;