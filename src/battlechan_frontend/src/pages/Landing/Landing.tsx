import React from "react";

import { Link } from "react-router-dom";

import FAQs from "../../components/LandingPage/FAQs/FAQs";
import About from "../../components/LandingPage/About/About";
import Navbar from "../../components/LandingPage/Navbar/Navbar";
import Footer from "../../components/LandingPage/Footer/Footer";
import HowItWorks from "../../components/LandingPage/HowItWorks/HowItWorks";
import TrendingPost from "../../components/LandingPage/TrendingPosts/TrendingPost";
import HeroSection from "../../components/LandingPage/HeroSection/HeroSection";
import AttractiveCompo from "../../components/LandingPage/AttractiveCompo/AttractiveCompo";
import WhyBattlechan from "../../components/LandingPage/WhyBattlechan/WhyBattlechan";

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
      <Navbar darkColor={darkColor} lightColor={lightColor} />
      <HeroSection darkColor={darkColor} lightColor={lightColor} />
      
      <About />
      <HowItWorks />

      <TrendingPost darkColor={darkColor} lightColor={lightColor} />
      <WhyBattlechan darkColor={darkColor} lightColor={lightColor} />
      <AttractiveCompo darkColor={darkColor} lightColor={lightColor} />
      <FAQs darkColor={darkColor} lightColor={lightColor} />
      
      <Footer />

      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <button className="bg-dark text-light rounded-md p-3 m-3">
          Go to Dashboard
        </button>
      </Link>
    </main>
  );
}

export default Landing;
