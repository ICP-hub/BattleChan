import React from "react";
import Posts from "./Posts";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const RecentPosts = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "HomePage__RecentPosts";

  return (
    <div className={className + ` text-${lightColor}`}>
      <div className="font-[800] text-center text-[30px]">Recent Post </div>
      <Posts />
    </div>
  );
};

export default RecentPosts;
