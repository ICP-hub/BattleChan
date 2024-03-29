import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import "./Connect2ic/Connect2ic.scss";

import { Connect2ICProvider } from "@connect2ic/react";
import { createClient } from "@connect2ic/core";
import { PlugWallet } from "@connect2ic/core/providers";
import { InternetIdentity } from "@connect2ic/core/providers";

// import store from "../src/redux/store/store.js";

// import * as backend from "../../../.dfx/local/canisters/backend/service.did"
import AppRoutes from "./AppRoutes";

type Theme = "dark" | "light";

function App() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleThemeSwitch() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    // <Provider store={store}>
    <Router>
      <AppRoutes handleThemeSwitch={handleThemeSwitch} />
    </Router>
    // </Provider>
  );
}

const client = createClient({
  canisters: {},
  providers: [new InternetIdentity(), new PlugWallet()],
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
