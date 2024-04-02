import React, { useState, useEffect } from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import PostApiHanlder from "../../../API_Handlers/post";
import { Link, useNavigate } from "react-router-dom";
import { useConnect } from "@connect2ic/react";
import { toast } from "react-hot-toast";

interface PostProps {
  id: string;
  imageUrl: string;
  userAvatarUrl: string;
  userName: string;
  userProfile: string;
  timestamp: string;
  duration: string;
  content: string;
  likes: string;
  comments: number;
  expireAt: BigInt;
  type?: string;
}

interface Response {
  ok: string;
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
  userProfile,
  type,
}) => {
  let { isConnected, principal } = useConnect();
  const [time, setTime] = useState("0:00");
  const [vote, setVote] = React.useState(true);
  const className = "Dashboard__MainPosts__Post";
  const { upvotePost, archivePost } = PostApiHanlder();
  const navigate = useNavigate();

  const isAuthenticated = () => {
    if (isConnected && principal) {
      return true;
    } else {
      return false;
    }
  }
  const handleVote = (vote: boolean) => {
    setVote(vote);
  };

  const handleUpvote = async (postId: string) => {
    console.log(isConnected);
    console.log(principal);
    const isValidUser = isAuthenticated();
    if (isValidUser) {
      // const data = await upvotePost(postId);
      // console.log(data);
      console.log("IF")
      toast.success("User is Authenticated!");
    } else {
      console.log("ELSE")
      toast.error("User is not Authenticated!");
      navigate("/");
    }
    console.log(postId);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = BigInt(Date.now()) * BigInt(1000000); // Current time in nanoseconds
      const remainingTime = Number(expireAt) - Number(currentTime); // Convert BigInt to bigint for arithmetic

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime("0:00");
        // archive();
        // console.log("Post archived");
      } else {
        setTime(formatTime(BigInt(remainingTime))); // Convert back to BigInt for formatting
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]); // Run effect when expireAt changes

  const archive = async () => {
    const response = (await archivePost(id)) as Response;
    if(response && response?.ok){
      console.log("POST ARCHIVED!");
    }
  }
  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9); // Convert remaining time from nanoseconds to seconds
    const minutes = Math.floor(seconds / 60); // Get remaining minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    // console.log(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div
      className={
        className +
        " " +
        `flex flex-col gap-4 xl:p-5 p-3 rounded-md border border-dark dark:border-[#FEFFFE] border-opacity-50 ${type === "archive" ? "bg-[#00000033] dark:bg-[#FFFFFF33]" : ""
        }`
      }
    >
      {/* Top section with image, user image and more info */}
      <Link
        key={id}
        to={`/dashboard/postDetails/${encodeURIComponent(id)}`}
      >
        <section className="flex flex-row phone:gap-4 gap-2 items-start justify-between">
          <img
            alt="post image"
            className={`block xl:w-28 phone:w-24 w-20 rounded-lg aspect-square object-cover`}
            src={imageUrl}
          />

          <div className="laptop:w-4/5 w-5/6 flex flex-col gap-2">
            {/* User and post data on top */}
            <section className="flex tablet:gap-8 items-start justify-between">
              <div className="w-full flex items-center gap-2">
                <img
                  className={`block rounded-full aspect-square w-8 tablet:w-10`}
                  src={userAvatarUrl}
                  alt="user avatar"
                />

                <div className="w-full flex flex-col">
                  <div className="w-full flex-row-center justify-between">
                    <h1 className="tablet:text-lg text-1xl">{userName}</h1>
                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <div className="text-1xl tablet:text-lg text-nowrap">
                        <span
                          className={`${type === "archive" ? "text-red" : "text-light-green"
                            }`}
                        >
                          {type === "archive" ? "0:00 " : `${time} `}
                        </span>
                        left
                      </div>
                    </div>
                  </div>

                  <div className="tablet:text-sm text-xs text-dark dark:text-light text-opacity-50">
                    {timestamp} ; {id}
                  </div>
                </div>
              </div>
            </section>

            {/* Content on bottom */}
            <section className="mt-1">
              <p className="tablet:text-lg text-sm">{content}</p>
            </section>
          </div>
        </section>
      </Link>

      {/* Bottom section with upvote, downvote and comments,likes */}
      <section className="flex-row-center justify-between">
        {/* upvote and downvote button  */}

        <div className="buttons flex-row-center gap-2 ml-3 phone:text-4xl text-2xl">
          <TbSquareChevronUpFilled
            className={`${vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
              } cursor-pointer`}
            onClick={() => handleUpvote(id)}
          />

          <TbSquareChevronDownFilled
            className={`${!vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
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
