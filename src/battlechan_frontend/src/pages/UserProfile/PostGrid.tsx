import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Constant from "../../utils/constants";
import UserApiHanlder from "../../API_Handlers/user";
import PostApiHanlder from "../../API_Handlers/post";

import defaultPostImg from "/src/images/post-basketball.jpg";

interface PostGridProps {
  type: string;
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
  postId: string;
  postMetaData: Int8Array;
  postName: string;
}

interface PostResponse {
  status: boolean;
  data: PostData[][];
  error: string[];
}

const PostGrid: React.FC<PostGridProps> = ({ type }) => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const { getPostInfo } = UserApiHanlder();
  const { getUsersMainPosts, getUsersArchivePosts } = PostApiHanlder();
  const { convertInt8ToBase64, convertNanosecondsToTimestamp } = Constant();

  useEffect(() => {
    const fetchData = async () => {
      if (type == "Archive") {
        const response = (await getUsersArchivePosts()) as PostResponse;
        if (response.status == true && response.data.length > 0) {
          // console.log(response);
          const posts = response.data
            .flatMap((nestedArray) => nestedArray)
            .flatMap((element) => {
              if (
                Array.isArray(element) &&
                element.length === 2 &&
                typeof element[1] === "object"
              ) {
                return [element[1]]; // Include only the object part
              }
              return [];
            });
          setPostData(posts);
        }
      } else {
        const response = (await getUsersMainPosts()) as PostResponse;
        if (response.status == true && response.data.length > 0) {
          // console.log(response);
          // const posts = response.data
          //   .flatMap((nestedArray) => nestedArray)
          //   .flatMap((element) => {
          //     if (
          //       Array.isArray(element) &&
          //       element.length === 2 &&
          //       typeof element[1] === "object"
          //     ) {
          //       return [element[1]]; // Include only the object part
          //     }
          //     return [];
          //   });
          const posts = response.data.flat();
          setPostData(posts);
        }
      }
    };

    fetchData();
  }, []);

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
                  <Link
                    key={post.postId}
                    to={`/dashboard/postDetails/${encodeURIComponent(
                      post.postId
                    )}?type=archive`}
                  >
                    <img
                      alt="Placeholder"
                      className={`block h-full w-full object-cover ${
                        type === "Archive" ? "grayscale" : ""
                      }`}
                      src={convertInt8ToBase64(post.postMetaData)}
                    />
                  </Link>
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
              key={post.postId}
              className="my-1 px-1 w-1/3 laptop:my-2 laptop:px-2"
            >
              <article className="overflow-hidden h-56 rounded-lg shadow-lg">
                <Link
                  to={`/dashboard/postDetails/${encodeURIComponent(
                    post.postId
                  )}`}
                >
                  <img
                    alt="Placeholder"
                    className={`block h-full w-full object-cover ${
                      type === "Archive" ? "grayscale" : ""
                    }`}
                    src={convertInt8ToBase64(post.postMetaData)}
                  />
                </Link>
              </article>
            </div>
          ))}
      </div>
    </>
  );
};

export default PostGrid;
