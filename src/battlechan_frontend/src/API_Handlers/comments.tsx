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

  const getAllCommentsOfArchivedPost = async (postId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllCommentOfArchivedPost(postId, 10, 1);
      console.log("allCommentOfArchivedPost: ", res);
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
      console.log("replies res: ", res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Get All COmments of post
  const createComment = async (postId:string, comment: string) => {
    try {
        // console.log(backend);
        console.log("comment data: ", postId, comment)
        const res = await backend.createComment(postId, comment);
        console.log(res);
        return res;
    } catch (err) {
        console.error("Error creating post : ", err);
    }
};

  const createCommentReply = async (commentId:string, reply: string) => {
    try {
        // console.log(backend);
        console.log("reply data: ", commentId, reply)
        const res = await backend.createCommentReply(commentId, reply);
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

  const likeComment = async (postId:string, commentId: string) => {
    try {
        // console.log(backend);
        console.log("like comment data: ", postId, commentId)
        const res = await backend.likeComment(postId, commentId);
        console.log(res);
        return res;
    } catch (err) {
        console.error("Error liking comment : ", err);
    }
};

  // Returns
  return { getAllComments, getAllReplies, getUserCommentInfo, createComment, getAllCommentsOfArchivedPost, createCommentReply, likeComment };
};

export default CommentsApiHanlder;
