import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import Constant from "../utils/constants";
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

interface BackendResponseUserInfo {
  status: boolean;
  data: UserInfo[];
  error: string[];
}

interface UserInfo {
  createdAt: string;
  createdComments: any[]; // Define appropriate type for these arrays
  downvotedTo: any[];
  likedComments: any[];
  postIds: string[];
  profileImg: Int8Array;
  replyIds: any[];
  updatedAt: string[];
  upvotedTo: any[];
  userId: string;
  userName: string;
}

interface Profile {
  userName: string;
  profileImg: string;
  profileImg_int8arr: Int8Array;
  status: boolean;
}

interface UserAnalytics {
  likedPost: number;
  postData: number;
  comments: number;
  userArchivedPost: number;
  dislikedPost: number;
  status: boolean;
}

interface UserAnalyticsBackendRes {
  status: boolean;
  data: UserAnalytics[];
  error: string[];
}

interface BackendResponseUserUpvote {
  status: boolean;
  data: DataItem[];
  error: string[];
}

interface DataItem {
  active: {downvotes: string[], upvotes: string[]};
  archived: {downvotes: string[], upvotes: string[]};
}

interface PostUpvoteData {
  postId: string;
  postMetaData: Int8Array;
  userName: string;
}

interface PostResponse {
  status: boolean;
  data: PostInfo[]; // Assuming 'data' is an array of arrays of Board objects.
  error: string[];
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

const UserApiHanlder = () => {
  // Init backend
  const [backend] = useBackend();
  const { convertInt8ToBase64 } = Constant();
  const { getSingleMainPost, getSingleArchivePost } = PostApiHanlder();
  // Register User
  const registerUser = async (
    userName: string,
    profileImg: Int8Array | undefined
  ) => {
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
  const updateUser = async (
    userName: string,
    profileImg: Int8Array | undefined
  ) => {
    try {
      const data = {
        userName: userName,
        profileImg: profileImg,
      };
      // console.log(data);
      const res = await backend.updatedUserAccount(data);
      // console.log("res", res);
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
      // console.log("data", response);
      return response;
    } catch (err) {
      console.error("Error creating contact : ", err);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = (await backend.getUserInfo()) as BackendResponseUserInfo;
      // console.log("getUserInfo res.data: ", response.data)
      return response.data;
    } catch (err) {
      console.error("Error getting user info: ", err);
    }
  };

  const getPostInfo = async (postId: string) => {
    try {
      const response = (await backend.getPostInfo(postId)) as BackendResponse;
      // console.log("post response: ", response.data)
      return response.data;
    } catch (err) {
      console.error("Error getting user info: ", err);
    }
  };

  const getProfileData = async () => {
    try {
      let res = {
        userName: "",
        profileImg: "",
        profileImg_int8arr: new Int8Array(),
        status: false,
      } as Profile;
      const response = (await backend.getUserInfo()) as BackendResponseUserInfo;
      if (response && response.status !== false) {
        const userDataArray: UserInfo[] = response.data;
        res.userName = userDataArray[0]?.userName;
        res.profileImg = convertInt8ToBase64(userDataArray[0]?.profileImg);
        res.profileImg_int8arr = userDataArray[0]?.profileImg;
        res.status = true;
      }
      // console.log("getUserInfo res.data: ", response.data)
      return res;
    } catch (err) {
      console.error("Error getting user info: ", err);
      return undefined;
    }
  };

  // Get User Analytics for Dashboard Page
  const getUserAnalytics = async () => {
    try {
      let res = {
        postData: 0,
        userArchivedPost: 0,
        comments: 0,
        likedPost: 0,
        dislikedPost: 0,
        status: false,
      } as UserAnalytics;
      const response =
        (await backend.getUserTotalCounts()) as UserAnalyticsBackendRes;
      if (response && response.status !== false) {
        console.log(response);
        res.postData = Number(response?.data[0]?.postData);
        res.userArchivedPost = Number(response?.data[0]?.userArchivedPost);
        res.comments = Number(response?.data[0]?.comments);
        res.likedPost = Number(response?.data[0]?.likedPost);
        res.dislikedPost = Number(response?.data[0]?.dislikedPost);
        res.status = true;
      }
      // console.log("getUserInfo res.data: ", response.data)
      return res;
    } catch (err) {
      console.error("Error getting user info: ", err);
      return undefined;
    }
  };

  const votesOfUser = async () => {
    try {
      const response =
        (await backend.votesOfUser()) as BackendResponseUserUpvote;
      let activePostUpvoteData: string[] = [];
      let archivedPostUpvoteData: string[] = [];
      let activePostDownvoteData: string[] = [];
      let archivedPostDownvoteData: string[] = [];
      let userArchivedPostUpvote: PostUpvoteData[] = [];
      let userActivePostUpvote: PostUpvoteData[] = [];
      let userArchivedPostDownvote: PostUpvoteData[] = [];
      let userActivePostDownvote: PostUpvoteData[] = [];

      if (response) {
        console.log("votes response: ", response)
        activePostUpvoteData = [...response.data[0].active.upvotes];
        archivedPostUpvoteData = [...response.data[0].archived.upvotes];
        activePostDownvoteData = [...response.data[0].active.downvotes];
        archivedPostDownvoteData = [...response.data[0].archived.downvotes];

        if (archivedPostDownvoteData && archivedPostDownvoteData.length > 0) {
          // console.log(archivedPostCommentData);
          for (const postId of archivedPostDownvoteData) {
            const singlePost = (await getSingleArchivePost(
              postId
            )) as PostResponse;
            // console.log("singlePost: ", singlePost.data[0].postMetaData)
            // console.log("single Post: ", singlePost)

            userArchivedPostDownvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }
        if (activePostDownvoteData && activePostDownvoteData.length > 0) {
          // console.log(activePostCommentData);
          for (const postId of activePostDownvoteData) {
            // const postId = comment[0].split("_")[0];
            const singlePost = (await getSingleMainPost(
              postId
            )) as PostResponse;
            // console.log("singlePost: ", singlePost.data[0].postMetaData)
            userActivePostDownvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }
        if (archivedPostUpvoteData && archivedPostUpvoteData.length > 0) {
          // console.log(archivedPostCommentData);
          for (const postId of archivedPostUpvoteData) {
            const singlePost = (await getSingleArchivePost(
              postId
            )) as PostResponse;
            // console.log("singlePost: ", singlePost.data[0].postMetaData)
            // console.log("single Post: ", singlePost)

            userArchivedPostUpvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }
        if (activePostUpvoteData && activePostUpvoteData.length > 0) {
          // console.log(activePostCommentData);
          for (const postId of activePostUpvoteData) {
            // const postId = comment[0].split("_")[0];
            const singlePost = (await getSingleMainPost(
              postId
            )) as PostResponse;
            // console.log("singlePost: ", singlePost.data[0].postMetaData)
            userActivePostUpvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }

        return {upvotes: [...userActivePostUpvote, ...userArchivedPostUpvote], downvotes: [...userActivePostDownvote, ...userArchivedPostDownvote]};
      }
      // console.log("votes of user res.data: ", response.data)
    } catch (err) {
      console.error("Error getting user info: ", err);
      return undefined;
    }
  };

  // Returns
  return {
    registerUser,
    isUserRegistered,
    updateUser,
    getUserInfo,
    getPostInfo,
    getProfileData,
    getUserAnalytics,
    votesOfUser,
  };
};

export default UserApiHanlder;
