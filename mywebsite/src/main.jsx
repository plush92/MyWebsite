import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Importing App from App.jsx
import Projects from 

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

