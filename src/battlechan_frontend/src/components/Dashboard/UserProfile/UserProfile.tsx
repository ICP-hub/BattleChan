import React from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import bg from "../../../images/dashboard_bg.png";
import defaultImg from "../../../images/User.png";
import UserProfileHeader from "./UserProfileHeader";
import ProfileTabs from "./ProfileTabs";
import PostGrid from "./PostGrid";

type Theme = {
  handleThemeSwitch: Function;
};

const UserProfile = (props: Theme) => {
  const className = "UserProfile";
  return (
    <React.Fragment>
      <div
        className={
          className +
          " " +
          `min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-[center_top_3rem] bg-contain bg-no-repeat`
        }
      >
        <Navbar handleThemeSwitch={props.handleThemeSwitch} />
        <NavButtons />
        {/* <Navbar darkColor={darkColor} lightColor={lightColor} />
      <NavButtons darkColor={darkColor} lightColor={lightColor} /> */}

        <div className="container py-12 mx-auto px-4 tablet:px-12">
          <div className="mb-12">
            <UserProfileHeader />
          </div>

          <div className="container border border-green rounded-2xl tablet:px-12">
            <ProfileTabs />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
