import React from "react";
import { Link } from "react-router-dom";

import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import userimg from "../../../images/User.png";
import goldcoin from "../../../images/goldcoin.png";
import dark_logo from "../../../images/dark_logo.png";
import light_logo from "../../../images/light_logo.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const Navbar = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "HomePage__Navbar";

  return (
    <div
      className={
        className +
        ` flex-row-center justify-between bg-transparent text-${lightColor} py-8 px-16 border-b border-grey`
      }
    >
      <img
        src={darkColor == "dark" ? dark_logo : light_logo}
        className={className + "__logo w-28 object-contain pointer-events-none"}
        alt="BATTLE CHAN"
      />

      <section
        className={className + "__rightSection flex-row-center font-bold gap-8"}
      >
        <div className="input relative flex-row-center text-[#767676]">
          <IoSearch className={`absolute text-3xl ml-4 p-1`} />
          <input
            type="text"
            name="search"
            placeholder="Search here...."
            className={`rounded-[2rem] w-[450px] pl-14 px-8 py-3.5 text-lg font-normal text-${lightColor} bg-${darkColor}`}
          />
        </div>

        <div
          className={
            className +
            `__timeToken text-${lightColor} gap-2 flex-row-center border border-green rounded-[3rem]` +
            "  p-1.5 pl-6 text-base text-nowrap"
          }
        >
          1 Time Token:
          <span className={className + "__timeToken__amount text-light-green"}>
            $0.0050
          </span>
          <button
            className={
              className +
              `__timeToken__butButton small-button bg-${lightColor} text-${darkColor}`
            }
          >
            Buy
          </button>
        </div>

        <FaRegBell className="min-w-[30px] text-3xl cursor-pointer" />

        <div className="__userName_and_coins flex flex-col items-start">
          <p className="text-nowrap">Kristin Watson</p>
          <div className="coinsCount flex-row-center gap-2">
            <img src={goldcoin} alt="Gold coin" className="w-[20px]" />
            <span className="text-light-green">550</span>
          </div>
        </div>

        <Link to="/dashboard/settingProfile">
          <img src={userimg} alt="USER IMAGE" className="w-[50px]" />
        </Link>
      </section>
    </div>
  );
};

export default Navbar;
