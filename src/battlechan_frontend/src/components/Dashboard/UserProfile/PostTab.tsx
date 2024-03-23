import React from "react";
import PostGrid from "./PostGrid";

const PostTab = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Popular</h1>
        <div className="flex items-center justify-center gap-2">
          <button className="border border-[#000] text-[#000] rounded-md px-6 py-2 font-semibold">Sports</button>
          <button className="flex items-center justify-center bg-[#000] text-[#fff] rounded-md px-6 py-2 font-semibold">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>
      <PostGrid />
      <div className="flex items-center justify-between m-4">
        <h1 className="text-2xl font-bold">Archive</h1>
      </div>
      <PostGrid />
    </>
  );
};

export default PostTab;
