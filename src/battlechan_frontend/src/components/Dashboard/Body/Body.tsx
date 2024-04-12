import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Steps from "./Steps";
import CreatePostBtn from "./CreatePostBtn";
import CatalogSVG from "../../../pages/MainPosts/CatalogSVG";

import bg from "../../../images/dashboard_bg.png";
import NavButtons from "../NavButtons/NavButtons";
import PostApiHanlder from "../../../API_Handlers/post";
import Constant from "../../../utils/constants";


interface Board {
  [x: string]: any;
  boardName: string;
  boardSize: string;
  updatedAt: [bigint];
  
}
interface BackendResponse {
  status: boolean;
  data: Board[][]; 
  error: string[];
}

const Body = () => {
  const { getBoards, getMainPosts, getArchivePosts } = PostApiHanlder();
  const [boardNames, setBoardNames] = useState<string[]>([]);
  const [boardSizes, setBoardSizes] = useState<Number[]>([]);
  const [createdAt, setCreatedAt] = useState<string[]>([]);
  const darkColor = document.documentElement.className;
  const navigate = useNavigate();
  const { convertNanosecondsToTimeAgo } = Constant();

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
        const createdAt = boards.map(
          (board) =>
            convertNanosecondsToTimeAgo(board?.updatedAt[0]) || undefined
        );
        const cleanedCreatedAt = createdAt.map((date) => date || "");
        
        
        

        setBoardNames(names);
        setBoardSizes(sizes);
        setCreatedAt(cleanedCreatedAt);
      } else {
        
      }
      
    }

    fetchBoardNames();
    
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
          " w-full small_phone:my-12 tablet:my-16 my-6 gap-4 laptop:px-[6vw] phone:px-[8vw] px-2 flex flex-col big_tablet:items-start items-center big_tablet:flex-row justify-between"
        }
      >
        <h1
          className={`big_tablet:w-2/3 w-full xl:text-5xl phone:text-4xl text-3xl big_tablet:text-start text-center font-bold ${
            darkColor == "dark" ? "text-[#6DE580]" : "text-dirty-light-green"
          } leading-normal`}
        >
          BattleChan: <br className="block phone:hidden" /> Decentralized
          <br />
          Discussion Battlefield
        </h1>

        <p
          className={`big_tablet:w-1/3 w-full text-dark dark:text-light font-normal xl:text-lg big_tablet:text-sm tablet:text-base phone:text-sm text-xs text-center big_tablet:text-start`}
        >
          Welcome to BattleChan, where every post battles for supremacy
        </p>
      </div>

      <Steps />

      <div
        className={
          className +
          "__postsNumber" +
          ` big_tablet:hidden big_tablet:px-30 flex flex-col big_tablet:block gap-2 p-4 big_tablet:py-6 big_tablet:px-10 mx-4 big_tablet:mx-auto big_tablet:my-24 my-10 border border-dark dark:border-light rounded-md`
        }
      >
        <div className="data__headings big_tablet:px-4 flex-row-center big_tablet:flex-nowrap small_phone:justify-around justify-between rounded-xl text-[#fff] bg-dirty-light-green gap-2">
          <div className="data__label py-4 big_tablet:py-4 small_phone:pl-6 pl-4 big_tablet:px-0 h-full big_tablet:text-lg small_phone:text-md text-sm font-semibold">
            Name of Subject
          </div>
          <div className="data__label big_big_tablet:hidden py-4 big_tablet:py-6 small_phone:pr-10 pr-6 big_tablet:px-4 h-full big_tablet:text-lg small_phone:text-md text-sm font-semibold">
            Total Posts
          </div>
        </div>

        <div className="flex small_phone:justify-around justify-between">
          <div className="">
            {boardNames.map((boardName, index) => (
              <div className={`flex ml-4`}>
                <button
                  className="inline-flex flex-wrap items-center small_phone:text-base text-xs cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                  onClick={() => {
                    navigate(`/dashboard/mainPosts?boardName=${boardName}`);
                  }}
                >
                  <CatalogSVG label={boardName} />
                  {boardName}
                </button>
              </div>
            ))}
          </div>
          <div className="small_phone:text-base text-xs">
            {boardSizes.map((boardSize, index) => (
              <div className={` text-center flex items-center p-2 gap-2`}>
                <span className="font-semibold">
                  {boardSize !== undefined ? boardSize.toString() : ""}
                </span>
                <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                  {createdAt[index] !== "" ? createdAt[index] : "No Posts"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-auto relative hidden big_tablet:flex items-center justify-center overflow-x-auto xl:my-20 my-10 p-10 border border-dark dark:border-light rounded-xl mx-16 no-scrollbar">
        <table className="w-full text-left">
          <thead className="text-xs big_tablet:text-base">
            <tr className=" text-light bg-dirty-light-green">
              <th scope="col" className="px-6 py-3 rounded-s-xl">
                Name of the Subject
              </th>
              {boardNames.map((boardName, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`${
                    index === boardNames.length - 1 ? "rounded-e-xl" : ""
                  }`}
                >
                  {boardName && (
                    <div
                      className={`flex justify-center border-r ${
                        index === boardNames.length - 1 ? "border-r-0" : ""
                      }`}
                    >
                      <button
                        className="inline-flex flex-wrap items-center justify-center cursor-pointer hover:bg-green hover:bg-opacity-50 rounded-lg p-2 gap-1 font-normal"
                        onClick={() => {
                          navigate(
                            `/dashboard/mainPosts?boardName=${boardName}`
                          );
                        }}
                      >
                        <CatalogSVG label={boardName} />
                        {boardName}
                      </button>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tablet:text-base">
            <tr className="">
              <th scope="row" className="px-6 font-medium whitespace-nowrap">
                Total Posts
              </th>
              {boardSizes.map((boardSize, index) => (
                <td key={index} className="">
                  <div
                    className={` border-r text-center flex flex-col flex-wrap items-center justify-center p-2 ${
                      index === boardNames.length - 1 ? "border-r-0" : ""
                    }`}
                  >
                    <span className="">
                      {boardSize !== undefined ? boardSize.toString() : ""}
                    </span>
                    <span className="text-xs dark:text-[#fff] dark:text-opacity-50">
                      {createdAt[index] !== "" ? createdAt[index] : "No Posts"}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Body;
