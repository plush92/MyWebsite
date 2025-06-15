import React, { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

//Misc components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Sidebar from "./components/materialui/Sidebar";
import DashboardLayout from "./components/DashboardLayout";

//Projects
import Weather from "./components/OtherProjects/weather/Weather";
import EconDashboard from "./components/FinanceProjects/EconDashboard/EconDashboard";
import CryptoDashboard from "./components/FinanceProjects/CryptoDashboard/CryptoDashboard";
import LegislationDashboard from "./components/FinanceProjects/LegislationDashboard/legislationdashboard";

//Pages
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Blog from "./pages/Blog";

const drawerWidth = 280;

function App() {
  // 1. Theme state and toggle
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box className="app-container" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header mode={mode} toggleMode={toggleMode} />
          <Nav />
          <Box component="main" className="content" sx={{ flex: 1 }}>
            <Routes>
              {/* Global Portfolio Pages */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/weather" element={<Weather />} />

              {/* Project Pages with Sidebar */}
              <Route
                path="/econ"
                element={
                  <DashboardLayout>
                    <EconDashboard />
                  </DashboardLayout>
                }
              />
              <Route
                path="/crypto"
                element={
                  <DashboardLayout>
                    <CryptoDashboard />
                  </DashboardLayout>
                }
              />
              <Route
                path="/legislation"
                element={
                  <DashboardLayout>
                    <LegislationDashboard />
                  </DashboardLayout>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;