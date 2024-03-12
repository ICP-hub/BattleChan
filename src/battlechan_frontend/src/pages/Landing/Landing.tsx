import React from "react";

import { Link } from "react-router-dom";
import Navbar from "../../components/LandingPage/Navbar/Navbar";
import HeroSection from "../../components/LandingPage/HeroSection/HeroSection";
import About from "../../components/LandingPage/About/About";
import HowItWorks from "../../components/LandingPage/HowItWorks/HowItWorks";

function Landing() {
  const theme: string = "dark";
  const className: string = "LandingPage";
  const darkColor: string = theme.includes("dark") ? "dark" : "light";
  const lightColor: string = !theme.includes("dark") ? "dark" : "light";

  return (
    <main
      className={
        className + ` w-full h-full bg-${darkColor} text-${lightColor}`
      }
    >
      <Navbar />
      <HeroSection />
      <About />
      <HowItWorks />

      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <button className="bg-dark text-light rounded-md p-3 m-3">
          Go to Dashboard
        </button>
      </Link>
    </main>
  );
}

export default Landing;
