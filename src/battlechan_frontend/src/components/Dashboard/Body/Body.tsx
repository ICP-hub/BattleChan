import React from "react";
import { useState , useEffect} from "react";
import { Link } from "react-router-dom";

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
import { backend } from "../../../../../declarations/backend/index"



type Theme = {
  darkColor: string;
  lightColor: string;
};

interface Board {
  boardName: string;
  boardSize: string ; 
  // Include other properties as needed, such as 'size'.
}
interface BackendResponse {
  status: boolean;
  data: Board[][]; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
}


const Body = (props: Theme) => {

  
  const [boardNames, setBoardNames] = useState<string[]>([]);
  const [boardSizes, setBoardSizes] = useState<string[]>([]);


  useEffect(() => {
    fetchBoardNames();
}, []);
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "Home";


  async function fetchBoardNames() {
    const response = await backend.getTotalPostInBoard() as BackendResponse;
    const boards = response.data[0];

    if (boards && boards.length > 0) {
      const names = boards.map((board) => board.boardName);
      const sizes = boards.map((board) => board.size.toString() );
      console.log("size is " ,sizes) ; 
      console.log("ended")

      setBoardNames(names); // Update the state with all board names.
      setBoardSizes(sizes); // Update the state with all board names.

    } else {
      console.log("No boards found.");
    }
    console.log(boardSizes[0]) ;
  }

  // async function getPost() {
  //   const posts = await backend.getUserInfo() as BackendResponse;
    
  // }




  return (
    <div
      className={
        className +
        `flex flex-col justify-between w-full text-${lightColor} bg-bottom bg-contain bg-no-repeat`
      }
      style={
        darkColor == "dark"
          ? {
              backgroundImage: `url(${bg})`,
            }
          : {}
      }
    >

      <NavButtons darkColor={darkColor} lightColor={lightColor} />

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
          className={`w-1/2 text-${lightColor} font-semibold text-lg text-start px-28`}
        >
          Welcome to BattleChan, where every post battles for supremacy
        </p>
      </div>

      <div
        className={
          className +
          "__steps" +
          `w-full flex-row-center justify-evenly p-10 my-8 mx-16 border border-light-green rounded-xl bg-${darkColor} text-lg`
        }
      >
        <div className="flex flex-col gap-4 items-start">
          <span
            className={`py-2 px-4 bg-${lightColor} text-${darkColor} rounded-[50%]`}
          >
            1
          </span>
          <span>Connect your Wallet.</span>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <span
            className={`py-2 px-4 bg-${lightColor} text-${darkColor} rounded-[50%]`}
          >
            2
          </span>
          <span>Make Post : Earn Time</span>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <span
            className={`py-2 px-4 bg-${lightColor} text-${darkColor} rounded-[50%]`}
          >
            3
          </span>
          <span>Cast your vote</span>
        </div>
      </div>

      <div
        className={
          className +
          "__postsNumber" +
          ` py-6 px-10 mx-36 my-24 border border-${lightColor} rounded-md`
        }
      >
        <div className="data__headings px-4 flex-row-center flex-nowrap justify-between rounded-xl text-light bg-dirty-light-green">
          <div className="data__label py-6 px-2 px-4 h-full text-lg font-semibold">
            Name of Subject
          </div>

          <div className="data__labels flex-row-center text-lg text-light">
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <MdOutlineAddBusiness />
                {boardNames[0]}
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <GiPublicSpeaker />
                {boardNames[1]}
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <FaRunning />
                {boardNames[2]}
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <IoGameControllerOutline />
                {boardNames[3]}
              </p>
            </div>
            <div className="w-[9.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <IoHardwareChipOutline />
                {boardNames[4]}
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap border-r">
              <p className="flex-row-center gap-2 justify-center">
                <FiBox />
                {boardNames[5]}
              </p>
            </div>
            <div className="w-[7.5rem] py-6 flex-nowrap">
              <p className="flex-row-center gap-2 justify-center">
                <BiMoviePlay />
                {boardNames[6]}
              </p>
            </div>
          </div>

         

          
        </div>

        <div
          className={`data__values px-4 flex-row-center flex-nowrap justify-between bg-transparent text-${lightColor}`}
        >
          <div className="data__label py-6 px-4 h-full text-lg font-semibold">
            Total Posts
          </div>

          <div className="data__numbers flex-row-center justify-between">
            <div className="w-[7.5rem] text-center flex-col-center border-r">
              <span  >{boardSizes[0]  }</span>
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

