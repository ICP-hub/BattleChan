import React from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPosts from "../../components/Dashboard/RecentPosts/RecentPosts";

function Dashboard() {
  const className: string = "HomePage";
  const [dark, setDark] = React.useState(true);
  const [light, setLight] = React.useState(true);
  const darkColor: string = dark ? "dark" : "light";
  const lightColor: string = !dark ? "dark" : "light";

  function handleThemeSwitch() {
    setDark(!dark);
    setLight(!light);
  }

  return (
    <div
      className={
        className + ` ${darkColor == "dark" ? "bg-dark" : "bg-[#ECECEC]"}`
      }
    >
      <Navbar darkColor={darkColor} lightColor={lightColor} />
      <Body darkColor={darkColor} lightColor={lightColor} />
      <RecentPosts
        darkColor={darkColor}
        lightColor={lightColor}
        handleThemeSwitch={handleThemeSwitch}
      />
    </div>
  );
}

export default Dashboard;
