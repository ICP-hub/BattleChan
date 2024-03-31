import React, { useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import Comment from "./Comment";
import { useParams } from "react-router-dom";
import Cover_Image from "../../../images/trendingPost_coverImg.png";
import Profile_Pic from "../../../images/trendingPost_profile.png";
import postImage from "../../../images/trendingPost_coverImg.png";

import { PiShareFatBold } from "react-icons/pi";
import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { useMediaQuery } from "@mui/material";
import PostApiHanlder from "../../../API_Handlers/post";
//backend
// import { backend } from "../../../../../declarations/backend";

function convertNanosecondsToTimestamp(nanoseconds: bigint): string {
  const milliseconds = Number(nanoseconds) / 1000000; // Convert nanoseconds to milliseconds
  const date = new Date(milliseconds); // Convert milliseconds to a Date object

  // Get the month, day, year, hour, and minute from the Date object
  const month = date.toLocaleString('default', { month: 'short' }); // Short month name (e.g., Jan)
  const day = date.getDate(); // Day of the month (1-31)
  const year = date.getFullYear(); // Full year (e.g., 2023)
  const hour = date.getHours(); // Hour (0-23)
  const minute = date.getMinutes(); // Minute (0-59)
  // Format the timestamp string
  const timestamp = `${month} ${day},${year}; ${hour}:${minute < 10 ? '0' + minute : minute}`;

  return timestamp;
}

type Theme = {
  handleThemeSwitch: Function;
};

const post = {
  vote: true,
  commentCount: "750",
  timeToken: "250k",
  postId: "#12356890",
  coverImg: Cover_Image,
  ownerImage: Profile_Pic,
  ownerName: "Alexander Frem",
  date_and_time: "Oct 29,2023 ; 13:30",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
};

type PostInfo = {
  postId: string;
  postName: string;
  postMetaData: string;
  postDes: string;
  expireAt: BigInt;
  createdAt: string;
  upvotes: BigInt;
};

interface BackendResponse {
  status: boolean;
  data: []; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
}

const PostDetails = (props: Theme) => {
  // let postId = "123";
  const postId: string = useParams().postId ?? "";
  const decodedPostId = decodeURIComponent(postId);
  // console.log(decodedPostId);

  const [time, setTime] = useState("0:00");
  const [postsData, setPostsData] = useState<PostInfo>();
  const [vote, setVote] = React.useState(post.vote);
  const [showComments, setShowComments] = React.useState(true);
  const is700px = useMediaQuery("(min-width: 700px)");
  const { getSingleMainPost } = PostApiHanlder();

  const handleVote = (vote: boolean) => {
    setVote(vote);
  };

  useEffect(() => {
    if (!is700px) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
    getPostDetail(decodedPostId);
  }, [is700px]);

  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9); // Convert remaining time from nanoseconds to seconds
    const minutes = Math.floor(seconds / 60); // Get remaining minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    // console.log(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  async function getPostDetail(postId: string) {
    try {
      // const response = await backend.getArchivedPost(BigInt(10), BigInt(1));
      const response = (await getSingleMainPost(postId)) as BackendResponse;
      console.log(response);
      if (response.status === true && response.data) {
        console.log(response);
        const posts = response.data.flat(); // Flatten nested arrays if any
        posts.forEach((element: any) => {
          const timestamp: string = convertNanosecondsToTimestamp(BigInt(element.createdAt));
          console.log(timestamp);
          element.createdAt = timestamp;

          const interval = setInterval((expireAt: BigInt) => {
            const currentTime = BigInt(Date.now()) * BigInt(1000000); // Current time in nanoseconds
            const remainingTime = Number(expireAt) - Number(currentTime); // Convert BigInt to bigint for arithmetic

            if (remainingTime <= 0) {
              clearInterval(interval);
              setTime("0:00");
              console.log('Post archived');
            } else {
              setTime(formatTime(BigInt(remainingTime))); // Convert back to BigInt for formatting
            }
          }, 1000, BigInt(element.expireAt));
        });
        let data = posts[0];
        setPostsData(data);
        console.log(postsData);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <React.Fragment>
      <div
        className={`min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-top bg-contain bg-no-repeat`}
      >
        <Navbar handleThemeSwitch={props.handleThemeSwitch} />

        <div className="hidden tablet:block">
          <NavButtons />
        </div>

        <div className="w-full py-11 laptop:px-40 tablet:px-32 px-16 dark:text-[#fff] overflow-hidden">
          <h1 className="font-bold dark:text-[#fff] mb-2 tablet:text-3xl tablet:mb-8">
            {postsData?.postId}
          </h1>

          {/* post image  */}
          <div className="max-w-3xl">
            <img
              className="block h-auto w-full"
              src={postsData?.postMetaData}
              alt="post image"
            />

            <div className="mt-4 flex items-center text-[9px] tablet:px-2 tablet:text-sm justify-between">
              <div className="flex items-center gap-4">
                <div className="flex tablet:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <MdOutlineVerifiedUser />
                  <span>0</span>
                </div>

                <div className="flex tablet:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <LiaCommentSolid />
                  <span>{0} Comments</span>
                </div>

                {/* <div className="hidden tablet:flex tablet:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <PiShareFatBold />
                  <span>{135} Share</span>
                </div> */}
              </div>

              <div className="text-lg">
                <span className={`text-[#18AF00]`}>{time}</span> min left
              </div>
            </div>
          </div>

          {/* upvote and downvote button  */}
          <div className="flex gap-2 text-3xl mt-4 tablet:mt-11">
            <TbSquareChevronUpFilled
              className={`${vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                } cursor-pointer`}
              onClick={() => handleVote(true)}
            />

            <TbSquareChevronDownFilled
              className={`${!vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                } cursor-pointer`}
              onClick={() => handleVote(false)}
            />
          </div>

          {/* user avatar and post details  */}
          <div className="flex justify-between items-center mt-5 tablet:justify-start tablet:gap-8 tablet:mt-14">
            <div className="flex gap-2 items-center justify-center">
              <div className="w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded">
                <svg
                  className="w-5 h-5 tablet:w-9 tablet:h-9"
                  viewBox="0 0 11 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.50159 0.962891C6.12289 0.962891 6.71873 1.22769 7.15805 1.69904C7.59738 2.17039 7.84418 2.80967 7.84418 3.47625C7.84418 4.14284 7.59738 4.78212 7.15805 5.25347C6.71873 5.72482 6.12289 5.98962 5.50159 5.98962C4.8803 5.98962 4.28445 5.72482 3.84513 5.25347C3.40581 4.78212 3.159 4.14284 3.159 3.47625C3.159 2.80967 3.40581 2.17039 3.84513 1.69904C4.28445 1.22769 4.8803 0.962891 5.50159 0.962891ZM5.50159 7.2463C8.09016 7.2463 10.1868 8.37103 10.1868 9.75967V11.0163H0.816406V9.75967C0.816406 8.37103 2.91303 7.2463 5.50159 7.2463Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <h1 className="font-semibold tablet:text-lg text-md">
                Khushali
              </h1>
            </div>

            <div className="tablet:text-xs text-[10px] text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50">
              {postsData?.createdAt}; {postsData?.postId}
            </div>
          </div>

          {/* post catalog name and post content and comment */}
          <div className="mt-8 tablet:text-lg tablet:mt-10">
            <h1 className="font-bold mb-3">{postsData?.postName}</h1>
            <div className="dark:text-[#fff] dark:text-opacity-50 text-sm tablet:text-base">
              {postsData?.postDes}
            </div>
          </div>


          {/* comment for mobile  */}
          {/* {!showComments && ( */}
          {/* // <div className="tablet:hidden my-8"> */}
          {/* //   <button */}
          {/* //     onClick={() => setShowComments(true)} */}
          {/* //     className="small-button bg-light text-dark cursor-pointer font-semibold" */}
          {/* //   > */}
          {/* //     See Comments */}
          {/* //   </button> */}
          {/* // </div> */}
          {/* // )} */}

          {/* comment for desktop  */}
          {
            // <div className={`mt-8 ${showComments ? "block" : "hidden"}`}>
            //   <h1 className="font-bold tablet:text-lg">Comments</h1>
            //   <div className="mt-8">
            //     <Comment />
            //   </div>
            // </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostDetails;
