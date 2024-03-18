import React, { Suspense, lazy } from "react";
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

function App() {
  const [dark, setDark] = React.useState(true);
  const [light, setLight] = React.useState(true);
  const darkColor: string = dark ? "dark" : "light";
  const lightColor: string = !dark ? "dark" : "light";

  function handleThemeSwitch() {
    setDark(!dark);
    setLight(!light);
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
  providers: defaultProviders,
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
