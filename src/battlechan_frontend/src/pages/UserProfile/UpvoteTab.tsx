import React, { useEffect, useState } from "react";
import { IoEllipse } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import postImage from "../../images/comment-tab-post-image.jpg";
import UserApiHanlder from "../../API_Handlers/user";
import Constant from "../../utils/constants";

interface Response {
  upvotes: PostUpvoteData[],
  downvotes: PostUpvoteData[]
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
  const [voteData, setVoteData] = useState<PostUpvoteData[]>([])

  const {votesOfUser} = UserApiHanlder()
  const { convertInt8ToBase64 } = Constant();

  useEffect(() => {
    const getUserUpvotes = async () =>{
      const {upvotes, downvotes} = await votesOfUser() as Response;
      if(type==='downvote'){
        setVoteData(downvotes)
      } else {
        setVoteData(upvotes)
      }
    }
    getUserUpvotes()
  }, [])
  

  return (
    <>
      <h1 className="text-lg tablet:text-2xl dark:text-[#fff] font-bold tablet:mb-10">
        {type === "downvote" ? "All Your Downvotes" : "All Your Upvotes"}
      </h1>

      {/* upvote message div  */}
      <div className=" dark:text-[#fff]">
        {/* <h1 className="font-bold tablet:text-lg mt-6">Today</h1> */}
        {voteData.length > 0 && voteData.map((vote, index) => (
          <div
            key={index}
            className="flex justify-between items-center my-4 mb-8"
          >
            <div className="text-sm max-w-60 tablet:max-w-none tablet:flex tablet:gap-6 items-center">
              {/* upvote message  */}
              <div>
                You upvoted a post by <strong>{vote.userName}</strong> with
                post Id #{vote.postId}
              </div>
              {/* time  */}
              <div className="flex items-center justify-end gap-2 mt-2 tablet:mt-0">
                {/* <div className="flex items-center gap-2">
                  <IoEllipse size={5} />
                  <span>
                    <i>{comment.time}</i>
                  </span>
                </div> */}
                <div className="tablet:hidden">
                  <MdArrowOutward size={18} />
                </div>
              </div>
            </div>
            <div className="ml-4 max-w-20 tablet:max-w-28 rounded-sm flex items-center gap-4">
              <img
                className="block h-auto w-full rounded"
                src={convertInt8ToBase64(vote.postMetaData)}
                alt="post image"
              />
              <div className="hidden tablet:block">
                <MdArrowOutward size={18} />
              </div>
            </div>
          </div>
        ))}

        {/* <hr /> */}

        {/* <h1 className="font-bold tablet:text-lg mt-6">Previous</h1> */}
        {/* {comments.map((comment, index) => (
          <div
            key={index}
            className="flex justify-between items-center my-4 mb-8"
          >
            <div className="text-sm max-w-60 tablet:max-w-none tablet:flex tablet:gap-6 items-center">
              <div>
                You upvoted a post by <strong>{comment.username}</strong> with
                post Id #{comment.postId}
              </div>
              <div className="flex items-center justify-end gap-2 mt-2 tablet:mt-0">
                <div className="flex items-center gap-2">
                  <IoEllipse size={5} />
                  <span>
                    <i>{comment.time}</i>
                  </span>
                </div>
                <div className="tablet:hidden">
                  <MdArrowOutward size={18} />
                </div>
              </div>
            </div>
            <div className="ml-4 max-w-20 tablet:max-w-28 rounded-sm flex items-center gap-4">
              <img
                className="block h-auto w-full rounded"
                src={postImage}
                alt="post image"
              />
              <div className="hidden tablet:block">
                <MdArrowOutward size={18} />
              </div>
            </div>
          </div>
        ))} */}

        
      </div>
    </>
  );
};

export default UpvoteTab;
