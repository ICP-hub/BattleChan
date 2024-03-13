import React from "react";

import { ConnectButton, ConnectDialog } from "@connect2ic/react";

import backImage from "../../../images/background_img.png";
import leftDesktop from "../../../images/left_desktop.png";
import rightDesktop from "../../../images/right_desktop.png";
import centerDesktop from "../../../images/center_desktop.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const HeroSection = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "LandingPage-->HeroSection";

  return (
    <div className={className}>
      <div
        className={
          className +
          "__tagLines flex-col-center justify-center gap-8 h-[55vh] w-full bg-no-repeat bg-center bg-contain"
        }
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <h1 className={`text-${lightColor} text-center text-5xl font-bold`}>
          The Combat Of Ideas: Where
          <br />
          the Best Rise to the Top
        </h1>

        <p className={`text-${lightColor} text-center text-base font-normal`}>
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
          `__desktopsBlock w-full h-[80vh] mb-24 relative flex flex-row`
        }
      >
        <img
          src={leftDesktop}
          alt="Left Desktop"
          className="absolute pointer-events-none w-3/12 left-16 bottom-8"
        />
        <img
          src={centerDesktop}
          alt="Center Desktop"
          className="absolute pointer-events-none left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
        <img
          src={rightDesktop}
          alt="Right Desktop"
          className="absolute pointer-events-none w-3/12 right-16 bottom-8"
        />
      </div>
    </div>
  );
};

export default HeroSection;
