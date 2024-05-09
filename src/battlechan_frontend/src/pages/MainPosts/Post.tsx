import React, { useState, useEffect } from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import PostApiHanlder from "../../API_Handlers/post";
import { Link } from "react-router-dom";
import { useConnect } from "@connect2ic/react";
import { toast } from "react-hot-toast";
import CommentsApiHanlder from "../../API_Handlers/comments";
import TokensApiHanlder from "../../API_Handlers/tokens";

import Constant from "../../utils/constants";
import WithdrawOverlay from "../../components/Dashboard/WithdrawOverlay/WithdrawOverlay";

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
  getPosts: (params?: string) => void;
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

interface Response {
  status: boolean;
  err: string;
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
  getPosts
}) => {
  const [time, setTime] = useState("0:00");
  const [commentsCount, setCommentsCount] = useState(0);
  const [vote, setVote] = React.useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const { upvotePost, archivePost, downvotePost } = PostApiHanlder();
  const { getAllComments } = CommentsApiHanlder();
  const { convertInt8ToBase64 } = Constant();
  const { icrc2_approve } = TokensApiHanlder();
  let { isConnected, principal } = useConnect();
  const [principal_id, setPrincipal_id] = useState("");
  const principal_idRef = React.useRef(principal_id);
  const isUserAuthenticatedRef = React.useRef(isUserAuthenticated);
  const button = document.getElementById("upvoteBtn");

  const className = "Dashboard__MainPosts__Post";

  useEffect(() => {
    isUserAuthenticatedRef.current = isUserAuthenticated;
    principal_idRef.current = principal_id;
  }, [isUserAuthenticated, principal_id]);

  useEffect(() => {
    const body = document.querySelector("body")?.style;
    if (body && showOverlay == true) {
      body.overflow = "hidden";
    } else if (body) {
      body.overflow = "auto";
    }
  }, [showOverlay]);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (isConnected && principal) {
        setIsUserAuthenticated(true);
        setPrincipal_id(principal);
      }
    };

    checkAuthentication();
  }, [isConnected, principal]);

  useEffect(() => {
    getCommentsCounts();

    const interval = setInterval(() => {
      const currentTime = BigInt(Date.now()) * BigInt(1000000);
      const remainingTime = Number(expireAt) - Number(currentTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime("0:00");
        if (type !== "archive") {
          archive();
        }
      } else {
        setTime(formatTime(BigInt(remainingTime)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]);

  const handleUpvote = async (postId: string) => {
    if (type === "archive") {
      return;
    }

    if (!isUserAuthenticatedRef.current) {
      toast.error("Please first Connect your Wallet to Upvote this post!");
      return;
    }

    try {
      const isApproved = (await icrc2_approve(
        principal_idRef.current
      )) as Response; 

      if (isApproved.status !== true) {
        toast.error(isApproved.err);
        return;
      }

      if (!button) {
        return;
      }

      button.setAttribute("disabled", "true");
      button.style.opacity = "0.5";

      const data = (await upvotePost(postId)) as VoteResponse;

      if (data && data.ok) {
        getPosts();
        toast.success("Successfully Upvoted Post!");
      } else {
        const lastIndex = data.err[1].lastIndexOf(":");
        const errorMsg = data.err[1].slice(lastIndex + 2);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error occurred while upvoting:", error);
    } finally {
      // Reset button to original state
      if (button) {
        button.removeAttribute("disabled");
        button.style.opacity = "1";
      }
    }
  };

  const handleDownvote = async (postId: string) => {
    if (type === "archive") {
      return;
    }

    if (isUserAuthenticatedRef.current) {
      const is_approved = (await icrc2_approve(
        principal_idRef.current
      )) as Response;

      if (is_approved.status == true) {
        const data = (await downvotePost(postId)) as VoteResponse;

        if (!button) {
          return;
        }

        button.setAttribute("disabled", "true");
        button.style.opacity = "0.5";

        if (data && data?.ok) {
          getPosts();
          toast.success("Successfully Downvoted Post!");
        } else {
          const lastIndex = data.err[1].lastIndexOf(":");
          const errorMsg = data.err[1].slice(lastIndex + 2);
          toast.error(errorMsg);
        }
      } else {
        toast.error(is_approved.err);
      }
    } else {
      toast.error("Please first Connect your Wallet to Downvote this post!");
      if (button) {
        button.removeAttribute("disabled");
        button.style.opacity = "1";
      }
    }
  };

  const archive = async () => {
    if(type === "archive"){
      return;
    }
    const response = (await archivePost(id)) as Response;
    if (response && response?.ok) {
      getPosts();
    }
  };

  const getCommentsCounts = async () => {
    const response = (await getAllComments(id)) as CommentsResponse;
    if (response && response.status == true) {
      let data = response.data[0];
      if (data && data.length > 0) {
        setCommentsCount(data.length);
      }
    }
  };

  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div
      className={
        className +
        " " +
        `flex flex-col small_phone:gap-4 gap-2 xl:p-5 small_phone:p-3 p-2 rounded-md border border-dark dark:border-[#FEFFFE] border-opacity-50 ${type === "archive" ? "bg-[#00000033] dark:bg-[#FFFFFF33]" : ""
        }`
      }
    >
      {type === "archive" ? (
        <React.Fragment>
          <section className="w-full flex flex-row phone:gap-4 gap-2 items-start justify-between">
            <Link
              key={id}
              to={`/dashboard/postDetails/${encodeURIComponent(
                id
              )}?type=archive`}
            >
              <img
                alt="post image"
                className="block xl:max-w-28 laptop:max-w-20 tablet:max-w-28 phone:max-w-20 max-w-16 rounded-lg aspect-square object-cover pointer-events-none"
                src={convertInt8ToBase64(imageUrl)}
              />
            </Link>

            <div className="laptop:w-4/5 phone:w-5/6 w-3/4 flex flex-col gap-2">
              <section className="flex tablet:gap-8 items-start justify-between">
                <div className="w-full flex items-center gap-2">
                  <img
                    className="block rounded-full aspect-square w-8 tablet:w-10 pointer-events-none"
                    src={convertInt8ToBase64(userProfile)}
                    alt="user avatar"
                  />

                  <div className="w-full flex flex-col">
                    <div className="w-full flex-row-center justify-between">
                      <h1 className="tablet:text-md small_phone:text-1xl text-sm font-semibold text-ellipsis overflow-hidden">
                        {userName}
                      </h1>

                      <button className="flex items-center gap-1 px-2 rounded-lg text-1xl tablet:text-lg text-nowrap font-semibold">
                        <span
                          className={`${type === "archive" ? "text-red" : "text-light-green"
                            }`}
                        >
                          {type === "archive" ? "0:00 " : `${time} `}
                        </span>
                        left
                      </button>
                    </div>

                    <Link
                      key={id}
                      to={`/dashboard/postDetails/${encodeURIComponent(
                        id
                      )}?type=archive`}
                    >
                      <div className="small_phone:text-xs text-[10px] text-dark dark:text-grey">
                        {timestamp} ; {id}
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="mt-1">
                <Link
                  key={id}
                  to={`/dashboard/postDetails/${encodeURIComponent(
                    id
                  )}?type=archive`}
                >
                  <p className="tablet:text-lg text-sm font-semibold text-ellipsis overflow-hidden">
                    {postName}
                  </p>
                  <p className="tablet:text-md small_phone:text-sm text-xs text-gray-800 text-wrap break-all">
                    {content.length > 70
                      ? `${content.slice(0, 70)}...`
                      : content}
                  </p>
                </Link>
              </section>
            </div>
          </section>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <section className="flex flex-row phone:gap-4 gap-2 items-start justify-between">
            <Link
              key={id}
              to={`/dashboard/postDetails/${encodeURIComponent(id)}`}
            >
              <img
                alt="post image"
                className="block xl:w-28 phone:w-24 small_phone:w-20 w-16 rounded-lg aspect-square object-cover pointer-events-none"
                src={convertInt8ToBase64(imageUrl)}
              />
            </Link>

            <div className="laptop:w-4/5 w-5/6 flex flex-col small_phone:gap-2 gap-1">
              <section className="flex tablet:gap-8 items-start justify-between">
                <div className="w-full flex items-center gap-2">
                  <img
                    className="block rounded-full aspect-square w-8 tablet:w-10 pointer-events-none"
                    src={convertInt8ToBase64(userProfile)}
                    alt="user avatar"
                  />

                  <div className="w-full flex flex-col">
                    <div className="w-full flex-row-center justify-between">
                      <h1 className="tablet:text-md small_phone:text-1xl text-sm font-semibold text-ellipsis overflow-hidden">
                        {userName}
                      </h1>

                      <button
                        className="flex items-center gap-1 px-2 rounded-lg text-1xl tablet:text-lg text-nowrap font-semibold hover:bg-dirty-light-green hover:text-darkcursor-pointer"
                        onClick={() => setShowOverlay(true)}
                      >
                        <span
                          className={`${type === "archive" ? "text-red" : "text-light-green"
                            }`}
                        >
                          {type === "archive" ? "0:00 " : `${time} `}
                        </span>
                        left
                      </button>
                    </div>

                    <Link
                      key={id}
                      to={`/dashboard/postDetails/${encodeURIComponent(id)}`}
                    >
                      <div className="small_phone:text-xs text-[10px] text-dark dark:text-grey">
                        {timestamp} ; {id}
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="w-full mt-1">
                <Link
                  key={id}
                  to={`/dashboard/postDetails/${encodeURIComponent(id)}`}
                >
                  <p className="tablet:text-lg text-sm font-semibold text-ellipsis overflow-hidden">
                    {postName}
                  </p>
                  <p className="tablet:text-md small_phone:text-sm text-xs text-gray-800">
                    {content.length > 70
                      ? `${content.slice(0, 70)}...`
                      : content}
                  </p>
                </Link>
              </section>
            </div>
          </section>
        </React.Fragment>
      )}

      <section className="flex-row-center justify-between">
        <div className="buttons flex-row-center gap-2 small_phone:ml-3 ml-0 phone:text-4xl text-2xl">
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

        <div className="flex-row-center tablet:text-lg small_phone:text-sm text-xs gap-2 justify-end">
          <div className="flex-row-center justify-center text-dark dark:text-grey gap-1">
            <MdOutlineVerifiedUser />
            <span>{likes}</span>
          </div>
          <div className="flex-row-center justify-center text-dark dark:text-grey gap-1">
            <LiaCommentSolid />
            <span>{commentsCount} Comments</span>
          </div>
        </div>
      </section>

      <WithdrawOverlay
        display={showOverlay}
        setProfilePopUp={setShowOverlay}
        postId={id}
        getPosts={getPosts}
      />
    </div>
  );
};

export default Post;
