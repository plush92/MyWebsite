import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

type Props = {
  children: React.ReactNode;
  mode: 'light' | 'dark';
};

const AppThemeProvider: React.FC<Props> = ({ children, mode }) => (
  <ThemeProvider theme={theme(mode)}>
    <CssBaseline /> {/* Optional: resets and normalizes CSS */}
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;