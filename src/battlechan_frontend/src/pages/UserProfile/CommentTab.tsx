import React, { useEffect, useState } from "react";

import Constant from "../../utils/constants";
import CommentsApiHanlder from "../../API_Handlers/comments";
import PostApiHanlder from "../../API_Handlers/post";

interface UserInfo {
  createdAt: string;
  createdComments: string[];
  downvotedTo: any[];
  likedComments: any[];
  postIds: string[];
  profileImg: Int8Array;
  replyIds: any[];
  updatedAt: string[];
  upvotedTo: any[];
  userId: string;
  userName: string;
}

interface CommentTabProps {
  userInfo: UserInfo[];
}

interface Comment {
  commentId: string;
  createdAt: string;
  likedBy: string[];
  comment: string;
  updatedAt: string[];
  replies: { empty: null } | null;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
  postImage: Int8Array;
  postId: string;
}

const CommentTab: React.FC<CommentTabProps> = ({ userInfo }) => {
  const { getUserCommentInfo, getUserSingleComment } = CommentsApiHanlder();
  const { convertInt8ToBase64 } = Constant();
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const { getSingleMainPost } = PostApiHanlder();

  const multilineEllipsisStyle: React.CSSProperties = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };

  useEffect(() => {
    const getUserComments = async () => {
      if (userInfo.length > 0 && userInfo[0].createdComments.length > 0) {
        for (const commentId of userInfo[0].createdComments) {
          let data = await getUserSingleComment(commentId);
          if(data && data.length > 0){
            setCommentData(data);
          }
        }
      }
    };
    getUserComments();
  }, [userInfo, getUserSingleComment]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="dark:text-[#fff] font-bold tablet:text-lg">Today</h1>
      {/* comment  */}
      {commentData.length > 0 &&
        commentData.map((comment) => (
          <>
            <div key={comment.commentId} className="flex items-start justify-between gap-4 mt-2">
              {/* user avatar  */}
              <div className="min-w-8 min-h-8 tablet:min-w-12 tablet:min-h-12 bg-[#fff] text-[#fff] flex items-center justify-center rounded">
                <img
                  src={convertInt8ToBase64(comment.createdBy.userProfile)}
                  alt="USER IMAGE"
                  className="min-w-[50px] h-[57px] object-cover rounded-md cursor-pointer"
                />
              </div>
              {/* comment and likes  */}
              <div className="w-full flex flex-col">
                <div
                  className="max-w-full text-xs tablet:text-base text-[#000] dark:text-[#fff] text-opacity-70 dark:text-opacity-50"
                  style={multilineEllipsisStyle}
                >
                  {comment.comment}
                </div>
                <div className="tablet:mt-4 flex items-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 text-[9px] tablet:text-xs">
                  <svg
                    className="w-3 h-3 tablet:w-[18px] tablet:h-[17px]"
                    viewBox="0 0 7 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.64338 4.26217L4.50503 2.37172L4.19286 2.05516L2.64338 3.62861L2.03129 3.00705L1.71955 3.32405L2.64338 4.26217ZM3.10246 7.40418C3.92441 6.67784 4.57411 5.93921 5.05155 5.1883C5.52898 4.43709 5.7677 3.78741 5.7677 3.23925C5.7677 2.42707 5.51455 1.75666 5.00826 1.22804C4.50197 0.69941 3.8667 0.435244 3.10246 0.43554C2.3385 0.43554 1.70323 0.699706 1.19665 1.22804C0.690066 1.75637 0.43692 2.42677 0.437212 3.23925C0.437212 3.78741 0.675929 4.43709 1.15336 5.1883C1.63109 5.93921 2.28079 6.67814 3.10246 7.40418ZM3.10246 8C2.07501 7.07742 1.30114 6.21699 0.78086 5.41873C0.260287 4.62046 0 3.89396 0 3.23925C0 2.30009 0.301093 1.5255 0.90328 0.915478C1.50576 0.305159 2.23882 0 3.10246 0C3.96609 0 4.69915 0.305159 5.30163 0.915478C5.90382 1.5255 6.20491 2.30009 6.20491 3.23925C6.20491 3.89396 5.94477 4.62046 5.42449 5.41873C4.90391 6.21699 4.1299 7.07742 3.10246 8Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{comment.likedBy.length}</span>
                </div>
                {/* <div className="hidden tablet:block mt-2">
                  <button className="text-[10px] tablet:text-sm dark:text-[#fff]">
                    View replies
                  </button>
                </div> */}
              </div>
              {/* comment post image  */}
              {/* <Link
                key={comment.postId}
                to={`/dashboard/postDetails/${encodeURIComponent(comment.postId)}`}
              > */}
              <div className="ml-4 max-w-16 tablet:max-w-32 rounded-sm">
                <img
                  className="block h-auto w-full rounded"
                  src={convertInt8ToBase64(comment.postImage)}
                  alt="comment img"
                />
              </div>
              {/* </Link> */}
            </div>
          </>
        ))}
    </div>
  );
};

export default CommentTab;
