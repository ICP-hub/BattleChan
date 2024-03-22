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



// -----------------
import { AuthClient } from "@dfinity/auth-client";
import { createContext, useContext,  useState } from "react";
// import { createActor } from "../../../../../declarations/IcpAccelerator_backend/index";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useDispatch } from "react-redux";


const plugWalletHandler = async () => {
  let ic : any , plug: any; 
  // console.log(window)
  // console.log(ic)
  // console.log("plug" , plug)


  if (window?.ic?.plug) {
    try {
      // Request connection to the user's Plug Wallet.
      await window.ic.plug.requestConnect();
      const isConnected = await window.ic.plug.isConnected();
      if (isConnected) {
        console.log("Plug Wallet is connected!");

        // Ensure the Plug agent is available for use.
        if (!window.ic.plug.agent) {
          await window.ic.plug.createAgent();
        }

        // Obtain the principal from the Plug agent and do something with it.
        const principal = await window.ic.plug.agent.getPrincipal();
        const principalText = principal.toText();
        console.log("Plug principal", principalText);

        // Here you could dispatch an action or update some state.
        // For example, this might be dispatching an action to Redux.
        // dispatch(walletHandler({ principalText: principalText, WalletType: "plug" }));
      }
    } catch (error) {
      console.error("Error connecting to Plug Wallet:", error);
    }
  } else {
    alert("Plug Wallet extension is not installed!");
  }
};


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

      <button className="bg-red" onClick={plugWalletHandler}>Hello shivam</button>

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
