import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle"; 

type NavBarProps = {
  drawerOpen?: boolean;
  drawerWidth?: number;
  mode: "light" | "dark";
  toggleMode: () => void;
};

const NavBar: React.FC<NavBarProps> = ({
  drawerOpen = false,
  drawerWidth = 240,
  mode,
  toggleMode,
}) => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        transition: (theme) =>
          theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(drawerOpen && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >

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
        <Box sx={{ flexGrow: 1 }}>
          {/* ...your nav buttons */}
        </Box>
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;