import React from "react";
import Post from "./Post";

interface PostData {
  postId: string;
  postName: string;
  postMetaData: Int8Array;
  postDes: string;
  expireAt: BigInt;
  createdAt: string;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  },
  upvotes: number;
}

interface PostsProps {
  currentPosts: PostData[];
  type?: string;
}

let comments = 0;
const Posts: React.FC<PostsProps> = ({ currentPosts, type }) => {
  const className = "Dashboard__MainPosts__Posts";

  return (
    <React.Fragment>
      {currentPosts.map((post, index) => (
        <div
          className={
            className +
            " " +
            `laptop:w-1/2 w-full p-2 ${index % 2 !== 0 ? "tablet:mt-6" : ""}`
          }
        >
            <MemoizedPost
              key={post.postId}
              id={post.postId}
              postName={post.postName}
              imageUrl={post.postMetaData}
              userAvatarUrl="/src/images/main-post-user-avatar.jpg"
              timestamp={post.createdAt}
              duration="5:00"
              content={post.postDes}
              likes={post.upvotes}
              comments={comments}
              expireAt={post.expireAt}
              userName={post.createdBy.userName}
              userProfile={post.createdBy.userProfile}
              type={type}
            />
        </div>
      ))}
    </React.Fragment>
  );
};

const MemoizedPost = React.memo(Post);

export default Posts;
