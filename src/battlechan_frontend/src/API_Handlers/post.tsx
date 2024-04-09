import { useCanister, useConnect } from "@connect2ic/react";
import { useState } from "react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
    return useCanister("backend");
};

interface Counts {
    postData: bigint;
    userAchivedPostData: bigint;
    userData: bigint;
    withdrawPost: bigint;
}

interface TotalCounts {
    status: boolean;
    data: Counts[][];
    error: string[];
}

interface TotalCountsResponse {
    mainPostCounts: number;
    archivePostCounts: number;
}

const PostApiHanlder = () => {
    // Init backend
    const [backend] = useCanister("backend");
    const { isConnected } = useConnect();
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);

    // Create a Post
    const createPost = async (boardName: string, { postName, postDes, postMetaData }: { postName: string, postDes: string, postMetaData: Int8Array | undefined }) => {
        try {
            const postData = {
                postName: postName, // Add your postName data here
                postDes: postDes, // Add your postDes data here
                postMetaData: postMetaData, // Add your postMetaData data here
            };
            // console.log(boardName)
            // console.log(postData)
            const res = await backend.createPost(boardName, postData);
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error creating post : ", err);
        }
    };

    // Get Boards Data
    const getBoards = async () => {
        try {
            // console.log("backend");
            // console.log(backend);
            // console.log("isconnect", isConnected);
            const res = await backend.getTotalPostInBoard();
            // console.log(res);
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
    const getMainPosts = async (filter: Object, chunkSize: Number, pageNumber: Number, boardName: string) => {
        try {
            // console.log(filter);
            // console.log(chunkSize);
            // console.log(pageNumber);
            // console.log(boardName);
            // const res = await backend.getPostsByBoard();
            const res = await backend.postFilter(filter, pageNumber, chunkSize, boardName.toLocaleLowerCase());
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Get Recent Posts
    const getRecentPosts = async (filter: Object, chunkSize: Number, pageNumber: Number, boardName: string) => {
        try {
            // console.log(filter);
            // console.log(chunkSize);
            // console.log(pageNumber);
            // console.log(boardName);
            // const res = await backend.getArchivedPost(BigInt(10), BigInt(1));
            const res = await backend.archivePostFilter(filter, pageNumber, chunkSize, boardName.toLocaleLowerCase());
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };


    // Get Archived Post
    const getArchivePosts = async (filter: Object, chunkSize: Number, pageNumber: Number, boardName: string) => {
        try {
            // console.log(filter);
            // console.log(chunkSize);
            // console.log(pageNumber);
            // console.log(boardName);
            // const res = await backend.getArchivedPost(chunkSize, pageNumber);
            const res = await backend.archivePostFilter(filter, pageNumber, chunkSize, boardName.toLocaleLowerCase());
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Archive a Post
    const archivePost = async (postId: string) => {
        try {
            const res = await backend.archivePost(postId);
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error archiving a post : ", err);
        }
    };

    // Get Single Active Post
    const getSingleMainPost = async (postId: string) => {
        try {
            const res = await backend.getPostInfo(postId);
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Get single Archived Post
    const getSingleArchivePost = async (postId: string) => {
        try {
            const res = await backend.getSingleArchivedPost(postId);
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Upvote a Post
    const upvotePost = async (postId: string) => {
        try {
            const res = await backend.upvoteOrDownvotePost(postId, { upvote: null });
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error upvoting a post : ", err);
            return err;
        }
    };

    // Downvote a Post
    const downvotePost = async (postId: string) => {
        try {
            const res = await backend.upvoteOrDownvotePost(postId, { downvote: null });
            // console.log(res);
            return res;
        } catch (err) {
            console.error("Error downvoting a post : ", err);
            return err;
        }
    };

    // Get Total Counts of Posts
    const getTotalCounts = async () => {
        try {
            let res = { mainPostCounts: 0, archivePostCounts: 0 } as TotalCountsResponse;
            const totalCounts = (await backend.getTotalCounts()) as TotalCounts;
            // console.log(totalCounts);
            if (totalCounts && totalCounts?.data) {
                const counts = totalCounts.data.flat();
                res.mainPostCounts = Number(counts[0]?.postData);
                res.archivePostCounts = Number(counts[0]?.userAchivedPostData);
            }
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return err;
        }
    };

    // Get Users Main Posts
    const getUsersMainPosts = async () => {
        try {
            const res = await backend.getUserPost();
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return err;
        }
    };

    // Get Users Archive Posts
    const getUsersArchivePosts = async () => {
        try {
            const res = await backend.getArchivedPostOfUser(10, 1);
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return err;
        }
    };


    // Returns
    return { createPost, getRecentPosts, getBoards, getMainPosts, archivePost, getArchivePosts, getSingleMainPost, getSingleArchivePost, upvotePost, downvotePost, getTotalCounts, getUsersMainPosts, getUsersArchivePosts };
};

export default PostApiHanlder;