import React from "react";

import { FiBox } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { GiPublicSpeaker } from "react-icons/gi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHardwareChipOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";

const DataNumbers = () => {
  const className = "DataNumbers";
  return (
    <div
      className={
        className +
        " " +
        ` py-6 px-10 mx-36 my-24 border border-dark dark:border-light rounded-md`
      }
    >
      <div className="data__headings px-4 flex-row-center flex-nowrap justify-between rounded-xl text-light bg-dirty-light-green">
        <div className="data__label py-6 px-2 px-4 h-full text-lg font-semibold">
          Name of Subject
        </div>

        <div className="data__labels flex-row-center text-lg text-light">
          <div className="w-[7.5rem] py-6 flex-nowrap border-r">
            <p className="flex-row-center gap-2 justify-center">
              <MdOutlineAddBusiness />
              Business
            </p>
          </div>
          <div className="w-[7.5rem] py-6 flex-nowrap border-r">
            <p className="flex-row-center gap-2 justify-center">
              <GiPublicSpeaker />
              Politics
            </p>
          </div>
          <div className="w-[7.5rem] py-6 flex-nowrap border-r">
            <p className="flex-row-center gap-2 justify-center">
              <FaRunning />
              Sports
            </p>
          </div>
          <div className="w-[7.5rem] py-6 flex-nowrap border-r">
            <p className="flex-row-center gap-2 justify-center">
              <IoGameControllerOutline />
              Games
            </p>
          </div>
          <div className="w-[9.5rem] py-6 flex-nowrap border-r">
            <p className="flex-row-center gap-2 justify-center">
              <IoHardwareChipOutline />
              Technology
            </p>
          </div>
          <div className="w-[7.5rem] py-6 flex-nowrap border-r">
            <p className="flex-row-center gap-2 justify-center">
              <FiBox />
              Crypto
            </p>
          </div>
          <div className="w-[7.5rem] py-6 flex-nowrap">
            <p className="flex-row-center gap-2 justify-center">
              <BiMoviePlay /> Cinema
            </p>
          </div>
        </div>
      </div>

      <div
        className={`data__values px-4 flex-row-center flex-nowrap justify-between bg-transparent text-dark dark:text-light`}
      >
        <div className="data__label py-6 px-4 h-full text-lg font-semibold">
          Total Posts
        </div>

        <div className="data__numbers flex-row-center justify-between">
          <div className="w-[7.5rem] text-center flex-col-center border-r">
            <span>01</span>
            <span>2 hrs ago</span>
          </div>
          <div className="w-[7.5rem] text-center flex-col-center border-r">
            <span>02</span>
            <span>2 hrs ago</span>
          </div>
          <div className="w-[7.5rem] text-center flex-col-center border-r">
            <span>03</span>
            <span>2 hrs ago</span>
          </div>
          <div className="w-[7.5rem] text-center flex-col-center border-r">
            <span>04</span>
            <span>2 hrs ago</span>
          </div>
          <div className="w-[9.5rem] text-center flex-col-center border-r">
            <span>05</span>
            <span>2 hrs ago</span>
          </div>
          <div className="w-[7.5rem] text-center flex-col-center border-r">
            <span>06</span>
            <span>2 hrs ago</span>
          </div>
          <div className="w-[7.5rem] text-center flex-col-center">
            <span>07</span>
            <span>2 hrs ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataNumbers;
