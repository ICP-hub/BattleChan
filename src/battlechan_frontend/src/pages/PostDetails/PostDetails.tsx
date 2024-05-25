import React, { useEffect, useState } from "react";

import Comment from "./Comment";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";

import toast from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import { useConnect } from "@connect2ic/react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import Cover_Image from "../../images/trendingPost_coverImg.png";
import Profile_Pic from "../../images/trendingPost_profile.png";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";

import Constant from "../../utils/constants";
import PostApiHanlder from "../..//API_Handlers/post";
import CommentsApiHanlder from "../../API_Handlers/comments";
import TokensApiHanlder from "../../API_Handlers/tokens";

import Skeleton from "../../components/Skeleton/Skeleton";
import TimeComponent from "../MainPosts/TimeComponent";

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

interface User {
  userName: string;
  userProfile: Int8Array;
}

type CommentInfo = {
  createdBy: User;
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
  error: string;
}

const PostDetails = (props: Theme) => {
  const [postsData, setPostsData] = useState<PostInfo>();
  const [vote, setVote] = React.useState(post.vote);
  const [showComments, setShowComments] = React.useState(true);
  const [commentsData, setcommentsData] = React.useState<CommentInfo[]>([]);
  const is700px = useMediaQuery("(min-width: 700px)");
  const [commentsCount, setCommentsCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const type = searchParams.get("type");
  const postId: string = useParams().postId ?? "";
  const decodedPostId = decodeURIComponent(postId);

  const { getSingleMainPost, getSingleArchivePost, upvotePost, downvotePost } =
    PostApiHanlder();
  const { getAllComments, createComment, getAllCommentsOfArchivedPost } =
    CommentsApiHanlder();
  const { convertNanosecondsToTimestamp, convertInt8ToBase64 } = Constant();
  const { icrc2_approve } = TokensApiHanlder();
  let { isConnected, principal } = useConnect();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [principal_id, setPrincipal_id] = useState("");
  const isUserAuthenticatedRef = React.useRef(isUserAuthenticated);
  const principal_idRef = React.useRef(principal_id);

  useEffect(() => {
    isUserAuthenticatedRef.current = isUserAuthenticated;
    principal_idRef.current = principal_id;
  }, [isUserAuthenticated, principal_id]);

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
    if (!is700px) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
    getPostDetail(decodedPostId);
  }, [is700px]);

  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

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

      if (response.status === true && response.data) {
        const posts = response.data.flat();
        posts.forEach((element: any) => {
          const timestamp: string = convertNanosecondsToTimestamp(
            BigInt(element.createdAt)
          );

          element.createdAt = timestamp;
          element.upvotes = Number(element.upvotes);
        });
        let data = posts[0];
        setPostsData(data);
        setDataFetched(true);
      }
    } catch (error) {
      setDataFetched(false);
      console.error("Error fetching posts:", error);
    }
  }

  const getComments = async () => {
    let response;
    if (type === "archive") {
      response = (await getAllCommentsOfArchivedPost(
        postId
      )) as BackendResponse;
    } else {
      response = (await getAllComments(postId)) as BackendResponse;
    }
    if (response && response.status == true) {
      const comments = response.data[0];
      if (comments && comments.length > 0) {
        comments.forEach((element: any) => {
          const timestamp: string = convertNanosecondsToTimestamp(
            BigInt(element.createdAt)
          );

          element.createdAt = timestamp;
        });

        setcommentsData(comments);
        setCommentsCount(comments.length);
      }
    }
  };

  const handleUpvote = async (postId: string) => {
    let upvoteBtn = document.getElementById("upvoteBtn");

    if (type === "archive") {
      return;
    }


    if (isUserAuthenticatedRef.current) {
      const is_approved = await icrc2_approve(principal_idRef.current);
      console.log(is_approved);

      if (is_approved) {
        if (!upvoteBtn) {
          return;
        }

        upvoteBtn.setAttribute("disable", "true");
        upvoteBtn.style.opacity = "0.5";

        const data = (await upvotePost(postId)) as VoteResponse;
        if (data && data?.ok) {
          toast.success("Successfully Upvoted Post!");

          if (upvoteBtn) {
            upvoteBtn.removeAttribute("disabled");
            upvoteBtn.style.opacity = "1";
          }
        } else {
          const lastIndex = data.err[1].lastIndexOf(":");
          const errorMsg = data.err[1].slice(lastIndex + 2);
          toast.error(errorMsg);

          if (upvoteBtn) {
            upvoteBtn.removeAttribute("disabled");
            upvoteBtn.style.opacity = "1";
          }
        }
      }
    } else {
      toast.error("Please first Connect your Wallet to Upvote this post!");
    }
  };

  const handleDownvote = async (postId: string) => {
    let downvoteBtn = document.getElementById("downvoteBtn");

    if (type === "archive") {
      return;
    }

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

  async function handleAddComment(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setLoading(true);
    const response = (await createComment(
      postsData?.postId ?? "",
      newComment
    )) as commentResponse;
    // console.log("response", response);
    if (response && response?.ok) {
      toast.success(response.ok);
      getComments();
      setNewComment("");
      setLoading(false);
    } else {
      toast.error(response.error);
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

        <div className="hidden tablet:block">
          <NavButtons />
        </div>

        <div className="w-full py-8 laptop:px-40 tablet:px-32 px-10 dark:text-[#fff] overflow-hidden">
          <h1 className="font-bold dark:text-[#fff] tablet:text-3xl mb-4 ">
            {!dataFetched ? (
              <Skeleton
                w_h_p={"tablet:h-[20px] h-[10px] tablet:w-[170px] w-[120px]"}
              />
            ) : (
              postsData?.postId
            )}
          </h1>

          <div className="max-w-2xl h-auto">
            {!dataFetched ? (
              <Skeleton w_h_p={"w-full tablet:h-[220px] h-[400px]"} />
            ) : (
              <img
                className="block h-auto w-full rounded-3xl pointer-events-none"
                src={convertInt8ToBase64(postsData?.postMetaData || undefined)}
                alt="post image"
                loading="lazy"
              />
            )}

            <div className="mt-4 flex items-center text-[9px] tablet:px-2 tablet:text-sm justify-between">
              {!dataFetched ? (
                <Skeleton
                  w_h_p={"tablet:h-[20px] h-[10px] tablet:w-[160px] w-[120px]"}
                />
              ) : (
                <div className="flex items-center gap-4">
                  <div
                    className={`flex phone:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1`}
                  >
                    <MdOutlineVerifiedUser />
                    <span>{postsData?.upvotes}</span>
                  </div>

                  <div
                    className={`flex phone:text-lg text-xs items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1`}
                  >
                    <LiaCommentSolid />
                    <span>{commentsCount} Comments</span>
                  </div>
                </div>
              )}

              <div className="text-lg">
                <TimeComponent
                  expireAt={postsData?.expireAt ?? 1n}
                  id={postsData?.postId ?? ""}
                  type={type || ""}
                />{" "}
                min left
              </div>
            </div>
          </div>

          <div className="flex gap-2 phone:text-5xl text-3xl mt-4 tablet:mt-11">
            <TbSquareChevronUpFilled
              className={`${vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                } cursor-pointer ${type === "archive" ? "bg-opacity-50" : ""}`}
              id="upvoteBtn"
              onClick={() => handleUpvote(postId)}
            />

            <TbSquareChevronDownFilled
              className={`${!vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                } cursor-pointer ${type === "archive" ? "bg-opacity-50" : ""}`}
              id="downvoteBtn"
              onClick={() => handleDownvote(postId)}
            />
          </div>

          <div className="flex justify-between items-center mt-5 tablet:justify-start tablet:gap-8 tablet:mt-14">
            <div className="flex gap-2 items-center justify-center">
              <div className="w-9 h-9 phone:w-20 phone:h-20 bg-[#686868] text-[#fff] flex justify-center rounded">
                {!dataFetched ? (
                  <Skeleton w_h_p={"w-full h-full"} />
                ) : (
                  <img
                    src={convertInt8ToBase64(postsData?.createdBy.userProfile)}
                    alt="Profile Image"
                    className="block h-full w-full object-cover rounded pointer-events-none"
                  />
                )}
              </div>

              {!dataFetched ? (
                <Skeleton
                  w_h_p={"tablet:h-[20px] h-[10px] tablet:w-[250px] w-[200px]"}
                />
              ) : (
                <React.Fragment>
                  <h1 className="font-semibold phone:text-2xl text-sm">
                    {postsData?.createdBy.userName}
                  </h1>

                  <div className="phone:text-xs text-[10px] text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50">
                    {postsData?.createdAt}; {postsData?.postId}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="w-full mt-8 tablet:text-lg tablet:mt-10">
            <h1 className="w-full font-bold mb-3 text-ellipsis overflow-hidden">
              {!dataFetched ? (
                <Skeleton w_h_p={"h-[20px] w-[100%]"} />
              ) : (
                postsData?.postName
              )}
            </h1>

            <div className="dark:text-[#fff] dark:text-opacity-50 text-sm tablet:text-base">
              {!dataFetched ? (
                <React.Fragment>
                  <Skeleton w_h_p={"h-[10px] w-[100%] my-1"} />
                  <Skeleton w_h_p={"h-[10px] w-[100%]"} />
                </React.Fragment>
              ) : (
                postsData?.postDes
              )}
            </div>
          </div>

          {!showComments && (
            <div className="tablet:hidden my-8">
              <button
                onClick={() => setShowComments(true)}
                className={`small-button bg-dark dark:bg-light text-light dark:text-dark cursor-pointer font-semibold`}
              >
                See Comments
              </button>
            </div>
          )}

          {
            <div className={`mt-8 ${showComments ? "block" : "hidden"}`}>
              <h1 className={`font-bold tablet:text-lg`}>Comments</h1>

              <div>
                <form className={`${type === "archive" ? "hidden" : "block"}`}>
                  <section className="mt-8">
                    <input
                      className="border-b border-opacity-50 border-[#000] dark:border-[#fff] w-full bg-transparent p-2"
                      type="text"
                      placeholder="Add a comment"
                      value={newComment}
                      onChange={(e) => {
                        setNewComment(e.target.value);
                      }}
                    />
                    <div className="flex items-center justify-end mt-4">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={handleAddComment}
                          className={
                            "border border-[#000] dark:border-[#fff]" +
                            " text-[#000] dark:text-[#fff] hover:bg-dark hover:dark:bg-light hover:text-light hover:dark:text-dark transition disabled:dark:text-opacity-50" +
                            " rounded-full px-6 py-2 font-semibold cursor-pointer" +
                            " disabled:text-opacity-50 disabled:border-opacity-50 disabled:dark:border-opacity-50"
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
                {type === "archive" ? (
                  <>
                    <Comment
                      currentComment={commentsData}
                      getComments={getComments}
                      type="archive"
                    />
                  </>
                ) : (
                  <>
                    <Comment
                      currentComment={commentsData}
                      getComments={getComments}
                    />
                  </>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostDetails;
