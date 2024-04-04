import { useCanister, useConnect } from "@connect2ic/react";
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
    const [backend] = useCanister("backend");
    const { isConnected } = useConnect();
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);

    // Create a Post
    const createPost = async (boardName: string, { postName, postDes, postMetaData }: { postName: string, postDes: string, postMetaData: string }) => {
        try {
            console.log(backend);
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
            console.error("Error creating post : ", err);
        }
    };

    // Get Boards Data
    const getBoards = async () => {
        try {
            console.log("backend");
            // console.log(backend);
            console.log("isconnect", isConnected);
            const res = await backend.getTotalPostInBoard();
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Add Board
    // const addBoard = async (boardName: string) => {
    //     try {
    //         const res = await backend.createNewBoard(boardName, boardName);
    //         console.log(res);
    //         return res;
    //     } catch (err) {
    //         console.error("Error creating board : ", err);
    //     }
    // };

    // Get Active Posts
    const getMainPosts = async () => {
        try {
            const res = await backend.getPostsByBoard();
            // const res = await backend.postFilter({ upvote: true }, 10, 1);
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Archive a Post
    const archivePost = async (postId: string) => {
        try {
            const res = await backend.archivePost(postId);
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error archiving a post : ", err);
        }
    };

    // Get Archived Post
    const getArchivePosts = async () => {
        try {
            const res = await backend.getArchivedPost(BigInt(10), BigInt(2));
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Get Single Active Post
    const getSingleMainPost = async (postId: string , status : string) => {
        try {
            const res = await backend.getPostInfo(postId, "active");
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Get single Archived Post
    const getSingleArchivePost = async (postId: string , status : string) => {
        try {
            const res = await backend.getSingleArchivedPost(postId , "archive");
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Upvote a Post
    const upvotePost = async (postId: string) => {
        try {
            const res = await backend.upvoteOrDownvotePost(postId, { upvote: null });
            console.log(res);
            return res;
        } catch (err) {
            console.error("Error upvoting a post : ", err);
        }
    };


    // Returns
    return { createPost, getBoards, getMainPosts, archivePost, getArchivePosts, getSingleMainPost, getSingleArchivePost, upvotePost };
};

export default PostApiHanlder;