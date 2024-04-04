import React, { useEffect } from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import CommentsApiHanlder from "../../../API_Handlers/comments";
import Constant from "../../../utils/constants";

interface CommentInfo {
  reply: string;
  replyId: string;
  createdAt: string;
  likedBy: [];
}

interface RepliesProps {
  commentId: string;
}

interface BackendResponse {
  status: boolean;
  data: [][];
  error: string[];
}

const Replies: React.FC<RepliesProps> = ({ commentId }) => {
  const [vote, setVote] = React.useState(true);
  const handleVote = (vote: boolean) => {
    setVote(vote);
  };
  const { getAllReplies } = CommentsApiHanlder();
  const [commentsData, setcommentsData] = React.useState<CommentInfo[]>([]);
  const { convertNanosecondsToTimestamp } = Constant();

  const getReplies = async () => {
    const response = (await getAllReplies(commentId)) as BackendResponse;
    console.log("replies reponse: ", response)
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
        console.log("comment replies: ", comments)
        setcommentsData(comments);
      }
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  return (
    <>
      {commentsData.map((comment, index) => (
        <div className="flex flex-col gap-4 relative pt-3">
          {/* user details */}
          <div className="absolute -left-6 top-0 w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded bg-[url('/src/images/comment-avatar.jpg')] bg-cover bg-no-repeat bg-center"></div>
          <div className="flex items-center gap-4 ml-10">
            <h1 className="font-semibold">IamCool_1122</h1>
            <div className="ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
              {comment.createdAt}
            </div>
          </div>

          {/* comment content */}
          <div className="text-[#000] dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-10">
            {comment.reply}
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

            <div>
              <button
                className="flex-row-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 cursor-pointer"
                type="button"
              >
                <PiArrowBendUpRightBold />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Replies;
