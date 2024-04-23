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
import { HiOutlineArrowUp } from "react-icons/hi";
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
  const navigate = useNavigate();
  const { isConnected, principal } = useConnect();
  const { getProfileData } = UserApiHanlder();
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

  // console.log(isUserAuthenticatedRef.current)
  // console.log(principal_idRef.current)

  useEffect(() => {
    const fetchData = async () => {
      // console.log("username before fetching data in navbar: ", userName);
        console.log("principal before fetching data in landing: ", principal);
        console.log("isConnected before fetching data in landing: ", isConnected);
        console.log("isUserAuthenticated before fetching data in landing: ", isUserAuthenticatedRef);
        console.log("principalidRef before fetching data in landing: ", principal_idRef);
      const response = (await getProfileData()) as ProfileData;
      console.log("principal after fetching data in landing: ", principal);
        console.log("isConnected after fetching data in landing: ", isConnected);
        console.log("isUserAuthenticated after fetching data in landing: ", isUserAuthenticatedRef);
        console.log("principalidRef after fetching data in landing: ", principal_idRef);
        console.log("response after calling getProfileData", response)
      if (response && response.status == false) {
        if (isUserAuthenticatedRef.current && principal_idRef.current) {
          navigate("/dashboard/settingProfile");
        }
      }
    };

    fetchData();
  }, [isUserAuthenticatedRef, principal_idRef]);

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
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        className={`fixed bottom-6 right-6 ${isVisible ? "opacity-100" : "opacity-0"
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
