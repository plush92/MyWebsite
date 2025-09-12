import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

type Props = {
  children: React.ReactNode;
  mode: 'light' | 'dark';
};

const AppThemeProvider: React.FC<Props> = ({ children, mode }) => (
  <ThemeProvider theme={theme(mode)}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;