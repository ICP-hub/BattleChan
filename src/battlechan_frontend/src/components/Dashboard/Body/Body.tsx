import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import bg from "../../../images/dashboard_bg.png";
import NavButtons from "../NavButtons/NavButtons";

import Steps from "./Steps";
import DataNumbers from "./DataNumbers";
import CreatePostBtn from "./CreatePostBtn";

// import { backend } from "../../../../../declarations/backend/index";

interface Board {
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

  useEffect(() => {
    fetchBoardNames();
  }, []);

  const darkColor = document.documentElement.className;
  const className = "Dashboard__Body";

  async function fetchBoardNames() {
    // const response = (await backend.getTotalPostInBoard()) as BackendResponse;
    // const boards = response.data[0];
    // if (boards && boards.length > 0) {
    //   const names = boards.map((board) => board.boardName);
    //   const sizes = boards.map((board) => board.boardSize.toString());
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
        " " +
        `flex flex-col justify-between w-full text-dark dark:text-light z-0 relative`
      }
    >
      <NavButtons />

      <CreatePostBtn />

      {document.documentElement.className == "dark" && (
        <img
          src={bg}
          alt="Background image"
          className="w-screen -z-10 h-screen absolute top-0 object-cover"
        />
      )}
      
      <div
        className={
          className + "__tagLines" + " px-20 w-full flex flex-row my-12"
        }
      >
        <h1
          className={`w-1/2 text-5xl font-bold ${
            darkColor == "dark" ? "text-[#6DE580]" : "text-dirty-light-green"
          } leading-relaxed`}
        >
          BattleChan: Decentralized Discussion Battlefield
        </h1>
        <p
          className={`w-1/2 text-dark dark:text-light font-semibold text-lg text-start px-28`}
        >
          Welcome to BattleChan, where every post battles for supremacy
        </p>
      </div>

      <Steps />

      <DataNumbers />
    </div>
  );
};

export default Body;
