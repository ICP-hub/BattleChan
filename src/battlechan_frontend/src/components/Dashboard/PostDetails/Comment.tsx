import React from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";

const Comment = () => {
  const [vote, setVote] = React.useState(true);
  const handleVote = (vote: boolean) => {
    setVote(vote);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* comment user details  */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded bg-[url('/src/images/comment-avatar.jpg')] bg-cover bg-no-repeat bg-center"></div>

        <h1 className="font-semibold">IamCool_1122</h1>
        <div className="ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
          2 day ago ; &000001253
        </div>
      </div>

      {/* comment content  */}
      <div className="dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-[62px]">
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam
      </div>

      {/* upvote downvote and reply button  */}
      <div className="flex-row-center gap-10 ml-[62px]">
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
      <div>
        <button className="text-sm ml-[62px]">View replies</button>
      </div>
    </div>
  );
};

export default Comment;
