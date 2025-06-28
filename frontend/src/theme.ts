import { createTheme } from '@mui/material/styles';

const theme = (mode: 'light' | 'dark') =>
  createTheme({
  palette: 
  {
    mode,
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000' : '#fff',
        secondary: mode === 'light' ? '#333' : '#ccc',
      },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    body1: { fontSize: '1rem' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
          color: mode === 'dark' ? '#fff' : '#000',
        },
      },
    },
  },
});

export default theme;

