import React from "react";

// import { useConnect } from "@connect2ic/react";
// import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPosts from "../../components/Dashboard/RecentPosts/RecentPosts";


type Theme = {
  handleThemeSwitch: Function;
};

function Dashboard(props: Theme) {
  const className: string = "HomePage";
  const darkColor = document.documentElement.className;

  return (
    <div
      className={
        className + ` ${darkColor == "dark" ? "bg-dark" : "bg-[#ECECEC]"}`
      }
    >
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <Body />
      <RecentPosts />
    </div>
  );
}

export default Dashboard;
