import React, { useState, useEffect } from "react";

import { LuPlusCircle } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";
import { MdOutlineAddBusiness } from "react-icons/md";

import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";
import CreatePostBtn from "../Body/CreatePostBtn";

import { backend } from "../../../../../declarations/backend";
import { IoEllipse } from "react-icons/io5";
import trendingPost_coverImg from "../../../images/trendingPost_coverImg.png";
import mybalance_Img from "../../../images/my-balance-img.png";
import UserApiHanlder from "../../../API_Handlers/user";
import TokensApiHanlder from "../../../API_Handlers/tokens";
import { useConnect } from "@connect2ic/react";

type Theme = {
  handleThemeSwitch: Function;
  type?: string;
};

interface DataItem {
  message: string;
  username?: string;
  time: string;
  tokenChange: number;
  imageUrl: string;
}

interface UserAnalytics {
  likedPost: number;
  postData: number;
  comments: number;
  userArchivedPost: number;
  dislikedPost: number;
  status: boolean;
};

const data: DataItem[] = [
  {
    message: "Upvote: Kd_1129 with post Id #1256320000",
    username: "Kd_1129",
    time: "3hrs ago",
    tokenChange: -1,
    imageUrl: trendingPost_coverImg,
  },
  {
    message:
      "Downvote: Kd_1129 with post Id #1256320000",
    username: "Kd_1129",
    time: "3hrs ago",
    tokenChange: -1,
    imageUrl: trendingPost_coverImg,
  },
  {
    message: "You Earn 100$ Time token on Buying.",
    time: "3hrs ago",
    tokenChange: 100,
    imageUrl: trendingPost_coverImg,
  },
];

