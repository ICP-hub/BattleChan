import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import bg from "../../../images/dashboard_bg.png";
import defaultImg from "../../../images/User.png";

type Theme = {
  handleThemeSwitch: Function;
};

const userData = {
  name: "Kristin Watson",
  imageURL: defaultImg,
};

const SettingProfile = (props: Theme) => {
  const [showInput, setShowInput] = React.useState(false);

  const [inputFileName, setInputFileName] = React.useState("");
  const [fileURL, setFileURL] = React.useState(userData.imageURL);

  const [inputUserName, setInputUserName] = React.useState(userData.name);
  const [userName, setUserName] = React.useState(userData.name);

  const className = "Dashboard__SettingProfile";

  function handleNameChange() {
    if (userName != inputUserName) {
      setShowInput(false);
      setUserName(inputUserName);
    } else {
      setShowInput(true);
    }
  }

  function handleBlur() {
    setUserName(inputUserName);
    setShowInput(false);
  }

  function handleFileChange(inputfile: any) {
    const imageUrl = URL.createObjectURL(inputfile.files[0]);
    setFileURL(imageUrl);
  }

  useEffect(() => {
    const fileInput = document.getElementById("profile");

    if (fileInput) {
      fileInput.addEventListener("change", function (event: any) {
        const files = event.target.files;

        if (files.length > 0) {
          const file = files[0];

          const fileName = file.name;
          setInputFileName(fileName);
        } else {
          setInputFileName("No file Selected");
        }
      });
    }
  }, [handleFileChange]);

  return (
    <div className={className + " " + "bg-[#ECECEC] dark:bg-dark z-0 relative"}>
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />

      <NavButtons />

      {document.documentElement.className == "dark" && (
        <img
          src={bg}
          alt="Background image"
          className="w-screen -z-10 h-screen absolute top-0 object-cover"
        />
      )}

      <div className={`h-full w-full laptop:py-10 py-5 laptop:px-40 tablet:px-20 px-4 text-dark dark:text-light`}>
        <h1 className="laptop:text-3xl text-2xl font-bold text-center">Customize Profile</h1>

        <section className="profileName laptop:p-4 p-2 m-8 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start gap-2">
            <span className="font-semibold py-1">User Name</span>
            {!showInput && <span>{userName}</span>}
            {showInput && (
              <input
                type="text"
                name="user name"
                placeholder="type your name"
                onBlur={handleBlur}
                onInput={(e: any) => setInputUserName(e.target.value)}
                className="py-1 px-4 italic bg-light dark:bg-dark border border-light-green  rounded-lg"
              />
            )}
          </div>

          <button
            type="button"
            className={`text-light dark:text-dark bg-dark dark:bg-light py-2 px-4 rounded-lg font-semibold`}
            onClick={handleNameChange}
          >
            Change
          </button>
        </section>

        <section className="profilePhoto laptop:p-4 p-2 m-8 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start">
            <span className="font-semibold">Profile Picture</span>
            <span>Image Must Be in Jpeg Format</span>
          </div>

          <label
            htmlFor="profile"
            className={`text-light dark:text-dark bg-dark dark:bg-light py-2 px-4 rounded-lg font-semibold cursor-pointer`}
            onClick={(e: any) => handleFileChange(e.target)}
          >
            Change
          </label>

          <input
            type="file"
            name="Change"
            id="profile"
            className="hidden"
            accept="image/*"
            onChange={(e: any) => handleFileChange(e.target)}
          />
        </section>

        <section className="image p-8 flex flex-col items-start">
          <img
            src={fileURL}
            alt="Profile Image"
            className="laptop:w-[150px] w-[120px] laptop:h-[150px] h-[120px] rounded-lg object-cover"
          />

          <p className={`${inputFileName == "" ? "hidden" : "block"} py-2`}>
            {inputFileName}
          </p>
        </section>

        <section className="image p-4 m-8 flex-col-center">
          <button className="green-button" type="button">
            Update
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingProfile;
