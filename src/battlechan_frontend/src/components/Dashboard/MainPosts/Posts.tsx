import React from "react";
import Post from "./Post";
import { Link } from "react-router-dom";

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
  type?: string;
}
let comments = 0;
const Posts: React.FC<PostsProps> = ({ currentPosts, type }) => {
  const className = "Dashboard__MainPosts__Posts";

  return (
    <React.Fragment>
      {currentPosts.map((post, index) => (
<<<<<<< HEAD
        <div
          className={
            className +
            " " +
            `p-2 ${
              index % 2 !== 0 ? "tablet:mt-6" : ""
            }`
          }
        >
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
=======
        <div className={`w-full max-w-md tablet:max-w-none tablet:w-1/2 p-2  ${index % 2 !== 0 ? 'tablet:mt-6' : ''}`}>
          <Link key={post.postId} to={`/dashboard/postDetails/${encodeURIComponent(post.postId)}`}>
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
              type={type}
            />
          </Link>
>>>>>>> main
        </div>
      ))}
    </React.Fragment>
  );
};

export default Posts;
