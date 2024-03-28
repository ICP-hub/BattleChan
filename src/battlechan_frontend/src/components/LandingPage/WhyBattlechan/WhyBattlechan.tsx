import React from "react";

import { GoPasskeyFill } from "react-icons/go";
import { MdVerifiedUser } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import image1 from "../../../images/why_battlechan1.png";
import image2 from "../../../images/why_battlechan2.png";
import bg from "../../../images/why_battalechan_bg.png";

const WhyBattlechan = () => {
  const darkColor = document.documentElement.className;
  const className = "LandingPage__WhyBattelchan";

  return (
    <div
      className={
        className +
        ` w-full xl:py-40 laptop:py-32 phone:py-24 py-16 xl:px-36 laptop:px-12 tablet:px-32 phone:px-20 px-12 laptop:gap-4 gap-20 laptop:flex-direction-row flex-col-center ${
          darkColor == "dark" ? "bg-[#121212]" : "light"
        } text-dark dark:text-light`
      }
    >
      {/* Texts and content */}
      <section className="__texts laptop:w-1/2 w-full gap-16 flex-direction-col justify-between">
        <h1 className="laptop:text-5xl text-4xl font-bold">Why Battlechan?</h1>

        <div className="answersList gap-8 flex flex-col">
          <div className="answer_1 flex flex-row items-base gap-4">
            <GoPasskeyFill className="text-3xl" />
            <div className="__text flex flex-col gap-4">
              <h3 className="font-bold laptop:text-2xl text-lg">
                Post Ownership
              </h3>
              <p className="laptop:text-base text-sm">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </div>
          <div className="answer_2 flex flex-row items-base gap-4">
            <MdVerifiedUser className="text-3xl" />
            <div className="__text flex flex-col gap-4">
              <h3 className="font-bold laptop:text-2xl text-lg">
                Transparency and Trust
              </h3>
              <p className="laptop:text-base text-sm">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </div>
          <div className="answer_3 flex flex-row items-base gap-4">
            <FaMoneyBillTrendUp className="text-3xl" />
            <div className="__text flex flex-col gap-4">
              <h3 className="font-bold laptop:text-2xl text-lg">
                Economic Incentives
              </h3>
              <p className="laptop:text-base text-sm">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section
        className="__images laptop:w-1/2 w-full bg-no-repeat bg-center bg-contain flex-row-center justify-center"
        style={darkColor == "dark" ? { backgroundImage: `url(${bg})` } : {}}
      >
        <img
          src={image1}
          alt="Reasons why choose battle chan image"
          className="h-full xl:w-[250px] w-[220px] object-contain pointer-events-none"
        />
        <img
          src={image2}
          alt="Reasons why choose battle chan image"
          className=" xl:w-[250px] w-[220px] object-contain pointer-events-none"
        />
      </section>
    </div>
  );
};

export default WhyBattlechan;
