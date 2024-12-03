import React from "react";

// Import Router components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Sidebar from "./Sidebar";
import Board from "./components/tictactoe/Board";
import Weather from "./components/weather/Weather";

// Import Pages
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import EconDashboard from "./components/EconDashboard/EconDashboard";
import CryptoDashboard from "./components/CryptoDashboard/CryptoDashboard";
import LegislationDashboard from "./components/LegislationDashboard/legislationdashboard";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="app-container">
          <Header />
          <Nav />
          <main className="content">
            <Routes>
              {/* Global Portfolio Pages */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tic-tac-toe" element={<Board />} />
              <Route path="/weather" element={<Weather />} />

              {/* Project Pages with Sidebar */}
              <Route
                path="/econ"
                element={
                  <div className="dashboard-layout">
                    <Sidebar />
                    <EconDashboard />
                  </div>
                }
              />
              <Route
                path="/crypto"
                element={
                  <div className="dashboard-layout">
                    <Sidebar />
                    <CryptoDashboard />
                  </div>
                }
              />
              <Route
                path="/legislation"
                element={
                  <div className="dashboard-layout">
                    <Sidebar />
                    <LegislationDashboard />
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
