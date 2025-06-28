import React, { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AppThemeProvider from "./ThemeProvider";

//Misc components
import Footer from "./components/Footer";
import DashboardLayout from "./components/DashboardLayout";

//Projects
import Weather from "./components/OtherProjects/weather/Weather";
import EconDashboard from "./components/FinanceProjects/EconDashboard/EconDashboard";
import CryptoDashboard from "./components/FinanceProjects/CryptoDashboard/CryptoDashboard";
import LegislationDashboard from "./components/FinanceProjects/LegislationDashboard/legislationdashboard";

//Pages
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";

const drawerWidth = 280;

function App() {

  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <AppThemeProvider>
      <Router>
        <Box className="app-container" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Box component="main" className="content" sx={{ flex: 1 }}>
            <Routes>
              {/* Global Portfolio Pages */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home mode={mode} toggleMode={toggleMode}/>} />
              <Route path="/contact" element={<Contact mode={mode} toggleMode={toggleMode}/>} />
              <Route path="/projects" element={<Projects mode={mode} toggleMode={toggleMode}/>} />
              <Route path="/blog" element={<Blog mode={mode} toggleMode={toggleMode} />} />
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
    </AppThemeProvider>
  );
}

export default App;