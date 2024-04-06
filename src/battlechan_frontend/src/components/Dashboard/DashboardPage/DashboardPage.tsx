import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";
import Posts from "./Posts";
import Comments from "./Comments";
import ApexCharts from "react-apexcharts";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

type Theme = {
  handleThemeSwitch: Function;
};

type Width = {
  chart: boolean;
};

const DashboardPage = (props: Theme) => {
  const className = "dashboard__dashboardPage";
  const cardContainer =
    "laptop:w-[200px] big_tablet:w-[180px] phone:w-[30vw] w-[150px] laptop:m-4 m-3 laptop:font-base text-sm text-light";
  const cardStyle =
    "bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md phone:p-8 p-4";

  const options = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    stroke: {
      width: 1,
      colors: undefined,
    },
    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const data01 = [
    { name: 'Upvote', value: 125 },
    { name: 'Downvote', value: 15 },
    { name: 'Earned', value: 120 },
    { name: 'Buy', value: 100 },
  ];

  // useEffect(() => {
  //   const chart = new ApexCharts(document.querySelector("#chart"), options);
  //   chart.render();

  //   // Clean up the chart on unmount
  //   return () => chart.destroy();
  // }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="min-h-screen bg-light dark:bg-dark dark:bg-green-gradient bg-center-top bg-cover bg-no-repeat">
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <NavButtons />

      <div
        className={
          className +
          " " +
          `h-full w-full laptop:py-10 py-5 text-dark dark:text-light`
        }
      >
        <h1 className="laptop:text-4xl phone:text-3xl text-2xl font-bold text-center tablet:mb-8 mb-4">
          Dashboard
        </h1>

        <div
          className={
            className +
            "__cardSection " +
            "w-full laptop:py-8 py-4 laptop:gap-8 gap-2 laptop:px-0 px-4 big_tablet:flex-row-center flex-col-center flex-col-reverse justify-center"
          }
        >
          <div
            className={
              className +
              "__leftSection " +
              " big_tablet:self-end self-center grid grid-cols-[50%_minmax(0px,_1fr)] row-span-2"
            }
          >
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Live Post</div>
                <div className="font-bold text-xl mt-2">15</div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Archive Post</div>
                <div className="font-bold text-xl mt-2">7</div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Total Comments</div>
                <div className="font-bold text-xl mt-2">205</div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Your Tokens</div>
                <div className="font-bold text-xl mt-2">190.00</div>
              </div>
            </div>
          </div>


{/* 
          <div
            className={
              className + "__rightSection " + " flex-row-center flex-wrap"
            }
          >
            <div
              id="chart"
              className="big_tablet:w-auto w-full bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md laptop:p-8 big_tablet:p-2 py-4 small_phone:px-12 px-4"
            >
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data01}
                  cx={200}
                  cy={200}
                  outerRadius={150}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </div> */}
        </div>

        <Posts />

        <Comments />

        {/* <div
          className={
            className +
            "__bottom " +
            "w-full flex-row-center justify-between mb-3 py-8 xl:px-52 laptop:px-40 big_tablet:px-32 px-12 font-sans text-base"
          }
        >
          <div className="flex flex-col items-start font-bold tablet:text-lg text-base">
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
