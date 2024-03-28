import React from "react";
import "./AttractiveCompo.scss";

import { MdArrowOutward } from "react-icons/md";

import frame_1 from "../../../images/frame1.png";
import frame_2 from "../../../images/frame2.png";
import { ConnectButton, ConnectDialog } from "@connect2ic/react";

const AttractiveCompo = () => {
  const className = "LandingPage__AttractivePage";

  return (
    <div
      className={
        className + ` w-full h-[70vh] bg-light dark:bg-dark text-light relative`
      }
    >
      <div
        className={
          className +
          "__slidingImages" +
          " h-full flex-direction-col justify-center gap-8 absolute"
        }
      >
        <div className="frame_one w-full flex-direction-row flex-nowrap overflow-auto">
          <img src={frame_1} alt="Frame1" />
          <img src={frame_1} alt="Frame1" />
          <img src={frame_1} alt="Frame1" />
        </div>

        <div className="frame_two w-full flex-direction-row flex-nowrap overflow-auto">
          <img src={frame_2} alt="Frame1" />
          <img src={frame_2} alt="Frame1" />
          <img src={frame_2} alt="Frame1" />
        </div>
      </div>

      <div
        className={
          className +
          "__texts h-full w-full bg-[#0000009e] z-10 absolute top-0 left-0 gap-8 flex-col-center justify-center"
        }
      >
        <h1 className="text-5xl font-bold">Your Voice Matters Here!</h1>

        <p className="text-base font-semibold">
          Shape Contents and Earn Rewards
        </p>

        <button type="button" className="white-button flex-row-center">
          <ConnectButton />
          <MdArrowOutward />
        </button>

        <ConnectDialog />
      </div>
    </div>
  );
};

export default AttractiveCompo;
