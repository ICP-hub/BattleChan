import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Comments from "./Comments";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";
import { useMediaQuery } from "@mui/material";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import TokensApiHanlder from "../../API_Handlers/tokens";
import { useConnect } from "@connect2ic/react";
import UserApiHanlder from "../../API_Handlers/user";

type Theme = {
  handleThemeSwitch: Function;
};

interface UserAnalytics {
  likedPost: number;
  postData: number;
  comments: number;
  userArchivedPost: number;
  dislikedPost: number;
  status: boolean;
}

const DashboardPage = (props: Theme) => {
  const className = "dashboard__dashboardPage";
  const is430px = useMediaQuery("(max-width: 430px)");
  const [livePost, setLivePost] = useState(0);
  const [archivePost, setArchivePost] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const [likedPost, setLikedPost] = React.useState(0);
  const likedPostRef = React.useRef(likedPost);
  const [dislikedPost, setDislikedPost] = React.useState(0);
  const dislikedPostRef = React.useRef(dislikedPost);
  const { getBalance } = TokensApiHanlder();
  const { getUserAnalytics } = UserApiHanlder();
  const { principal, isConnected } = useConnect();

  useEffect(() => {
    likedPostRef.current = likedPost;
    dislikedPostRef.current = dislikedPost;
  }, [likedPost, dislikedPost]);

  useEffect(() => {
    const fetchData = async () => {
      if (principal) {
        const data = await getBalance(principal || "");
        setTokenBalance(Number(data));
      }
    };

    fetchData();
  }, [principal]);

  useEffect(() => {
    async function getAnalytics() {
      try {
        const response = (await getUserAnalytics()) as UserAnalytics;

        setLivePost(response?.postData);
        setArchivePost(response?.userArchivedPost);
        setTotalComments(response?.comments);
        setLikedPost(response?.likedPost);
        setDislikedPost(response?.dislikedPost);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    }
    getAnalytics();
  }, []);

  const cardContainer =
    "laptop:w-[200px] big_tablet:w-[180px] phone:w-[30vw] small_phone:w-[150px] w-[130px] laptop:m-4 m-3 laptop:font-base phone:text-sm text-xs";
  const cardStyle =
    "bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md phone:p-8 p-4 text-light";

  const data01 = [
    { name: "Upvote", value: likedPostRef.current },
    { name: "Downvote", value: dislikedPostRef.current },
    { name: "Earned", value: 5 },
    { name: "Buy", value: 1 },
  ];

  return (
    <div className="min-h-screen dark:bg-dark dark:bg-green-gradient bg-[#ECECEC] bg-center-top bg-cover bg-no-repeat">
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
              " self-center grid grid-cols-[50%_minmax(0px,_1fr)] row-span-2 text-[#fff]"
            }
          >
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Live Post</div>
                <div className="font-bold phone:text-xl text-lg mt-2">
                  {livePost}
                </div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Archive Post</div>
                <div className="font-bold phone:text-xl text-lg mt-2">
                  {archivePost}
                </div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Total Comments</div>
                <div className="font-bold phone:text-xl text-lg mt-2">
                  {totalComments}
                </div>
              </div>
            </div>
            <div className={cardContainer}>
              <div className={cardStyle}>
                <div>Your Tokens</div>
                <div className="font-bold phone:text-xl text-lg mt-2">
                  {tokenBalance}
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
                  fill="#AFD198"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>

        <Posts />

        <Comments />
      </div>
    </div>
  );
};

export default DashboardPage;
