import React, { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";

import "./Connect2ic/Connect2ic.scss";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Make sure the path is correct
import { Toaster } from "react-hot-toast";
import ClientSetup from "./ClientSetup"; // Import the ClientSetup component
import { SkeletonTheme } from "react-loading-skeleton";

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

    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Router>
        <Toaster />
        <AppRoutes handleThemeSwitch={handleThemeSwitch} />
      </Router>
    </SkeletonTheme>

    // </Provider>
  );
}

export default () => (
  <ClientSetup>
    <App />
  </ClientSetup>
);
