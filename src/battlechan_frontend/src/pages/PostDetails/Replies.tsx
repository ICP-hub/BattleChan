import React, { useEffect } from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { MdOutlineVerifiedUser } from "react-icons/md";
import CommentsApiHanlder from "../../API_Handlers/comments";
import Constant from "../../utils/constants";
import toast from "react-hot-toast";

interface User {
  userName: string;
  userProfile: Int8Array;
}

interface ReplyInfo {
  createdBy: User;
  reply: string;
  replyId: string;
  createdAt: string;
  likes: bigint;
}

interface RepliesProps {
  commentId: string;
  repliesData: ReplyInfo[];
  getReplies: () => void;
}

interface LikeResponse {
  ok: string;
}

const Replies: React.FC<RepliesProps> = ({
  commentId,
  repliesData,
  getReplies,
}) => {
  const [vote, setVote] = React.useState(true);
  const handleVote = (vote: boolean) => {
    setVote(vote);
  };
  const { likeCommentReply } = CommentsApiHanlder();

  const { convertInt8ToBase64 } = Constant();

  useEffect(() => {
    getReplies();
  }, []);

  async function handleLikeCommentReply(replyId: string, vote: boolean) {
    if (vote) {
      const response = (await likeCommentReply(
        commentId ?? "",
        replyId ?? ""
      )) as LikeResponse;

      if (response && response?.ok) {
        toast.success("You liked the comment reply!");
        getReplies();
      } else {
        toast.error(
          "Error liking comment reply, Please verify and provide valid data!"
        );
      }
    }
  }

  if (repliesData.length === 0) {
    return <div className="-ml-5 mt-3 text-sm">No Replies</div>;
  }

  return (
    <>
      {repliesData.map((reply, index) => (
        <div className="flex flex-col gap-4 relative mt-4">
          <div
            className={`absolute tablet:-left-4 tablet:-left-5 top-0 w-8 h-8 tablet:w-10 tablet:h-10 bg-[#686868] text-[#fff] flex justify-center rounded`}
          >
            <img
              className="block h-full w-full object-cover rounded"
              src={convertInt8ToBase64(reply.createdBy.userProfile)}
              alt=""
            />
          </div>

          <div className="flex flex-col tablet:flex-row tablet:items-center ml-10 tablet:mt-2">
            <h1 className="font-semibold">{reply.createdBy.userName}</h1>
            <div className="tablet:ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
              {reply.createdAt}
            </div>
          </div>

          <div className="text-[#000] dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-10">
            {reply.reply}
          </div>

          <div
            className={`flex tablet:text-lg text-xs items-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1`}
          >
            <MdOutlineVerifiedUser />
            <span>{Number(reply.likes)}</span>
          </div>

          <div className="flex-row-center gap-10 ml-10">
            <div className="flex gap-2 text-3xl">
              <TbSquareChevronUpFilled
                className={`${
                  vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                } cursor-pointer`}
                onClick={() => {
                  handleLikeCommentReply(reply.replyId, true);
                }}
              />

              <TbSquareChevronDownFilled
                className={`${
                  !vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                } cursor-pointer`}
                onClick={() => {
                  handleLikeCommentReply(reply.replyId, false);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Replies;
