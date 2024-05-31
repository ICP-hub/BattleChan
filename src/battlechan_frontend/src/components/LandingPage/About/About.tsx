import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Sword from "../../../images/sword.png";
import like from "../../../images/likes.png";
import tablet from "../../../images/tablet.png";
import dollarCoin from "../../../images/dollar_coin.png";
import profile_pic from "../../../images/profilePic.png";

const About = () => {
  const className = "LandingPage__About";

  return (
    <div
      className={`${className} w-full min-h-screen tablet:px-24 phone:px-16 px-4 bg-green flex flex-col large:flex-row relative text-light`}
    >
      {/* Texts on the left side */}
      <section
        className={`${className}__leftSide w-full large:w-1/3 flex flex-col items-center large:items-start justify-center gap-8 py-16 large:py-0`}
      >
        <h1 className="text-4xl tablet:text-5xl font-bold text-center large:text-left">
          About Battlechan
        </h1>
        <p className="text-base font-normal text-center large:text-left">
          BattleChan is a digital platform inspired by 4chan with a competitive
          twist on post interactions, designed around the concept of tokenized
          time ($TIME tokens).
        </p>
        <button
          role="button"
          className={`${className}__guideBtn white-button flex items-center justify-center gap-2`}
        >
          Guide <FiArrowRight />
        </button>
      </section>

      {/* Images on the right side */}
      <section
        className={`${className}__rightSide w-full large:w-2/3 flex flex-col large:flex-row justify-center items-center relative`}
      >
        <div className="w-full flex flex-col items-center large:items-end gap-8 relative">
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
            className="absolute pointer-events-none top-[1%] left-0"
          />
          <img
            src={Sword}
            alt="Sword"
            className="absolute pointer-events-none bottom-[2%] right-0 rotate-[180deg] "
          />
          <img
            src={like}
            alt="Thumbs up"
            className="absolute pointer-events-none w-[200px] left-[70%] top-[47%] translate-x-[-50%] translate-y-[-50%]"
          />
          <img
            src={like}
            alt="Thumbs up"
            className="absolute pointer-events-none w-[200px] left-[30%] bottom-[2%] translate-x-[-50%] translate-y-[-50%] rotate-[180deg]"
          />
        </div>
      </section>
    </div>
  );
};

const Cards = () => {
  return (
    <React.Fragment>
      {/* Card 1 */}
      <div className="right-0 card bg-dark h-auto w-full large:w-[700px] gap-8 mt-40 rounded-2xl flex flex-wrap tablet:flex-nowrap items-center">

        <section className="left_image w-1/3 relative flex-wrap">
          <img
            src={tablet}
            alt="Big Image"
            className="h-full tablet:mt-[-60px] mt-[-20px]  pl-8 pointer-events-none"
          />
        </section>

        <section className="right_content h-full pr-8 pt-4 pb-8 px-8 flex flex-col justify-between">
          <div className="right_content_top flex items-end justify-between relative flex-wrap">
            <div className="w-[13%]">
              <img
                src={profile_pic}
                alt="Profile Photo"
                className="absolute bottom-4 w-[50px] pointer-events-none mb-2"
              />
            </div>
            <div></div>
            <p className="name text-xl">Lannister Grey</p>
            <p className="date_and_time">Oct 29, 2023 ; 13:30</p>
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
      <div className="card bg-dark h-auto w-full large:w-[700px] gap-8 mb-36 rounded-2xl flex items-center relative mt-24 flex flex-wrap tablet:flex-nowrap">
        <section className="left_image w-1/3 relative">
          <img
            src={tablet}
            alt="Big Image"
            className="h-full tablet:mt-[-60px] mt-[-20px]  pl-8 pointer-events-none"
          />
        </section>

        <section className="right_content h-full pr-8 pt-4 pb-8 px-8  flex flex-col justify-between">
          <div className="right_content_top flex items-end justify-between  relative flex-wrap  ">
            <div className="w-[13%]">
              <img src={profile_pic} alt="Profile Photo" className="absolute bottom-4 w-[50px] pointer-events-none" />
            </div>
            <p className="name text-xl  ">Lannister Grey</p>
            <p className="date_and_time">Oct 29, 2023 ; 13:30</p>
            <p className="left_time text-xl">
              <span className="text-red">0:52</span> min left
            </p>
          </div>

          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.......
          </p>
        </section>

      </div>
    </React.Fragment>
  );
};

export default About;
