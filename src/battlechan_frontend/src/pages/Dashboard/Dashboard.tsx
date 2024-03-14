import React from "react";
import Navbar from "../../components/Dashboard/navbar/Navbar";
import Body from "../../components/Dashboard/body/Body";
import RecentPost from "../../components/Dashboard/Recent-Posts/RecentPosts";
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
