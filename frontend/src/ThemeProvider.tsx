import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

type ThemeContextType = {
  mode: "light" | "dark";
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
};

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

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
