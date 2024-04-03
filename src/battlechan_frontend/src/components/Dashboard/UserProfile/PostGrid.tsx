import React, { useEffect, useState } from "react";
import UserApiHanlder from "../../../API_Handlers/user";

interface PostGridProps {
  type: string;
  userInfo: UserInfo[];
}

interface UserInfo {
  createdAt: string;
  createdComments: any[]; // Define appropriate type for these arrays
  downvotedTo: any[];
  likedComments: any[];
  postIds: string[];
  profileImg: string;
  replyIds: any[];
  updatedAt: string[];
  upvotedTo: any[];
  userId: string;
  userName: string;
}

interface PostData {
  empty: null;
  createdAt: string;
  createdBy: {
      userName: string;
      ownerId: any; // You didn't provide type information for ownerId
      userProfile: string;
  };
  downvotedBy: any[]; // You didn't provide type information for downvotedBy
  downvotes: BigInt;
  expireAt: BigInt;
  postDes: string;
  postId: string;
  postMetaData: string;
  postName: string;
  updatedAt: any[]; // You didn't provide type information for updatedAt
  upvotedBy: any[]; // You didn't provide type information for upvotedBy
  upvotes: BigInt;
}

const PostGrid: React.FC<PostGridProps> = ({ type, userInfo }) => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const { getPostInfo } = UserApiHanlder();

  useEffect(() => {
    const fetchData = async () => {
      if (
        userInfo &&
        userInfo.length > 0 &&
        userInfo[0].postIds &&
        userInfo[0].postIds.length > 0
      ) {
        for (let i = 0; i < userInfo[0].postIds.length; i++) {
          const string = userInfo[0].postIds[i];
          const postId = string.match(/#(\d+)/)?.[0] ?? undefined;
          const data = await getPostInfo(postId ?? "");
          if (data && data.length > 0) {
            console.log("post data here: ", data);
            setPostData(data);
          }
        }
      }
    };

    fetchData();
  }, [userInfo]);

  const posts = [
    { id: 1, imageUrl: "/src/images/post-basketball.jpg" },
    { id: 2, imageUrl: "/src/images/post-basketball.jpg" },
    { id: 3, imageUrl: "/src/images/post-basketball.jpg" },
    { id: 4, imageUrl: "/src/images/post-basketball.jpg" },
    { id: 5, imageUrl: "/src/images/post-basketball.jpg" },
    { id: 6, imageUrl: "/src/images/post-basketball.jpg" },
  ];

  return (
    <>
      <div className="flex flex-wrap -mx-1 laptop:-mx-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="my-1 px-1 w-1/3 laptop:my-2 laptop:px-2"
          >
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  className={`block h-auto w-full ${
                    type === "Archive" ? "grayscale" : ""
                  }`}
                  src={post.imageUrl}
                />
              </a>
            </article>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostGrid;
