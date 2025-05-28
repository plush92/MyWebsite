import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Weather from "./components/OtherProjects/weather/Weather";

import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import EconDashboard from "./components/FinanceProjects/EconDashboard/EconDashboard";
import CryptoDashboard from "./components/FinanceProjects/CryptoDashboard/CryptoDashboard";
import LegislationDashboard from "./components/FinanceProjects/LegislationDashboard/legislationdashboard";

const drawerWidth = 280;

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Box className="app-container" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />
          <Nav />
          <Box component="main" className="content" sx={{ flex: 1 }}>
            <Routes>
              {/* Global Portfolio Pages */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/weather" element={<Weather />} />

              {/* Project Pages with Sidebar */}
              <Route
                path="/econ"
                element={
                  <Box sx={{ display: "flex" }}>
                    <Sidebar />
                    <Box sx={{ flex: 1, ml: `${drawerWidth}px` }}>
                      <EconDashboard />
                    </Box>
                  </Box>
                }
              />
              <Route
                path="/crypto"
                element={
                  <Box sx={{ display: "flex" }}>
                    <Sidebar />
                    <Box sx={{ flex: 1, ml: `${drawerWidth}px` }}>
                      <CryptoDashboard />
                    </Box>
                  </Box>
                }
              />
              <Route
                path="/legislation"
                element={
                  <Box sx={{ display: "flex" }}>
                    <Sidebar />
                    <Box sx={{ flex: 1, ml: `${drawerWidth}px` }}>
                      <LegislationDashboard />
                    </Box>
                  </Box>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </React.StrictMode>
  );
}

export default App;