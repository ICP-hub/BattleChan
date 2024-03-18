import React, { useEffect } from "react";

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

type Theme = {
  darkColor: string;
  lightColor: string;
  handleThemeSwitch: any;
};

function Landing(props: Theme) {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const handleThemeSwitch = props.handleThemeSwitch;
  const className = "LandingPage";

  return (
    <main
      className={
        className + ` w-full h-full bg-${darkColor} text-${lightColor}`
      }
    >
      <Navbar
        darkColor={darkColor}
        lightColor={lightColor}
        handleThemeSwitch={handleThemeSwitch}
      />
      <HeroSection darkColor={darkColor} lightColor={lightColor} />

      <About />
      <HowItWorks />

      <TrendingPost darkColor={darkColor} lightColor={lightColor} />
      <WhyBattlechan darkColor={darkColor} lightColor={lightColor} />
      <AttractiveCompo darkColor={darkColor} lightColor={lightColor} />
      <FAQs darkColor={darkColor} lightColor={lightColor} />

      <Footer />

      <Link
        to="/dashboard"
        className={`p-4 bg-dark text-light flex justify-center`}
      >
        Link to DASHBOARD
      </Link>
    </main>
  );
}

export default Landing;
