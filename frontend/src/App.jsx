import React from "react";

// Import Router components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/nav";
import Board from './components/TicTacToe/Board';
import Weather from "./components/Weather/Weather";

// Import Pages
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import EconDashboard from "./components/EconDashboard/EconDashboard";
import CryptoDashboard from "./components/CryptoDashboard/CryptoDashboard";
import legislationdashboard from "./components/legislationdashboard/legislationdashboard";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="app-container">
          <Header />
          <Nav />
          <main className="content">
            {/* React Router v6 Routes */}
            <Routes>
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tic-tac-toe" element={<Board />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/econ" element={<EconDashboard />} />
              <Route path="/crypto" element={<CryptoDashboard />} />
              <Route path="/legislation" element={<legislationdashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;