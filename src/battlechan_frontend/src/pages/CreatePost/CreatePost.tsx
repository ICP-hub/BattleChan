import React, { useState, useEffect } from "react";
import KnowMore from "./KnowMore";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { FiUpload } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import bg from "../../images/dashboard_bg.png";

import PostApiHanlder from "../../API_Handlers/post";
import toast from "react-hot-toast";
import Constant from "../../utils/constants";
import { useMediaQuery } from "@mui/material";

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
  const [communities, setCommunities] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [postMetaData, setPostMetaData] = useState("");
  const [postName, setPostName] = useState("");
  const [postDes, setPostDes] = useState("");
  //this is to show the image on the screen or set it in server
  const [fileURL, setFileURL] = React.useState("");

  const [fileData, setFileData] = React.useState<{
    base64: string;
    int8Array: Int8Array;
  } | null>(null);

  const { createPost, getBoards } = PostApiHanlder();
  const { handleFileUpload } = Constant();
  const selectedCommunityRef = React.useRef(selectedCommunity); // Ref to store latest selected community
  const postNameRef = React.useRef(postName);
  const postDesRef = React.useRef(postDes); // Ref to store latest selected community
  const fileDataRef = React.useRef(fileData);

  const is870px = useMediaQuery("(min-width: 870px)");
  const navigate = useNavigate();
  const className = "HomePage__CreatePost";

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { base64, int8Array } = await handleFileUpload(event); // Calling the handleFileUpload function
      setFileData({ base64, int8Array });
      setFileURL(base64 || "");
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error); // Display the error message
        console.error("Error:", error);
      } else {
        console.error("Error:", error);
      }
    }
  };

  function handleFileChange() {
    // const imageUrl = URL.createObjectURL(inputfile.files[0]);
    setFileURL(fileData?.base64 || "");
  }

  function handleFileRemove() {
    setFileURL("");
    setFileData(null);
  }

  React.useEffect(() => {
    fileDataRef.current = fileData;
  }, [fileData]);

  React.useEffect(() => {
    let createPostBtn1 = document.getElementById("createPostBtn1");
    let createPostBtn2 = document.getElementById("createPostBtn2");
    createPostBtn1?.addEventListener("click", async () => {
      try_and_catch(createPostBtn1);
    });

    createPostBtn2?.addEventListener("click", async () => {
      try_and_catch(createPostBtn2);
    });

    async function try_and_catch(button: any) {
      button.setAttribute("disabled", "true");
      button.style.opacity = "0.5"; // Example: setting opacity to 50%

      try {
        // Call the asynchronous function
        await handleCreatePost();
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error("Error creating post:", error);
      } finally {
        // Re-enable the button in the finally block to ensure it gets re-enabled
        button.removeAttribute("disabled");
      }
    }

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
      // console.log(boards);

      if (boards && boards.length > 0) {
        const names = boards.map((board) => board.boardName);
        setCommunities(names); // Update the state with all board names.
      } else {
        // console.log("No boards found.");
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
    let createPostBtn = document.getElementById("createPostBtn");
    console.log(createPostBtn);

    const postData = {
      postName: postNameRef.current,
      postDes: postDesRef.current,
      postMetaData: fileDataRef.current?.int8Array || undefined,
    };
    const response = (await createPost(
      selectedCommunityRef.current,
      postData
    )) as postResponse;
    // console.log(response);

    if (response && response?.ok) {
      navigate("/dashboard/mainPosts");
      toast.success("Post Created Successfully!");
      // window.location.href = "/dashboard/mainPosts";
    } else {
      toast.error(
        "Error Creating your Post, Please verify and provide valid data!"
      );
    }
  };

  return (
    <div className="bg-[#ECECEC] dark:bg-dark relative z-0">
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />

      <NavButtons />

      {document.documentElement.className == "dark" && (
        <img
          src={bg}
          alt="Background image"
          className="w-screen -z-10 h-screen absolute top-0 tablet:object-cover object-contain"
        />
      )}

      <div
        className={className + " " + "text-dark dark:text-light flex flex-col"}
      >
        <h1 className="laptop:text-4xl text-laptop:text-4xl tablet:text-3xl small_phone:text-2xl text-lg font-semibold text-center tablet:py-12 py-4 pb-8">
          Create Your Post
        </h1>

        <div className="big_tablet:h-[80vh] border border-light-green rounded-lg big_tablet:gap-8 gap-6 laptop:p-8 tablet:p-6 p-4 laptop:mx-20 tablet:mx-10 mx-6 bg-transparent big_tablet:flex-row-center flex flex-col">
          <section className="big_tablet:w-1/2 w-full h-full tablet:text-base small_phone:text-sm text-xs flex flex-col items-start big_tablet:gap-0 gap-3">
            <label className="font-semibold tablet:py-4 py-0" htmlFor="title">
              Your Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title/topic of your post"
              className="w-full italic bg-light dark:bg-dark border border-light-green rounded-md phone:p-3 p-2"
              onChange={(e) => setPostName(e.target.value)}
            />

            <label
              className="font-semibold tablet:py-4 py-0"
              htmlFor="description"
            >
              Description <span className="font-light">{`(Optional)`}</span>
            </label>
            <textarea
              name="description"
              cols={50}
              rows={5}
              className="w-full phone:p-3 p-2 italic bg-light dark:bg-dark border border-light-green rounded-md"
              placeholder="Describe about your post in a nutshell"
              onChange={(e) => setPostDes(e.target.value)}
            ></textarea>

            <label
              className="font-semibold tablet:py-4 py-0"
              htmlFor="community"
            >
              Specify Community *
            </label>
            <select
              name="community"
              className="w-full italic phone:p-3 p-2 text-dark dark:text-light bg-light dark:bg-dark bg-light dark:bg-dark border border-light-green rounded-md"
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
            >
              <option value="0">Choose A Community Your Post Belongs To</option>
              {communities.map((community, index: number) => (
                <option key={index} value={community} className="not-italic">
                  {community}
                </option>
              ))}
            </select>

            {is870px && (
              <div className="buttons w-full gap-4 flex-row-center py-8 justify-end">
                <button
                  type="button"
                  className="small-button bg-transparent border border-light-green hover:bg-dirty-light-green transition ease"
                >
                  <Link to="/dashboard/mainPosts">Cancel</Link>
                </button>
                <button
                  type="button"
                  className="createPostBtn small-button text-grey dark:text-light dark:bg-dirty-light-green bg-dark hover:dark:bg-fresh-green hover:text-light transition rounded-[2rem]"
                  id="createPostBtn1"
                  // onClick={handleCreatePost}
                >
                  Post
                </button>
              </div>
            )}
          </section>

          <section
            className={`big_tablet:w-1/2 w-full big_tablet:h-full phone:h-[60dvh] h-[40dvh] tablet:text-base text-sm bg-dirty-light-green bg-opacity-25 flex-col-center rounded-lg ${
              fileURL == ""
                ? "justify-center py-8"
                : "justify-between phone:p-4 p-2"
            }`}
          >
            {/* <input type="file" name="image" /> */}
            {fileURL == "" ? (
              <React.Fragment>
                <p>Drag & drop your image/Video</p>
                <p>OR</p>
                <br />

                <label
                  htmlFor="profile"
                  onClick={handleFileChange}
                  className="px-4 py-2 text-sm tablet:px-6 tablet:py-3 tablet:text-base gap-2 rounded-[2rem] bg-transparent border border-light-green flex-row-center cursor-pointer"
                >
                  <FiUpload /> Upload
                </label>

                <input
                  type="file"
                  name="Change"
                  id="profile"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img
                  src={fileURL}
                  alt="Profile Image"
                  className=" w-full h-[85%] object-cover rounded-lg"
                />
                <button
                  onClick={handleFileRemove}
                  className="p-4 w-full tablet:text-3xl text-lg hover:text-red flex justify-center items-center cursor-pointer"
                >
                  <RiDeleteBin7Line />
                </button>
              </React.Fragment>
            )}
          </section>

          {!is870px && (
            <div className="buttons w-full gap-4 flex-row-center justify-end">
              <button
                type="button"
                className="px-4 py-2 font-semibold text-sm rounded-[2rem] bg-transparent border border-light-green hover:bg-dirty-light-green transition ease"
              >
                <Link to="/dashboard/mainPosts">Cancel</Link>
              </button>
              <button
                type="button"
                className="createPostBtn px-4 py-2 font-semibold text-sm text-grey dark:text-light dark:bg-dirty-light-green bg-dark hover:dark:bg-fresh-green hover:text-light transition rounded-[2rem]"
                id="createPostBtn2"
                // onClick={handleCreatePost}
              >
                Post
              </button>
            </div>
          )}
        </div>

        <KnowMore />
      </div>
    </div>
  );
};

export default CreatePost;
