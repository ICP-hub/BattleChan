import React from "react";
import "./TrendingPost.scss";

import bg from "../../../images/trending_post_bg.png";
import Cover_Image from "../../../images/trendingPost_coverImg.png";
import Profile_Pic from "../../../images/trendingPost_profile.png";
import Card from "./Card";

const TrendingPost = () => {
  const darkColor = document.documentElement.className;
  const className = "LandingPage__TrendingPosts";

  return (
    <div
      className={
        className +
        ` w-full phone:gap-40 gap-24 tablet:pt-48 phone:pt-32 pt-20 bg-${
          darkColor == "dark" ? "[#121212]" : "light"
        } flex-direction-col bg-contain bg-top bg-no-repeat`
      }
      style={darkColor == "dark" ? { backgroundImage: `url(${bg})` } : {}}
    >
      {/* Trending data counts */}
      <section
        className={className + "__numbers flex-row-center justify-center px-4"}
      >
        {trendingData &&
          trendingData.map((item, index) => (
            <div
              className={`dataCard tablet:w-[220px] phone:w-[150px] w-[100px] tablet:h-[90px] h-[60px] gap-2 p-1 text-dark dark:text-light flex-col-center justify-between ${
                index >= 0 && index < trendingData.length - 1
                  ? `tablet:border-e-2 tablet:border-dark dark:border-light`
                  : ""
              }`}
            >
              <h1 className={`font-bold tablet:text-5xl text-4xl`}>{item.number}</h1>
              <p className={`tablet:text-base phone:text-sm text-xs font-normal text-center`}>{item.title}</p>
            </div>
          ))}
      </section>

      <section className={className + "__trendingPosts w-full"}>
        <h1 className="font-bold laptop:text-5xl text-4xl text-center px-2">
          This Week Trending Posts
        </h1>
        <br />
        <p className="laptop:text-2xl text-lg font-normal text-center px-2">
          Stay Ahead with Trending Posts & Explore the Posts Everyone's Talking
          About
        </p>

        {/* Cards block */}
        <div className={className + "__postCards my-20 w-full"}>
          <div className="w-full  xl:px-20 phone:pl-0 tablet:pl-16 phone:pl-12 pl-6 xl:overflow-hidden overflow-auto phone:gap-12 gap-6 xl:justify-center xl:flex-row-center flex flex-row">
            {postList.slice(0, 3).map((post, index) => (
              // Card
              <Card post={post} key={index} index={index} postList={postList} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrendingPost;

const postList = [
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
];

const trendingData = [
  { number: "4k+", title: "Community Members" },
  { number: "200", title: "Active Users" },
  { number: "4h", title: "Average Task Due Date" },
  { number: "$15", title: "Average Reward Per Task" },
];
