import React, { useEffect, useState } from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";

import UserProfileHeader from "./UserProfileHeader";
import ProfileTabs from "./ProfileTabs";
import UserApiHanlder from "../../API_Handlers/user";

type Theme = {
  handleThemeSwitch: Function;
};

interface UserInfo {
  createdAt: string;
  createdComments: string[];
  downvotedTo: any[];
  likedComments: any[];
  postIds: string[];
  profileImg: Int8Array;
  replyIds: any[];
  updatedAt: string[];
  upvotedTo: any[];
  userId: string;
  userName: string;
}

const UserProfile = (props: Theme) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const { getUserInfo } = UserApiHanlder();
  const className = "dashboard__UserProfile";

  useEffect(() => {
    const fetchData = async () => {
      
      const data = await getUserInfo();
      
      if (data && data.length > 0) {
        setUserInfo(data);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div
        className={
          className +
          " " +
          `min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-[center_top_3rem] bg-contain bg-no-repeat`
        }
      >

        <div className="hidden tablet:block">
          <NavButtons />
        </div>

        <div className="container pb-12 mx-auto px-4 pt-8 tablet:px-12">
          <div className="mb-12">
            <UserProfileHeader userInfo={userInfo} />
          </div>

          <div className="container border border-green rounded-2xl tablet:px-12">
            <ProfileTabs userInfo={userInfo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
