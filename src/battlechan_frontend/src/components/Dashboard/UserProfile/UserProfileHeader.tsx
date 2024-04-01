import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useConnect } from "@connect2ic/react";
import UserApiHanlder from "../../../API_Handlers/user";

const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

interface BackendResponse {
  status: boolean;
  data: [];
  error: string[];
}

interface UserData {
  userName: string;
}

const UserProfileHeader = () => {

  const { principal, activeProvider } = useConnect();
  let loggedInBy = activeProvider?.meta.name;
 
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const isRegisteredRef = React.useRef(isRegistered);
  const { isUserRegistered } = UserApiHanlder();

  useEffect(() => {
    isRegisteredRef.current = isRegistered;
  }, [isRegistered]);

  useEffect(() => {
    const fetchData = async () => {
      const response = (await isUserRegistered()) as BackendResponse;
      if (response && response.status !== false) {
        const userDataArray: UserData[] = response.data;
        setUserName(userDataArray[0]?.userName)
        setIsRegistered(true);
        // console.log("SETTED TRUe", isRegistered);
      } else {
        if (principal) {
          setUserName(truncateString(principal, 17));
        }
        // console.log("SET FALSE")
        setIsRegistered(false);
      }
      // console.log("isRegisteredData", response);
      // console.log("isRegistered", isRegistered);
    };

    // Add dependencies to the dependency array to avoid infinite loop
    fetchData();
  }, [isRegistered]);

  return (
    <div className="bg-green rounded-2xl w-full p-6 tablet:p-[2.344rem] relative flex items-center gap-4 tablet:gap-12">
      <div className="relative w-[4.5rem] h-[4.5rem] tablet:w-[9.25rem] tablet:h-[9.25rem] laptop:w-[12rem] laptop:h-[12rem] rounded-[10px] bg-[#000000] flex items-center justify-center">
        {/* profile avatar svg */}
        <svg
          className="w-[42px] h-[42px] tablet:w-[92.78px] tablet:h-[92.78px] laptop:w-[139px] laptop:h-[139px]"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 0C23.7848 0 26.4555 1.10625 28.4246 3.07538C30.3938 5.04451 31.5 7.71523 31.5 10.5C31.5 13.2848 30.3938 15.9555 28.4246 17.9246C26.4555 19.8938 23.7848 21 21 21C18.2152 21 15.5445 19.8938 13.5754 17.9246C11.6062 15.9555 10.5 13.2848 10.5 10.5C10.5 7.71523 11.6062 5.04451 13.5754 3.07538C15.5445 1.10625 18.2152 0 21 0ZM21 26.25C32.6025 26.25 42 30.9487 42 36.75V42H0V36.75C0 30.9487 9.3975 26.25 21 26.25Z"
            fill="white"
          />
        </svg>
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-inter font-bold text-[#FFFFFF] text-sm tablet:text-2xl laptop:text-[2.5rem]">
          {userName}
        </h1>
        <p className="tablet:mt-2 font-inter text-[#FFFFFF] text-opacity-50 text-xs tablet:text-base laptop:text-xl leading-5">
          {loggedInBy}
        </p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
