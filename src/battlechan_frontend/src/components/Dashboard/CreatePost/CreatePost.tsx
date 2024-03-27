import React from "react";
import KnowMore from "./KnowMore";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import { FiUpload } from "react-icons/fi";
import bg from "../../../images/dashboard_bg.png";

type Theme = {
  handleThemeSwitch: Function;
};

const CreatePost = (props: Theme) => {
  const darkColor = document.documentElement.className;
  const className = "HomePage__CreatePost";

  return (
    <div
      className="bg-[#ECECEC] dark:bg-dark bg-top bg-contain bg-no-repeat"
      style={
        darkColor == "dark"
          ? {
              backgroundImage: `url(${bg})`,
            }
          : {}
      }
    >
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <NavButtons />

      <div
        className={
          className +
          " " +
          "text-dark dark:text-light flex flex-col"
        }
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
              >
                <option value="0">
                  Choose A Community Your Post Belongs To
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
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
                  disabled
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
