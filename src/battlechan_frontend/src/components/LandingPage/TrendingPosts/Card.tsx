import React from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";

type PostType = {
  post: any;
  postList: any;
  index: number;
};

const Card = ({ post, index, postList }: PostType) => {
  const [votes, setVotes] = React.useState<boolean[]>(
    Array(postList.length).fill(true)
  );

  const handleVote = (index: number, vote: boolean) => {
    const newVotes = [...votes];
    newVotes[index] = vote;
    setVotes(newVotes);
  };

  return (
    <div className="trendingPostCard phone:min-w-[380px] min-w-[360px] my-2 rounded-lg bg-light text-dark shadow-md shadow-dark">
      {/* Cover Image */}
      <img
        src={post.coverImg}
        alt="Post Cover Image"
        className="postImage w-full pointer-events-none"
      />

      {/* Details */}
      <div className="postData w-full phone:p-6 p-4 flex-direction-col gap-4">
        <div className="top flex-row-center justify-between">
          {/* Owner Profile Photo and Name */}
          <section className="owner flex-row-center gap-1">
            <img
              src={post.ownerImage}
              alt="Profile Image"
              className="w-[35px] pointer-events-none"
            />
            <span className="text-md font-semibold">{post.ownerName}</span>
          </section>

          {/* Date, Time and ID  */}
          <section className="flex-direction-row gap-1">
            <span className="text-xs">{post.date_and_time}</span>
            <span className="text-xs">{post.postId}</span>
          </section>
        </div>

        <p className="postContent phone:text-sm text-xs">
          {post.text.length > 150 ? post.text.slice(0, 150) + "..." : post.text}
        </p>

        <div className="bottom flex-row-center justify-between">
          {/* Upvote and Downvote buttons */}
          <section className="buttons flex-row-center gap-2 text-3xl">
            <TbSquareChevronUpFilled
              className={`${
                votes[index] ? "text-dirty-light-green" : "text-[#C1C1C1]"
              } cursor-pointer`}
              onClick={() => handleVote(index, true)}
            />

            <TbSquareChevronDownFilled
              className={`${
                !votes[index] ? "text-dirty-light-green" : "text-[#C1C1C1]"
              } cursor-pointer`}
              onClick={() => handleVote(index, false)}
            />
          </section>

          {/* Total tokens and comments count */}
          <section className="counts gap-4 flex-direction-row phone:text-base text-xs">
            <span className="timeToken flex-row-center gap-1">
              <MdOutlineVerifiedUser />
              {post.timeToken}
            </span>
            <span className="comments flex-row-center gap-1">
              <LiaCommentSolid />
              {post.commentCount} Comments
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
