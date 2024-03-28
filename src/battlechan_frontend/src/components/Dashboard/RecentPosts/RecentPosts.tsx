import React from "react";
import Posts from "./Posts";

const RecentPosts = () => {
  const className = "HomePage__RecentPosts";

  return (
    <div className={className + " " + `text-dark dark:text-light`}>
      <div className="font-[800] text-center text-[30px]">Recent Post </div>
      <Posts />
    </div>
  );
};

export default RecentPosts;
