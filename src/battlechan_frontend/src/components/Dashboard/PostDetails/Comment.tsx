import React, { useState } from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import Replies from "./Replies";
import Constant from "../../../utils/constants";
import toast from "react-hot-toast";
import CommentsApiHanlder from "../../../API_Handlers/comments";

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

interface CommentProps {
  currentComment: CommentInfo[];
  type?: string;
}

interface ReplyResponse {
  ok: string;
}

const Comment: React.FC<CommentProps> = ({ currentComment, type }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [activeReplyButton, setActiveReplyButton] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [vote, setVote] = React.useState(true);
  const handleVote = (vote: boolean) => {
    setVote(vote);
  };
  const { convertInt8ToBase64 } = Constant();
  const { createCommentReply } = CommentsApiHanlder();

  async function handleAddReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, commentId: string) {
    e.preventDefault();
    setLoading(true);
    const response = (await createCommentReply(
      commentId ?? "",
      reply
    )) as ReplyResponse;
    console.log(response);

    if (response && response?.ok) {
      toast.success(response.ok);
      setLoading(false);
      // window.location.href = "/dashboard/mainPosts";
    } else {
      toast.error(
        "Error Creating reply, Please verify and provide valid data!"
      );
      setLoading(false);
    }
  }

  return (
    <div>
      {/* comment details */}
      {/* <div key={index}> */}
      {/* user details */}

      {currentComment.map((comment, index) => (
        <div key={index} className="flex flex-col gap-4 border-l relative mt-7">
          {/* <div className={`absolute -left-6 top-0 w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded bg-[url(${convertInt8ToBase64(comment.createdBy.userProfile)})] bg-cover bg-no-repeat bg-center`}></div> */}
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

          {/* comment content */}
          <div className="dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-10">
            {comment.comment}
          </div>

          {/* upvote downvote and reply button */}
          <div className="flex-row-center gap-10 ml-10">
            <div className="flex gap-2 text-3xl">
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

            <div className={`${type === "archive" ? "hidden" : "block"}`}>
              <button
                className="flex-row-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 cursor-pointer"
                type="button"
                onClick={() => {
                  setActiveReplyButton(
                    activeReplyButton === comment.commentId
                      ? null
                      : comment.commentId
                  );
                }}
              >
                <PiArrowBendUpRightBold />
                <span>Reply</span>
              </button>
            </div>
          </div>
          {activeReplyButton === comment.commentId && (
            <div>
              <form
                className={`${type === "archive" ? "hidden" : "block"} px-10`}
              >
                <section className="">
                  <input
                    className="border-b border-opacity-50 border-[#000] dark:border-[#fff] w-full bg-transparent p-2"
                    type="text"
                    placeholder="Add a reply"
                    onChange={(e) => {
                      setReply(e.target.value);
                    }}
                  />
                  <div className="flex items-center justify-end mt-4">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={() => {
                          setActiveReplyButton(null)
                        }}
                        className="text-[#000] dark:text-[#fff] rounded-full px-6 py-2 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e)=>{handleAddReply(e, comment.commentId)}}
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
                <Replies commentId={comment.commentId} />
              </div>
            </div>
          )}

          <div className="-mb-[10px] flex items-center mt-2">
            <div className="w-14 h-[1px] bg-[#000] dark:bg-[#fff]"></div>
            <button
              onClick={() => {
                setActiveReplyId(
                  comment.commentId === activeReplyId ? null : comment.commentId
                );
              }}
              className="text-sm ml-1"
            >
              {activeReplyId === comment.commentId
                ? "Hide Replies"
                : "View replies"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
