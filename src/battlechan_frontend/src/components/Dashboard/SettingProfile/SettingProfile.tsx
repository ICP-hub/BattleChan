import React from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import bg from "../../../images/dashboard_bg.png";
import defaultImg from "../../../images/User.png";

type Theme = {
  handleThemeSwitch: Function;
};

const SettingProfile = (props: Theme) => {
  const darkColor = document.documentElement.className;
  const className = "SettingProfile";

  return (
    <div
      className={
        className + ` ${darkColor == "dark" ? "bg-dark" : "bg-[#ECECEC]"}`
      }
    >
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <NavButtons />
      <div
        className={
          className +
          ` h-full w-full py-10 px-40 text-dark dark:text-light bg-bottom bg-contain bg-no-repeat`
        }
        style={
          darkColor == "dark"
            ? {
                backgroundImage: `url(${bg})`,
              }
            : {}
        }
      >
        <h1 className="text-3xl font-bold text-center">Customize Profile</h1>

        <section className="profileName p-4 m-8 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start">
            <span className="font-semibold">User Name</span>
            <span>Kristin Watson</span>
          </div>

          <button
            type="button"
            className={`text-light dark:text-dark bg-dark dark:bg-light py-2 px-4 rounded-lg font-semibold`}
          >
            Change
          </button>
        </section>

        <section className="profilePhoto p-4 m-8 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start">
            <span className="font-semibold">Profile Picture</span>
            <span>Image Must Be in Jpeg Format</span>
          </div>

          <label
            htmlFor="profile"
            className={`text-light dark:text-dark bg-dark dark:bg-light py-2 px-4 rounded-lg font-semibold cursor-pointer`}
          >
            Change
          </label>

          <input type="file" name="Change" id="profile" className="hidden" />
        </section>

        <section className="image p-4 m-8 flex flex-row items-start">
          <img src={defaultImg} alt="Profile Image" className="w-[150px]" />
        </section>

        <section className="image p-4 m-8 flex-col-center">
          <button className="green-button" type="button">
            Update
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingProfile;
