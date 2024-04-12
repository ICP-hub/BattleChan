import React, { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";

import "./Connect2ic/Connect2ic.scss";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; 
import { Toaster } from "react-hot-toast";
import ClientSetup from "./ClientSetup"; 

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
    
    <Router>
      <Toaster />
      <AppRoutes handleThemeSwitch={handleThemeSwitch} />
    </Router>
    
  );
}

export default () => (
  <ClientSetup>
    <App />
  </ClientSetup>
);
