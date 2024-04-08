import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import PostApiHanlder from "./post";

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

interface UserComment {
  commentId: string;
  createdAt: string;
  likedBy: string[];
  comment: string;
  updatedAt: string[];
  replies: { empty: null } | null;
  createdBy: {
    userName: string;
    userProfile: Int8Array;
  };
  postImage: Int8Array;
  postId: string;
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
  upvotes: number;
};

interface PostResponse {
  status: boolean;
  data: PostInfo[]; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
}

const CommentsApiHanlder = () => {
  // Init backend
  const [backend] = useBackend();
  const { getSingleMainPost } = PostApiHanlder();

  // Get All COmments of post
  const getAllComments = async (postId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllCommentOfPost(postId, 10, 1);
      // console.log("allCommentOfPost: ", res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const getAllCommentsOfArchivedPost = async (postId: string) => {
    try {
      // console.log(backend);
      const res = await backend.getAllCommentOfArchivedPost(postId, 10, 1);
      // console.log("allCommentOfArchivedPost: ", res);
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
      // console.log("replies res: ", res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // Get All COmments of post
  const createComment = async (postId: string, comment: string) => {
    try {
      // console.log(backend);
      // console.log("comment data: ", postId, comment)
      const res = await backend.createComment(postId, comment);
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error creating post : ", err);
    }
  };

  const createCommentReply = async (commentId: string, reply: string) => {
    try {
      // console.log(backend);
      // console.log("reply data: ", commentId, reply)
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
      // console.log("HIT", commentId);
      const res = await backend.getSingleComment(commentId) as BackendResponse;
      // console.log("commentResponse: ", res);
      return res.data;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const likeComment = async (postId: string, commentId: string) => {
    try {
      // console.log(backend);
      // console.log("like comment data: ", postId, commentId)
      const res = await backend.likeComment(postId, { upvote: null }, commentId);
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error liking comment : ", err);
    }
  };

  const dislikeComment = async (postId: string, commentId: string) => {
    try {
      // console.log(backend);
      // console.log("dislike comment data: ", postId, commentId)
      const res = await backend.likeComment(postId, { downvote: null }, commentId);
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error disliking comment : ", err);
    }
  };

  // Get User Comments
  const getUserSingleComment = async (commentId: string) => {
    try {
      // console.log(commentId)
      const fetchedComments: UserComment[] = [];
      const fetchedCommentInfo = await getUserCommentInfo(commentId) as UserComment[];
      // console.log(fetchedCommentInfo);
      if (fetchedCommentInfo && fetchedCommentInfo.length > 0) {
        const postId = commentId.split("_")[0];
        // console.log(postId)
        const post = (await getSingleMainPost(postId)) as PostResponse;
        // console.log("post", post);
        if (post) {
          fetchedComments.push({
            ...fetchedCommentInfo[0],
            postImage: post?.data[0]?.postMetaData || undefined,
            postId: postId,
          });
        }
      }
      // console.log("fetchedcomments", fetchedComments);
      return fetchedComments;
    } catch (err) {
      console.error("Error liking comment : ", err);
    }
  };

  // Returns
  return { getAllComments, getAllReplies, getUserCommentInfo, createComment, getAllCommentsOfArchivedPost, createCommentReply, likeComment, dislikeComment, getUserSingleComment};
};

export default CommentsApiHanlder;
