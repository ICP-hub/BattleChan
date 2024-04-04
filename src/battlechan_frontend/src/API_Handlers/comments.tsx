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
interface Comment {
  commentId: string;
  createdAt: string;
  likedBy: string[];
  comment: string;
  updatedAt: string[];
  replies: { empty: null } | null;
}

const CommentsApiHanlder = () => {
  // Init backend
  const [backend] = useBackend();

  // Get All COmments of post
  const getAllComments = async (postId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllCommentOfPost(postId, 10, 1);
      console.log("allCommentOfPost: ", res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Get All COmments of post
  const getAllReplies = async (commentId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllRepliesofComment(commentId, 10, 1);
      console.log("REPLIES",res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Get All COmments of post
  const createComment = async (postId:string, comment: string) => {
    try {
        // console.log(backend);
        const res = await backend.createComment(postId, comment);
        console.log(res);
        return res;
    } catch (err) {
        console.error("Error creating post : ", err);
    }
};

  // Get single comment info of a user
  const getUserCommentInfo = async (commentId: string) => {
    try {
      const res = await backend.getSingleComment(commentId) as BackendResponse;
      console.log("commentResponse: ", res);
      return res.data;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Returns
  return { getAllComments, getAllReplies, getUserCommentInfo, createComment };
};

export default CommentsApiHanlder;
