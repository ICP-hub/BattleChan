import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Steps from "./Steps";
import DataNumbers from "./DataNumbers";
import CreatePostBtn from "./CreatePostBtn";

import { FiBox } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { LuPlusCircle } from "react-icons/lu";
import { GiPublicSpeaker } from "react-icons/gi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHardwareChipOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";

import bg from "../../../images/dashboard_bg.png";
import NavButtons from "../NavButtons/NavButtons";

//backend
// import { backend } from "../../../../../declarations/backend/index"
import { useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import PostApiHanlder from "../../../API_Handlers/post";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

interface Board {
  [x: string]: any;
  boardName: string;
  boardSize: string;
  // Include other properties as needed, such as 'size'.
}
interface BackendResponse {
  status: boolean;
  data: Board[][]; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
}

const Body = () => {
  const { getBoards, getMainPosts, getArchivePosts } = PostApiHanlder();
  const [boardNames, setBoardNames] = useState<string[]>([]);
  const [boardSizes, setBoardSizes] = useState<Number[]>([]);
  const darkColor = document.documentElement.className;
  const navigate = useNavigate();
  const { principal } = useConnect();
  const [backend] = useBackend();
  // console.log(backend);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchBoardNames() {
      const response = (await getBoards()) as BackendResponse;
      if (response.status == false) {
        throw new Error("Failed to fetch communities");
      }

      const boards = response.data[0];

      if (boards && boards.length > 0) {
        const names = boards.map((board) => board.boardName);
        const sizes = boards.map((board) => Number(board.size));
        console.log("names is ", names);
        console.log("size is ", sizes);

        setBoardNames(names); // Update the state with all board names.
        setBoardSizes(sizes); // Update the state with all board names.
      } else {
        console.log("No boards found.");
      }
      // console.log(boardSizes[0]);
    }

    fetchBoardNames();
    console.log("boards",boardNames);
  }, []);
  const className = "Home";



  return (
    <div
      className={
        className +
        `flex flex-col justify-between w-full text-dark dark:text-light bg-bottom bg-contain bg-no-repeat`
      }
      style={
        darkColor == "dark"
          ? {
            backgroundImage: `url(${bg})`,
          }
          : {}
      }
    >
      <NavButtons />

      <CreatePostBtn />

      <div
        className={
          className +
          "__tagLines" +
          " w-full flex flex-col big_tablet:flex-row my-12 items-center justify-center container px-2 gap-2 mx-auto"
        }
      >
        <h1
          className={`text-4xl tablet:text-5xl text-center font-bold ${
            darkColor == "dark" ? "text-[#6DE580]" : "text-dirty-light-green"
          } leading-relaxed`}
        >
          BattleChan: Decentralized Discussion Battlefield
        </h1>
        <p
          className={`text-dark dark:text-light font-normal tablet:font-semibold text-lg text-center tablet:text-start`}
        >
          Welcome to BattleChan, where every post battles for supremacy
        </p>
      </div>

      <Steps />

      <div
        className={
          className +
          "__postsNumber" +
          ` tablet:hidden tablet:px-30 flex flex-col tablet:block gap-2 p-4 tablet:py-6 tablet:px-10 mx-4 tablet:mx-auto my-24 border border-dark dark:border-light rounded-md`
        }
      >
        <div className="data__headings tablet:px-4 flex-row-center tablet:flex-nowrap justify-between rounded-xl text-light bg-dirty-light-green gap-2">
          <div className="data__label py-4 tablet:py-4 pl-6 tablet:px-0 h-full tablet:text-lg font-semibold">
            Name of Subject
          </div>
          <div className="data__label big_tablet:hidden py-4 tablet:py-6 pr-6 tablet:px-4 h-full tablet:text-lg font-semibold">
            Total Posts
          </div>

          {/* <div className="data__labels hidden big_tablet:flex flex-nowrap items-center justify-center text-light">
            <div className="flex justify-center flex-wrap max-w-30 border-r">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-30 border-r">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-30 border-r">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-30 border-r">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-30 border-r">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-30 border-r">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-30">
              <button
                className="inline-flex flex-wrap items-center justify-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                onClick={() => {
                  navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                }}
              >
                <MdOutlineAddBusiness />
                {"Business"}
              </button>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[1]}`);
                  }}
                >
                  <GiPublicSpeaker />
                  {boardNames[1]}
                </button>
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[2]}`);
                  }}
                >
                  <FaRunning />
                  {boardNames[2]}
                </button>
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[3]}`);
                  }}
                >
                  <IoGameControllerOutline />
                  {boardNames[3]}
                </button>
              </p>
            </div>
            <div className="w-[9.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[4]}`);
                  }}
                >
                  <IoHardwareChipOutline />
                  {boardNames[4]}
                </button>
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[5]}`);
                  }}
                >
                  <FiBox />
                  {boardNames[5]}
                </button>
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[6]}`);
                  }}
                >
                  <BiMoviePlay />
                  {boardNames[6]}
                </button>
              </p>
            </div> 
          </div> */}
        </div>

        {/* <div
          className={`data__values p-4 hidden big_tablet:flex-row-center flex-nowrap justify-between bg-transparent text-dark dark:text-light`}
        >
          <div className="data__label p-4 px-0 h-full text-lg font-semibold">
            Total Posts
          </div>

          <div className="flex justify-between items-center">
            <div className="data__numbers flex justify-center flex-wrap border-r px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
            <div className="data__numbers flex justify-center flex-wrap border-r px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
            <div className="data__numbers flex justify-center flex-wrap border-r px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
            <div className="data__numbers flex justify-center flex-wrap border-r px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
            <div className="data__numbers flex justify-center flex-wrap border-r px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
            <div className="data__numbers flex justify-center flex-wrap border-r px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
            <div className="data__numbers flex justify-center flex-wrap px-4 ">
              <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                <span className="">{"12"}</span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  2 hrs ago
                </span>
              </div>
            </div>
          </div>
          <div className="data__numbers flex-row-center justify-between">
            <div className=" text-center flex-col-center border-r">
              <span>{boardSizes[0]}</span>
              <span>2 hrs ago</span>
            </div>
          </div>
          <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>{boardSizes[1]} </span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>{boardSizes[2]}</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>{boardSizes[3]}</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[9.5rem] text-center flex-col-center border-r">
              <span>{boardSizes[4]}</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>{boardSizes[5]}</span>
              <span>2 hrs ago</span>
            </div>
            <div className="w-[7.5rem] text-center flex-col-center">
              <span>{boardSizes[6]}</span>
              <span>2 hrs ago</span>
            </div>
        </div> */}

        {/* <div className="flex big_tablet:hidden items-center justify-between mt-2">
          <div className="pl-6">
            <button
              className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg"
              onClick={() => {
                navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
              }}
            >
              <MdOutlineAddBusiness />
              {boardNames[0]}
            </button>
          </div>
          <div className="flex text-center gap-2 items-center justify-center pr-6">
            <span>{boardSizes[0]}</span>
            <span>2 hrs ago</span>
          </div>
        </div> */}
      </div>

      <div className="relative hidden tablet:block overflow-x-auto my-24 px-9 py-6 border border-dark dark:border-light rounded-md mx-20 no-scrollbar">
        <table className="w-full text-left">
          <thead className="text-xs tablet:text-base">
            <tr className="bg-dirty-light-green">
              <th scope="col" className="px-6 py-3 rounded-s-xl">
                Name of the Subject
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[0] || "business"
                        }`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[0]}
                  </button>
                </div>
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[1]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[1]}
                  </button>
                </div>
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[2]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[2]}
                  </button>
                </div>
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[3]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[3]}
                  </button>
                </div>
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[4]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[4]}
                  </button>
                </div>
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[5]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[5]}
                  </button>
                </div>
              </th>
              <th scope="col" className="">
                <div className="flex justify-center border-r">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[6]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[6]}
                  </button>
                </div>
              </th>

              <th scope="col" className=" rounded-e-xl">
                <div className="flex justify-center">
                  <button
                    className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                    onClick={() => {
                      navigate(
                        `/dashboard/mainPosts?boardName=${boardNames[7]}`
                      );
                    }}
                  >
                    <MdOutlineAddBusiness />
                    {boardNames[7]}
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="tablet:text-base">
            <tr className="">
              <th scope="row" className="px-6 font-medium whitespace-nowrap">
                Total Posts
              </th>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[0] !== undefined ? boardSizes[0].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[1] !== undefined ? boardSizes[1].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[2] !== undefined ? boardSizes[2].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[3] !== undefined ? boardSizes[3].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[4] !== undefined ? boardSizes[4].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[5] !== undefined ? boardSizes[5].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" border-r text-center flex flex-col flex-wrap items-center justify-center p-2">
                  <span className="">{boardSizes[6] !== undefined ? boardSizes[6].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
              <td className="">
                <div className=" text-center flex flex-col flex-wrap items-center justify-center gap-2 p-2">
                  <span className="">{boardSizes[7] !== undefined ? boardSizes[7].toString() : ''}</span>
                  <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                    2 hrs ago
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div></div>
    </div>
  );
};

export default Body;
