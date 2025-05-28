import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={2}
      sx={{ backgroundColor: '#1b3a1b' }} // dark hunter green
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="div" fontWeight="bold" color="white">
            Hey :-)
          </Typography>
          <Typography variant="subtitle1" component="div" color="white">
            {/* You can add a subtitle here if you want */}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;