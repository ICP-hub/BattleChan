import { useEffect } from "react";
import "./HeroSection.scss";

import { ConnectButton, ConnectDialog, useConnect, useDialog } from "@connect2ic/react";
import { Link } from "react-router-dom";
import desktops from "../../../images/desktops.png";

import backImage from "../../../images/bg.svg";

const HeroSection = () => {
  const className = "LandingPage__HeroSection";
  const { open } = useDialog();
  const { isConnected } = useConnect();

  const loginHandler = () => {
    open();
  }

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
          " flex-col-center justify-center phone:h-[55vh] h-[40vh] w-full bg-no-repeat bg-center bg-contain gap-8"
        }
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <h1
          className={
            ` text-dark dark:text-light text-center font-bold` +
            " tablet:text-5xl phone:text-4xl text-2xl"
          }
        >
          The Combat Of Ideas: Where
          <br />
          the Best Rise to the Top
        </h1>

        <p
          className={
            `text-dark dark:text-light text-center font-normal` +
            " tablet:text-base phone:text-sm text-xs"
          }
        >
          Unleash Your Voice, Join the Battle for Visibility and
          <br />
          compete for the top position
        </p>

        {!isConnected && (
          <button
            className={
              className + "__startPostingBtn flex-row-center green-button"
            }
            onClick={loginHandler}
          >
            Start Posting
          </button>
        )}

        {isConnected && (
          <Link to="/dashboard/createPost">
            <button
              className={
                className + "__startPostingBtn flex-row-center green-button"
              }
            >
              Start Posting
            </button>
          </Link>
        )}
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
