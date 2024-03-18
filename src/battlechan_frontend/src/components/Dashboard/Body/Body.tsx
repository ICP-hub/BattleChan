import React from "react";
import { Link } from "react-router-dom";

import { LuPlusCircle } from "react-icons/lu";

import { FiBox } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { GiPublicSpeaker } from "react-icons/gi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHardwareChipOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";

import bg from "../../../images/dashboard_bg.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const Body = (props: Theme) => {
  const [active, setActive] = React.useState("Home");
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "Home";

  return (
    <div
      className={
        className +
        `flex flex-col justify-between w-full text-${lightColor} bg-top bg-cover bg-no-repeat`
      }
      style={
        darkColor == "dark"
          ? {
              backgroundImage: `url(${bg})`,
            }
          : {}
      }
    >
      <div
        className={
          className +
          "__navigation" +
          " gap-12 my-8 flex-row-center justify-center font-normal text-lg"
        }
      >
        <p
          className={`${
            active === "Home" ? `text-${lightColor}` : "text-grey"
          }`}
          onClick={() => setActive("Home")}
        >
          Home
        </p>
        <p
          className={`${
            active === "Archive" ? `text-${lightColor}` : "text-grey"
          }`}
          onClick={() => setActive("Archive")}
        >
          Archive
        </p>
        <p
          className={`${
            active === "Dashboard" ? `text-${lightColor}` : "text-grey"
          }`}
          onClick={() => setActive("Dashboard")}
        >
          Dashboard
        </p>
      </div>

      <div
        className={className + "__createPost" + " mt-12 flex justify-center"}
      >
        <Link to="/createPost">
          <p className="green-button flex-row-center bg-dirty-light-green">
            <LuPlusCircle />
            <span>Create Post</span>
          </p>
        </Link>
      </div>

      <div
        className={
          className + "__tagLines" + " px-20 w-full flex flex-row my-12"
        }
      >
        <div
          className={`w-1/2 text-5xl font-bold ${
            darkColor == "dark" ? "text-[#6DE580]" : "text-dirty-light-green"
          } leading-relaxed`}
        >
          BattleChan: Decentralized Discussion Battlefield
        </div>
        <div
          className={`w-1/2 text-${lightColor} font-semibold text-lg text-start px-28`}
        >
          Welcome to BattleChan, where every post battles for supremacy
        </div>
      </div>

      <div
        className={
          className +
          "__steps" +
          `w-full flex-row-center justify-evenly p-10 my-8 mx-16 border border-light-green rounded-xl bg-${darkColor} text-lg`
        }
      >
        <div className="flex flex-col gap-4 items-start">
          <span
            className={`py-2 px-4 bg-${lightColor} text-${darkColor} rounded-[50%]`}
          >
            1
          </span>
          <span>Connect your Wallet.</span>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <span
            className={`py-2 px-4 bg-${lightColor} text-${darkColor} rounded-[50%]`}
          >
            2
          </span>
          <span>Make Post : Earn Time</span>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <span
            className={`py-2 px-4 bg-${lightColor} text-${darkColor} rounded-[50%]`}
          >
            3
          </span>
          <span>Cast your vote</span>
        </div>
      </div>

      <div
        className={
          className +
          "__postsNumber" +
          ` py-6 px-10 mx-36 my-24 border border-${lightColor} rounded-md`
        }
      >
        <div className="data__headings px-4 flex-row-center flex-nowrap justify-between rounded-xl text-light bg-dirty-light-green">
          <div className="data__label py-6 px-2 px-4 h-full text-lg font-semibold">
            Name of Subject
          </div>

          <div className="data__labels flex-row-center text-lg text-light">
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <MdOutlineAddBusiness />
                Business
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <GiPublicSpeaker />
                Politics
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <FaRunning />
                Sports
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <IoGameControllerOutline />
                Games
              </p>
            </div>
            <div className="w-[9.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <IoHardwareChipOutline />
                Technology
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <FiBox />
                Crypto
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap">
              <p className="flex-row-center gap-2 justify-center">
                <BiMoviePlay /> Cinema
              </p>
            </div>
          </div>
        </div>

        <div
          className={`data__values px-4 flex-row-center flex-nowrap justify-between bg-transparent text-${lightColor}`}
        >
          <div className="data__label py-6 px-4 h-full text-lg font-semibold">
            Total Posts
          </div>

          <div className="data__numbers flex-row-center justify-between">
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>01</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>02</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>03</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>04</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[9.5rem] text-center flex-col-center border-r">
              <span>05</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>06</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center">
              <span>07</span>
              <span>2 hrs ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
