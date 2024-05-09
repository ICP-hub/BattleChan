import React, { useState, useEffect } from "react";

import { LuPlusCircle } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";

import Posts from "./Posts";
import Catalog from "./Catalog";
import Pagination from "./Pagination";

import Skeleton from "../../components/Skeleton/Skeleton";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";
import CreatePostBtn from "../../components/Dashboard/Body/CreatePostBtn";

import { useCanister } from "@connect2ic/react";
import PostApiHanlder from "../../API_Handlers/post";
import Constant from "../../utils/constants";
import { Link } from "react-router-dom";

const useBackend = () => {
  return useCanister("backend");
};

type Theme = {
  handleThemeSwitch: Function;
  type?: string;
  searchPosts?: PostInfo[];
};

interface SearchPost {
  upvotes: string;
  postName: string;
  upvotedBy: string[];
  postDes: string;
  createdAt: string;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
  updatedAt: string[];
  expireAt: string;
  postMetaData: Int8Array;
  board: string;
  downvotes: string;
  downvotedBy: string[];
  postId: string;
}

type PostInfo = {
  postId: string;
  postName: string;
  postMetaData: Int8Array;
  postDes: string;
  expireAt: BigInt;
  createdAt: string;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
  upvotes: number;
};

interface Board {
  boardName: string;
  boardSize: string;
}

interface BackendResponse {
  status: boolean;
  data: Board[][];
  error: string[];
}

interface PostResponse {
  status: boolean;
  data: PostInfo[][];
  error: string[];
}

interface TotalCountsResponse {
  mainPostCounts: number;
  archivePostCounts: number;
}

