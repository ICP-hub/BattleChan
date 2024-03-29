import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useConnect } from "@connect2ic/react";

import { TiThMenu } from "react-icons/ti";
import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import userimg from "../../../images/User.png";
import goldcoin from "../../../images/goldcoin.png";
import dark_logo from "../../../images/dark_logo.png";
import light_logo from "../../../images/light_logo.png";

import ProfileOverlay from "../ProfileOverlay/ProfileOverlay";

type Theme = {
  handleThemeSwitch: Function;
};


const truncateString  = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};
// 

const Navbar = (props: Theme) => {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const darkColor = document.documentElement.className;

  const is1100px = useMediaQuery("(min-width: 1100px)");
  const is800px = useMediaQuery("(min-width: 800px)");
  const className = "HomePage__Navbar";


  useEffect(() => {
    const body = document.querySelector("body")?.style;
    if (body && showOverlay == true) {
      body.overflow = "hidden";
    } else if (body) {
      body.overflow = "auto";
    }
  }, [showOverlay]);


  const { principal, activeProvider } = useConnect();
  let loggedInBy = activeProvider?.meta.name;
  let user = "";
  if(principal){
    user = truncateString(principal, 17);
  }

  return (
    <div
      className={
        className +
        ` flex-row-center justify-between bg-[#ECECEC] dark:bg-dark text-dark dark:text-light tablet:py-6 py-4 xl:px-16 laptop:px-12 tablet:px-10 p-4 gap-2 border-b border-grey`
      }
    >
      <img
        src={darkColor == "dark" ? dark_logo : light_logo}
        className={
          className +
          "__logo tablet:w-28 w-20 object-contain pointer-events-none"
        }
        alt="BATTLE CHAN"
      />

      <section
        className={
          className +
          "__rightSection flex-row-center font-bold xl:gap-8 tablet:gap-4 gap-2"
        }
      >
        {is1100px && (
          <div className="input relative flex-row-center text-[#767676]">
            <IoSearch className={`absolute text-3xl ml-4 p-1`} />
            <input
              type="text"
              name="search"
              placeholder="Search here...."
              className={`rounded-[2rem] xl:w-[400px] pl-14 px-8 py-3.5 text-lg font-normal text-dark dark:text-light bg-${darkColor}`}
            />
          </div>
        )}

        <div
          className={
            className +
            `__timeToken text-dark dark:text-light gap-2 flex-row-center border border-green rounded-[3rem]` +
            "  tablet:p-1.5 p-1 tablet:pl-6 pl-3 tablet:text-base text-sm text-nowrap"
          }
        >
          1 Time Token:
          <span className={className + "__timeToken__amount text-light-green"}>
            $0.0050
          </span>
          <button
            className={
              className +
              `__timeToken__butButton small-button text-light dark:text-dark bg-dark dark:bg-light`
            }
          >
            Buy
          </button>
        </div>

        {!is1100px && (
          <IoSearch className="tablet:min-w-[30px] tablet:text-3xl text-lg cursor-pointer" />
        )}

        {is800px && (
          <FaRegBell className="tablet:min-w-[30px] tablet:text-3xl text-lg cursor-pointer" />
        )}

        {!is800px && (
          <TiThMenu className="tablet:min-w-[30px] tablet:text-3xl text-lg cursor-pointer" />
        )}

        {is800px && (
          <React.Fragment>
            <div className="__userName_and_coins flex flex-col items-start">
              <p className="text-nowrap">{user}</p>
              <div className="coinsCount flex-row-center gap-2">
                <img src={goldcoin} alt="Gold coin" className="w-[20px]" />
                <span className="text-light-green">550</span>
              </div>
            </div>

            <img
              src={userimg}
              alt="USER IMAGE"
              className="min-w-[40px] max-w-[45px] cursor-pointer"
              onClick={() => setShowOverlay(!showOverlay)}
            />
          </React.Fragment>
        )}

        <ProfileOverlay
          display={showOverlay}
          setProfilePopUp={setShowOverlay}
          handleThemeSwitch={props.handleThemeSwitch}
        />
      </section>
    </div>
  );
};

export default Navbar;
