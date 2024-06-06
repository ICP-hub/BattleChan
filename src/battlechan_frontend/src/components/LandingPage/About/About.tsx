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
      className={`${className} w-full min-h-screen 800px:px-24 px-0 bg-green flex flex-col 1170px:gap-8 gap-0 1170px:flex-row relative text-light`}
    >
      {/* Texts on the left side */}
      <section
        className={`${className}__leftSide w-full 1170px:w-1/3 800px:px-0 phone:px-24 px-8 flex flex-col items-center 1170px:items-start justify-center gap-8 py-16 1170px:py-0`}
      >
        <h1 className="text-4xl tablet:text-5xl font-bold text-center 1170px:text-left">
          About Battlechan
        </h1>
        <p className="text-base font-normal text-center 1170px:text-left phone:text-base text-sm">
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
        className={`${className}__rightSide w-full 1170px:w-2/3 800px:px-0 tablet:px-12 phone:px-8 px-4 flex flex-col 1170px:flex-row justify-center items-center relative`}
      >
        <div className="w-full flex flex-col items-center 1170px:items-end gap-8 relative">
          <Cards />
          <img
            src={dollarCoin}
            alt="dollar coin"
            className="absolute pointer-events-none 1170px:w-[150px] big_tablet:w-[100px] w-[80px] 1170px:right-0 right-0 1170px:top-0 top-[-12%]"
          />
          <img
            src={dollarCoin}
            alt="dollar coin"
            className="absolute pointer-events-none big_tablet:w-[50px] w-[30px] left-[40%]  1170px:top-[53%] top-[43%] translate-x-[-50%] translate-y-[-50%]"
          />
          <img
            src={Sword}
            alt="Sword"
            className="absolute 1170px:w-auto big_tablet:w-[100px] w-[80px] pointer-events-none 1170px:top-[5%] top-[-15%] left-0"
          />
          <img
            src={Sword}
            alt="Sword"
            className="absolute 1170px:w-auto big_tablet:w-[100px] w-[80px] pointer-events-none 1170px:bottom-[2%] bottom-[7%] right-0 rotate-[180deg] "
          />
          <img
            src={like}
            alt="Thumbs up"
            className="absolute pointer-events-none 1170px:w-[200px] 1170px:w-[150px] w-[120px] 1170px:right-[-15%] right-[-10%] 1170px:top-[47%] big_tablet:top-[45%] phone:top-[50%] top-[35%] translate-x-[-50%] translate-y-[-50%]"
          />
          <img
            src={like}
            alt="Thumbs up"
            className="absolute pointer-events-none 1170px:w-[200px] big_tablet:w-[150px] w-[120px] 1170px:left-[15%] phone:left-[10%] left-[12%] 1170px:bottom-[2%] bottom-[5%] translate-x-[-50%] translate-y-[-50%] rotate-[180deg]"
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
      <div className="right-0 card bg-dark h-auto w-full xl:w-[700px] w-full xl:gap-4 gap-2 1170px:mt-40 mt-10 rounded-2xl flex items-center">
        <section className="left_image 1170px:w-1/3 tablet:w-[230px] phone:w-[150px] w-[120px] relative flex-wrap">
          <img
            src={tablet}
            alt="Big Image"
            className="h-full xl:w-full tablet:w-[150px] phone:w-[100px] w-[80px] mt-[-60px] tablet:pl-8 pl-4 pointer-events-none"
          />
        </section>

        <section className="right_content h-full 1170px:pr-8 pr-4 phone:pt-4 pt-2 1170px:pb-8 phone:pb-6 pb-4 1170px:px-8 px-4 flex gap-2 flex-col justify-between">
          <div className="right_content_top flex gap-2 items-end justify-between relative">
            <div className="tablet:w-[13%] w-[8%]">
              <img
                src={profile_pic}
                alt="Profile Photo"
                className="absolute bottom-4 tablet:w-[50px] w-[35px] pointer-events-none mb-2"
              />
            </div>
            <p className="name xl:text-xl tablet:text-lg text-md">
              Lannister Grey
            </p>
            <p className="date_and_time xl:text-base tablet:text-sm text-xs">
              Oct 29, 2023 ; 13:30
            </p>
            <p className="left_time xl:text-xl tablet:text-lg text-md">
              <span className="text-light-green">5:00</span> min left
            </p>
          </div>

          <p className="content tablet:text-base phone:text-sm text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.......
          </p>
        </section>
      </div>

      {/* Card 2 */}
      <div className="card bg-dark h-auto w-full xl:w-[700px] w-full xl:gap-4 gap-2 big_tablet:mb-36 mb-24 big_tablet::mt-24 mt-10 rounded-2xl flex items-center relative flex">
        <section className="left_image 1170px:w-1/3 tablet:w-[230px] phone:w-[150px] w-[120px] relative">
          <img
            src={tablet}
            alt="Big Image"
            className="h-full xl:w-full tablet:w-[150px] phone:w-[100px] w-[80px] mt-[-60px] tablet:pl-8 pl-4 pointer-events-none"
          />
        </section>

        <section className="right_content h-full 1170px:pr-8 pr-4 phone:pt-4 pt-2 1170px:pb-8 phone:pb-6 pb-4 1170px:px-8 px-4 flex gap-2 flex-col justify-between">
          <div className="right_content_top flex gap-2 items-end justify-between relative">
            <div className="tablet:w-[13%] w-[8%]">
              <img
                src={profile_pic}
                alt="Profile Photo"
                className="absolute bottom-4 tablet:w-[50px] w-[35px] pointer-events-none"
              />
            </div>
            <p className="name xl:text-xl tablet:text-lg text-md">
              Lannister Grey
            </p>
            <p className="date_and_time xl:text-base tablet:text-sm text-xs">
              Oct 29, 2023 ; 13:30
            </p>
            <p className="left_time xl:text-xl tablet:text-lg text-md">
              <span className="text-red">0:52</span> min left
            </p>
          </div>

          <p className="content tablet:text-base phone:text-sm text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.......
          </p>
        </section>
      </div>
    </React.Fragment>
  );
};

export default About;
