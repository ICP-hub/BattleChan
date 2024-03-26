import React from "react";
import { Link } from "react-router-dom";

import UserImg from "../../../images/User.png";

import { GrSun } from "react-icons/gr";
import { BiMoon } from "react-icons/bi";
import { RxLapTimer } from "react-icons/rx";
import { TbSettings } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { SiInternetcomputer } from "react-icons/si";

type Props = {
  display: boolean;
  setProfilePopUp: any;
  darkColor: string;
  handleThemeSwitch: any;
};

const ProfileOverlay = (props: Props) => {
  const className = "ProfileOverlay";
  const display = props.display;
  const darkColor = props.darkColor;
  const setProfilePopUp = props.setProfilePopUp;

  const handleClosePopup = () => {
    setProfilePopUp(false); // Close the popup
  };

  return (
    <div
      className={
        className +
        " " +
        `${
          display ? "block" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black backdrop-blur-md flex items-center justify-center`
      }
      onClick={handleClosePopup}
    >
      <div
        className={
          className +
          "__container" +
          "h-[80vh] w-[400px] p-4 flex flex-col gap-4 bg-dirty-light-green text-light rounded-lg"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <section className="w-full flex-row-center justify-start gap-8 px-8">
          <img src={UserImg} alt="User Profile Image" />
          <span className="text-lg">Kristin Watson</span>
        </section>

        <fieldset>
          <legend className="p-4 text-lg">Personal</legend>

          <hr />

          <section className="flex flex-col bg-light text-dark gap-4 p-3 my-2">
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

          <Link to="/dashboard/settingProfile">
            <button className="flex-row-center gap-2 px-4 py-2">
              <TbSettings />
              My Profile
            </button>
          </Link>

          <Link to="/dashboard/settingProfile">
            <button className="flex-row-center gap-2 px-4 py-2">
              <TbSettings />
              Settings
            </button>
          </Link>
        </fieldset>

        <fieldset>
          <legend className="p-4 text-lg">View Mode</legend>

          <hr />

          <div className="flex-row-center justify-between p-4">
            <p className="flex-row-center gap-2">
              {darkColor == "light" ? <GrSun /> : <BiMoon />}
              <span>{darkColor == "light" ? "Light Mode" : "Dark Mode"}</span>
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

          <button
            type="button"
            className="mt-8 white-button bg-dark-green text-light"
          >
            Logout
          </button>
      </div>
    </div>
  );
};

export default ProfileOverlay;
