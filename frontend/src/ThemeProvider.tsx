import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

type Props = {
  children: React.ReactNode;
};

const AppThemeProvider: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Optional: resets and normalizes CSS */}
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;