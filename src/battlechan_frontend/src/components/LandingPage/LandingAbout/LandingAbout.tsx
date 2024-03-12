import React from "react";

import { FiArrowRight } from "react-icons/fi";
import Sword from "../../../images/sword.png";
import like from "../../../images/like.png";
import tab from "../../../images/tablet.png";
import dollarCoin from "../../../images/dollar_coin.png";
import profile_pic from "../../../images/profilePic.png";

// interface contentTypes {
//   index: number;
//   name: string;
//   constant: string;
//   date_and_time: string;
//   left_time: string;
//   profile_photo: string;
// }

const content = [
  {
    index: 1,
    name: "Lannister Grey",
    constant:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.......",
    date_and_time: "Oct 29,2023 : 13:30",
    left_time: `5:00 min left`,
    big_image: tab,
    profile_photo: profile_pic,
  },
  {
    index: 2,
    name: "Lannister Grey",
    constant:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.......",
    date_and_time: "Oct 29,2023 : 13:30",
    left_time: `0:52 min left`,
    big_image: tab,
    profile_photo: profile_pic,
  },
];

const LandingAbout = () => {
  const className = "LandingAbout";

  return (
    <div className={className + " w-full h-[80vh] bg-green flex-direction-row"}>
      <section
        className={
          className +
          "__leftSide w-1/3 h-full gap-8 pl-24 py-24 flex flex-col items-start justify-evenly"
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

      <section className={className + "__rightSide relative"}>
        {content &&
          content.map((item, i) => (
            <div
              className="card bg-dark h-[160px] w-[760px] gap-8 m-8 rounded-2xl flex-row-center relative"
              key={i}
            >
              <section className="image">
                <img
                  src={item.big_image}
                  alt="Big Image"
                  className=" bottom-12 pl-8 absolute"
                />
              </section>

              <section className="content flex-col-center">
                <div className="top flex-row-center">
                  <div className="profileImage relative">
                    <img
                      src={item.profile_photo}
                      alt="Profile Photo"
                      className="absolute bottom-4"
                    />
                  </div>
                  <p className="name text-xl">{item.name}</p>
                  <p className="date_and_time">{item.date_and_time}</p>
                  <p className="left_time text-xl">{item.left_time}</p>
                </div>

                <p className="px-24 pb-8">{item.constant}</p>
              </section>
            </div>
          ))}

        <img src={Sword} alt="Sword" className="absolute" />
        <img src={Sword} alt="Sword" className="absolute" />
        <img src={like} alt="Thumbs up" className="absolute" />
        <img src={like} alt="Thumbs up" className="absolute" />
        <img src={like} alt="Thumbs up" className="absolute" />
        <img src={like} alt="Thumbs up" className="absolute" />
        <img src={dollarCoin} alt="dollar coin" className="absolute" />
        <img src={dollarCoin} alt="dollar coin" className="absolute" />
      </section>
    </div>
  );
};

export default LandingAbout;
