import { useCanister } from "@connect2ic/react";
import { useState } from "react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
  return useCanister("backend");
};

interface BackendResponse {
    status: boolean;
    data: [];
    error: string[];
}

interface BackendResponseUserInfo {
  status: boolean;
  data: UserInfo[]; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
}

interface UserInfo {
  createdAt: string;
  createdComments: any[]; // Define appropriate type for these arrays
  downvotedTo: any[];
  likedComments: any[];
  postIds: string[];
  profileImg: string;
  replyIds: any[];
  updatedAt: string[];
  upvotedTo: any[];
  userId: string;
  userName: string;
}

const UserApiHanlder = () => {
    // Init backend
    const [backend] = useBackend();

    // Register User
    const registerUser = async (userName: string, profileImg: string) => {
        try {
            // console.log(backend);
            const data = {
                userName: userName,
                profileImg: profileImg,
            };
            // console.log(data);
            const res = await backend.createUserAccount(data);
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error registering user: ", err);
        }
    };

    // Update User Profile
    const updateUser = async (userName: string, profileImg: string) => {
        try {
            const data = {
                userName: userName,
                profileImg: "sdvasbd",
            };
            console.log(data);
            const res = await backend.updatedUserAccount(data);
            console.log("res",res);
            // const response = (await backend.getUserInfo()) as BackendResponse;
            return res;
        } catch (err) {
            console.error("Error updating user info : ", err);
        }
    };

    // Verify is user registered or not 
    const isUserRegistered = async () => {
        try {
            const response = (await backend.getUserInfo()) as BackendResponse;
            console.log("data", response);
            return response;
        } catch (err) {
            console.error("Error creating contact : ", err);
        }
    };

    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = (await backend.getUserInfo()) as BackendResponseUserInfo;
        console.log(response.data)
        return response.data;
      } catch (err) {
        console.error("Error getting user info: ", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    const getPostInfo = async (postId: string) => {
      try {
        setIsLoading(true);
        const response = (await backend.getPostInfo(postId)) as BackendResponse;
        console.log("post response: ", response.data)
        return response.data;
      } catch (err) {
        console.error("Error getting user info: ", err);
      } finally {
        setIsLoading(false);
      }
    };



  // Returns
  return {
    registerUser,
    isUserRegistered,
    updateUser,
    isLoading,
    successfulSubmit,
    getUserInfo,
    getPostInfo,
  };
};

export default UserApiHanlder;
