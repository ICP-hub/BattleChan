import React from "react";
import Post from "./Post";

interface PostData {
  id: string;
  imageUrl: string;
  userAvatarUrl: string;
  userName: string;
  timestamp: string;
  duration: string;
  content: string;
  likes: string;
  comments: number;
}

interface PostsProps {
  currentPosts: PostData[];
}

const Posts: React.FC<PostsProps> = ({ currentPosts }) => {
  return (
    <>
      {currentPosts.map((post, index) => (
        <div className={`w-full max-w-md tablet:max-w-none tablet:w-1/2 p-2  ${index % 2 !== 0 ? 'tablet:mt-6' : ''}`}>
          <Post
            key={post.id}
            id={post.id}
            imageUrl={post.imageUrl}
            userAvatarUrl={post.userAvatarUrl}
            userName={post.userName}
            timestamp={post.timestamp}
            duration={post.duration}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
          />
        </div>
      ))}
    </>
  );
};

export default Posts;
