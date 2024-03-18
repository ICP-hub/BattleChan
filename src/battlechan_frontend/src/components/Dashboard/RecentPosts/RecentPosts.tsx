import React from "react";
import Posts from "./Posts";

type Theme = {
  darkColor: string;
  lightColor: string;
  handleThemeSwitch: any;
};

const RecentPosts = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "HomePage__RecentPosts";

  return (
    <div className={className + "bg-dark text-light"}>
      <div className="font-[800] text-center text-[30px]">Recent Post </div>
      <Posts darkColor="dark" lightColor="light" />
    </div>
  );
};

export default RecentPosts;
