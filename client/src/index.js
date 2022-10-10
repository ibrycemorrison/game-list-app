import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";

// Define the root of our HTML
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the root with proper HTML
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
