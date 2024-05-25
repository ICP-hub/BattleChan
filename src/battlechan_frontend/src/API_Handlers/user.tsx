import { useCanister } from "@connect2ic/react";
import Constant from "../utils/constants";
import PostApiHanlder from "./post";
// import { Principal } from "@dfinity/principal";
import { Principal } from "@dfinity/candid/lib/cjs/idl";
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
  createdComments: any[]; 
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
  data: PostInfo[]; 
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
  
  const [backend] = useBackend();
  const { convertInt8ToBase64 } = Constant();
  const { getSingleMainPost, getSingleArchivePost } = PostApiHanlder();
  
  const registerUser = async (
    userName: string,
    profileImg: Int8Array | undefined
  ) => {
    try {
      
      const data = {
        userName: userName,
        profileImg: profileImg,
      };
      
      const res = await backend.createUserAccount(data);
      
      return res;
    } catch (err) {
      console.error("Error registering user: ", err);
    }
  };

  
  const updateUser = async (
    userName: string,
    profileImg: Int8Array | undefined
  ) => {
    try {
      const data = {
        userName: userName,
        profileImg: profileImg,
      };
      
      const res = await backend.updatedUserAccount(data);
      
      
      return res;
    } catch (err) {
      console.error("Error updating user info : ", err);
    }
  };

  
  const isUserRegistered = async () => {
    try {
      const response = (await backend.getUserInfo()) as BackendResponse;
      
      return response;
    } catch (err) {
      console.error("Error creating contact : ", err);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = (await backend.getUserInfo()) as BackendResponseUserInfo;
      
      return response.data;
    } catch (err) {
      console.error("Error getting user info: ", err);
    }
  };

  const getPostInfo = async (postId: string) => {
    try {
      const response = (await backend.getPostInfo(postId)) as BackendResponse;
      
      return response.data;
    } catch (err) {
      console.error("Error getting user info: ", err);
    }
  };

  const getProfileData = async () => {
    let res = {
      userName: "",
      profileImg: "",
      profileImg_int8arr: new Int8Array(),
      status: false,
    } as Profile;
    try {
      const result = await backend.getUserInfo() as any;
      console.log(Principal.valueToString(result.data[0]?.userId));

      const response = (await backend.getUserInfo()) as BackendResponseUserInfo;
      // console.log(response);
      if (response && response.status !== false) {
        const userDataArray: UserInfo[] = response.data;
        res.userName = userDataArray[0]?.userName;
        res.profileImg = convertInt8ToBase64(userDataArray[0]?.profileImg);
        res.profileImg_int8arr = userDataArray[0]?.profileImg;
        res.status = true;
      }
      // console.log(res);
      return res;
    } catch (err) {
      console.error("Error getting user info: ", err);
      res.status = false;
      return res;
    }
  };

  
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
        
        res.postData = Number(response?.data[0]?.postData);
        res.userArchivedPost = Number(response?.data[0]?.userArchivedPost);
        res.comments = Number(response?.data[0]?.comments);
        res.likedPost = Number(response?.data[0]?.likedPost);
        res.dislikedPost = Number(response?.data[0]?.dislikedPost);
        res.status = true;
      }
      
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
        
        activePostUpvoteData = [...response.data[0].active.upvotes];
        archivedPostUpvoteData = [...response.data[0].archived.upvotes];
        activePostDownvoteData = [...response.data[0].active.downvotes];
        archivedPostDownvoteData = [...response.data[0].archived.downvotes];

        if (archivedPostDownvoteData && archivedPostDownvoteData.length > 0) {
          
          for (const postId of archivedPostDownvoteData) {
            const singlePost = (await getSingleArchivePost(
              postId
            )) as PostResponse;
            
            

            userArchivedPostDownvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }
        if (activePostDownvoteData && activePostDownvoteData.length > 0) {
          
          for (const postId of activePostDownvoteData) {
            
            const singlePost = (await getSingleMainPost(
              postId
            )) as PostResponse;
            
            userActivePostDownvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }
        if (archivedPostUpvoteData && archivedPostUpvoteData.length > 0) {
          
          for (const postId of archivedPostUpvoteData) {
            const singlePost = (await getSingleArchivePost(
              postId
            )) as PostResponse;
            
            

            userArchivedPostUpvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }
        if (activePostUpvoteData && activePostUpvoteData.length > 0) {
          
          for (const postId of activePostUpvoteData) {
            
            const singlePost = (await getSingleMainPost(
              postId
            )) as PostResponse;
            
            userActivePostUpvote.push({
              postId: postId,
              postMetaData: singlePost.data[0].postMetaData,
              userName: singlePost.data[0].createdBy.userName,
            });
          }
        }

        return {upvotes: [...userActivePostUpvote, ...userArchivedPostUpvote], downvotes: [...userActivePostDownvote, ...userArchivedPostDownvote]};
      }
      
    } catch (err) {
      console.error("Error getting user info: ", err);
      return undefined;
    }
  };

  
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
