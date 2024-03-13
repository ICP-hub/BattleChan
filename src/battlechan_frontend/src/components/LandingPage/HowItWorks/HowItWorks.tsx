import React, { useState } from "react";

import Wallet from "../../../images/wallet.png";
import Voting from "../../../images/voting.png";
import newPost from "../../../images/createPost.png";

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

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(5);
  const className = "LandingPage-->HowItWorks";

  return (
    <div className={className + " h-[110vh] py-16 bg-dark text-light"}>
      <h1 className={className + "__heading font-bold text-5xl text-center"}>
        How It Works
      </h1>

      <div className="__cards flex-row-center my-16 gap-8 w-full justify-center">
        {cardsData &&
          cardsData.map((data, i: number) => (
            <div
              key={i}
              className={
                "howItWorks__card" +
                " bg-dark-green h-[520px] w-[340px] z-1 flex-col-center rounded-lg cursor-default relative" +
                " hover:bg-dirty-light-green hover:ease-in-out hover:duration-500"
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
                  " h-[80%] w-full z-2 px-8 py-20 gap-4 flex-direction-col absolute top-0 transition-all" +
                  " hover:translate-y-28 hover:ease-out hover:duration-500"
                }
              >
                <h1 className="text-5xl font-bold self-start">{`0${data.index}`}</h1>

                <h3 className="text-2xl font-bold">{data.text1}</h3>
                <p className="text-lg font-normal">{data.text2}</p>
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
