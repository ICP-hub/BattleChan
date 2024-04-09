import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useConnect } from "@connect2ic/react";
import UserApiHanlder from "../../API_Handlers/user";
import defaultImg from "../../images/user-avatar.svg";

const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

interface UserInfo {
  createdAt: string;
  createdComments: any[]; // Define appropriate type for these arrays
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

interface UserProfileHeaderProps {
  userInfo: UserInfo[];
}

interface BackendResponse {
  status: boolean;
  data: [];
  error: string[];
}

interface UserData {
  userName: string;
}

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
};


const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userInfo }) => {

  const { principal, activeProvider } = useConnect();
  let loggedInBy = activeProvider?.meta.name;

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const isRegisteredRef = React.useRef(isRegistered);
  const [fileURL, setFileURL] = React.useState(defaultImg);
  const { isUserRegistered, getProfileData } = UserApiHanlder();

  useEffect(() => {
    isRegisteredRef.current = isRegistered;
  }, [isRegistered]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = (await getProfileData()) as ProfileData;
      if (response && response.status !== false) {
        setUserName(response?.userName);
        setFileURL(response?.profileImg);
        setIsRegistered(true);
      } else {
        if (principal) {
          setUserName(truncateString(principal, 17));
        }
        setIsRegistered(false);
      }
    };

    // Add dependencies to the dependency array to avoid infinite loop
    fetchProfile();
  }, [userName]);

  return (
    <div className="bg-green rounded-2xl w-full p-6 tablet:p-[2.344rem] relative flex items-center gap-4 tablet:gap-12">
      <div className="relative w-[4.5rem] h-[4.5rem] tablet:w-[9.25rem] tablet:h-[9.25rem] laptop:w-[12rem] laptop:h-[12rem] rounded-[10px] flex items-center justify-center">
        {/* profile avatar svg */}
        <img
          src={fileURL}
          alt="Profile Image"
          className="relative w-[4.5rem] h-[4.5rem] tablet:w-[9.25rem] tablet:h-[9.25rem] laptop:w-[12rem] laptop:h-[12rem] rounded-[10px] flex items-center justify-center object-cover"
        />
        {/* edit circle */}
        <Link to="/dashboard/settingProfile">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 laptop:-mt-4 laptop:-mr-4 h-6 w-6 laptop:w-[45px] laptop:h-[45px]  rounded-full border border-[#FFFFFF] bg-green flex items-center justify-center">
            {/* edit icon svg */}
            <svg
              className="w-[10px] h-[11px] tablet:w-[12px] tablet:h-[13px] laptop:w-[18px] laptop:h-[20px]"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12H11M2.04125 7.22548C1.77464 7.48655 1.62493 7.84042 1.625 8.20935V10.1667H3.63937C4.01687 10.1667 4.37875 10.02 4.64563 9.75849L10.5831 3.94998C10.8498 3.68896 10.9996 3.33508 10.9996 2.96611C10.9996 2.59715 10.8498 2.24327 10.5831 1.98224L9.99688 1.40781C9.86466 1.27847 9.70768 1.17588 9.53489 1.10591C9.3621 1.03593 9.17689 0.999943 8.98987 1C8.80285 1.00006 8.61767 1.03616 8.44492 1.10624C8.27218 1.17632 8.11525 1.279 7.98313 1.40842L2.04125 7.22548Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-inter font-bold text-[#FFFFFF] text-sm tablet:text-2xl laptop:text-[2.5rem]">
          {userInfo.length > 0 && userInfo[0]?.userName}
        </h1>
        <p className="tablet:mt-2 font-inter text-[#FFFFFF] text-opacity-50 text-xs tablet:text-base laptop:text-xl leading-5">
          {loggedInBy}
        </p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
