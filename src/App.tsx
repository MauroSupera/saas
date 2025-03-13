import { Routes, Route, useRoutes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import Login from "./pages/login";
import Register from "./pages/register";
import WidgetDemoPage from "./pages/widget-demo";
import { ThemeProvider } from "./components/theme/theme-provider";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/widget-demo" element={<WidgetDemoPage />} />

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
