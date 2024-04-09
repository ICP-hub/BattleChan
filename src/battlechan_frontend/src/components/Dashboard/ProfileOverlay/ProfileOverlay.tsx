import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import UserImg from "../../../images/User.png";
import { useConnect } from "@connect2ic/react";

import { GrSun } from "react-icons/gr";
import { BiMoon } from "react-icons/bi";
import { RxLapTimer } from "react-icons/rx";
import { TbSettings } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";

import UserApiHanlder from "../../../API_Handlers/user";
import TokensApiHanlder from "../../../API_Handlers/tokens";

type Props = {
  display: boolean;
  setProfilePopUp: any;
  handleThemeSwitch: any;
};

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
}

const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

const ProfileOverlay = (props: Props) => {
  const [fileURL, setFileURL] = React.useState(UserImg);
  const [userName, setUserName] = React.useState("");
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const { isConnected, disconnect } = useConnect();
  const { principal, activeProvider } = useConnect();
  const { getProfileData } = UserApiHanlder();
  const { getBalance } = TokensApiHanlder();
  const navigate = useNavigate();

  const display = props.display;
  const setProfilePopUp = props.setProfilePopUp;
  const darkColor = document.documentElement.className;

  const className = "ProfileOverlay";

  const handleClosePopup = () => {
    setProfilePopUp(false); // Close the popup
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = (await getProfileData()) as ProfileData;
      if (response && response.status !== false) {
        setUserName(response?.userName);
        setFileURL(response?.profileImg);
      } else {
        if (principal) {
          setUserName(truncateString(principal, 17));
        }
      }
    };

    // Add dependencies to the dependency array to avoid infinite loop
    fetchData();
  }, [userName]);

  useEffect(() => {
    const fetchData = async () => {
      if (principal) {
        const data = await getBalance(principal || "");
        setTokenBalance(Number(data));
      }
    };

    // Add dependencies to the dependency array to avoid infinite loop
    fetchData();
  }, [principal]);

  const logoutHandler = () => {
    disconnect();
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <div
      className={
        className +
        " " +
        `${display ? "block" : "hidden"
        } z-20 fixed top-0 left-0 w-full h-full bg-black backdrop-blur-md flex items-center justify-center`
      }
      onClick={handleClosePopup}
    >
      <div
        className={
          className +
          "__container" +
          " tablet:w-[400px] phone:w-[60vw] w-[70vw] p-4 flex flex-col justify-between tablet:gap-4 gap-2 bg-dirty-light-green text-light rounded-lg"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-full flex-row-center justify-start tablet:gap-8 gap-4 px-2">
          <img
            src={fileURL}
            alt="User Profile Image"
            className="tablet:w-[80px] w-[50px] rounded-lg"
          />
          <span className="text-lg">{userName} </span>
        </section>

        <fieldset>
          <legend className="p-2 text-lg">Personal</legend>

          <hr />

          <section className="flex flex-col bg-light tablet:text-lg text-sm text-dark gap-4 my-2">
            {/* <div className="ICP_Balance flex-row-center justify-between">
              <p className="flex-row-center gap-2">
                <SiInternetcomputer />
                <span>ICP Balance</span>
              </p>

              <p className="p-3">XYZ</p>
            </div> */}

            <div className="Time_Balance flex-row-center justify-between hover:bg-dirty-light-green hover:text-light transition">
              <Link to="/dashboard/analytics">
                <p className="flex-row-center gap-2 p-3">
                  <RxLapTimer />
                  Time Balance
                </p>
              </Link>

              <p className="p-3">{tokenBalance}</p>
            </div>
          </section>

          <Link to="/dashboard/userProfile">
            <button className="flex-row-center w-full gap-2 tablet:px-4 px-2 py-2 tablet:text-lg text-sm hover:bg-light hover:text-dark transition">
              <BsPersonCircle />
              My Profile
            </button>
          </Link>

          <Link to="/dashboard/settingProfile">
            <button className="flex-row-center w-full gap-2 tablet:px-4 px-2 py-2 tablet:text-lg text-sm hover:bg-light hover:text-dark transition">
              <TbSettings />
              Settings
            </button>
          </Link>

          {/* {!is1000px && (
            // <Link to="/dashboard">
            //   <button className="flex-row-center gap-2 tablet:px-4 px-2 py-2 tablet:text-lg text-sm">
            //     <FaRegBell />
            //     Notifications
            //   </button>
            // </Link>
          )} */}
        </fieldset>

        <fieldset>
          <legend className="p-2 text-lg">View Mode</legend>

          <hr />

          <div className="flex-row-center justify-between p-4 tablet:text-lg text-sm">
            <p className="flex-row-center gap-2">
              {darkColor == "dark" ? <BiMoon /> : <GrSun />}
              <span>{darkColor == "dark" ? "Dark Mode" : "Light Mode"}</span>
            </p>

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={() => props.handleThemeSwitch()}
              />
              <div className="bg-light relative w-11 h-6 rounded-full peer dark:bg-dark-green peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-green after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-dark-green"></div>
            </label>
          </div>
        </fieldset>

        {isConnected && (
          <button
            type="button"
            className="tablet:mt-8 mt-2 white-button bg-dark-green text-light"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileOverlay;
