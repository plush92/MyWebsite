import React, { createContext, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
  return ctx;
};

interface AppThemeProviderProps {
  children: React.ReactNode;
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  mode,
  toggleMode,
}) => {
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;
