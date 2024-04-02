import React, { useCallback, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import NavButtons from "../NavButtons/NavButtons";

import bg from "../../../images/dashboard_bg.png";
import defaultImg from "../../../images/User.png";
import { useCanister, useConnect } from "@connect2ic/react";
import UserApiHanlder from "../../../API_Handlers/user";
import toast from "react-hot-toast";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

type Theme = {
  handleThemeSwitch: Function;
};

interface BackendResponse {
  status: boolean;
  data: []; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
}

const userData = {
  name: "Kristin Watson",
  imageURL: defaultImg,
};

interface UserData {
  userName: string;
}

const SettingProfile = (props: Theme) => {
  const [backend] = useBackend();
  const { registerUser, isUserRegistered, updateUser } = UserApiHanlder();

  const [showInput, setShowInput] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const isRegisteredRef = React.useRef(isRegistered);

  //this is to show the image on the screen or set it in server
  const [fileURL, setFileURL] = React.useState(userData.imageURL);
  //this is to maintain the file changes by the user
  const [inputFileName, setInputFileName] = React.useState("");

  //this is to show the name on the screen or set it in server
  const [userName, setUserName] = React.useState(userData.name);
  //this is to maintain the name typed by the user
  const [inputUserName, setInputUserName] = React.useState("");

  React.useRef(isRegistered);
  const userNameRef = React.useRef(userName);

  const className = "Dashboard__SettingProfile";

  function handleNameChange() {
    setShowInput(true);
  }

  function handleSaveBtn() {
    if (inputUserName === "") {
      alert("UserName Can not be empty");
    } else {
      setUserName(inputUserName);
      setShowInput(false);
      setInputUserName("");
    }
    console.log("Input username:", inputUserName); // Add this line
  }

  function handleFileChange(inputfile: any) {
    const imageUrl = URL.createObjectURL(inputfile.files[0]);
    setFileURL(imageUrl);
  }

  useEffect(() => {
    const fileInput = document.getElementById("profile");

    const handleFileInputChange = (event: any) => {
      const files = event.target.files;

      if (files.length > 0) {
        const file = files[0];
        const fileName = file.name;
        setInputFileName(fileName);
      } else {
        setInputFileName("No file Selected");
      }
    };

    if (fileInput) {
      fileInput.addEventListener("change", handleFileInputChange);
    }
  }, [handleFileChange]);

  React.useEffect(() => {
    const registerBtn = document.getElementById("registerBtn");

    if (registerBtn) {
      registerBtn.addEventListener("click", async () => {
        if (isRegisteredRef.current === true) {
          const data = await updateUser(userNameRef.current, "");
          if (data && (data as Data)?.ok) {
            toast.success((data as Data).ok);
          } else {
            toast.error(
              "Error Updating Profile: please verify and enter correct fields!"
            );
          }
        } else {
          try {
            const data = await registerUser(userNameRef.current, "");
            if (data && (data as Data)?.ok) {
              toast.success((data as Data).ok);
            } else {
              toast.error(
                "Error Updating Profile: please verify and enter correct fields!"
              );
            }
          } catch (error) {
            console.error("Error registering user:", error);
          }
        }
      });
    }
  }, [userNameRef]);

  React.useEffect(() => {
    isRegisteredRef.current = isRegistered;
    userNameRef.current = userName;
  }, [isRegistered, userName]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = (await isUserRegistered()) as BackendResponse;
      if (response && response.status !== false) {
        const userDataArray: UserData[] = response.data;
        setInputUserName(userDataArray[0]?.userName);
        setIsRegistered(true);
        // console.log("SETTED TRUe", isRegistered);
      } else {
        // console.log("SET FALSE")
        setIsRegistered(false);
      }
      // console.log("isRegisteredData", response);
      // console.log("isRegistered", isRegistered);
    };

    // Add dependencies to the dependency array to avoid infinite loop
    fetchData();
  }, [isRegistered, userName]);

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

      <div
        className={`h-full w-full laptop:py-10 py-5 laptop:px-40 tablet:px-20 px-4 text-dark dark:text-light`}
      >
        <h1 className="laptop:text-3xl text-2xl font-bold text-center">
          Customize Profile
        </h1>

        <section className="profileName laptop:p-4 p-2 m-8 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start gap-2">
            <span className="font-semibold py-1">User Name</span>
            {!showInput && <span>{userName}</span>}
            {showInput && (
              <input
                type="text"
                name="user name"
                placeholder="type your name"
                onChange={(e) => setInputUserName(e.target.value)}
                onBlur={handleSaveBtn}
                className="py-1 px-4 italic bg-light dark:bg-dark border border-light-green  rounded-lg"
              />
            )}
          </div>
          <div className="flex-row-center gap-2">
            {showInput && (
              <button
                type="button"
                className={`text-light dark:text-dark bg-dark dark:bg-light py-2 px-4 rounded-lg font-semibold`}
                onClick={handleSaveBtn}
              >
                Save
              </button>
            )}

            <button
              type="button"
              className={`${
                showInput
                  ? "disable bg-[#272727] dark:bg-[#c2c2c2]"
                  : " bg-dark dark:bg-light"
              } text-light dark:text-dark py-2 px-4 rounded-lg font-semibold`}
              onClick={handleNameChange}
            >
              Change
            </button>
          </div>
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
          <button
            className="green-button"
            type="button"
            id="registerBtn"
            onClick={() => {
              console.log(
                "Input username from btn:",
                userName,
                "Input image:",
                fileURL
              ); // Add this line
            }}
          >
            Update
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingProfile;
