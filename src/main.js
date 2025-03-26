"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
require("./index.css");
// Check for dark mode preference
const darkModePreference = localStorage.getItem('darkMode') === 'true' ||
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
if (darkModePreference) {
    document.documentElement.classList.add('dark');
}
(0, client_1.createRoot)(document.getElementById("root")).render(<App_1.default />);
