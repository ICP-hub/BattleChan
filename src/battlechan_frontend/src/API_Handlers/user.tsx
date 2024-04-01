import { useCanister } from "@connect2ic/react";
import { useState } from "react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
    return useCanister("backend");
};

interface BackendResponse {
    status: boolean;
    data: []; // Assuming 'data' is an array of arrays of Board objects.
    error: string[];
}

const UserApiHanlder = () => {
    // Init backend
    const [backend] = useBackend();
    const [isLoading, setIsLoading] = useState(false);
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    // Create Contact
    const registerUser = async (userName: string, profileImg: string) => {
        try {
            setIsLoading(true);
            console.log(backend);
            // console.log(name, email, contact_number, message);
            const data = {
                userName: userName,
                profileImg: profileImg,
            };
            console.log(data);
            const res = await backend.createUserAccount(data);
            console.log(res);
            setSuccessfulSubmit(true);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (userName: string, profileImg: string) => {
        try {
            setIsLoading(true);
            // console.log(name, email, contact_number, message);
            const data = {
                userName: userName,
                profileImg: profileImg,
            };
            console.log(data);
            const res = await backend.updatedUserAccount(data);
            console.log("res",res);
            setSuccessfulSubmit(true);
            const response = (await backend.getUserInfo()) as BackendResponse;

            return response;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const isUserRegistered = async () => {
        try {
            setIsLoading(true);
            const response = (await backend.getUserInfo()) as BackendResponse;
            console.log("data", response);
            setSuccessfulSubmit(true);
            return response;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Returns
    return { registerUser, isUserRegistered, updateUser, isLoading, successfulSubmit };
};

export default UserApiHanlder;