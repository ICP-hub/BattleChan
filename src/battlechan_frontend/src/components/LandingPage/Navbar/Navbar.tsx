import React from "react";

import { ConnectButton, ConnectDialog } from "@connect2ic/react";

import { MdArrowOutward } from "react-icons/md";
import darkLogo from "../../../images/dark_logo.png";
import lightLogo from "../../../images/light_logo.png";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { useSelector } from "react-redux";

// type Theme = {
//   darkColor: string;
//   lightColor: string;
//   handleThemeSwitch: any;
// };

type Theme = {
  darkColor: string;
  lightColor: string;
  handleThemeSwitch: any;
  setModalOpen: (open: boolean) => void; // Include setModalOpen in the Theme type
};

const Navbar = (props: Theme,) => {


  // const principal = useSelector((currState) => currState.internet.principal);
  const principal = useSelector((state: RootState) => state.internet.principal);


  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "LandingPage__Navbar";

  // const manageHandler = () => {
  //   !principal ? setModalOpen(true) : setModalOpen(false);
  // };
  const manageHandler = () => {
    !principal ? props.setModalOpen(true) : props.setModalOpen(false);
  };


  return (
    <nav
      className={
        className +
        ` flex-row-center justify-between bg-${darkColor} text-${lightColor}` +
        " laptop:py-8 laptop:px-16 px-8 py-8"
      }
    >
      <img
        src={darkColor.includes("dark") ? darkLogo : lightLogo}
        alt="BATTLE CHAN"
        className={className + "__logo w-28 object-contain pointer-events-none"}
      />

      <section
        className={
          className +
          "__rightSection flex-row-center font-bold" +
          " laptop:gap-4 gap-2"
        }
      >
        <ThemeSwitch
          handleThemeSwitch={props.handleThemeSwitch}
          darkColor={props.darkColor}
          lightColor={props.lightColor}
        />

        <div
          className={
            className +
            `__timeToken text-${lightColor} gap-2 flex-row-center border border-green rounded-[3rem]` +
            "  laptop:p-1.5 laptop:pl-6 p-1.5 pl-4 text-base"
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
        {/* <button onClick={manageHandler}>connect wallet</button>
        <button
          className={
            className + "__connectWalletBtn flex-row-center green-button"
          }
        > */}
        <button onClick={manageHandler}>connect wallet</button>
      <button
        className={
          className + "__connectWalletBtn flex-row-center green-button"
        }
      >
          {/* <ConnectButton />  */}
          <MdArrowOutward />
        </button>

        {/* <ConnectDialog /> */}
      </section>
    </nav>
  );
};

export default Navbar;
