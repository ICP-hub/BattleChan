import React, { useState, useEffect } from "react";
import KnowMore from "./KnowMore";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";
import { useNavigate, useLocation } from "react-router-dom";

import { FiUpload } from "react-icons/fi";
import bg from "../../../images/dashboard_bg.png";

import PostApiHanlder from "../../../API_Handlers/post";
import toast from "react-hot-toast";
import Constant from "../../../utils/constants";

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
interface postResponse {
  ok: string;
}

type Theme = {
  handleThemeSwitch: Function;
};



const CreatePost = (props: Theme) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createPost, getBoards } = PostApiHanlder();
  const [communities, setCommunities] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const selectedCommunityRef = React.useRef(selectedCommunity); // Ref to store latest selected community
  const [postName, setPostName] = useState("");
  const postNameRef = React.useRef(postName);
  const [postDes, setPostDes] = useState("");
  const postDesRef = React.useRef(postDes); // Ref to store latest selected community
  const [postMetaData, setPostMetaData] = useState("");
  const { handleFileUpload } = Constant();
  const [fileData, setFileData] = React.useState<{ base64: string; int8Array: Int8Array } | null>(null);
  const fileDataRef = React.useRef(fileData);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { base64, int8Array } = await handleFileUpload(event); // Calling the handleFileUpload function
      setFileData({ base64, int8Array });
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error); // Display the error message
        console.error("Error:", error);
      } else {
        console.error("Error:", error);
      }
    }
  };

  React.useEffect(() => {
    fileDataRef.current = fileData;
  }, [fileData]);

  React.useEffect(() => {
    let createPostBtn = document.getElementById("createPostBtn")
    // Fetch data from backend canister function getTotalPostInBoard
    createPostBtn?.addEventListener("click", async () => {
      handleCreatePost();
    })

    fetchData(); // Call fetchData function when component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Make a fetch call to your backend API
      // const board = await addBoard("Games");
      // console.log(board);
      const response = (await getBoards()) as BackendResponse;
      if (response.status == false) {
        throw new Error("Failed to fetch communities");
      }

      const boards = response.data[0];
      console.log(boards);

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

  // Update ref when selectedCommunity changes
  useEffect(() => {
    selectedCommunityRef.current = selectedCommunity;
    postDesRef.current = postDes;
    postNameRef.current = postName;
  }, [selectedCommunity, postDes, postName]);

  const handleCreatePost = async () => {
    const postData = {
      postName: postNameRef.current,
      postDes: postDesRef.current,
      postMetaData: fileDataRef.current?.int8Array || undefined,
    };
    const response = (await createPost(selectedCommunityRef.current, postData)) as postResponse;
    console.log(response);

    if (response && response?.ok) {
      navigate('/dashboard/mainPosts');
      toast.success(response.ok);
      // window.location.href = "/dashboard/mainPosts";
    } else {
      toast.error("Error Creating your Post, Please verify and provide valid data!")
    }
  };

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
                onChange={(e) => setPostName(e.target.value)}
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
                onChange={(e) => setPostDes(e.target.value)}
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
                  id="createPostBtn"
                // onClick={handleCreatePost}
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
                onChange={handleChange}
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
