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

const CommentsApiHanlder = () => {
  // Init backend
  const [backend] = useBackend();

  // Get All COmments of post
  const getAllComments = async (postId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllCommentOfPost(postId, 10, 1);
      console.log(res);
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
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Returns
  return { getAllComments, getAllReplies };
};

export default CommentsApiHanlder;
