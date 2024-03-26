import React from "react";

interface PostGridProps {
  type: string;
}

const PostGrid = (props: PostGridProps) => {
  const type = props.type;
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
          <div key={post.id} className="my-1 px-1 w-1/3 laptop:my-2 laptop:px-2">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  className={`block h-auto w-full ${type === 'Archive' ? 'grayscale' : ''}`}
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
