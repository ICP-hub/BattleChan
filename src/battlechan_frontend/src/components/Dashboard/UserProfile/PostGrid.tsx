import React from "react";

const PostGrid = () => {
  const posts = [
    { id: 1, imageUrl: "https://picsum.photos/600/400/?random" },
    { id: 2, imageUrl: "https://picsum.photos/600/400/?random" },
    { id: 3, imageUrl: "https://picsum.photos/600/400/?random" },
    { id: 4, imageUrl: "https://picsum.photos/600/400/?random" },
    { id: 5, imageUrl: "https://picsum.photos/600/400/?random" },
    { id: 6, imageUrl: "https://picsum.photos/600/400/?random" },
  ];

  return (
    <>
      <div className="flex flex-wrap -mx-1 laptop:-mx-3">
        {posts.map((post) => (
          <div key={post.id} className="my-1 px-1 w-full tablet:w-1/2 laptop:my-2 laptop:px-2 laptop:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
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
