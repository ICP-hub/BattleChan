import React from "react";

// import { useConnect } from "@connect2ic/react";
// import { useNavigate } from "react-router-dom";

import { useConnect } from "@connect2ic/react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPosts from "../../components/Dashboard/RecentPosts/RecentPosts";

type Theme = {
  handleThemeSwitch: Function;
};

function Dashboard(props: Theme) {
  const className: string = "HomePage";

  const {
    principal,
    isConnected,
    connect,
    disconnect,
    status,
    isInitializing,
    isIdle,
    isConnecting,
    isDisconnecting,
    activeProvider,
  } = useConnect();

  return (
    <div className={className + " " + `bg-[#ECECEC] dark:bg-dark`}>
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <Body />
      <RecentPosts />
    </div>
  );
}

export default Dashboard;
