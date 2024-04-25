import React from "react";
import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";

import bg from "../../images/dashboard_bg.png";
import defaultImg from "../../images/User.png";

import { FaRegCopy } from "react-icons/fa6";
import { useCanister } from "@connect2ic/react";
import UserApiHanlder from "../../API_Handlers/user";
import toast from "react-hot-toast";
import Constant from "../../utils/constants";
import { useConnect } from "@connect2ic/react";

const useBackend = () => {
  return useCanister("backend");
};

type Theme = {
  handleThemeSwitch: Function;
};

interface BackendResponse {
  status: boolean;
  data: [];
  error: string[];
}

const userData = {
  name: "Kristin Watson",
  imageURL: defaultImg,
};

interface UserData {
  userName: string;
  profileImg: Int8Array;
}

interface Data {
  ok: string;
}

interface ProfileData {
  userName: string;
  profileImg: string;
  status: boolean;
  profileImg_int8arr: Int8Array;
}

const SettingProfile = (props: Theme) => {
  const [backend] = useBackend();
  const { registerUser, isUserRegistered, updateUser, getProfileData } =
    UserApiHanlder();
  const { handleFileUpload, convertInt8ToBase64 } = Constant();
  let { principal } = useConnect();

  const [showInput, setShowInput] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [textToCopy, setTextToCopy] = React.useState("Text to copy");
  const isRegisteredRef = React.useRef(isRegistered);

  const [fileURL, setFileURL] = React.useState(userData.imageURL);
  const [userName, setUserName] = React.useState("Please Update your Username");
  const [inputUserName, setInputUserName] = React.useState("");
  const [fileData, setFileData] = React.useState<{
    base64: string;
    int8Array: Int8Array;
  } | null>(null);

  React.useRef(isRegistered);
  const userNameRef = React.useRef(userName);
  const fileDataRef = React.useRef(fileData);
  const className = "Dashboard__SettingProfile";

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { base64, int8Array } = await handleFileUpload(event);
      setFileData({ base64, int8Array });
      setFileURL(base64 || defaultImg);
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
        console.error("Error:", error);
      } else {
        console.error("Error:", error);
      }
    }
  };

  function handleFileChange() {
    setFileURL(fileData?.base64 || fileURL || defaultImg);
  }

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
  }

  function disableBtn(button: any) {
    console.log("disabled");

    button.setAttribute("disabled", "true");
    button.style.opacity = "0.5";
  }
  function enableBtn(button: any) {
    console.log("enable");

    button.removeAttribute("disabled");
    button.style.opacity = "1";
  }

  React.useEffect(() => {
    const regButton = document.getElementById("registerBtn");

    if (regButton) {
      regButton.addEventListener("click", async () => {
        if (isRegisteredRef.current === true) {
          disableBtn(regButton);
          const data = await updateUser(
            userNameRef.current,
            fileDataRef.current?.int8Array
          );

          if (data && (data as Data)?.ok) {
            toast.success((data as Data).ok);
          } else {
            toast.error(
              "Error Updating Profile: please verify and enter correct fields!"
            );
          }

          enableBtn(regButton);
        } else {
          try {
            disableBtn(regButton);
            const data = await registerUser(
              userNameRef.current,
              fileDataRef.current?.int8Array
            );

            if (data && (data as Data)?.ok) {
              toast.success((data as Data).ok);
            } else {
              toast.error(
                "Error Updating Profile: please verify and enter correct fields!"
              );
            }

            enableBtn(regButton);
          } catch (error) {
            console.error("Error registering user:", error);
          }

          enableBtn(regButton);
        }
      });
    }
  }, [userNameRef]);

  React.useEffect(() => {
    isRegisteredRef.current = isRegistered;
    userNameRef.current = userName;
    fileDataRef.current = fileData;
  }, [isRegistered, userName, fileData]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = (await getProfileData()) as ProfileData;
      if (response && response.status !== false) {
        setUserName(response?.userName);
        setFileURL(response?.profileImg);
        setFileData({
          base64: response?.profileImg || "",
          int8Array: response?.profileImg_int8arr,
        });
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    };

    fetchData();
  }, [isRegistered]);

  const handleCopyClick = (principalID: any) => {
    const textArea = document.createElement("textarea");
    const copiedOK = document.getElementById("copied");

    //set textToCopy to the selftext_html
    const convertedSymbols = extractInnerHTML(principalID);
    const innerHTML = extractInnerHTML(convertedSymbols);

    setTextToCopy(innerHTML);

    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const copySuccessful = document.execCommand("copy");
      console.log("copySuccessful: ", copySuccessful);
      if (copySuccessful) {
        copiedOK?.classList.remove("hidden");
        setTimeout(() => {
          copiedOK?.classList.add("hidden");
        }, 2000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const extractInnerHTML = (htmlString: string) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString;
    return wrapper.textContent || wrapper.innerText;
  };

  return (
    <div
      className={
        className + " " + "min-h-screen bg-[#ECECEC] dark:bg-dark z-0 relative"
      }
    >
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
        className={`h-full w-full laptop:py-10 py-5 laptop:px-40 tablet:px-20 px-8 text-dark dark:text-light`}
      >
        <h1 className="laptop:text-4xl text-laptop:text-4xl tablet:text-3xl small_phone:text-2xl text-lg font-bold text-center mb-8">
          Customize Profile
        </h1>

        <section className="profileName laptop:p-4 p-2 laptop:m-8 my-4 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start gap-2 phone:text-base text-sm">
            <span className="font-semibold py-1">Principal ID</span>
            <div className="flex-row-center gap-2">
              <p className="py-1 px-2 italic bg-light dark:bg-dark border border-light-green rounded-lg w-full">
                {principal}
              </p>
              <button
                onClick={() => handleCopyClick(principal)}
                className="p-2 text-dark dark:text-light hover:bg-dirty-light-green rounded-lg relative"
              >
                <p
                  id="copied"
                  className="px-2 phone:text-base text-sm absolute bottom-[40px] left-[-10px] bg-light-green text-dark rounded-lg font-semibold hidden"
                >
                  Copied
                </p>
                <FaRegCopy />
              </button>
            </div>
          </div>
        </section>

        <section className="profileName laptop:p-4 p-2 laptop:m-8 my-4 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start gap-2 phone:text-base text-sm">
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
          <div className="small_phone:flex-row-center flex flex-col gap-2">
            {showInput && (
              <button
                type="button"
                className={`text-light dark:text-dark bg-dark dark:bg-light laptop:py-2 laptop:px-4 py-1 px-2 rounded-lg font-semibold`}
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
              } text-light dark:text-dark phone:text-base text-sm laptop:py-2 laptop:px-4 py-1 px-2 rounded-lg font-semibold`}
              onClick={handleNameChange}
            >
              Change
            </button>
          </div>
        </section>

        <section className="profilePhoto laptop:p-4 p-2 laptop:m-8 my-4 rounded-lg border border-light-green flex-row-center justify-between">
          <div className="name flex flex-col items-start phone:text-base text-sm">
            <span className="font-semibold">Profile Picture</span>
            <span>Image Must Be in Jpeg Format</span>
          </div>

          <label
            htmlFor="profile"
            className={`text-light dark:text-dark bg-dark dark:bg-light phone:text-base text-sm laptop:py-2 laptop:px-4 py-1 px-2 rounded-lg font-semibold cursor-pointer`}
            onClick={handleFileChange}
          >
            Change
          </label>

          <input
            type="file"
            name="Change"
            id="profile"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
        </section>

        <section className="image laptop:p-8 py-4 flex flex-col items-start">
          <img
            src={fileURL}
            alt="Profile Image"
            className="laptop:w-[150px] phone:w-[120px] w-[100px] laptop:h-[150px] phone:h-[120px] h-[100px] rounded-lg object-cover"
          />
        </section>

        <section className="image p-4 laptop:m-8 my-4 flex-col-center">
          <button className="green-button" type="button" id="registerBtn">
            Update
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingProfile;
