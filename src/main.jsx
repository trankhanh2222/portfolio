import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import App from "./App.jsx";

import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);