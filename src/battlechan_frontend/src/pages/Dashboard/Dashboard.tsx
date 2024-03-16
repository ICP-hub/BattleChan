import React from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPost from "../../components/Dashboard/RecentPosts/RecentPosts";

function Dashboard() {
  return (
    <div className="  ">
      <Navbar />
      <Body />
      <RecentPost darkColor="dark" lightColor="light" />
    </div>
  );
}

export default Dashboard;
