import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Comments from "./Comments";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";
import { useMediaQuery } from "@mui/material";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

type Theme = {
  handleThemeSwitch: Function;
};

const DashboardPage = (props: Theme) => {
  const className = "dashboard__dashboardPage";
  const is430px = useMediaQuery("(max-width: 430px)");

  const cardContainer =
    "laptop:w-[200px] big_tablet:w-[180px] phone:w-[30vw] small_phone:w-[150px] w-[130px] laptop:m-4 m-3 laptop:font-base phone:text-sm text-xs";
  const cardStyle =
    "bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md phone:p-8 p-4 text-light";

  const data01 = [
    { name: "Upvote", value: 125 },
    { name: "Downvote", value: 15 },
    { name: "Earned", value: 120 },
    { name: "Buy", value: 100 },
  ];

  return (
    <div className="min-h-screen bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-center-top bg-cover bg-no-repeat">
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <NavButtons />

      <div className={className + " " + `h-full w-full laptop:py-10 py-5`}>
        <h1 className="laptop:text-4xl text-laptop:text-4xl tablet:text-3xl small_phone:text-2xl text-lg text-dark dark:text-light font-bold text-center tablet:mb-8 mb-4">
          Dashboard
        </h1>

        <div
          className={
            className +
            "__cardSection " +
            "w-full laptop:py-8 py-4 laptop:gap-8 gap-2 laptop:px-0 phone:px-4 big_tablet:flex-row-center flex-col-center flex-col-reverse justify-center"
          }
        >
          <div
            className={
              className +
              "__leftSection " +
              " self-center grid grid-cols-[50%_minmax(0px,_1fr)] row-span-2"
            }
          >
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Live Post</div>
                <div className="font-bold phone:text-xl text-lg mt-2">15</div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Archive Post</div>
                <div className="font-bold phone:text-xl text-lg mt-2">7</div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Total Comments</div>
                <div className="font-bold phone:text-xl text-lg mt-2">205</div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Your Tokens</div>
                <div className="font-bold phone:text-xl text-lg mt-2">
                  190.00
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              className + "__rightSection " + " flex-row-center flex-wrap"
            }
          >
            <div
              id="chart"
              className="big_tablet:w-auto w-full bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md tablet:p-7 p-4"
            >
              <PieChart
                width={is430px ? 250 : 280}
                height={is430px ? 180 : 220}
              >
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data01}
                  cx={is430px ? 120 : 140}
                  cy={is430px ? 90 : 110}
                  outerRadius={is430px ? 60 : 80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>

        <Posts />

        <Comments />

        {/* <div
          className={
            className +
            "__bottom " +
            "w-full gap-2 flex-row-center justify-between mb-3 py-8 xl:px-52 laptop:px-40 big_tablet:px-32 phone:px-12 px-4 font-sans text-base"
          }
        >
          <div className="flex flex-col items-start font-bold tablet:text-lg phone:text-base text-sm">
            <p>
              $Time Balance : <span>{"5209"}</span>
            </p>
            <p>
              $Time available for withdraw : <span>{"109"}</span>
            </p>
          </div>

          <button className="small-button bg-dark text-light dark:bg-light dark:text-dark rounded-lg">
            Withdraw
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
