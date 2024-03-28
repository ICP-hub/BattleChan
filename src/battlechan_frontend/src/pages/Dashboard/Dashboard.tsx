import React from "react";

// import { useConnect } from "@connect2ic/react";
// import { useNavigate } from "react-router-dom";

import { useConnect } from "@connect2ic/react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPosts from "../../components/Dashboard/RecentPosts/RecentPosts";


type Theme = {
  darkColor: string;
  lightColor: string;
  handleThemeSwitch: Function;
};

function Dashboard(props: Theme) {
  const className: string = "HomePage";
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;

const {
   principal,
  isConnected,
  connect ,
  disconnect,
  status,
  isInitializing,
  isIdle,
  isConnecting,
  isDisconnecting,
  activeProvider,} = useConnect()


  return (
    <div
      className={
        className + ` ${darkColor == "dark" ? "bg-dark" : "bg-[#ECECEC]"}`
      }
    >
      <Navbar
        darkColor={darkColor}
        lightColor={lightColor}
        handleThemeSwitch={props.handleThemeSwitch}
      />
      <Body darkColor={darkColor} lightColor={lightColor} />
      <RecentPosts darkColor={darkColor} lightColor={lightColor} />
    </div>
  );
}

export default Dashboard;
