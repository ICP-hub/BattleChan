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
  const [boardNames, setBoardNames] = useState<string[]>([]);
  const [boardSizes, setBoardSizes] = useState<string[]>([]);
  const darkColor = document.documentElement.className;
  const navigate = useNavigate();
  const { principal } = useConnect();
  const [backend] = useBackend();
  // console.log(backend);
  useEffect(() => {
    fetchBoardNames();
  }, []);
  const className = "Home";

  async function fetchBoardNames() {
    const postData = {
      postName: "", // Add your postName data here
      postDes: "", // Add your postDes data here
      postMetaData: "", // Add your postMetaData data here
    };
    const data = {
      userName: "Khushali",
      profileImg: ""
    }
    // console.log(Principal.fromText(principal));
    // const response = await backend.createUserAccount(data);
    // console.log(response);
    // const d = await backend.createComment("#12345678", "Hello");
    // console.log("data", d);
    // const d = await backend.createNewBoard("Games", "Games");
    // console.log("data", d);
    const d = await backend.getUserInfo();
    console.log("data", d);

    const board = (await backend.getTotalPostInBoard()) as BackendResponse;
    console.log(board);
    
    const post = await backend.getPostsByBoard();
    console.log("Main Posts Response: ", post);
    const response = await backend.createPost("Games", postData);
    console.log(response);
    // const boards = response.data[0];

    // if (boards && boards.length > 0) {
    //   const names = boards.map((board) => board.boardName);
    //   const sizes = boards.map((board) => board.size.toString());
    //   console.log("size is ", sizes);
    //   console.log("ended");

    //   setBoardNames(names); // Update the state with all board names.
    //   setBoardSizes(sizes); // Update the state with all board names.
    // } else {
    //   console.log("No boards found.");
    // }
    // console.log(boardSizes[0]);
  }

  // async function getPost() {
  //   const posts = await backend.getUserInfo() as BackendResponse;

  // }

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

      <div
        className={className + "__createPost" + " mt-12 flex justify-center"}
      >
        <Link to="/createPost">
          <p className="green-button flex-row-center bg-dirty-light-green">
            <LuPlusCircle />
            <span>Create Post</span>
          </p>
        </Link>
      </div>

      <div
        className={
          className + "__tagLines" + " w-full flex flex-col tablet:flex-row my-12 items-center justify-center"
        }
      >
        <h1
          className={`text-5xl font-bold ${darkColor == "dark" ? "text-[#6DE580]" : "text-dirty-light-green"
            } leading-relaxed`}
        >
          BattleChan: Decentralized Discussion Battlefield
        </h1>
        <p
          className={`text-dark dark:text-light font-semibold text-lg text-start px-28`}
        >
          Welcome to BattleChan, where every post battles for supremacy
        </p>
      </div>

      <Steps />

      <div
        className={
          className +
          "__postsNumber" +
          ` py-6 px-10 mx-36 my-24 border border-dark dark:border-light rounded-md`
        }
      >
        <div className="data__headings px-4 flex-row-center flex-nowrap justify-between rounded-xl text-light bg-dirty-light-green">
          <div className="data__label py-6  px-4 h-full text-lg font-semibold">
            Name of Subject
          </div>

          <div className="data__labels flex-row-center text-lg text-light">
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <button
                  className="inline-flex flex-nowrap items-center gap-2 cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardNames[0]}`);
                  }}
                >
                  <MdOutlineAddBusiness />
                  {boardNames[0]}
                </button>
              </p>
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
          </div>
        </div>

        <div
          className={`data__values px-4 flex-row-center flex-nowrap justify-between bg-transparent text-dark dark:text-light`}
        >
          <div className="data__label py-6 px-4 h-full text-lg font-semibold">
            Total Posts
          </div>

          <div className="data__numbers flex-row-center justify-between">
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span>{boardSizes[0]}</span>
              <span>2 hrs ago</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
