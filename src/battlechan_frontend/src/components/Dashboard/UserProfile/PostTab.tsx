import React, { useState } from "react";
import PostGrid from "./PostGrid";

interface UserInfo {
  createdAt: string;
  createdComments: string[];
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
interface PostTabProps {
  userInfo: UserInfo[];
}

const PostTab: React.FC<PostTabProps> = ({userInfo}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSelection, setActiveSelection] = useState("Popular");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (selection: string) => {
    setActiveSelection(selection);
    setIsOpen(false);
  };
  return (
    <>
    {/* post tabs for desktop */}
      <div className="hidden tablet:block">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold dark:text-[#fff]">Popular</h1>
          <div className="flex items-center justify-center gap-2">
            <button className="border border-[#000] dark:border-[#fff] text-[#000] dark:text-[#fff] rounded-md px-6 py-2 font-semibold">
              Sports
            </button>
            <button className="flex items-center justify-center bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000] rounded-md px-6 py-2 font-semibold">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>
        <PostGrid type="Popular" userInfo={userInfo} />
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl font-bold dark:text-[#fff]">Archive</h1>
        </div>
        <PostGrid type="Archive" userInfo={userInfo} />
      </div>
      {/* post tabs for mobile */}
      <div className="tablet:hidden">
        <div className="flex items-center justify-between">
          {/* dropdown button*/}
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-[#000] dark:text-[#fff] bg-transparent focus:ring-2 focus:ring-green font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center"
              type="button"
              onClick={toggleDropdown}
            >
              {activeSelection}
              <svg
                className="w-2.5 h-2.5 ms-3 mt-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          </div>
          {/* sports and filter button  */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center justify-center">
            <button className="border border-[#000] dark:border-[#fff] text-[#000] dark:text-[#fff] rounded-md px-4 py-1 text-xs font-semibold">
              Sports
            </button>
            <button className="flex items-center justify-center bg-transparent text-[#000] dark:text-[#fff] dark:text-opacity-50 rounded-md px-1 py-1 text-xs font-semibold">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
                />
              </svg>
            </button>
            </div>
            <button className="flex items-center justify-center px-4 py-2 bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000] text-xs rounded-full font-semibold">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="ml-1">CreatePost</span>
            </button>
          </div>
        </div>
        {/* dropdown list  */}
        <div>
          {isOpen && (
            <div
              id="dropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <ul
                className="py-2 text-sm text-[#000] dark:text-[#fff]"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    className="block px-4 py-2"
                    onClick={() => handleSelection("Popular")}
                  >
                    Popular
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="block px-4 py-2"
                    onClick={() => handleSelection("Archive")}
                  >
                    Archive
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="mt-3">
          {activeSelection === "Popular" && <PostGrid type="Popular" userInfo={userInfo} />}
          {activeSelection === "Archive" && <PostGrid type="Archive" userInfo={userInfo} />}
        </div>
      </div>
    </>
  );
};

export default PostTab;
