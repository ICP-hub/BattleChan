import React, { useEffect, useState } from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";

import UserProfileHeader from "./UserProfileHeader";
import ProfileTabs from "./ProfileTabs";
import UserApiHanlder from "../../API_Handlers/user";
import { useConnect } from "@connect2ic/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
};

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
};

const UserProfile = (props: Theme) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const { getUserInfo, getProfileData } = UserApiHanlder();
  const className = "dashboard__UserProfile";
  const { isConnected, principal } = useConnect();
  const [principal_id, setPrincipal_id] = useState("");
  const principal_idRef = React.useRef(principal_id);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const isUserAuthenticatedRef = React.useRef(isUserAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    isUserAuthenticatedRef.current = isUserAuthenticated;
    principal_idRef.current = principal_id;
  }, [isUserAuthenticated, principal_id]);

  // Check if User is Authenticated or not
  useEffect(() => {
    const checkAuthentication = async () => {
      if (isConnected && principal) {
        setIsUserAuthenticated(true);
        setPrincipal_id(principal);
      } else {
        toast.error("Please Authenticate first in order to see User Profile!")
        navigate("/dashboard");
      }
    };

    checkAuthentication();
  }, [isConnected, principal]);

  // If user is not Authenticated or not Registered navigate it to profile page
  useEffect(() => {
    const fetchData = async () => {
      const response = (await getProfileData()) as ProfileData;
      if (response && response.status == false) {
        if (isUserAuthenticatedRef.current && principal_idRef.current) {
          toast.error("Please Update your Profile first in order to access User Profile!");
          navigate("/dashboard/settingProfile");
        }
      }
    };

    fetchData();
  }, [isUserAuthenticatedRef, principal_idRef]);

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
