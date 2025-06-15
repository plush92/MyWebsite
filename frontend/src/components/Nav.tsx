import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>

          <Button color="inherit" component={RouterLink} to="/projects">
            Projects
          </Button>

          <Button color="inherit" component={RouterLink} to="/contact">
            Contact
          </Button>

          <Button color="inherit" component={RouterLink} to="/blog">
            Blog
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;