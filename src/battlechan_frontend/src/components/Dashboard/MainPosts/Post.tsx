import React, { useState, useEffect } from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import PostApiHanlder from "../../../API_Handlers/post";
import { Link, useNavigate } from "react-router-dom";
import { useConnect } from "@connect2ic/react";
import { toast } from "react-hot-toast";
import CommentsApiHanlder from "../../../API_Handlers/comments";
import Constant from "../../../utils/constants";
// import TokensApiHanlder from "../../../API_Handlers/tokens";

interface PostProps {
  id: string;
  postName: string;
  imageUrl: Int8Array;
  userAvatarUrl: string;
  userName: string;
  userProfile: Int8Array;
  timestamp: string;
  duration: string;
  content: string;
  likes: number;
  comments: number;
  expireAt: BigInt;
  type?: string;
}

interface Response {
  ok: string;
}

interface VoteResponse {
  ok: string;
  err: {
    [key: string]: string;
  };
}

interface CommentsResponse {
  status: boolean;
  data: [][];
  error: string[];
}

const Post: React.FC<PostProps> = ({
  id,
  postName,
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
  const [time, setTime] = useState("0:00");
  const [commentsCount, setCommentsCount] = useState(0);
  const [vote, setVote] = React.useState(true);
  const className = "Dashboard__MainPosts__Post";
  const { upvotePost, archivePost, downvotePost } = PostApiHanlder();
  const { getAllComments } = CommentsApiHanlder();
  const navigate = useNavigate();
  let { isConnected, principal } = useConnect();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const isUserAuthenticatedRef = React.useRef(isUserAuthenticated);
  const { convertInt8ToBase64 } = Constant();
  // const { icrc2_approve } = TokensApiHanlder();

  useEffect(() => {
    isUserAuthenticatedRef.current = isUserAuthenticated;
  }, [isUserAuthenticated]);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isConnected && principal) {
        setIsUserAuthenticated(true);
      }
    };

    checkAuthentication();
  }, [isConnected, principal]);

  useEffect(() => {
    getCommentsCounts();

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

  const handleUpvote = async (postId: string) => {
    // console.log(isConnected);
    // console.log(principal);
    // console.log(isUserAuthenticatedRef.current);
    // const data = await icrc2_approve();
    // console.log(data);
    if (isUserAuthenticatedRef.current) {
      const data = (await upvotePost(postId)) as VoteResponse;
      if (data && data?.ok) {
        // toast.success(data?.ok);
        toast.success("Successfully Upvoted Post!");
      } else {
        const lastIndex = data.err[1].lastIndexOf(":");
        const errorMsg = data.err[1].slice(lastIndex + 2);
        toast.error(errorMsg);
      }
    } else {
      toast.error("Please first Connect your Wallet to Upvote this post!");
    }
  };

  const handleDownvote = async (postId: string) => {
    // console.log(isConnected);
    // console.log(principal);
    if (isUserAuthenticatedRef.current) {
      const data = (await downvotePost(postId)) as VoteResponse;
      if (data && data?.ok) {
        toast.success("Successfully Downvoted Post!");
      } else {
        const lastIndex = data.err[1].lastIndexOf(":");
        const errorMsg = data.err[1].slice(lastIndex + 2);
        toast.error(errorMsg);
      }
    } else {
      toast.error("Please first Connect your Wallet to Downvote this post!");
    }
  };

  const archive = async () => {
    const response = (await archivePost(id)) as Response;
    if (response && response?.ok) {
      console.log("POST ARCHIVED!");
    }
  };

  const getCommentsCounts = async () => {
    const response = (await getAllComments(id)) as CommentsResponse;
    if (response && response.status == true) {
      let data = response.data[0];
      if (data && data.length > 0) {
        // console.log(length);
        setCommentsCount(data.length);
      }
    }
  };

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
      {type === "archive" ? (
        <>
          <Link
            key={id}
            to={`/dashboard/postDetails/${encodeURIComponent(id)}?type=archive`}
          >
            <section className="flex flex-row phone:gap-4 gap-2 items-start justify-between">
              <img
                alt="post image"
                className={`block xl:w-28 phone:w-24 w-20 rounded-lg aspect-square object-cover`}
                src={convertInt8ToBase64(imageUrl)}
              />

              <div className="laptop:w-4/5 w-5/6 flex flex-col gap-2">
                {/* User and post data on top */}
                <section className="flex tablet:gap-8 items-start justify-between">
                  <div className="w-full flex items-center gap-2">
                    <img
                      className={`block rounded-full aspect-square w-8 tablet:w-10`}
                      src={convertInt8ToBase64(userProfile)}
                      alt="user avatar"
                    />

                    <div className="w-full flex flex-col">
                      <div className="w-full flex-row-center justify-between">
                        <h1 className="tablet:text-lg text-1xl">{userName}</h1>
                        {/* Time */}
                        <div className="flex items-center gap-2">
                          <div className="text-1xl tablet:text-lg text-nowrap">
                            <span
                              className={`${type === "archive"
                                  ? "text-red"
                                  : "text-light-green"
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
                  <p className="tablet:text-lg text-sm font-semibold">
                    {postName}
                  </p>
                  <p className="tablet:text-lg text-sm text-gray-800">
                    {content.length > 70
                      ? `${content.slice(0, 70)}...`
                      : content}
                  </p>
                </section>
              </div>
            </section>
          </Link>
        </>
      ) : (
        <>
          <Link
            key={id}
            to={`/dashboard/postDetails/${encodeURIComponent(id)}`}
          >
            <section className="flex flex-row phone:gap-4 gap-2 items-start justify-between">
              <img
                alt="post image"
                className={`block xl:w-28 phone:w-24 w-20 rounded-lg aspect-square object-cover`}
                src={convertInt8ToBase64(imageUrl)}
              />

              <div className="laptop:w-4/5 w-5/6 flex flex-col gap-2">
                {/* User and post data on top */}
                <section className="flex tablet:gap-8 items-start justify-between">
                  <div className="w-full flex items-center gap-2">
                    <img
                      className={`block rounded-full aspect-square w-8 tablet:w-10`}
                      src={convertInt8ToBase64(userProfile)}
                      alt="user avatar"
                    />

                    <div className="w-full flex flex-col">
                      <div className="w-full flex-row-center justify-between">
                        <h1 className="tablet:text-lg text-1xl">{userName}</h1>
                        {/* Time */}
                        <div className="flex items-center gap-2">
                          <div className="text-1xl tablet:text-lg text-nowrap">
                            <span
                              className={`${type === "archive"
                                  ? "text-red"
                                  : "text-light-green"
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
                  <p className="tablet:text-lg text-sm font-semibold">
                    {postName}
                  </p>
                  <p className="tablet:text-lg text-sm text-gray-800">
                    {content.length > 70
                      ? `${content.slice(0, 70)}...`
                      : content}
                  </p>
                </section>
              </div>
            </section>
          </Link>
        </>
      )}

      {/* Bottom section with upvote, downvote and comments,likes */}
      <section className="flex-row-center justify-between">
        {/* upvote and downvote button  */}

        <div className="buttons flex-row-center gap-2 ml-3 phone:text-4xl text-2xl">
          <TbSquareChevronUpFilled
            className={`${vote ? "text-dirty-light-green" : "text-[#878787]"
              } cursor-pointer`}
            id="upvoteBtn"
            onClick={type === "archive" ? undefined : () => handleUpvote(id)}
          />

          <TbSquareChevronDownFilled
            className={`${!vote ? "text-dirty-light-green" : "text-[#878787]"
              } cursor-pointer`}
            id="downvoteBtn"
            onClick={type === "archive" ? undefined : () => handleDownvote(id)}
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
            <span>{commentsCount} Comments</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;
