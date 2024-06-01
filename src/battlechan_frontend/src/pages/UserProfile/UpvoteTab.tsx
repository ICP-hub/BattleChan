import React, { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import UserApiHanlder from "../../API_Handlers/user";
import Constant from "../../utils/constants";

interface Response {
  upvotes: PostUpvoteData[];
  downvotes: PostUpvoteData[];
}

interface PostUpvoteData {
  postId: string;
  postMetaData: Int8Array;
  userName: string;
}

interface UpvoteTabProps {
  type?: string;
}

const UpvoteTab: React.FC<UpvoteTabProps> = ({ type }) => {
  const [voteData, setVoteData] = useState<PostUpvoteData[]>([]);

  const { votesOfUser } = UserApiHanlder();
  const { convertInt8ToBase64 } = Constant();

  useEffect(() => {
    const getUserUpvotes = async () => {
      const votesData = (await votesOfUser()) as Response;
      if (votesData) {
        const { upvotes, downvotes } = votesData;

        if (type === "downvote") {
          if (votesData && downvotes) {
            setVoteData(downvotes);
          }
        } else {
          if (votesData && upvotes) {
            setVoteData(upvotes);
          }
        }
      }
    };
    getUserUpvotes();
  }, []);

  return (
    <>
      <h1 className="text-lg tablet:text-2xl dark:text-[#fff] font-bold tablet:mb-10">
        {type === "downvote" ? "All Your Downvotes" : "All Your Upvotes"}
      </h1>

      <div className=" dark:text-[#fff]">
        {voteData.length > 0 &&
          voteData.map((vote, index) => (
            <div
              key={index}
              className="flex justify-between items-center my-4 mb-8"
            >
              <div className="text-sm max-w-60 tablet:max-w-none tablet:flex tablet:gap-6 items-center">
                <div>
                  You upvoted a post by <strong>{vote.userName}</strong> with
                  post Id {vote.postId}
                </div>
                <div className="flex items-center justify-end gap-2 mt-2 tablet:mt-0">
                  <div className="tablet:hidden">
                    <MdArrowOutward size={18} />
                  </div>
                </div>
              </div>
              <div className="ml-4 max-w-20 tablet:max-w-28 rounded-sm flex items-center gap-4">
                <img
                  className="block h-auto h- w-full rounded h-[60px] cover"
                  src={convertInt8ToBase64(vote.postMetaData)}
                  alt="post image"
                />
                <div className="hidden tablet:block">
                  <MdArrowOutward size={18} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UpvoteTab;
