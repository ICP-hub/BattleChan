import React, { useEffect } from "react";
import "./Navbar.scss";
import { useMediaQuery } from "@mui/material";

import { ConnectButton, ConnectDialog } from "@connect2ic/react";

import { MdArrowOutward } from "react-icons/md";
import darkLogo from "../../../images/dark_logo.png";
import lightLogo from "../../../images/light_logo.png";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

type Theme = {
  handleThemeSwitch: any;
};

const Navbar = (props: Theme) => {
  const darkColor = document.documentElement.className;
  const is550px = useMediaQuery("(min-width: 550px)");
  const is780px = useMediaQuery("(min-width: 780px)");
  const className = "LandingPage__Navbar";

  useEffect(() => {
    const div = document.querySelector(".LandingPage__Navbar__connectWalletBtn")
      ?.children[0];

    console.log(div);

    if (div && !is780px) {
      div.innerHTML = "";
      div.setAttribute("data-value", "");
    } else if (div) {
      div.innerHTML = "Connect";
      div.setAttribute("data-value", " Wallet");
    }
  }, [is780px]);

  return (
    <nav
      className={
        className +
        ` flex-row-center justify-between text-dark dark:text-light bg-light dark:bg-dark` +
        " laptop:py-8 laptop:px-16 tablet:px-8 tablet:py-8 p-4"
      }
    >
      <img
        src={darkColor.includes("dark") ? darkLogo : lightLogo}
        alt="BATTLE CHAN"
        className={
          className +
          "__logo tablet:w-28 w-20 object-contain pointer-events-none"
        }
      />

      <section
        className={
          className +
          "__rightSection flex-row-center font-bold" +
          " laptop:gap-4 gap-2"
        }
      >
        {is550px && (
          <ThemeSwitch handleThemeSwitch={props.handleThemeSwitch} />
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

        <button
          className={
            className +
            "__connectWalletBtn flex-row-center green-button laptop:gap-2 gap-0"
          }
        >
          <ConnectButton />
          <MdArrowOutward className="tablet:text-2xl text-lg" />
        </button>

        <ConnectDialog />
      </section>
    </nav>
  );
};

export default Navbar;
