import React, { useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import CustomBox from "./components/materialui/CustomBox";
import AppThemeProvider from "./ThemeProvider";

import Footer from "./components/Footer";

import Weather from "./components/OtherProjects/weather/Weather";
import InputTracker from "./components/OtherProjects/inputtracker/InputTracker";
import MoodTracker from "./components/OtherProjects/moodtracker/MoodTracker";
import PygameRPG from "./pages/Projects/PygameRPG/PygameRPG";

import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleMode = () => setMode(p => (p === "light" ? "dark" : "light"));

  return (
    <AppThemeProvider mode={mode}>
      <CustomBox
        className="app-container"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <CustomBox component="main" className="content" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home mode={mode} toggleMode={toggleMode} />} />
            <Route path="/contact" element={<Contact mode={mode} toggleMode={toggleMode} />} />
            <Route path="/projects" element={<Projects mode={mode} toggleMode={toggleMode} />} />
            <Route path="/blog" element={<Blog mode={mode} toggleMode={toggleMode} />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/moodtracker" element={<MoodTracker mode={mode} toggleMode={toggleMode} />} />
            <Route path="/inputtracker" element={ <InputTracker mode={mode} toggleMode={toggleMode} />} />
            <Route path="/moodtracker" element={<MoodTracker mode={mode} toggleMode={toggleMode} />} />
            <Route path="/rpg" element={<PygameRPG mode={mode} toggleMode={toggleMode} />} />
            {/* <Route path="/options" element={<OptionsPlatform mode={mode} toggleMode={toggleMode} />} /> */}
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </CustomBox>
        <Footer />
      </CustomBox>
    </AppThemeProvider>
  );
}

export default App;