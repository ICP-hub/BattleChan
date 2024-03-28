import React, { useState, useEffect } from "react";
import KnowMore from "./KnowMore";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import { FiUpload } from "react-icons/fi";
import bg from "../../../images/dashboard_bg.png";

// import { backend } from "../../../../../declarations/backend";

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

type Theme = {
  handleThemeSwitch: Function;
};

const CreatePost = (props: Theme) => {
  const [communities, setCommunities] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [postName, setPostName] = useState("");
  const [postDes, setPostDes] = useState("");
  const [postMetaData, setPostMetaData] = useState("");
  
  useEffect(() => {
    // Fetch data from backend canister function getTotalPostInBoard
    const fetchData = async () => {
      try {
        // Make a fetch call to your backend API
        const response = (await backend.getTotalPostInBoard()) as BackendResponse;
        if (response.status == false) {
          throw new Error("Failed to fetch communities");
        }

        const boards = response.data[0];
        // console.log(boards);

        if (boards && boards.length > 0) {
          const names = boards.map((board) => board.boardName);
          setCommunities(names); // Update the state with all board names.
        } else {
          console.log("No boards found.");
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []);

  const className = "HomePage__CreatePost";

  return (
    <div className="bg-[#ECECEC] dark:bg-dark relative z-0">
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />

      <NavButtons />

      {document.documentElement.className == "dark" && (
        <img
          src={bg}
          alt="Background image"
          className="w-screen -z-10 h-screen absolute top-0 object-cover"
        />
      )}

      <div
        className={className + " " + "text-dark dark:text-light flex flex-col"}
      >
        <div className="createPost">
          <h1 className="text-3xl font-semibold text-center py-12">
            Create Your Post
          </h1>

          <div className="h-[70vh] border border-light-green rounded-lg gap-8 p-8 mx-20 bg-transparent flex-row-center">
            <section className="w-1/2 h-full flex flex-col items-start">
              <label className="font-semibold py-4" htmlFor="title">
                Your Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter the title/topic of your post"
                className="w-full italic bg-light dark:bg-dark border border-light-green rounded-md p-3"
              />

              <label className="font-semibold py-4" htmlFor="description">
                Description <span className="font-light">{`(Optional)`}</span>
              </label>
              <textarea
                name="description"
                cols={50}
                rows={5}
                className="w-full p-3 italic bg-light dark:bg-dark border border-light-green rounded-md"
                placeholder="Describe about your post in a nutshell"
              ></textarea>

              <label className="font-semibold py-4" htmlFor="community">
                Specify Community *
              </label>
              <select
                name="community"
                className="w-full p-4 text-dark dark:text-light bg-light dark:bg-dark bg-light dark:bg-dark border border-light-green rounded-md"
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
              >
                <option value="0">Choose A Community Your Post Belongs To</option>
                {communities.map((community, index: number) => (
                  <option key={index} value={community}>
                    {community}
                  </option>
                ))}
              </select>

              <div className="buttons w-full gap-4 flex-row-center py-8 justify-end">
                <button
                  type="button"
                  className="small-button bg-transparent border border-light-green hover:bg-dirty-light-green transition ease"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="small-button bg-dirty-light-green"
                >
                  Post
                </button>
              </div>
            </section>

            <section className="w-1/2 h-full py-8 bg-dirty-light-green bg-opacity-25 flex-col-center justify-center">
              {/* <input type="file" name="image" /> */}
              <p>Drag & drop your image/Video</p>
              <p>OR</p>
              <br />

              <label
                htmlFor="profile"
                className="green-button flex-row-center cursor-pointer"
              >
                <FiUpload /> Upload
              </label>

              <input
                type="file"
                name="Change"
                id="profile"
                className="hidden"
              />
            </section>
          </div>
        </div>

        <KnowMore />
      </div>
    </div>
  );
};

export default CreatePost;
