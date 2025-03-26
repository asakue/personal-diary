import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Check for dark mode preference
const darkModePreference = localStorage.getItem('darkMode') === 'true' || 
  (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (darkModePreference) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
