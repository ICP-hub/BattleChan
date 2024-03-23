import React, { useState } from "react";
import PostTab from "./PostTab";

interface TabProps {
  id: string;
  label: string;
}

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("post");

  const tabs: TabProps[] = [
    { id: "post", label: "Post" },
    { id: "comments", label: "Comments" },
    { id: "shared", label: "Shared" },
    { id: "upvote", label: "Upvote" },
    { id: "downvote", label: "Downvote" },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="container my-12 mx-auto px-4 tablet:px-12">
      <div className="flex flex-col tablet:flex-row justify-between items-center mb-6">
        <ul
          className="relative flex flex-wrap p-1 list-none"
          data-tabs="tabs"
          role="list"
        >
          {tabs.map((tab) => (
            <li key={tab.id} className={`z-30 w-[79px] tablet:w-[94px] text-center rounded-full text-[#000] text-opacity-50 ${
                activeTab === tab.id
                  ? "text-[hsl(0,0%,100%)] text-opacity-100 bg-green font-semibold"
                  : ""
              } `}>
              <a
                className={`z-30 flex items-center justify-center w-full py-2 mb-0 transition-all ease-in-out border-0  cursor-pointer bg-inherit`}
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
        <button className="hidden tablet:flex items-center justify-center px-8 py-2 bg-[#000] text-[#fff] rounded-full font-semibold">
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
              {tab.id === "comments" && <>comments</>}
              {tab.id === "shared" && <>shared</>}
              {tab.id === "upvote" && <>upvote</>}
              {tab.id === "downvote" && <>downvote</>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
