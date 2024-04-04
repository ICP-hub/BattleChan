import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaRegBell } from "react-icons/fa";
import UserImg from "../../../images/User.png";
import { useConnect } from "@connect2ic/react";

import { GrSun } from "react-icons/gr";
import { BiMoon } from "react-icons/bi";
import { RxLapTimer } from "react-icons/rx";
import { TbSettings } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { SiInternetcomputer } from "react-icons/si";
import { useMediaQuery } from "@mui/material";
import toast from "react-hot-toast"
import UserApiHanlder from "../../../API_Handlers/user";

type Props = {
  display: boolean;
  setProfilePopUp: any;
  handleThemeSwitch: any;
};

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
};

const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

const ProfileOverlay = (props: Props) => {
  const { isConnected, disconnect } = useConnect()

  const className = "ProfileOverlay";
  const display = props.display;
  const setProfilePopUp = props.setProfilePopUp;
  const darkColor = document.documentElement.className;
  const is1000px = useMediaQuery("(min-width: 1000px)");
  const { getProfileData } = UserApiHanlder();
  const [fileURL, setFileURL] = React.useState(UserImg);
  const [userName, setUserName] = React.useState("");

  const handleClosePopup = () => {
    setProfilePopUp(false); // Close the popup
  };
  const { principal, activeProvider } = useConnect();

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

  const logoutHandler = () => {
    disconnect()
    toast.success("Logout successfully.")
  }

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
        <section className="w-full flex-row-center justify-start tablet:gap-8 gap-4 tablet:px-8 px-4">
          <img
            src={fileURL}
            alt="User Profile Image"
            className="tablet:w-[80px] w-[50px]"
          />
          <span className="text-lg">{userName} </span>
        </section>

        <fieldset>
          <legend className="tablet:p-4 p-2 text-lg">Personal</legend>

          <hr />

          <section className="flex flex-col bg-light tablet:text-lg text-sm text-dark gap-4 p-3 my-2">
            <div className="ICP_Balance flex-row-center justify-between">
              <p className="flex-row-center gap-2">
                <SiInternetcomputer />
                <span>ICP Balance</span>
              </p>

              <p>XYZ</p>
            </div>

            <div className="Time_Balance flex-row-center justify-between">
              <p className="flex-row-center gap-2">
                <RxLapTimer />
                Time Balance
              </p>

              <p>XYZ</p>
            </div>
          </section>

          <Link to="/dashboard/userProfile">
            <button className="flex-row-center gap-2 tablet:px-4 px-2 py-2 tablet:text-lg text-sm">
              <BsPersonCircle />
              My Profile
            </button>
          </Link>

          <Link to="/dashboard/settingProfile">
            <button className="flex-row-center gap-2 tablet:px-4 px-2 py-2 tablet:text-lg text-sm">
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
          <legend className="tablet:p-4 p-2 text-lg">View Mode</legend>

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
