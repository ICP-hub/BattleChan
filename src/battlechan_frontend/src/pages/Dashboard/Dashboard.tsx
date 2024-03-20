import React from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPosts from "../../components/Dashboard/RecentPosts/RecentPosts";
import {backend} from "../../../../declarations/backend/"
import { BiMenuAltLeft } from "react-icons/bi";
function Dashboard() {
  const className: string = "HomePage";
  const [dark, setDark] = React.useState(true);
  const [light, setLight] = React.useState(true);
  const darkColor: string = dark ? "dark" : "light";
  const lightColor: string = !dark ? "dark" : "light";

  function handleThemeSwitch() {
    setDark(!dark);
    setLight(!light);
  }

  // getTotalPostInBoard

    // async function heloo() {
    // let x = await  backend.getTotalPostInBoard();
    // console.log(x) 
    // console.log("howjfow shfowvma ")
    // }

      // Define an interface for the objects within the boardDetails array
interface BoardDetail {
  size: bigint;
  boardName: string;
}

async function consolePostData() {
  let x = await backend.getTotalPostInBoard();
  // Check that x.data is not undefined and that the first element is an array
  if (x.data && Array.isArray(x.data[0])) {
      const [boardDetails] = x.data as [BoardDetail[]]; // Type assertion here

        console.log("below is boardDetails data")
      console.log(boardDetails)
      // Ensure boardDetails is not undefined before iterating
      // boardDetails?.forEach(({ size, boardName }) => {
      //     console.log(`Board Name: ${boardName}, Size: ${size}`);
      // });
  } else {
      console.log("No board details available");
  }
}

   
  
    
  // console.log(battlechan_Backend.getTotalPostInBoard()); 
  return (
    <div
      className={
        className + ` ${darkColor == "dark" ? "bg-dark" : "bg-[#ECECEC]"}`
      }
    >
      <button onClick={consolePostData}  className="bg-green font-[700] text-[40px] ">consolePostData</button>
      <Navbar darkColor={darkColor} lightColor={lightColor} />
      <Body darkColor={darkColor} lightColor={lightColor} />
      <RecentPosts
        darkColor={darkColor}
        lightColor={lightColor}
        handleThemeSwitch={handleThemeSwitch}
      />
    </div>
  );
}

export default Dashboard;
