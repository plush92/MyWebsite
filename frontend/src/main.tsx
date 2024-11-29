import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Importing App from App.tsx

// Ensure rootElement is correctly typed, as it could be null
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create the root and render the app
const root = ReactDOM.createRoot(rootElement);

// Render the app within React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


