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

    // Returns
    return { registerUser, isUserRegistered, updateUser };
};

export default UserApiHanlder;