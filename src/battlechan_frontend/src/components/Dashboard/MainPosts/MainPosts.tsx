import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";
import Post from "./Post";
import Pagination from "./Pagination";
import Posts from "./Posts";
import Catalog from "./Catalog";

const postsData = [
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Alexander Frem",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
  {
    id: "#123056043",
    imageUrl: "/src/images/main-post-image.jpg",
    userAvatarUrl: "/src/images/main-post-user-avatar.jpg",
    userName: "Saurabh Singh",
    timestamp: "Oct 29, 2023 ; 13:30",
    duration: "5:00 min",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    likes: "250K",
    comments: 750,
  },
];

const MainPosts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSelection, setActiveSelection] = useState("Rank");
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = postsData.length;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsData.slice(indexOfFirstPost, indexOfLastPost);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (selection: string) => {
    setActiveSelection(selection);
    setIsOpen(false);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div
        className={`min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-top bg-contain bg-no-repeat`}
      >
        {/* <Navbar darkColor={darkColor} lightColor={lightColor} />
      <NavButtons darkColor={darkColor} lightColor={lightColor} /> */}

        <div className="container py-6 mx-auto px-4 tablet:px-0 dark:text-[#fff] overflow-hidden">
          {/* create post button for desktop  */}
          <div className="hidden tablet:flex justify-center">
            <button className="mb-24 flex items-center justify-center px-14 py-4 bg-green dark:bg-green text-[#fff] rounded-full font-semibold text-base">
              <svg
                className="w-5 h-5 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
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

          {/* most popular heading & create post button  */}
          <div className="flex justify-between tablet:justify-center items-center mb-4">
            <h1 className="font-bold tablet:text-3xl tablet:mb-14">
              Most Popular
            </h1>
            <button className="tablet:hidden flex items-center justify-center px-4 py-2 bg-[#000] dark:bg-green text-[#fff] rounded-full font-semibold text-xs">
              <svg
                className="w-4 h-4 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
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
          {/* catalog for desktop  */}
          <div className="pl-10 -mr-2 overflow-hidden">
          <Catalog />
          </div>
          {/* catalog and pagination and sort for desktop  */}
          <div className="flex justify-between items-center tablet:px-10">
            {/* catalog and filter button  */}
            <div className="tablet:hidden flex items-center">
              {/* catalog button  */}
              <button className="flex items-center justify-center px-4 py-2 bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000] rounded-full font-semibold text-xs">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="currentColor"
                    d="M20.8 23V19.0571H16.9V17.7429H20.8V13.8H22.1V17.7429H26V19.0571H22.1V23H20.8ZM1.599 19.7143V11.8286H0V10.5143L1.5002 3.94286H19.2998L20.8 10.5143V11.8286H19.201V16.1263H17.901V11.8286H11.999V19.7143H1.599ZM2.899 18.4H10.699V11.8286H2.899V18.4ZM1.5002 1.31429V0H19.2998V1.31429H1.5002ZM1.3156 10.5143H19.4844L18.2806 5.25714H2.5194L1.3156 10.5143Z"
                  />
                </svg>

                <span className="ml-1 leading-5">Business</span>
              </button>
              {/* filter button  */}
              <button className="flex items-center justify-center bg-transparent text-[#000] dark:text-[#fff] dark:text-opacity-50 rounded-md px-1 py-1 text-xs mx-1">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 11 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.55556 2.11133L10 2.11133M1.11111 9.88911L2.77778 9.88911M1.11111 2.11133L3.33333 2.11133M5 9.88911L10 9.88911M8.33333 6.00022L10 6.00022M1.11111 6.00022L6.11111 6.00022"
                    stroke="currentColor"
                    stroke-opacity="0.5"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M3.33332 2.11111C3.33332 2.72476 3.83078 3.22222 4.44443 3.22222C5.05808 3.22222 5.55554 2.72476 5.55554 2.11111C5.55554 1.49746 5.05808 1 4.44443 1C3.83078 1 3.33332 1.49746 3.33332 2.11111Z"
                    stroke="currentColor"
                    stroke-opacity="0.5"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6.11115 5.99978C6.11115 6.61343 6.60861 7.11089 7.22226 7.11089C7.83591 7.11089 8.33337 6.61343 8.33337 5.99978C8.33337 5.38613 7.83591 4.88867 7.22226 4.88867C6.60861 4.88867 6.11115 5.38613 6.11115 5.99978Z"
                    stroke="currentColor"
                    stroke-opacity="0.5"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2.77778 9.88894C2.77778 10.5026 3.27524 11.0001 3.88889 11.0001C4.50254 11.0001 5 10.5026 5 9.88894C5 9.27529 4.50254 8.77783 3.88889 8.77783C3.27524 8.77783 2.77778 9.27529 2.77778 9.88894Z"
                    stroke="currentColor"
                    stroke-opacity="0.5"
                    stroke-width="0.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            {/* pagination  */}
            <Pagination
              totalPosts={totalPosts}
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              goToPrevPage={goToPrevPage}
              goToNextPage={goToNextPage}
              goToPage={goToPage}
            />
            {/* sort drop down for desktop  */}
            <div className="hidden tablet:flex justify-end items-center gap-2 tablet:gap-6">
              <div className="flex items-center justify-center gap-1">
                <svg
                  className="w-3 h-2 tablet:w-5 tablet:h-2"
                  viewBox="0 0 12 7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1H4.5M1 1H2.5M9.5 3.5H8M2.5 3.5H6M8 6H4"
                    stroke="currentColor"
                    stroke-width="0.8"
                    stroke-linecap="round"
                  />
                </svg>
                <span className="text-xs tablet:text-base">Sort :</span>
              </div>
              {/* drop down button */}
              <div className="-mt-1 tablet:mt-0">
                <button
                  id="sortDropdown"
                  data-dropdown-toggle="dropdown"
                  className="text-[#000] dark:text-[#fff] bg-transparent text-xs tablet:text-base text-center inline-flex items-center gap-4"
                  type="button"
                  onClick={toggleDropdown}
                >
                  {activeSelection}
                  <svg
                    className="w-[6px] h-[3px] tablet:w-[13px] tablet:h-[7px]"
                    viewBox="0 0 6 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.81308 2.92915L0.0713045 0.383344C0.0255335 0.340866 0 0.284431 0 0.225744C0 0.167058 0.0255335 0.110623 0.0713045 0.068145L0.0744026 0.0654039C0.0965915 0.04474 0.1233 0.028286 0.152904 0.0170422C0.182507 0.00579834 0.214387 0 0.246603 0C0.278819 0 0.310699 0.00579834 0.340302 0.0170422C0.369906 0.028286 0.396614 0.04474 0.418803 0.0654039L3.00052 2.46275L5.5812 0.0654039C5.60338 0.04474 5.63009 0.028286 5.6597 0.0170422C5.6893 0.00579834 5.72118 0 5.7534 0C5.78561 0 5.81749 0.00579834 5.8471 0.0170422C5.8767 0.028286 5.90341 0.04474 5.9256 0.0654039L5.92869 0.068145C5.97447 0.110623 6 0.167058 6 0.225744C6 0.284431 5.97447 0.340866 5.92869 0.383344L3.18692 2.92915C3.1628 2.95154 3.1338 2.96936 3.10167 2.98154C3.06954 2.99372 3.03495 3 3 3C2.96504 3 2.93045 2.99372 2.89832 2.98154C2.86619 2.96936 2.8372 2.95154 2.81308 2.92915Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* sort dropdown for mobile */}
          <div className="tablet:hidden flex justify-end items-center gap-2 mt-3">
            <div className="flex items-center justify-center gap-1">
              <svg
                className="w-3 h-2 tablet:w-5 tablet:h-2"
                viewBox="0 0 12 7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1H4.5M1 1H2.5M9.5 3.5H8M2.5 3.5H6M8 6H4"
                  stroke="currentColor"
                  stroke-width="0.8"
                  stroke-linecap="round"
                />
              </svg>
              <span className="text-xs tablet:text-base">Sort :</span>
            </div>
            {/* drop down button */}
            <div className="-mt-1">
              <button
                id="sortDropdown"
                data-dropdown-toggle="dropdown"
                className="text-[#000] dark:text-[#fff] bg-transparent text-xs tablet:text-base text-center inline-flex items-center gap-1"
                type="button"
                onClick={toggleDropdown}
              >
                {activeSelection}
                <svg
                  className="w-[6px] h-[3px] tablet:w-[13px] tablet:h-[7px]"
                  viewBox="0 0 6 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.81308 2.92915L0.0713045 0.383344C0.0255335 0.340866 0 0.284431 0 0.225744C0 0.167058 0.0255335 0.110623 0.0713045 0.068145L0.0744026 0.0654039C0.0965915 0.04474 0.1233 0.028286 0.152904 0.0170422C0.182507 0.00579834 0.214387 0 0.246603 0C0.278819 0 0.310699 0.00579834 0.340302 0.0170422C0.369906 0.028286 0.396614 0.04474 0.418803 0.0654039L3.00052 2.46275L5.5812 0.0654039C5.60338 0.04474 5.63009 0.028286 5.6597 0.0170422C5.6893 0.00579834 5.72118 0 5.7534 0C5.78561 0 5.81749 0.00579834 5.8471 0.0170422C5.8767 0.028286 5.90341 0.04474 5.9256 0.0654039L5.92869 0.068145C5.97447 0.110623 6 0.167058 6 0.225744C6 0.284431 5.97447 0.340866 5.92869 0.383344L3.18692 2.92915C3.1628 2.95154 3.1338 2.96936 3.10167 2.98154C3.06954 2.99372 3.03495 3 3 3C2.96504 3 2.93045 2.99372 2.89832 2.98154C2.86619 2.96936 2.8372 2.95154 2.81308 2.92915Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* sort drop down list  */}
          <div className="flex justify-end my-3 tablet:px-10">
            {isOpen && (
              <div
                id="sortDropdownList"
                className="z-10 bg-green rounded-lg shadow w-32"
              >
                <ul
                  className=" rounded-lg text-[#000] dark:text-[#fff] text-center overflow-hidden"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="javascript:void(0)"
                      className={`block px-4 py-2 text-[10px] tablet:text-base ${
                        activeSelection === "Rank" ? "bg-[#295A31]" : ""
                      }`}
                      onClick={() => handleSelection("Rank")}
                    >
                      Rank
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className={`block px-4 py-2 text-[10px] tablet:text-base ${
                        activeSelection === "New" ? "bg-[#295A31]" : ""
                      }`}
                      onClick={() => handleSelection("New")}
                    >
                      New
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className={`block px-4 py-2 text-[10px] tablet:text-base ${
                        activeSelection === "Last Reply" ? "bg-[#295A31]" : ""
                      }`}
                      onClick={() => handleSelection("Last Reply")}
                    >
                      Last Reply
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* posts  */}
          <div className="tablet:px-10 flex flex-col flex-wrap tablet:flex-row  items-center tablet:justify-center">
            <Posts currentPosts={currentPosts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPosts;
