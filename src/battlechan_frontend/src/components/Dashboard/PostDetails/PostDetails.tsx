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
import CommentsApiHanlder from "../../../API_Handlers/comments";
import Constant from "../../../utils/constants";
import { useConnect } from "@connect2ic/react";
import toast from "react-hot-toast";
import UserApiHanlder from "../../../API_Handlers/user";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

type Theme = {
  handleThemeSwitch: Function;
};

const post = {
  vote: true,
  upvotes: 0,
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
  postMetaData: Int8Array;
  postDes: string;
  expireAt: BigInt;
  createdAt: string;
  upvotes: number;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
};

type CommentInfo = {
  comment: string;
  commentId: string;
  createdAt: string;
  likedBy: [];
};

interface BackendResponse {
  status: boolean;
  data: [][];
  error: string[];
}

interface VoteResponse {
  ok: string;
  err: {
    [key: string]: string;
  };
}

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
}

interface commentResponse {
  ok: string;
}

const PostDetails = (props: Theme) => {
  const postId: string = useParams().postId ?? "";
  const decodedPostId = decodeURIComponent(postId);
  const [time, setTime] = useState("0:00");
  const [postsData, setPostsData] = useState<PostInfo>();
  const [vote, setVote] = React.useState(post.vote);
  const [showComments, setShowComments] = React.useState(true);
  const [commentsData, setcommentsData] = React.useState<CommentInfo[]>([]);
  const is700px = useMediaQuery("(min-width: 700px)");
  const [commentsCount, setCommentsCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const {
    getSingleMainPost,
    getSingleArchivePost,
    upvotePost,
    archivePost,
    downvotePost,
  } = PostApiHanlder();
  const { getAllComments, createComment } = CommentsApiHanlder();
  const { convertNanosecondsToTimestamp, convertInt8ToBase64 } = Constant();
  let { isConnected, principal } = useConnect();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const isUserAuthenticatedRef = React.useRef(isUserAuthenticated);

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
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  async function getPostDetail(postId: string) {
    try {
      let response;
      if (type === "archive") {
        response = (await getSingleArchivePost(postId)) as BackendResponse;
      } else {
        response = (await getSingleMainPost(postId)) as BackendResponse;
      }
      console.log(response);
      if (response.status === true && response.data) {
        console.log(response);
        const posts = response.data.flat(); // Flatten nested arrays if any
        posts.forEach((element: any) => {
          const timestamp: string = convertNanosecondsToTimestamp(
            BigInt(element.createdAt)
          );
          console.log(timestamp);
          element.createdAt = timestamp;
          element.upvotes = Number(element.upvotes);
          console.log("UPVOTE", element.upvotes);
          const interval = setInterval(
            (expireAt: BigInt) => {
              const currentTime = BigInt(Date.now()) * BigInt(1000000); // Current time in nanoseconds
              const remainingTime = Number(expireAt) - Number(currentTime); // Convert BigInt to bigint for arithmetic

              if (remainingTime <= 0) {
                clearInterval(interval);
                setTime("0:00");
                console.log("Post archived");
              } else {
                setTime(formatTime(BigInt(remainingTime))); // Convert back to BigInt for formatting
              }
            },
            1000,
            BigInt(element.expireAt)
          );
        });
        let data = posts[0];
        setPostsData(data);
        console.log(postsData);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const getComments = async () => {
    const response = (await getAllComments(postId)) as BackendResponse;
    if (response && response.status == true) {
      const comments = response.data[0];
      if (comments && comments.length > 0) {
        comments.forEach((element: any) => {
          const timestamp: string = convertNanosecondsToTimestamp(
            BigInt(element.createdAt)
          );
          console.log(timestamp);
          element.createdAt = timestamp;
        });
        setcommentsData(comments);
        setCommentsCount(comments.length);
      }
    }
  };

  useEffect(() => {
    let upvoteBtn = document.getElementById("upvoteBtn");
    let downvoteBtn = document.getElementById("downvoteBtn");

    const handleUpvoteClick = () => handleUpvote(postId);
    const handleDownvoteClick = () => handleDownvote(postId);

    upvoteBtn?.addEventListener("click", handleUpvoteClick);
    downvoteBtn?.addEventListener("click", handleDownvoteClick);

    // Clean up the event listeners
    return () => {
      upvoteBtn?.removeEventListener("click", handleUpvoteClick);
      downvoteBtn?.removeEventListener("click", handleDownvoteClick);
    };
  }, []);

  const handleUpvote = async (postId: string) => {
    // console.log(isConnected);
    // console.log(principal);
    console.log(isUserAuthenticatedRef.current);
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
      // navigate("/");
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
      // navigate("/");
    }
  };

  async function handleAddComment(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setLoading(true);
    const response = (await createComment(
      postsData?.postId ?? "",
      newComment
    )) as commentResponse;
    console.log(response);

    if (response && response?.ok) {
      toast.success(response.ok);
      setLoading(false);
      // window.location.href = "/dashboard/mainPosts";
    } else {
      toast.error(
        "Error Creating comment, Please verify and provide valid data!"
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

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
              src={convertInt8ToBase64(postsData?.postMetaData || undefined)}
              alt="post image"
            />

            <div className="mt-4 flex items-center text-[9px] tablet:px-2 tablet:text-sm justify-between">
              <div className="flex items-center gap-4">
                <div className="flex tablet:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <MdOutlineVerifiedUser />
                  <span>{postsData?.upvotes}</span>
                </div>

                <div className="flex tablet:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <LiaCommentSolid />
                  <span>{commentsCount} Comments</span>
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
              className={`${
                vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
              } cursor-pointer`}
              id="upvoteBtn"
              onClick={() => handleUpvote(postId)}
            />

            <TbSquareChevronDownFilled
              className={`${
                !vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
              } cursor-pointer`}
              id="downvoteBtn"
              onClick={() => handleDownvote(postId)}
            />
          </div>

          {/* user avatar and post details  */}
          <div className="flex justify-between items-center mt-5 tablet:justify-start tablet:gap-8 tablet:mt-14">
            <div className="flex gap-2 items-center justify-center">
              {/* <div className="w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded"> */}
              <img
                src={convertInt8ToBase64(postsData?.createdBy.userProfile)}
                alt="Profile Image"
                className="w-5 h-5 tablet:w-9 tablet:h-9 rounded-lg object-cover"
              />
              <h1 className="font-semibold tablet:text-lg text-md">
                {postsData?.createdBy.userName}
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
          {!showComments && (
            <div className="tablet:hidden my-8">
              <button
                onClick={() => setShowComments(true)}
                className="small-button bg-light text-dark cursor-pointer font-semibold"
              >
                See Comments
              </button>
            </div>
          )}

          {/* Comment for desktop   */}
          {
            <div className={`mt-8 ${showComments ? "block" : "hidden"}`}>
              <h1 className="font-bold tablet:text-lg">Comments</h1>
              <div>
                <form>
                  <section className="mt-8">
                    <input
                      className="border-b border-opacity-50 border-[#fff] w-full bg-transparent p-2"
                      type="text"
                      placeholder="Add a comment"
                      onChange={(e) => {
                        setNewComment(e.target.value);
                      }}
                    />
                    <div className="flex items-center justify-end mt-4">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() => {
                            setLoading(false);
                          }}
                          className="text-[#000] dark:text-[#fff] rounded-full px-6 py-2 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddComment}
                          className={
                            "border border-[#000] dark:border-[#fff] text-[#000] dark:text-[#fff] rounded-full px-6 py-2 font-semibold cursor-pointer disabled:text-opacity-50 disabled:dark:text-opacity-50 disabled:border-opacity-50 disabled:dark:border-opacity-50"
                          }
                          disabled={loading}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </section>
                </form>
              </div>
              <div className="mt-8">
                <Comment currentComment={commentsData} />
              </div>
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostDetails;
