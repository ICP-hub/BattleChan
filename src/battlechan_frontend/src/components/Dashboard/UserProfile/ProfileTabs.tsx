import React, { useState } from "react";
import PostTab from "./PostTab";
import CommentTab from "./CommentTab";
import UpvoteTab from "./UpvoteTab";

interface TabProps {
  id: string;
  label: string;
}

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("post");

  const tabs: TabProps[] = [
    { id: "post", label: "Post" },
    { id: "comments", label: "Comments" },
    { id: "upvote", label: "Upvote" },
    { id: "downvote", label: "Downvote" },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="container mt-2 mb-24 tablet:my-6 mx-auto px-4 tablet:px-12">
      {/* tab navigation */}
      <div className="flex flex-col tablet:flex-row justify-between items-center mb-6">
        <ul
          className="w-full relative flex flex-wrap p-1 list-none justify-around tablet:justify-start"
          data-tabs="tabs"
          role="list"
        >
          {tabs.map((tab) => (
            <li key={tab.id} className={`text-center rounded-full text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 ${
                activeTab === tab.id
                  ? "text-[#fff] bg-green "
                  : ""
              } ${tab.id === "shared" ? "hidden tablet:inline-block" : ""} `}>
              <a
                className={`px-4 font-semibold text-[10px] tablet:text-base z-30 flex items-center justify-center py-2 transition-all ease-in-out border-0 cursor-pointer bg-inherit ${
                  activeTab === tab.id
                    ? "text-[#fff] text-opacity-100 font-semibold"
                    : ""
                }`}
                data-tab-target=""
                role="tab"
                aria-selected={activeTab === tab.id ? "true" : "false"}
                aria-controls={tab.id}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="hidden tablet:flex items-center justify-center px-8 py-2 bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000] rounded-full font-semibold">
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
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="ml-1 leading-5">CreatePost</span>
        </button>
      </div>
      {/* tab content */}
      <div data-tab-content="">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${
              activeTab === tab.id ? "block opacity-100" : "hidden opacity-0"
            }`}
            id={tab.id}
            role="tabpanel"
          >
            <p className="block font-sans text-base">
              {/* Content for each tab */}
              {tab.id === "post" && <><PostTab /></>}
              {tab.id === "comments" && <><CommentTab /></>}
              {tab.id === "upvote" && <><UpvoteTab /></>}
              {tab.id === "downvote" && <><UpvoteTab type="downvote" /></>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
