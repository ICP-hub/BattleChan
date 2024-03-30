import React, { useState, useEffect } from "react";
import KnowMore from "./KnowMore";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import { FiUpload } from "react-icons/fi";
import bg from "../../../images/dashboard_bg.png";

import { backend } from "../../../../../declarations/backend";
import { useCanister, useConnect } from "@connect2ic/react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

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

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Here");
  const file = event.target.files?.[0];

  if (!file) return;

  const maxSize = 1.7 * 1024 * 1024; // 1.7 MB in bytes

  if (file.size > maxSize) {
    alert('File size exceeds the limit of 1.7MB');
    return;
  }

  if (file.type.startsWith('image')) {
    console.log("Here1")
    const reader = new FileReader();

    reader.onload = async (e) => {
      console.log("Hell")
      if (e.target && e.target.result) {
        const img = new Image();
        img.src = e.target.result.toString();

        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const quality = 0.7; // Adjust image quality here
          const dataURL = canvas.toDataURL('image/jpeg', quality);

          // Convert data URL to Blob
          const blob = await fetch(dataURL).then((res) => res.blob());

          console.log("blob:", blob);
          // Convert Blob to ArrayBuffer
          const arrayBuffer = await blob.arrayBuffer();

          console.log("array:", arrayBuffer);
          // Convert ArrayBuffer to Int8Array
          const int8Array = new Int8Array(arrayBuffer);
          console.log(int8Array);

          // Base64
          // const uint8Array = new Uint8Array(int8Array);

          // // Convert Uint8Array to base64
          // let binary = '';
          // uint8Array.forEach((byte) => {
          //   binary += String.fromCharCode(byte);
          // });
          // let base64 = btoa(binary);

          // console.log(base64);
        };
      }
    };

    reader.readAsDataURL(file);
  } else {
    alert('Please upload an image file');
  }
};

const CreatePost = (props: Theme) => {

  const [communities, setCommunities] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [postName, setPostName] = useState("");
  const [postDes, setPostDes] = useState("");
  const [postMetaData, setPostMetaData] = useState("");
  // const [backend] = useBackend();
  // console.log(backend);
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

    fetchData(); // Call fetchData function when component mounts
  }, []);

  const handleCreatePost = async () => {
    try {
      const postData = {
        postName: "", // Add your postName data here
        postDes: "", // Add your postDes data here
        postMetaData: "", // Add your postMetaData data here
      };
      // const response = await backend.createPost(selectedCommunity, postData);
      // console.log(response);
      // if (response.status) {
      //   console.log("Post created successfully");
      //   // Clear form fields or show success message
      // } else {
      //   console.error("Failed to create post:", response.error);
      //   // Handle error, show error message, etc.
      // }
    } catch (error) {
      console.error("Error creating post:", error);
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
                  onClick={handleCreatePost}
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
                onChange={handleFileUpload}
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
