import React, { useState } from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Replies from "./Replies";
import Constant from "../../utils/constants";
import toast from "react-hot-toast";
import CommentsApiHanlder from "../../API_Handlers/comments";

interface User {
  userName: string;
  userProfile: Int8Array;
}

interface CommentInfo {
  createdBy: User;
  comment: string;
  commentId: string;
  createdAt: string;
  likedBy: [];
}

interface ReplyInfo {
  createdBy: User;
  reply: string;
  replyId: string;
  createdAt: string;
  likes: bigint;
}

interface CommentProps {
  currentComment: CommentInfo[];
  getComments: () => void;
  type?: string;
}

interface ReplyResponse {
  ok: string;
  error: string;
}

interface LikeResponse {
  ok: string;
}

interface BackendResponse {
  status: boolean;
  data: [][];
  error: string[];
}

const Comment: React.FC<CommentProps> = ({ currentComment, getComments, type }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [activeReplyButton, setActiveReplyButton] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [vote, setVote] = useState(true);
  const [visibleComments, setVisibleComments] = useState(5);
  const [repliesData, setRepliesData] = useState<{ [key: string]: ReplyInfo[] }>({});
  
  const { convertInt8ToBase64, convertNanosecondsToTimestamp } = Constant();
  const { createCommentReply, likeComment, dislikeComment, getAllReplies, getAllRepliesOfArchivedPost } = CommentsApiHanlder();

  function showMoreComments() {
    setVisibleComments((prevValue) => prevValue + 5);
  }

  const getReplies = async (commentId: string) => {
    let response;
    if (type === "archive") {
      response = (await getAllRepliesOfArchivedPost(
        commentId
      )) as BackendResponse;
    } else {
      response = (await getAllReplies(commentId)) as BackendResponse;
    }
    // const response = (await getAllReplies(commentId)) as BackendResponse;
    if (response && response.status === true) {
      const comments = response.data[0];
      if (comments && comments.length > 0) {
        comments.forEach((element: any) => {
          const timestamp: string = convertNanosecondsToTimestamp(BigInt(element.createdAt));
          element.createdAt = timestamp;
          element.likes = element.likedBy.length;
        });
        setRepliesData(prevRepliesData => ({ ...prevRepliesData, [commentId]: comments }));
      }
    }
  };

  async function handleAddReply(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    commentId: string
  ) {
    e.preventDefault();
    setLoading(true);
    const response = (await createCommentReply(commentId, reply)) as ReplyResponse;
    
    if (response && response.ok) {
      toast.success(response.ok);
      await getReplies(commentId);
      setReply("");
      setLoading(false);
    } else {
      toast.error(response.error);
      setLoading(false);
    }
  }

  async function handleLikeComment(commentId: string, vote: boolean) {
    const postId = commentId.split("_")[0];

    if (vote) {
      const response = (await likeComment(postId, commentId)) as LikeResponse;
      if (response && response.ok) {
        toast.success("You liked the comment!");
        getComments();
      } else {
        toast.error("Error liking comment, Please verify and provide valid data!");
      }
    } else {
      const response = (await dislikeComment(postId, commentId)) as LikeResponse;
      if (response && response.ok) {
        toast.success("You disliked the comment!");
      } else {
        toast.error("Error disliking comment, Please verify and provide valid data!");
      }
    }
  }

  return (
    <div className="ml-5">
      {currentComment.slice(0, visibleComments).map((comment, index) => (
        <div key={index} className="flex flex-col gap-4 border-l relative mt-7">
          <div
            className={`absolute -left-4 tablet:-left-5 top-0 w-8 h-8 tablet:w-10 tablet:h-10 bg-[#686868] text-[#fff] flex justify-center rounded`}
          >
            <img
              className="block h-full w-full object-cover rounded"
              src={convertInt8ToBase64(comment.createdBy.userProfile)}
              alt=""
            />
          </div>
          <div className="flex items-center gap-4 ml-10 pt-1 tablet:pt-2">
            <h1 className="font-semibold">{comment.createdBy.userName}</h1>
            <div className="ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
              {comment.createdAt}
            </div>
          </div>
          <div className="dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-10">
            {comment.comment}
          </div>
          <div className="flex-row-center gap-10 ml-10">
            <div
              className={`flex tablet:text-lg text-xs items-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1`}
            >
              <MdOutlineVerifiedUser />
              <span>{comment.likedBy.length}</span>
            </div>
            <div
              className={`gap-2 text-3xl ${type === "archive" ? "hidden" : "flex"}`}
            >
              <TbSquareChevronUpFilled
                className={`${vote ? "text-dirty-light-green" : "text-[#C1C1C1]"} cursor-pointer`}
                onClick={() => {
                  handleLikeComment(comment.commentId, true);
                }}
              />
              <TbSquareChevronDownFilled
                className={`${!vote ? "text-dirty-light-green" : "text-[#C1C1C1]"} cursor-pointer`}
                onClick={() => {
                  handleLikeComment(comment.commentId, false);
                }}
              />
            </div>
            <div className={`${type === "archive" ? "hidden" : "block"}`}>
              <button
                className="flex-row-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 cursor-pointer"
                type="button"
                onClick={() => {
                  setActiveReplyButton(activeReplyButton === comment.commentId ? null : comment.commentId);
                }}
              >
                <PiArrowBendUpRightBold />
                <span>Reply</span>
              </button>
            </div>
          </div>
          {activeReplyButton === comment.commentId && (
            <div>
              <form className={`${type === "archive" ? "hidden" : "block"} px-10`}>
                <section className="">
                  <input
                    className="border-b border-opacity-50 border-[#000] dark:border-[#fff] w-full bg-transparent p-2"
                    type="text"
                    placeholder="Add a reply"
                    value={reply}
                    onChange={(e) => {
                      setReply(e.target.value);
                    }}
                  />
                  <div className="flex items-center justify-end mt-4">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={(e) => {
                          handleAddReply(e, comment.commentId);
                        }}
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
          )}
          {activeReplyId === comment.commentId && (
            <div className="flex mt-2">
              <div className="w-14 h-[1px] bg-[#000] dark:bg-[#fff] mt-8 tablet:mt-9"></div>
              <div className="">
                <Replies commentId={comment.commentId} repliesData={repliesData[comment.commentId] || []} getReplies={() => getReplies(comment.commentId)} />
              </div>
            </div>
          )}
          <div className="-mb-[10px] flex items-center mt-2">
            <div className="w-14 h-[1px] bg-[#000] dark:bg-[#fff]"></div>
            <button
              onClick={() => {
                setActiveReplyId(comment.commentId === activeReplyId ? null : comment.commentId);
              }}
              className="text-sm ml-1"
            >
              {activeReplyId === comment.commentId ? "Hide Replies" : "View replies"}
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={showMoreComments}
        className={`mt-8 border border-[#000] dark:border-[#fff] text-[#000] dark:text-[#fff] rounded-full px-6 py-2 font-semibold cursor-pointer ${currentComment.length <= visibleComments ? "hidden" : "block"}`}
      >
        Load More
      </button>
    </div>
  );
};

export default Comment;
