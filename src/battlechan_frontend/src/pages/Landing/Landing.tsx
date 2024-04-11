import React, { useState, useEffect } from "react";

import FAQs from "../../components/LandingPage/FAQs/FAQs";
import About from "../../components/LandingPage/About/About";
import Navbar from "../../components/LandingPage/Navbar/Navbar";
import Footer from "../../components/LandingPage/Footer/Footer";
import HowItWorks from "../../components/LandingPage/HowItWorks/HowItWorks";
import TrendingPost from "../../components/LandingPage/TrendingPosts/TrendingPost";
import HeroSection from "../../components/LandingPage/HeroSection/HeroSection";
import AttractiveCompo from "../../components/LandingPage/AttractiveCompo/AttractiveCompo";
import WhyBattlechan from "../../components/LandingPage/WhyBattlechan/WhyBattlechan";
import { useConnect } from "@connect2ic/react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowUp } from 'react-icons/hi';
import UserApiHanlder from "../../API_Handlers/user";

type Theme = {
  handleThemeSwitch: any;
};

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
};

function Landing(props: Theme) {
  let { isConnected, principal, isIdle, isInitializing } = useConnect();
  const [allow, setAllow] = useState<null | boolean>(null);
  const navigate = useNavigate();
  const { getProfileData, votesOfUser } = UserApiHanlder();
  const [principal_id, setPrincipal_id] = useState("");
  const principal_idRef = React.useRef(principal_id);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const isUserAuthenticatedRef = React.useRef(isUserAuthenticated);

  useEffect(() => {
    isUserAuthenticatedRef.current = isUserAuthenticated;
    principal_idRef.current = principal_id;
  }, [isUserAuthenticated, principal_id]);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isConnected && principal) {
        setIsUserAuthenticated(true);
        setPrincipal_id(principal);
      }
    };

    checkAuthentication();
  }, [isConnected, principal]);

  console.log(isUserAuthenticatedRef.current)
  console.log(principal_idRef.current)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = (await getProfileData()) as ProfileData;
  //     if (response && response.status == false) {
  //       if (principal) {
  //         navigate("/dashboard/settingProfile");
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (isInitializing == false) {
      setAllow(principal ? true : false);
    }
    // console.log("intitilizing is ", isInitializing);
  }, [principal, isInitializing]);

  // console.log("allow is ", allow);
  // console.log("principal is ", principal);

  React.useEffect(() => {
    if (principal) {
      // console.log("Principalm eff of aepr :", principal);
      // navigate("/dashboard/settingProfile");
    }
  }, [principal]);

  const handleThemeSwitch = props.handleThemeSwitch;
  const className = "LandingPage";

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <main
      className={
        className +
        ` w-full h-full text-dark dark:text-light bg-light dark:bg-dark`
      }
    >
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 ${isVisible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500 ease-in-out bg-blue-500 hover:bg-blue-600 text-light dark:text-dark bg-dark dark:bg-light font-bold py-2 px-4 rounded-full shadow-lg z-10`}
      >
        <HiOutlineArrowUp className="text-xl" />
      </button>

      <Navbar handleThemeSwitch={handleThemeSwitch} />

      <HeroSection />

      <About />

      <HowItWorks />

      <TrendingPost />

      <WhyBattlechan />

      <AttractiveCompo />

      <FAQs />

      <Footer />
    </main>
  );
}

export default Landing;
