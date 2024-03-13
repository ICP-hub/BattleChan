import React from "react";

import { FiArrowRight } from "react-icons/fi";
import Sword from "../../../images/sword.png";
import like from "../../../images/likes.png";
import big_image from "../../../images/tablet.png";
import dollarCoin from "../../../images/dollar_coin.png";
import profile_pic from "../../../images/profilePic.png";

const About = () => {
  const className = "LandingPage__About";

  return (
    <div
      className={
        className +
        " w-full h-[90vh] px-24 bg-green flex-direction-row relative text-light"
      }
    >
      {/* Texts on the left side */}
      <section
        className={
          className +
          "__leftSide w-1/3 h-full gap-8 py-24 flex flex-col items-start justify-evenly"
        }
      >
        <h1 className="text-5xl font-bold"> About Battlechan</h1>
        <p className="text-base font-normal">
          BattleChan, is a digital platform inspired by 4chan with a competitive
          twist on post interactions, designed around the concept of tokenized
          time ($TIME tokens).
        </p>

        <button
          role="button"
          className={className + "__guideBtn white-button flex-row-center"}
        >
          Guide <FiArrowRight />
        </button>
      </section>

      {/* Images on the right side */}
      <section
        className={
          className +
          "==>rightSide relative w-2/3 h-full flex-direction-col justify-around"
        }
      >
        <Cards />

        <img
          src={dollarCoin}
          alt="dollar coin"
          className="absolute pointer-events-none w-[150px] right-[20%] top-0"
        />
        <img
          src={dollarCoin}
          alt="dollar coin"
          className="absolute pointer-events-none w-[50px] left-[40%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
        <img
          src={Sword}
          alt="Sword"
          className="absolute pointer-events-none top-[10%]"
        />
        <img
          src={Sword}
          alt="Sword"
          className="absolute pointer-events-none bottom-[10%] right-0 rotate-[180deg]"
        />
        <img
          src={like}
          alt="Thumbs up"
          className="absolute pointer-events-none w-[200px] left-[70%] top-[47%] translate-x-[-50%] translate-y-[-50%]"
        />
        <img
          src={like}
          alt="Thumbs up"
          className="absolute pointer-events-none w-[200px] left-[60%] bottom-[5%] translate-x-[-50%] translate-y-[-50%] rotate-[180deg]"
        />
      </section>
    </div>
  );
};

const Cards = () => {
  return (
    <React.Fragment>
      {/* Card 1 */}
      <div className="card bg-dark h-[140px] w-[700px] gap-8 mt-40 rounded-2xl flex-row-center absolute right-0 top-0">
        <section className="left_image w-1/3">
          <img
            src={big_image}
            alt="Big Image"
            className="h-full bottom-8 pl-8 absolute pointer-events-none"
          />
        </section>

        <section className="right_content h-full pr-8 pt-4 pb-8 px-8 flex-direction-col justify-between">
          <div className="right_content_top flex-direction-row items-end justify-between relative">
            <div className="w-[5%]">
              <img
                src={profile_pic}
                alt="Profile Photo"
                className="absolute bottom-4 w-[50px] pointer-events-none"
              />
            </div>
            <p className="name text-xl">Lannister Grey</p>
            <p className="date_and_time">Oct 29,2023 ; 13:30</p>
            <p className="left_time text-xl">
              <span className="text-light-green">5:00</span> min left
            </p>
          </div>

          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.......
          </p>
        </section>
      </div>

      {/* Card 2 */}
      <div className="card bg-dark h-[140px] w-[700px] gap-8 mb-36 rounded-2xl flex-row-center absolute bottom-0 left-0">
        <section className="left_image w-1/3">
          <img
            src={big_image}
            alt="Big Image"
            className="h-full bottom-8 pl-8 absolute pointer-events-none"
          />
        </section>

        <section className="right_content h-full pr-8 pt-4 pb-8 px-8 flex-direction-col justify-between">
          <div className="right_content_top flex-direction-row items-end justify-between relative">
            <div className="w-[5%]">
              <img
                src={profile_pic}
                alt="Profile Photo"
                className="absolute bottom-4 w-[50px] pointer-events-none"
              />
            </div>
            <p className="name text-xl">Lannister Grey</p>
            <p className="date_and_time">Oct 29,2023 ; 13:30</p>
            <p className="left_time text-xl">
              <span className="text-red">0:52</span> min left
            </p>
          </div>

          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.......
          </p>
        </section>
      </div>
    </React.Fragment>
  );
};

export default About;
