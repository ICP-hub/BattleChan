import React from "react";

import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react";
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";

import backImage from "../../../images/background_img.png";
import leftDesktop from "../../../images/left_desktop.png";
import rightDesktop from "../../../images/right_desktop.png";
import centerDesktop from "../../../images/center_desktop.png";

const LandingHero = () => {
  const className = "landingPageHeroSection";
  const theme: string = "dark";
  const darkColor: string = theme.includes("dark") ? "dark" : "light";
  const lightColor: string = !theme.includes("dark") ? "dark" : "light";

  return (
    <div className={className}>
      <div
        className={
          className +
          "__tagLines flex-col-center gap-8 h-5/6 w-full py-20 px-24 bg-no-repeat bg-center bg-contain"
        }
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <h1 className={`text-${lightColor} text-5xl font-bold`}>
          PrimePost Showdown: Where
          {<br />}
          the Best Rise to the Top
        </h1>

        <p className={`text-${lightColor} text-base font-normal`}>
          Unleash Your Voice , Join the Battle for Visibility and
          {<br />}
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

const client = createClient({
  canisters: {},
  providers: defaultProviders,
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <LandingHero />
  </Connect2ICProvider>
);