const MainPosts = (props: Theme) => {
  const [postsData, setPostsData] = useState<PostInfo[]>([]);
  const [boardsData, setBoardsData] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSelection, setActiveSelection] = useState("Recent");
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [currentPosts, setCurrentPosts] = useState<PostInfo[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // const formatTime = (remainingTime: bigint) => {
  //   const seconds = Math.floor(Number(remainingTime) / 1e9);
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;

  //   return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  // };

  // const interval = setInterval(() => {
  //   const currentTime = BigInt(Date.now()) * BigInt(1000000);
  //   const remainingTime = Number(4284742663020955669n) - Number(currentTime);
  //   console.log(currentTime)
  //   console.log(remainingTime);
  //   console.log(formatTime(BigInt(remainingTime)));
    
  //   if (remainingTime <= 0) {
  //     clearInterval(interval);
  //     console.log("archive");
  //   } else {
  //     console.log(formatTime(BigInt(remainingTime)));
  //   }
  // }, 1000);
  

  const { convertNanosecondsToTimestamp } = Constant();
  const {
    createPost,
    getBoards,
    getMainPosts,
    getArchivePosts,
    getTotalCounts,
  } = PostApiHanlder();

  const className = "Dashboard__MainPosts";

  const handleBoardChange = (boardName: string) => {
    setSelectedBoard(boardName);
  };

  useEffect(() => {
    async function getTotalPosts() {
      try {
        const response = (await getTotalCounts()) as TotalCountsResponse;
        console.log("counts", response);
        if (props.type == "archive") {
          setTotalPosts(response?.archivePostCounts);
        } else if (props.type === "searchPosts") {
          if (props.searchPosts) {
            setTotalPosts(props.searchPosts?.length)
          }
        } else {
          setTotalPosts(response?.mainPostCounts);
        }
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    }
    getTotalPosts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await getBoards()) as BackendResponse;
        if (response.status == false) {
          throw new Error("Failed to fetch communities");
        }
        const boards = response.data[0];
        if (boards && boards.length > 0) {
          const names = boards.map((board) => board.boardName);
          setBoardsData(names);
        } else {
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (boardsData.length > 0) {
      setSelectedBoard(boardsData[0]);
    }
  }, [boardsData]);

  const getAllPostFilter = async (
    filter: string = "recent",
    chunkSize: number = 10,
    pageNumber: number = 1,
    boardName: string
  ) => {
    try {
      const res = await getMainPosts(
        { [filter]: null },
        chunkSize,
        pageNumber,
        boardName
      );

      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const getAllArchivePostFilter = async (
    filter: string = "recent",
    chunkSize: number = 10,
    pageNumber: number = 1,
    boardName: string
  ) => {
    try {
      const res = await getArchivePosts(
        { [filter]: null },
        chunkSize,
        pageNumber,
        boardName
      );

      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    if (props.type == "archive") {
      getPosts("archive");
    } else if (props.type === 'searchPosts') {
      console.log("search posts here")
      if (props.searchPosts) {
        const posts = props.searchPosts;
        posts.forEach((element) => {
          const timestamp: string = convertNanosecondsToTimestamp(
            BigInt(element.createdAt)
          );

          element.createdAt = timestamp;
          element.upvotes = Number(element.upvotes);
        });
        setPostsData(posts)
        setDataFetched(true);
      }
    } else {
      getPosts();
    }
  }, [props.type, currentPage, postsPerPage, selectedBoard, activeSelection]);

  async function getPosts(postsType?: string) {
    try {
      let response;
      if (postsType === "archive") {
        response = (await getAllArchivePostFilter(
          activeSelection.toLocaleLowerCase(),
          postsPerPage,
          currentPage,
          selectedBoard
        )) as PostResponse;
      } else {
        response = (await getAllPostFilter(
          activeSelection.toLocaleLowerCase(),
          postsPerPage,
          currentPage,
          selectedBoard
        )) as PostResponse;
      }

      if (response.status === true && response.data) {
        const posts = response.data.flat();
        posts.forEach((element) => {
          const timestamp: string = convertNanosecondsToTimestamp(
            BigInt(element.createdAt)
          );

          element.createdAt = timestamp;
          element.upvotes = Number(element.upvotes);
        });
        setPostsData(posts);
      } else {
        setPostsData([]);
        setDataFetched(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setDataFetched(false);
    }
  }

  useEffect(() => {
    setCurrentPosts(postsData.slice(indexOfFirstPost, indexOfLastPost));
  }, [postsData, selectedBoard, currentPage]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (selection: string) => {
    setActiveSelection(selection);
    setIsOpen(false);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1); // Update currentPage by decrementing it by 1
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1); // Update currentPage by incrementing it by 1
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page); // Update currentPage to the selected page
  };

  // const goToPrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const goToNextPage = () => {
  //   if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const goToPage = (page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <div
      className={`min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-top bg-contain bg-no-repeat relative z-0`}
    >
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <NavButtons />

      <div
        className={
          className +
          " " +
          "max-w-7xl mx-auto pb-12 dark:text-[#fff] overflow-hidden"
        }
      >
        <div className="mb-4 hidden tablet:flex justify-center">
          <CreatePostBtn />
        </div>

        <div className="flex justify-between tablet:justify-center items-center px-4 tablet:px-12">
          <h1 className="font-bold tablet:text-3xl tablet:p-8">
            {props.type === "archive" ? "Archive" : "Most Popular"}
          </h1>
          <Link to="/dashboard/createPost">
            <button className="tablet:hidden flex items-center justify-center px-4 py-2 bg-[#000] dark:bg-green hover:dark:bg-fresh-green text-[#fff] rounded-full font-semibold text-xs">
              <LuPlusCircle />
              <span className="ml-1 leading-5">Create Post</span>
            </button>
          </Link>
        </div>

        <Catalog
          handleBoardChange={handleBoardChange}
          boardsData={boardsData}
        />

        <div className="flex justify-between items-center py-2 px-4 tablet:px-12">
          <Pagination
            totalPosts={totalPosts}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            goToPage={goToPage}
          />

          <div className="flex justify-end items-center gap-2 tablet:gap-6">
            <div className="flex items-center justify-center gap-1">
              <CgSortAz className="tablet:text-2xl text-sm" />
              <span className="text-xs tablet:text-base">Sort :</span>
            </div>
            <div className="-mt-1 tablet:mt-0">
              <button
                id="sortDropdown"
                data-dropdown-toggle="dropdown"
                className="text-[#000] dark:text-[#fff] bg-transparent text-xs tablet:text-base text-center inline-flex items-center gap-4"
                type="button"
                onClick={toggleDropdown}
              >
                {activeSelection}
                <FaAngleDown />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end tablet:px-20 px-2 absolute right-0">
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
                    className={`block px-4 py-2 text-[10px] tablet:text-base text-light ${activeSelection === "Recent" ? "bg-[#295A31]" : ""
                      }`}
                    onClick={() => handleSelection("Recent")}
                  >
                    Recent
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className={`block px-4 py-2 text-[10px] tablet:text-base text-light ${activeSelection === "Upvote" ? "bg-[#295A31]" : ""
                      }`}
                    onClick={() => handleSelection("Upvote")}
                  >
                    Upvote
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className={`block px-4 py-2 text-[10px] tablet:text-base text-light ${activeSelection === "Downvote" ? "bg-[#295A31]" : ""
                      }`}
                    onClick={() => handleSelection("Downvote")}
                  >
                    Downvote
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="xl:px-10 small_phone:mt-8 mt-4 mx-4 flex flex-col flex-wrap laptop:flex-row items-center laptop:justify-start justify-center">
          {!dataFetched ? (
            <CardSkeleton />
          ) : (
            <Posts currentPosts={currentPosts} type={props.type} getPosts={getPosts} />
          )}
        </div>
      </div>
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <React.Fragment>
      <Skeleton
        w_h_p={"laptop:w-1/2 w-full tablet:h-[180px] h-[160px] my-2 px-2"}
      />
      <Skeleton
        w_h_p={"laptop:w-1/2 w-full tablet:h-[180px] h-[160px] my-2 px-2"}
      />
    </React.Fragment>
  );
};

export default MainPosts;
