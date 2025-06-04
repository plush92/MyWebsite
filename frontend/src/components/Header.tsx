import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  mode: "light" | "dark";
  toggleMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, toggleMode }) => {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={2}
      sx={{ backgroundColor: '#102542' }} // dark hunter green
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
        </Box>
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;