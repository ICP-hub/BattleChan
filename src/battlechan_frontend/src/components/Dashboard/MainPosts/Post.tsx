import React, { useState, useEffect } from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";

interface PostProps {
  id: string;
  imageUrl: string;
  userAvatarUrl: string;
  userName: string;
  timestamp: string;
  duration: string;
  content: string;
  likes: string;
  comments: number;
  expireAt: BigInt;
  type?: string;
}

const Post: React.FC<PostProps> = ({
  id,
  imageUrl,
  userAvatarUrl,
  userName,
  timestamp,
  duration,
  content,
  likes,
  comments,
  expireAt,
  type,
}) => {
  const [time, setTime] = useState("0:00");
  const [vote, setVote] = React.useState(true);
  const className = "Dashboard__MainPosts__Post";

  const handleVote = (vote: boolean) => {
    setVote(vote);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = BigInt(Date.now()) * BigInt(1000000); // Current time in nanoseconds
      const remainingTime = Number(expireAt) - Number(currentTime); // Convert BigInt to bigint for arithmetic

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime("0:00");
        console.log("Post archived");
      } else {
        setTime(formatTime(BigInt(remainingTime))); // Convert back to BigInt for formatting
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]); // Run effect when expireAt changes

  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9); // Convert remaining time from nanoseconds to seconds
    const minutes = Math.floor(seconds / 60); // Get remaining minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    // console.log(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  console.log(type)

  return (
    <div
      className={
        className +
        " " +
        `flex flex-col gap-4 tablet:gap-6 big_tablet:p-5 p-3 rounded-md border border-dark dark:border-[#FEFFFE] border-opacity-50 ${
          type === "archive" ? "bg-[#00000033] dark:bg-[#FFFFFF33]" : ""
        }`
      }
    >
      {/* Top section with image, user image and more info */}
      <section className="flex flex-row gap-4 items-start">
        <img
          alt="post image"
          className={`block big_tablet:w-28 w-24 rounded-lg aspect-square object-cover`}
          src={imageUrl}
        />

        <div className="flex flex-col gap-2">
          {/* User and post data on top */}
          <section className="flex tablet:gap-8 gap-4 items-start justify-between">
            <div className="flex items-center gap-2">
              <img
                className={`block rounded-full aspect-square w-8 tablet:w-10`}
                src={userAvatarUrl}
                alt="user avatar"
              />
              <div>
                <h1 className="tablet:text-lg text-sm">{userName}</h1>

                <div className="tablet:text-sm text-xs text-light dark:text-light text-opacity-50">
                  {timestamp} ; {id}
                </div>
              </div>
            </div>
            {/* Time */}
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <div className="text-sm tablet:text-lg text-nowrap">
                <span
                  className={`${
                    type === "archive" ? "text-red" : "text-light-green"
                  }`}
=======
              <div className="tablet:text-xs">
                <span className={`${type === "archive" || time === "0:00" ? "text-[#FF4343]": "text-[#18AF00]"}`}>{type === "archive" ? "0:00": time}</span> left
              </div>
              {/* <div className="hidden tablet:inline-flex text-[#000] dark:text-[#fff]">
                <svg
                  className="w-4 h-2"
                  viewBox="0 0 22 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
>>>>>>> main
                >
                  {type === "archive" ? "0:00 " : `${duration} `}
                </span>
                left
              </div>
            </div>
          </section>

          {/* Content on bottom */}
          <section className="mt-1">
            <p className="tablet:text-lg text-sm">{content}</p>
          </section>
        </div>
      </section>

      {/* Bottom section with upvote, downvote and comments,likes */}
      <section className="flex-row-center justify-between">
        {/* upvote and downvote button  */}

        <div className="buttons flex-row-center gap-2 tablet:text-4xl text-2xl">
          <TbSquareChevronUpFilled
            className={`${
              vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
            } cursor-pointer`}
            onClick={() => handleVote(true)}
          />

          <TbSquareChevronDownFilled
            className={`${
              !vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
            } cursor-pointer`}
            onClick={() => handleVote(false)}
          />
        </div>

        {/* likes and comments  */}
        <div className="flex-row-center tablet:text-lg text-sm gap-2 justify-end">
          <div className="flex-row-center justify-center text-dark dark:text-light text-opacity-50 gap-1">
            <MdOutlineVerifiedUser />
            <span>{likes}</span>
          </div>
          <div className="flex-row-center justify-center text-dark dark:text-light text-opacity-50 gap-1">
            <LiaCommentSolid />
            <span>{750} Comments</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;
