import React from "react";

import { GoPasskeyFill } from "react-icons/go";
import { MdVerifiedUser } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import image1 from "../../../images/why_battlechan1.png";
import image2 from "../../../images/why_battlechan2.png";
import bg from "../../../images/why_battalechan_bg.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const WhyBattlechan = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "LandingPage__WhyBattelchan";

  return (
    <div
      className={
        className +
        ` w-full py-40 px-40 flex-direction-row ${
          darkColor ? "bg-[#121212]" : "light"
        } text-${lightColor}`
      }
    >
      {/* Texts and content */}
      <section className="__texts w-1/2 flex-direction-col justify-between">
        <h1 className=" text-5xl font-bold">Why Battlechan?</h1>

        <div className="answersList gap-8 flex flex-col">
          <div className="answer_1 flex flex-row items-base gap-4">
            <GoPasskeyFill className="text-3xl" />
            <div className="__text flex flex-col gap-4">
              <h3 className="font-bold text-2xl">Post Ownership</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </div>
          <div className="answer_2 flex flex-row items-base gap-4">
            <MdVerifiedUser className="text-3xl" />
            <div className="__text flex flex-col gap-4">
              <h3 className="font-bold text-2xl">Transparency and Trust</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </div>
          <div className="answer_3 flex flex-row items-base gap-4">
            <FaMoneyBillTrendUp className="text-3xl" />
            <div className="__text flex flex-col gap-4">
              <h3 className="font-bold text-2xl">Economic Incentives</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, to
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section
        className="__images w-1/2 bg-no-repeat bg-center bg-contain flex-row-center justify-center"
        style={darkColor == "dark" ? { backgroundImage: `url(${bg})` } : {}}
      >
        <img
          src={image1}
          alt="Reasons why choose battle chan image"
          className="h-full w-[250px] "
        />
        <img
          src={image2}
          alt="Reasons why choose battle chan image"
          className=" w-[250px] "
        />
      </section>
    </div>
  );
};

export default WhyBattlechan;
