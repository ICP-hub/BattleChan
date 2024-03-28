import React from "react";

import Wallet from "../../../images/wallet.png";
import Voting from "../../../images/voting.png";
import newPost from "../../../images/createPost.png";

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(5);
  const className = "LandingPage__HowItWorks";

  return (
    <div
      className={className + " h-full w-full xl:py-24 py-20 bg-dark text-light"}
    >
      <h1 className={className + "__heading font-bold laptop:text-5xl text-4xl text-center"}>
        How It Works
      </h1>

      <div
        className={
          "__cards" +
          " big_tablet:flex-row-center flex-col-center w-full justify-center" +
          " xl:gap-12 gap-4 xl:mt-24 mt-16"
        }
      >
        {cardsData &&
          cardsData.map((data, i: number) => (
            <div
              key={i}
              className={
                "howItWorks__card" +
                " bg-dark-green z-1 flex-col-center rounded-lg cursor-default relative" +
                " hover:bg-dirty-light-green hover:ease-in-out hover:duration-500" +
                " xl:h-[520px] xl:w-[340px] laptop:h-[470px] laptop:w-[300px] big_tablet:h-[420px] big_tablet:w-[260px] phone:h-[470px] phone:w-[330px] h-[400px] w-[75vw]"
              }
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(5)}
            >
              {/* Image hidden in the back */}
              <div
                className="__hidden h-full w-full absolute top-0 flex-col-center transition-opacity duration-500"
                style={{ opacity: hoveredIndex === i ? 1 : 0 }}
              >
                <img
                  src={data.backImage}
                  alt="Back side image"
                  className="mt-8 w-[180px]"
                />
              </div>

              {/* The text on the font */}
              <div
                className={
                  "__displayed" +
                  " h-full w-full z-2 flex-direction-col absolute top-0 transition-all" +
                  " hover:ease-out hover:duration-500" +
                  " xl:px-8 xl:py-20 px-4 py-16 xl:gap-4 big_tablet:gap-1 phone:gap-4 gap-4"
                }
                style={{
                  transform: hoveredIndex === i ? "translateY(25%)" : "",
                  height: hoveredIndex === i ? "80%" : "100%",
                }}
              >
                <h1 className="text-5xl font-bold self-start">{`0${data.index}`}</h1>

                <h3 className="font-bold laptop:text-2xl big_tablet:text-lg phone:text-2xl text-lg">
                  {data.text1}
                </h3>
                <p className="font-normal xl:text-lg big_tablet:text-base phone:text-lg text-base">{data.text2}</p>
              </div>

              {/* Button */}
              <button type="button" className="white-button absolute bottom-8">
                {data.buttonText}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HowItWorks;

const cardsData = [
  {
    index: 1,
    text1: "Setup and connect your wallet.",
    text2:
      "Use Trust Wallet, Metamask or any wallet to connect to multiple chains the app.",
    buttonText: "ICP Wallet",
    backImage: Wallet,
  },
  {
    index: 2,
    text1: "Find or create a post that matches your skills",
    text2: "Create Post and participate in the battle of supermacy.",
    buttonText: "Create Post",
    backImage: newPost,
  },
  {
    index: 3,
    text1: "Upvote or Downvote a post to participate in battle",
    text2: "Show your opinion by upvoting and downvoting post.",
    buttonText: "Visit App",
    backImage: Voting,
  },
];
