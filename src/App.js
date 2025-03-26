"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const wouter_1 = require("wouter");
const react_query_1 = require("@tanstack/react-query");
const queryClient_1 = require("./lib/queryClient");
const toaster_1 = require("@/components/ui/toaster");
const Home_1 = __importDefault(require("@/pages/Home"));
const not_found_1 = __importDefault(require("@/pages/not-found"));
function Router() {
    const [darkMode, setDarkMode] = (0, react_1.useState)(() => {
        return localStorage.getItem('darkMode') === 'true' ||
            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode.toString());
        if (newMode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    };
    return (<wouter_1.Switch>
      <wouter_1.Route path="/">
        <Home_1.default darkMode={darkMode} toggleTheme={toggleTheme}/>
      </wouter_1.Route>
      <wouter_1.Route component={not_found_1.default}/>
    </wouter_1.Switch>);
}
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient_1.queryClient}>
      <Router />
      <toaster_1.Toaster />
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
