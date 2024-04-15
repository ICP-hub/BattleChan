import { useCanister } from "@connect2ic/react";

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

type PostInfo = {
    postId: string;
    postName: string;
    postMetaData: Int8Array;
    postDes: string;
    expireAt: BigInt;
    createdAt: string;
    createdBy: {
      userName: string;
      userProfile: Int8Array;
    };
    upvotedBy: string[];
    comments:any;
  };

const PostApiHanlder = () => {
    
    const [backend] = useCanister("backend");

    const createPost = async (boardName: string, { postName, postDes, postMetaData }: { postName: string, postDes: string, postMetaData: Int8Array | undefined }) => {
        try {
            const postData = {
                postName: postName, 
                postDes: postDes, 
                postMetaData: postMetaData, 
            };

            const res = await backend.createPost(boardName, postData);
            
            return res;
        } catch (err) {
            console.error("Error creating post : ", err);
        }
    };

    
    const getBoards = async () => {
        try {

            const res = await backend.getTotalPostInBoard();
            
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };
    
    const getMainPosts = async (filter: Object, chunkSize: Number, pageNumber: Number, boardName: string) => {
        try {
            const res = await backend.postFilter(filter, pageNumber, chunkSize, boardName.toLocaleLowerCase());
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    
    // const getRecentPosts = async (filter: Object, chunkSize: Number, pageNumber: Number, boardName: string) => {
    //     try {
    //         const res = await backend.archivePostFilter(filter, pageNumber, chunkSize, boardName.toLocaleLowerCase());
    //         return res;
    //     } catch (err) {
    //         console.error("Error: ", err);
    //     }
    // };
    const getRecentPosts = async () => {
        try {
            const res = await backend.getRecentPost() as PostInfo[];
            console.log("res recent: ", res)
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };


    
    const getArchivePosts = async (filter: Object, chunkSize: Number, pageNumber: Number, boardName: string) => {
        try {
            const res = await backend.archivePostFilter(filter, pageNumber, chunkSize, boardName.toLocaleLowerCase());
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    
    const archivePost = async (postId: string) => {
        try {
            const res = await backend.archivePost(postId);
            return res;
        } catch (err) {
            console.error("Error archiving a post : ", err);
        }
    };

    
    const getSingleMainPost = async (postId: string) => {
        try {
            const res = await backend.getPostInfo(postId);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    
    const getSingleArchivePost = async (postId: string) => {
        try {
            const res = await backend.getSingleArchivedPost(postId);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    
    const upvotePost = async (postId: string) => {
        try {
            const res = await backend.upvoteOrDownvotePost(postId, { upvote: null });
            return res;
        } catch (err) {
            console.error("Error upvoting a post : ", err);
            return err;
        }
    };

    
    const downvotePost = async (postId: string) => {
        try {
            const res = await backend.upvoteOrDownvotePost(postId, { downvote: null });
            return res;
        } catch (err) {
            console.error("Error downvoting a post : ", err);
            return err;
        }
    };

    
    const getTotalCounts = async () => {
        try {
            let res = { mainPostCounts: 0, archivePostCounts: 0 } as TotalCountsResponse;
            const totalCounts = (await backend.getTotalCounts()) as TotalCounts;
            
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

    
    const getUsersMainPosts = async () => {
        try {
            const res = await backend.getUserPost();
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return err;
        }
    };

    
    const getUsersArchivePosts = async () => {
        try {
            const res = await backend.getArchivedPostOfUser(10, 1);
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return err;
        }
    };


    
    return { createPost, getRecentPosts, getBoards, getMainPosts, archivePost, getArchivePosts, getSingleMainPost, getSingleArchivePost, upvotePost, downvotePost, getTotalCounts, getUsersMainPosts, getUsersArchivePosts };
};

export default PostApiHanlder;