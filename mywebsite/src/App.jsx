import React from "react";

// Import Router components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Nav from "./components/Nav";

// Import Pages
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div>
          <Header />
          <Nav />
          <Note />
          <Footer />
        </div>
        {/* React Router v6 Routes */}
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
