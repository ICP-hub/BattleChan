import React, { useEffect } from "react";
import "./HeroSection.scss";

import { ConnectButton, ConnectDialog } from "@connect2ic/react";

import desktops from "../../../images/desktops.png";
import backImage from "../../../images/background_img.png";

const HeroSection = () => {
  const className = "LandingPage__HeroSection";

  useEffect(() => {
    const div = document.querySelector(
      ".LandingPage__HeroSection__startPostingBtn"
    )?.children[0];

    if (div) {
      div.innerHTML = "Start Posting";
      div.setAttribute("data-value", "");
    }
  }, []);

  return (
    <div className={className}>
      <div
        className={
          className +
          "__tagLines" +
          " flex-col-center justify-center h-[55vh] w-full bg-no-repeat bg-center bg-contain gap-8"
        }
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <h1
          className={
            `text-dark dark:text-light text-center font-bold` +
            " tablet:text-5xl text-4xl"
          }
        >
          The Combat Of Ideas: Where
          <br />
          the Best Rise to the Top
        </h1>

        <p
          className={
            `text-dark dark:text-light text-center font-normal` +
            " tablet:text-base text-sm"
          }
        >
          Unleash Your Voice , Join the Battle for Visibility and
          <br />
          compete for the top position
        </p>

        <button
          className={
            className + "__startPostingBtn flex-row-center green-button"
          }
        >
          {/* Start Posting */}
          <ConnectButton />
        </button>

        <ConnectDialog />
      </div>

      <div
        className={
          className +
          `__desktopsBlock w-full h-full tablet:px-12 px-8 tablet:mb-20 mb-12 flex flex-row`
        }
      >
        <img
          src={desktops}
          alt="Center Desktop"
          className="pointer-events-none select-none w-full"
        />
      </div>
    </div>
  );
};

export default HeroSection;
