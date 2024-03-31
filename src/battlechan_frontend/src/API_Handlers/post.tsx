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

const PostApiHanlder = () => {
    // Init backend
    const [backend] = useBackend();
    const [isLoading, setIsLoading] = useState(false);
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    // Create Contact
    const createPost = async (boardName: string, { postName, postDes, postMetaData }: { postName: string, postDes: string, postMetaData: string }) => {
        try {
            setIsLoading(true);
            console.log(backend);
            // console.log(name, email, contact_number, message);
            const postData = {
                postName: postName, // Add your postName data here
                postDes: postDes, // Add your postDes data here
                postMetaData: postMetaData, // Add your postMetaData data here
            };
            console.log(boardName)
            console.log(postData)
            const res = await backend.createPost(boardName, postData);
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getBoards = async () => {
        try {
            setIsLoading(true);
            const res = await backend.getTotalPostInBoard();
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const addBoard = async (boardName: string) => {
        try {
            setIsLoading(true);
            const res = await backend.createNewBoard(boardName, boardName);
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getMainPosts = async () => {
        try {
            setIsLoading(true);
            const res = await backend.getPostsByBoard();
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getArchivePosts = async () => {
        try {
            setIsLoading(true);
            const res = await backend.getArchivedPost(BigInt(10), BigInt(1));
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getSingleMainPost = async (postId: string) => {
        try {
            setIsLoading(true);
            const res = await backend.getPostInfo(postId);
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating contact : ", err);
        } finally {
            setIsLoading(false);
        }
    };


    // Returns
    return { createPost, getBoards, getMainPosts, getArchivePosts, addBoard, getSingleMainPost, isLoading };
};

export default PostApiHanlder;