import React from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import bg from "../../../images/dashboard_bg.png";
import defaultImg from "../../../images/User.png";
import UserProfileHeader from "./UserProfileHeader";
import ProfileTabs from "./ProfileTabs";
import PostGrid from "./PostGrid";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const UserProfile = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;

  return (
    <> 
      <div className={`min-h-lvh bg-[#ECECEC] dark:bg-dark`}>
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
    </>
  );
};

export default UserProfile;
