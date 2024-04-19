import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useConnect } from "@connect2ic/react";
import { ConnectDialog } from "@connect2ic/react";

import { IoSearch } from "react-icons/io5";

import goldcoin from "../../../images/goldcoin.png";
import dark_logo from "../../../images/dark_logo.png";
import light_logo from "../../../images/light_logo.png";
import defaultImg from "../../../images/User.png";
import { Link, useNavigate } from "react-router-dom";

import ProfileOverlay from "../ProfileOverlay/ProfileOverlay";
import UserApiHanlder from "../../../API_Handlers/user";
import NavConnectButton from "../../LandingPage/Navbar/NavConnectButton";
import TokensApiHanlder from "../../../API_Handlers/tokens";
import PostApiHanlder from "../../../API_Handlers/post";

type Theme = {
  handleThemeSwitch: Function;
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

const Navbar = (props: Theme) => {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [fileURL, setFileURL] = React.useState(defaultImg);
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const [userName, setUserName] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  const { getProfileData, votesOfUser } = UserApiHanlder();
  const { getSearchPost } = PostApiHanlder();
  const { principal, isConnected } = useConnect();
  const { getBalance } = TokensApiHanlder();

  const darkColor = document.documentElement.className;
  const is1000px = useMediaQuery("(min-width: 1000px)");
  const className = "HomePage__Navbar";

  const navigate = useNavigate();

  useEffect(() => {
    const body = document.querySelector("body")?.style;
    if (body && showOverlay == true) {
      body.overflow = "hidden";
    } else if (body) {
      body.overflow = "auto";
    }
  }, [showOverlay]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfileData();

        if (response && response.status) {
          setUserName(response.userName);
          setFileURL(response.profileImg);
        } else if (response === undefined) {
          console.warn("Profile data is undefined");
        } else {
          if (principal) {
            setUserName(truncateString(principal, 17));
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [userName, principal, isConnected]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (principal) {
          const data = await getBalance(principal);
          const parsedBalance = Number(data);

          if (!isNaN(parsedBalance)) {
            setTokenBalance(parsedBalance);
          } else {
            console.warn("Received invalid balance data:", data);
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchData();
  }, [principal]);

  async function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("search form submitted with input: ", searchInput);
    if (searchInput !== "") {
      navigate(`/dashboard/searchPosts?searchInput=${searchInput}`);
    }
  }

  return (
    <div
      className={
        className +
        ` flex-row-center justify-between bg-[#ECECEC] dark:bg-dark text-dark dark:text-light py-4 xl:px-12 laptop:px-6 px-4 gap-2 border-b border-grey`
      }
    >
      <Link to="/dashboard">
        <img
          src={darkColor == "dark" ? dark_logo : light_logo}
          className={
            className +
            "__logo tablet:w-28 small_phone:w-20 w-16 object-contain pointer-events-none"
          }
          alt="BATTLE CHAN"
        />
      </Link>

      <section
        className={
          className +
          "__rightSection flex-row-center font-bold tablet:gap-4 gap-2"
        }
      >
        <form onSubmit={handleSearchSubmit}>
          <div className="input relative flex-row-center text-[#767676] laptop:flex hidden">
            <IoSearch className={`absolute text-3xl ml-4 p-1`} />
            <input
              type="text"
              name="search"
              placeholder="Search here...."
              className={`rounded-[2rem] xl:w-[400px] pl-14 px-8 py-3.5 text-lg font-normal text-dark dark:text-light bg-${darkColor} border border-light `}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
        </form>

        <div
          className={
            className +
            `__timeToken text-dark dark:text-light small_phone:gap-2 gap-1 flex-row-center border border-green rounded-[3rem]` +
            "  tablet:p-1.5 p-1 tablet:pl-6 small_phone:pl-3 pl-2 tablet:text-base text-sm text-nowrap"
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

        {!is1000px && (
          <IoSearch className="tablet:min-w-[30px] tablet:text-3xl text-2xl cursor-pointer small_phone:block hidden" />
        )}

        {!is1000px &&
          (isConnected ? (
            <>
              <div className="w-9 h-9 tablet:w-12 tablet:h-12 flex justify-center rounded-md">
                <img
                  src={fileURL}
                  onClick={() => setShowOverlay(!showOverlay)}
                  className="block h-full w-full object-cover rounded-md cursor-pointer"
                />
              </div>
            </>
          ) : (
            <button
              className={
                className +
                "__connectWalletBtn flex-row-center text-light bg-dirty-light-green rounded-[3rem] tablet:px-6 px-3 tablet:py-4 py-2.5"
              }
            >
              <NavConnectButton />
            </button>
          ))}

        {is1000px &&
          (isConnected ? (
            <React.Fragment>
              <div className="__userName_and_coins flex flex-col items-start">
                <p className="text-nowrap">{userName}</p>
                <div className="coinsCount flex-row-center gap-2">
                  <img src={goldcoin} alt="Gold coin" className="w-[20px]" />
                  <span className="text-light-green">{tokenBalance}</span>
                </div>
              </div>

              <div className="w-9 h-9 tablet:w-12 tablet:h-12 flex justify-center rounded-md">
                <img
                  src={fileURL}
                  onClick={() => setShowOverlay(!showOverlay)}
                  className="block h-full w-full object-cover rounded-md cursor-pointer"
                />
              </div>
            </React.Fragment>
          ) : (
            <button
              className={
                className +
                "__connectWalletBtn text-light flex-row-center bg-dirty-light-green rounded-[3rem] tablet:px-6 px-3 tablet:py-4 py-2.5"
              }
            >
              <NavConnectButton />
            </button>
          ))}

        <ProfileOverlay
          display={showOverlay}
          setProfilePopUp={setShowOverlay}
          handleThemeSwitch={props.handleThemeSwitch}
        />
      </section>

      <ConnectDialog />
    </div>
  );
};

export default Navbar;
