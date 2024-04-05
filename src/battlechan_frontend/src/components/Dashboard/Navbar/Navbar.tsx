import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useConnect } from "@connect2ic/react";
import { ConnectDialog } from "@connect2ic/react";

import { IoSearch } from "react-icons/io5";

import goldcoin from "../../../images/goldcoin.png";
import dark_logo from "../../../images/dark_logo.png";
import light_logo from "../../../images/light_logo.png";
import defaultImg from "../../../images/User.png";
import { Link } from "react-router-dom";

import ProfileOverlay from "../ProfileOverlay/ProfileOverlay";
import UserApiHanlder from "../../../API_Handlers/user";
import NavConnectButton from "../../LandingPage/Navbar/NavConnectButton";

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
  const darkColor = document.documentElement.className;
  const { getProfileData } = UserApiHanlder();
  const [fileURL, setFileURL] = React.useState(defaultImg);
  const [userName, setUserName] = React.useState("");
  // const { getTimeTokens } = TokensApiHanlder();

  const is1000px = useMediaQuery("(min-width: 1000px)");
  const className = "HomePage__Navbar";
  const { principal, isConnected } = useConnect();

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
    const fetchBalance = async () => {
      // const data = await getTimeTokens();
      // console.log(data);
    };

    fetchBalance();
  }, []);

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
        <div className="input relative flex-row-center text-[#767676] laptop:flex hidden">
          <IoSearch className={`absolute text-3xl ml-4 p-1`} />
          <input
            type="text"
            name="search"
            placeholder="Search here...."
            className={`rounded-[2rem] xl:w-[400px] pl-14 px-8 py-3.5 text-lg font-normal text-dark dark:text-light bg-${darkColor}`}
          />
        </div>

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
            <img
              src={fileURL}
              onClick={() => setShowOverlay(!showOverlay)}
              className="tablet:min-w-[50px] min-w-[30px] tablet:h-[57px] h-[40px] object-cover rounded-md tablet:max-w-[45px] max-w-[35px] cursor-pointer"
            />
          ) : (
            <button
              className={
                className +
                "__connectWalletBtn flex-row-center bg-dirty-light-green rounded-[3rem] tablet:px-6 px-3 tablet:py-4 py-2.5"
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
                  <span className="text-light-green">550</span>
                </div>
              </div>

              <img
                src={fileURL}
                alt="USER IMAGE"
                className="min-w-[50px] h-[57px] object-cover rounded-md cursor-pointer"
                onClick={() => setShowOverlay(!showOverlay)}
              />
            </React.Fragment>
          ) : (
            <button
              className={
                className +
                "__connectWalletBtn flex-row-center bg-dirty-light-green rounded-[3rem] tablet:px-6 px-3 tablet:py-4 py-2.5"
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
