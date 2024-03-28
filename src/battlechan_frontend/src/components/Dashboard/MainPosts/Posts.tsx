import React from "react";
import Post from "./Post";

interface PostData {
  postId: string;
  postName: string;
  postMetaData: string;
  postDes: string;
  expireAt: BigInt;
  createdAt: string;
}

interface PostsProps {
  currentPosts: PostData[];
}
let comments = 0;
const Posts: React.FC<PostsProps> = ({ currentPosts }) => {
  return (
    <>
      {currentPosts.map((post, index) => (
        <div className={`w-full max-w-md tablet:max-w-none tablet:w-1/2 p-2  ${index % 2 !== 0 ? 'tablet:mt-6' : ''}`}>
          <Post
            key={post.postId}
            id={post.postId}
            imageUrl={post.postMetaData}
            userAvatarUrl="/src/images/main-post-user-avatar.jpg"
            userName="Khushali"
            timestamp={post.createdAt}
            duration="5:00"
            content={post.postDes}
            likes="0"
            comments={comments}
            expireAt={post.expireAt}
          />
        </div>
      ))}
    </>
  );
};

export default Posts;
