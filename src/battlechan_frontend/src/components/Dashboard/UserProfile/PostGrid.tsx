import React, { useEffect, useState } from "react";
import UserApiHanlder from "../../../API_Handlers/user";
import defaultPostImg from "/src/images/post-basketball.jpg";
import Constant from "../../../utils/constants";

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
  profileImg: Int8Array;
  replyIds: any[];
  updatedAt: string[];
  upvotedTo: any[];
  userId: string;
  userName: string;
}

interface PostData {
  createdAt: string;
  createdBy: {
    userName: string;
    ownerId: any;
    userProfile: string;
  };
  downvotedBy: any[];
  downvotes: BigInt;
  expireAt: BigInt;
  postDes: string;
  postId: string;
  postMetaData: Int8Array;
  postName: string;
  updatedAt: any[];
  upvotedBy: any[];
  upvotes: BigInt;
}

const PostGrid: React.FC<PostGridProps> = ({ type, userInfo }) => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const { getPostInfo } = UserApiHanlder();
  const { convertInt8ToBase64 } = Constant();

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

  // const posts = [
  //   { id: 1, imageUrl: "/src/images/post-basketball.jpg" },
  //   { id: 2, imageUrl: "/src/images/post-basketball.jpg" },
  //   { id: 3, imageUrl: "/src/images/post-basketball.jpg" },
  //   { id: 4, imageUrl: "/src/images/post-basketball.jpg" },
  //   { id: 5, imageUrl: "/src/images/post-basketball.jpg" },
  //   { id: 6, imageUrl: "/src/images/post-basketball.jpg" },
  // ];

  if (type === "Archive") {
    return (
      <>
        <div className="flex flex-wrap -mx-1 laptop:-mx-3">
          {postData.length > 0 &&
            postData.map((post, index) => (
              <div
                key={index}
                className="my-1 px-1 w-1/3 laptop:my-2 laptop:px-2"
              >
                <article className="overflow-hidden h-56 rounded-lg shadow-lg">
                  <a href="">
                    <img
                      alt="Placeholder"
                      className={`block h-full w-full object-cover ${
                        type === "Archive" ? "grayscale" : ""
                      }`}
                      src={convertInt8ToBase64(post.postMetaData)}
                    />
                  </a>
                </article>
              </div>
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap -mx-1 laptop:-mx-3">
        {postData.length > 0 &&
          postData.map((post, index) => (
            <div
              key={index}
              className="my-1 px-1 w-1/3 laptop:my-2 laptop:px-2"
            >
              <article className="overflow-hidden h-56 rounded-lg shadow-lg">
                <a href="">
                  <img
                    alt="Placeholder"
                    className={`block h-full w-full object-cover ${
                      type === "Archive" ? "grayscale" : ""
                    }`}
                    src={convertInt8ToBase64(post.postMetaData)}
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
