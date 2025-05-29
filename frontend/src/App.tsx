import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import DashboardLayout from "./components/DashboardLayout";
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
    </React.StrictMode>
  );
}

export default App;