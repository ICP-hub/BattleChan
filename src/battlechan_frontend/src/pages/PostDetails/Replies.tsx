import React, { useEffect } from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import CommentsApiHanlder from "../../API_Handlers/comments";
import Constant from "../../utils/constants";

interface User {
  userName: string;
  userProfile: Int8Array;
}

interface CommentInfo {
  createdBy: User;
  reply: string;
  replyId: string;
  createdAt: string;
  likes: bigint;
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
  const { convertNanosecondsToTimestamp, convertInt8ToBase64 } = Constant();

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
          element.likes = element.likedBy.length;
        });
        console.log("comment replies: ", comments)
        setcommentsData(comments);
      }
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  if (commentsData.length === 0) {
    return (
      <div className="-ml-5 mt-3 text-sm">No Replies</div>
    )
  }

  return (
    <>
      {commentsData.map((comment, index) => (
        <div className="flex flex-col gap-4 relative mt-4">
          {/* user details */}
          <div className={`absolute tablet:-left-4 tablet:-left-5 top-0 w-8 h-8 tablet:w-10 tablet:h-10 bg-[#686868] text-[#fff] flex justify-center rounded`}>
            <img className="block h-full w-full object-cover rounded" src={convertInt8ToBase64(comment.createdBy.userProfile)} alt="" />
            {/* <img className="block h-full w-full object-cover rounded" src={'/src/images/comment-avatar.jpg'} alt="" /> */}
          </div>

          <div className="flex flex-col tablet:flex-row tablet:items-center ml-10 tablet:mt-2">
            <h1 className="font-semibold">{comment.createdBy.userName}</h1>
            <div className="tablet:ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
              {comment.createdAt}
            </div>
          </div>

          {/* comment content */}
          <div className="text-[#000] dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-10">
            {comment.reply}
          </div>

          {/* show likes of comment  */}
          <div
            className={`flex tablet:text-lg text-xs items-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1`}
          >
            <MdOutlineVerifiedUser />
            <span>{Number(comment.likes)}</span>
          </div>

          {/* upvote downvote and reply button */}
          <div className="flex-row-center gap-10 ml-10">
            <div className="flex gap-2 text-3xl">
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

            {/* <div>
              <button
                className="flex-row-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 cursor-pointer"
                type="button"
              >
                <PiArrowBendUpRightBold />
                <span>Reply</span>
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Replies;