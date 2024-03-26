import React, { Suspense, lazy, useState, useEffect } from "react";
import { PlugWallet} from "@connect2ic/core/providers";
import { InternetIdentity} from "@connect2ic/core/providers";

import "./App.css";

import { Connect2ICProvider } from "@connect2ic/react";
import "./Connect2ic/Connect2ic.scss";

import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load pages
const Landing = lazy(() => import("./pages/Landing/Landing"));
const DashboardRoutes = lazy(() => import("./pages/Routes"));

import Loader from "./components/Loader/Loader";

type Theme = "dark" | "light";

function App() {
  const [theme, setTheme] = useState<Theme>("light")
  const [dark, setDark] = React.useState(false);
  const [light, setLight] = React.useState(true);
  const darkColor: string = dark ? "dark" : "light";
  const lightColor: string = !dark ? "dark" : "light";

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTheme("dark");
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleThemeSwitch() {
    setDark(!dark);
    setLight(!light);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Landing
                  darkColor={darkColor}
                  lightColor={lightColor}
                  handleThemeSwitch={handleThemeSwitch}
                />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardRoutes
                  darkColor={darkColor}
                  lightColor={lightColor}
                />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const client = createClient({
  canisters: {},
  providers: [new PlugWallet() , new InternetIdentity()],
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
