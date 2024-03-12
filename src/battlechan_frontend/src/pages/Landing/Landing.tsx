import React from "react";

import { Link } from "react-router-dom";
import LandingNavbar from "../../components/LandingPage/LandingNavbar/LandingNavbar";
import LandingHero from "../../components/LandingPage/LandingHero/LandingHero";
import LandingAbout from "../../components/LandingPage/LandingAbout/LandingAbout";

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
      <LandingNavbar />
      <LandingHero />
      <LandingAbout />

      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <button className="bg-dark text-light rounded-md p-3 m-3">
          Go to Dashboard
        </button>
      </Link>
    </main>
  );
}

export default Landing;
