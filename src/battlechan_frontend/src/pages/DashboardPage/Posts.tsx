import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Constant from "../../utils/constants";
import UserApiHanlder from "../../API_Handlers/user";
import PostApiHanlder from "../../API_Handlers/post";

type TdTagProps = {
  para: any;
};

interface PostData {
  postId: string;
  postMetaData: Int8Array;
  postName: string;
  upvotedBy: [];
  expireAt: BigInt;
  createdAt: string;
}

interface PostResponse {
  status: boolean;
  data: PostData[][];
  error: string[];
}

const Posts = () => {
  const className = "dashboard__postData";
  const padding =
    "tablet:py-4 py-2 xl:px-52 laptop:px-40 big_tablet:px-32 tablet:px-12 phone:px-8 px-4";

  const [postData, setPostData] = useState<PostData[]>([]);
  const { getPostInfo } = UserApiHanlder();
  const { getUsersMainPosts, getUsersArchivePosts } = PostApiHanlder();
  const { convertInt8ToBase64, convertNanosecondsToTimestamp } = Constant();
  const fontSize = "tablet:text-base phone:text-sm text-xs";
  const currentTime = BigInt(Date.now()) * BigInt(1000000);

  console.log("postData: ", postData);
  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9); // Convert remaining time from nanoseconds to seconds
    const minutes = Math.floor(seconds / 60); // Get remaining minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    // console.log(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = (await getUsersMainPosts()) as PostResponse;
      if (response.status == true && response.data.length > 0) {
        console.log(response);
        const posts = response.data.flat();
        setPostData(posts);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <header
        className={
          className +
          " " +
          padding +
          " " +
          "flex items-center justify-between font-sans text-base"
        }
      >
        <h1 className="tablet:text-2xl text-lg font-bold dark:text-[#fff]">
          Popular
        </h1>
        {/* <div className="flex items-center justify-center gap-2">
          <button className="tablet:text-base text-xs border border-[#000] dark:border-[#fff] text-[#000] dark:text-[#fff] rounded-md px-6 py-2 font-semibold">
            Sports
          </button>
          <button className="flex items-center justify-center tablet:text-base text-xs bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000]  rounded-md px-6 py-2 font-semibold">
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          </button>
        </div> */}
      </header>

      <div
        className={
          className +
          "__table " +
          padding +
          " " +
          fontSize +
          " " +
          "w-full phone:mb-8 mb-4"
        }
      >
        <table className="w-full bg-dirty-light-green text-light rounded-lg">
          {tableHeading.map((name, i) => (
            <thead className="border-b" key={i}>
              <ThTag para={name.id} />
              <ThTag para={name.date_time} />
              <ThTag para={name.votes} />
              <ThTag para={name.time} />
            </thead>
          ))}

          <tbody>
            {postData.map((post, i) => (
              <tr key={post.postId}>
                <TdTag para={post.postId} />
                <TdTag
                  para={convertNanosecondsToTimestamp(BigInt(post.createdAt))}
                />
                <TdTag para={post.upvotedBy.length} />
                <TdTag
                  para={
                    Number(post.expireAt) - Number(currentTime) <= 0
                      ? "0:00"
                      : formatTime(
                          BigInt(Number(post.expireAt) - Number(currentTime))
                        )
                  }
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Posts;

const TdTag: React.FC<TdTagProps> = ({ para }) => {
  return <td className="tablet:py-5 py-3 text-center">{para}</td>;
};

const ThTag: React.FC<TdTagProps> = ({ para }) => {
  return <th className="tablet:py-5 py-3 text-center">{para}</th>;
};

const tableHeading = [
  {
    id: "Post ID",
    date_time: "Date and Time",
    votes: "Total Votes",
    time: "Time Left",
  },
];
const tableData = [
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
];