const Analytics = (props: Theme) => {
  const [likedPost, setLikedPost] = React.useState(0);
  const [dislikedPost, setDislikedPost] = React.useState(0);
  const [tokenBalance, setTokenBalance] = React.useState(0);

  const { getBalance } = TokensApiHanlder();
  const { getUserAnalytics } = UserApiHanlder();
  const { principal, isConnected } = useConnect();

  useEffect(() => {
    const fetchData = async () => {
      if (principal) {
        const data = await getBalance(principal || "");
        setTokenBalance(Number(data));
      }
    };

    // Add dependencies to the dependency array to avoid infinite loop
    fetchData();
  }, [principal]);

  // Get Total Post's Counts
  useEffect(() => {
    async function getAnalytics() {
      try {
        const response = (await getUserAnalytics()) as UserAnalytics;
        // console.log(response);
        setLikedPost(response?.likedPost);
        setDislikedPost(response?.dislikedPost);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    }
    getAnalytics();
  }, []);

  return (
    <>
      <div
        className={`min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-top bg-contain bg-no-repeat relative`}
      >
        <Navbar handleThemeSwitch={props.handleThemeSwitch} />
        <NavButtons />

        <div className="dark:text-[#fff] px-6 tablet:px-10 gap-8 flex flex-col">
          <h1 className="font-bold text-center tablet:pt-12 pt-5 laptop:text-4xl phone:text-3xl text-2xl">
            Time Balance
          </h1>

          {/* balance check  */}
          <div className="bg-green rounded-[10px] p-4 relative overflow-hidden">
            {/* balance check and sports/filter button */}
            <div className="flex justify-between items-center text-[#fff]">
              <h2 className="font-bold tablet:text-3xl tablet:ml-11">
                Balance Check
              </h2>
              <div className="flex items-center justify-center gap-2 z-10">
                <button className="border border-[#fff] dark:border-[#fff] text-[#fff] dark:text-[#fff] rounded-md phone:px-6 px-4 py-2 font-semibold text-xs tablet:text-base">
                  Today
                </button>
                {/* <button className="flex items-center justify-center bg-[#fff] dark:bg-[#fff] text-[#000] dark:text-[#000] rounded-md phone:px-6 px-4 py-2 font-semibold text-xs tablet:text-base">
                  <svg
                    className="w-3 h-3 tablet:w-5 tablet:h-5 text-gray-800 dark:text-white mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
                    />
                  </svg>
                  Filter
                </button> */}
              </div>
            </div>
            {/* my balance  */}
            <div className="bg-[#2A4B2F] rounded-[10px] flex gap-2 tablet:gap-7 items-center mt-6 p-3 text-[#fff]">
              <div className="bg-[#fff] rounded-md w-32 tablet:w-48">
                <img
                  className="block h-20 tablet:h-32 w-full object-cover"
                  src={mybalance_Img}
                  alt="myBalance img"
                />
              </div>
              <div>
                <h3 className="">My Balance</h3>
                <div className="font-bold text-xl tablet:text-3xl">{tokenBalance}</div>
              </div>
            </div>
            <svg
              className="hidden tablet:block absolute w-[315.25px] h-[315.25px] right-0 top-[-44px]"
              viewBox="0 0 261 193"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.3024 65.1058L157.623 -43.382L306.944 65.1058L249.908 240.643H65.3378L8.3024 65.1058Z"
                stroke="url(#paint0_linear_1658_9871)"
              />
              <path
                d="M27.7473 71.9243L157.248 -22.1637L286.749 71.9243L237.284 224.162H77.2123L27.7473 71.9243Z"
                stroke="url(#paint1_linear_1658_9871)"
              />
              <path
                d="M50.0838 79.1845L157.243 1.32897L264.402 79.1845L223.471 205.157H91.0149L50.0838 79.1845Z"
                stroke="url(#paint2_linear_1658_9871)"
              />
              <path
                d="M70.2699 85.7411L157.249 22.5472L244.228 85.7411L211.005 187.991H103.493L70.2699 85.7411Z"
                stroke="url(#paint3_linear_1658_9871)"
              />
              <path
                d="M85.4178 90.163L157.622 37.7035L229.826 90.163L202.247 175.044H112.997L85.4178 90.163Z"
                stroke="url(#paint4_linear_1658_9871)"
              />
              <path
                d="M101.253 95.8105L157.241 55.1327L213.23 95.8105L191.844 161.629H122.639L101.253 95.8105Z"
                stroke="url(#paint5_linear_1658_9871)"
              />
              <path
                d="M115.686 99.9972L157.621 69.5301L199.555 99.9972L183.537 149.294H131.704L115.686 99.9972Z"
                stroke="url(#paint6_linear_1658_9871)"
              />
              <path
                d="M127.218 103.745L157.621 81.6556L188.024 103.745L176.411 139.485H138.831L127.218 103.745Z"
                stroke="url(#paint7_linear_1658_9871)"
              />
              <path
                d="M135.874 106.555L157.629 90.7494L179.383 106.555L171.074 132.129H144.184L135.874 106.555Z"
                stroke="url(#paint8_linear_1658_9871)"
              />
              <path
                d="M143.063 109.392L157.25 99.0848L171.437 109.392L166.018 126.07H148.482L143.063 109.392Z"
                stroke="url(#paint9_linear_1658_9871)"
              />
              <path
                d="M148.1 111.031L157.242 104.39L166.384 111.031L162.892 121.778H151.592L148.1 111.031Z"
                stroke="url(#paint10_linear_1658_9871)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1658_9871"
                  x1="246.796"
                  y1="-8.20512"
                  x2="157.623"
                  y2="271.246"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1658_9871"
                  x1="234.632"
                  y1="8.28065"
                  x2="157.248"
                  y2="250.785"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1658_9871"
                  x1="221.336"
                  y1="26.4385"
                  x2="157.243"
                  y2="227.294"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1658_9871"
                  x1="209.338"
                  y1="42.8382"
                  x2="157.249"
                  y2="206.075"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1658_9871"
                  x1="200.923"
                  y1="54.4666"
                  x2="157.622"
                  y2="190.162"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1658_9871"
                  x1="190.896"
                  y1="68.0238"
                  x2="157.241"
                  y2="173.49"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_1658_9871"
                  x1="182.915"
                  y1="79.0655"
                  x2="157.621"
                  y2="158.333"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_1658_9871"
                  x1="176.056"
                  y1="88.4375"
                  x2="157.621"
                  y2="146.209"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear_1658_9871"
                  x1="170.919"
                  y1="95.4662"
                  x2="157.629"
                  y2="137.115"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint9_linear_1658_9871"
                  x1="166.039"
                  y1="101.995"
                  x2="157.25"
                  y2="129.537"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint10_linear_1658_9871"
                  x1="163.03"
                  y1="106.095"
                  x2="157.242"
                  y2="124.232"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* upvote downvote buy earn from others cards  */}
          <div className="flex items-center flex-wrap justify-center text-[#fff]">
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Upvote</div>
                <div className="font-bold text-xl mt-2">{likedPost}</div>
              </div>
            </div>
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Downvote</div>
                <div className="font-bold text-xl mt-2">{dislikedPost}</div>
              </div>
            </div>
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Buy</div>
                <div className="font-bold text-xl mt-2">100</div>
              </div>
            </div>
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Earn From Others</div>
                <div className="font-bold text-xl mt-2">33</div>
              </div>
            </div>
          </div>

          {/* transaction overview  */}
          <div className="pb-28">
            <h1 className="font-semibold text-lg text-center mb-8 tablet:text-2xl">
              Transaction Overview
            </h1>

            <div>
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6"
                >
                  {/* message  */}
                  <div className="text-sm max-w-60 tablet:max-w-none items-center">
                    <div>
                      {item.message.split(" ").map((word, index) => {
                        if (word === "Upvote:") {
                          return (
                            <span key={index} className="text-[#18AF00]">
                              {word}{" "}
                            </span>
                          );
                        } else if (word === "Downvote:") {
                          return (
                            <span key={index} className="text-red">
                              {word}{" "}
                            </span>
                          );
                        } else if (
                          item.username &&
                          word.includes(item.username ?? "")
                        ) {
                          return <strong key={index}>{word} </strong>;
                        } else {
                          return <span key={index}>{word} </span>;
                        }
                      })}
                    </div>

                    {/* time  */}
                    <div className="mt-2 dark:text-[#fff] dark:text-opacity-50">
                      <i>{item.time}</i>
                    </div>
                  </div>
                  {/* image  */}
                  <div className="flex items-center pl-2">
                    {/* number of token loss/gain */}
                    <div
                      className={
                        item.tokenChange > 0
                          ? "text-[#18AF00] font-semibold mr-2 tablet:mr-4"
                          : "text-red mr-2 tablet:mr-4"
                      }
                    >
                      {item.tokenChange > 0
                        ? `+${item.tokenChange}`
                        : item.tokenChange}
                    </div>
                    <div className="w-24">
                      <img
                        className="block h-auto w-full rounded"
                        src={item.imageUrl}
                        alt="post image"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6">
              <div className="text-sm max-w-60 tablet:max-w-none items-center">
                <div>
                  You loss one token by{" "}
                  <span className="text-[#18AF00]">Upvoting</span>{" "}
                  <strong>{"Kd_1129"}</strong> with post Id #{"1256320000"}
                </div>

                <div className="mt-2 dark:text-[#fff] dark:text-opacity-50">
                  <i>3hrs ago</i>
                </div>
              </div>
              <div className="flex items-center pl-2">
                <div className="text-red mr-2">-1</div>
                <div className="w-24">
                  <img
                    className="block h-auto w-full rounded"
                    src="/src/images/trendingPost_coverImg.png"
                    alt="post image"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6">
              <div className="text-sm max-w-60 tablet:max-w-none items-center">
                <div>You Earn 100$ Time token on Buying.</div>

                <div className="mt-2 dark:text-[#fff] dark:text-opacity-50">
                  <i>3hrs ago</i>
                </div>
              </div>
              <div className="flex items-center pl-2">
                <div className="text-[#18AF00] font-semibold mr-2">+100</div>
                <div className="w-24">
                  <img
                    className="block h-auto w-full rounded"
                    src="/src/images/trendingPost_coverImg.png"
                    alt="post image"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
