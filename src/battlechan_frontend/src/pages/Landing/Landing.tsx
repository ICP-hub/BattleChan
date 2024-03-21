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

function Landing({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const className: string = "LandingPage";
  const [dark, setDark] = React.useState(true);
  const [light, setLight] = React.useState(true);
  const darkColor: string = dark ? "dark" : "light";
  const lightColor: string = !dark ? "dark" : "light";
  

  function handleThemeSwitch() {
    setDark(!dark);
    setLight(!light);
  }

  return (
    <main
      className={
        className + ` w-full h-full bg-${darkColor} text-${lightColor}`
      }
    >
      {/* <Navbar darkColor={darkColor} lightColor={lightColor}    handleThemeSwitch={handleThemeSwitch} /> */}
      <Navbar
 darkColor="darkColorValue"
 lightColor="lightColorValue"
 handleThemeSwitch={handleThemeSwitch}
 setModalOpen={setModalOpen}
/>

      <HeroSection darkColor={darkColor} lightColor={lightColor} />

      <About />
      <HowItWorks />

      <TrendingPost darkColor={darkColor} lightColor={lightColor} />
      <WhyBattlechan darkColor={darkColor} lightColor={lightColor} />
      <AttractiveCompo darkColor={darkColor} lightColor={lightColor} />
      <FAQs darkColor={darkColor} lightColor={lightColor} />

      <Footer />
    </main>
  );
}

export default Landing;
