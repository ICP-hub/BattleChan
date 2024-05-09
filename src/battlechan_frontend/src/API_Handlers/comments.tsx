import { useCanister } from "@connect2ic/react";
import PostApiHanlder from "./post";


const useBackend = () => {
  return useCanister("backend");
};

interface BackendResponse {
  status: boolean;
  data: [];
  error: string[];
}
interface BackendResponseUserComment {
  status: boolean;
  data: DataItem[];
  error: string[];
}

interface DataItem {
  active: CommentItem[];
  archived: CommentItem[];
}

interface CommentItem {
  0: string;
  1: UserComment;
}

interface AllUserComment {
  commentId: string;
  postMetaData: Int8Array;
  userProfile: Int8Array;
  likedBy: string[];
  comment: string;
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
  data: PostInfo[];
  error: string[];
}

type RewardsData = {
  claimedStatus?: boolean;
  likes?: bigint;
  amount?: bigint;
  postId?: string;
  status?: boolean;
  error?: string;
};

interface RewardsResponse {
  status: boolean;
  data: RewardsData[];
  error: string[];
}

interface ClaimResponse {
  ok: string;
  Ok: string;
  err: {
    [key: string]: string;
  };
  status?: boolean;
  msg?: string;
}

const CommentsApiHanlder = () => {

  const [backend] = useBackend();
  const { getSingleMainPost, getSingleArchivePost } = PostApiHanlder();


  const getAllComments = async (postId: string) => {
    try {
      const res = await backend.getAllCommentOfPost(postId, 10, 1);

      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const getAllCommentsOfArchivedPost = async (postId: string) => {
    try {
      const res = await backend.getAllCommentOfArchivedPost(postId, 10, 1);

      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const getAllReplies = async (commentId: string) => {
    try {
      const res = await backend.getAllRepliesofComment(commentId, 10, 1);

      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const createComment = async (postId: string, comment: string) => {
    try {
      const res = await backend.createComment(postId, comment);

      return res;
    } catch (err) {
      console.error("Error creating post : ", err);
    }
  };

  const createCommentReply = async (commentId: string, reply: string) => {
    try {
      const res = await backend.createCommentReply(commentId, reply);

      return res;
    } catch (err) {
      console.error("Error creating post : ", err);
    }
  };

  const getUserCommentInfo = async (commentId: string) => {
    try {
      const res = (await backend.getSingleComment(
        commentId
      )) as BackendResponse;

      return res.data;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const likeComment = async (postId: string, commentId: string) => {
    try {
      const res = await backend.likeComment(
        postId,
        { upvote: null },
        commentId
      );

      return res;
    } catch (err) {
      console.error("Error liking comment : ", err);
    }
  };

  const likeCommentReply = async (commentId: string, replyId: string) => {
    try {
      const res = await backend.likeCommentReply(
        commentId,
        { upvote: null },
        replyId
      );

      return res;
    } catch (err) {
      console.error("Error liking comment reply : ", err);
    }
  };

  const dislikeComment = async (postId: string, commentId: string) => {
    try {
      const res = await backend.likeComment(
        postId,
        { downvote: null },
        commentId
      );

      return res;
    } catch (err) {
      console.error("Error disliking comment : ", err);
    }
  };

  const getUserSingleComment = async (commentId: string) => {
    try {

      const fetchedComments: UserComment[] = [];
      const fetchedCommentInfo = (await getUserCommentInfo(
        commentId
      )) as UserComment[];

      if (fetchedCommentInfo && fetchedCommentInfo.length > 0) {
        const postId = commentId.split("_")[0];

        const post = (await getSingleMainPost(postId)) as PostResponse;

        if (post) {
          fetchedComments.push({
            ...fetchedCommentInfo[0],
            postImage: post?.data[0]?.postMetaData || undefined,
            postId: postId,
          });
        }
      }

      return fetchedComments;
    } catch (err) {
      console.error("Error liking comment : ", err);
    }
  };

  const getAllCommentOfUser = async () => {
    try {

      const response =
        (await backend.getAllCommentOfUser()) as BackendResponseUserComment;

      let activePostCommentData: CommentItem[] = [];
      let archivedPostCommentData: CommentItem[] = [];
      let userArchivedComments: AllUserComment[] = [];
      let userActiveComments: AllUserComment[] = [];

      if (response) {

        activePostCommentData = [...response.data[0].active];
        archivedPostCommentData = [...response.data[0].archived];

        if (archivedPostCommentData && archivedPostCommentData.length > 0) {

          for (const comment of archivedPostCommentData) {
            const postId = comment[0].split("_")[0];
            const singlePost = (await getSingleArchivePost(
              postId
            )) as PostResponse;



            userArchivedComments.push({
              commentId: comment[0],
              postMetaData: singlePost.data[0].postMetaData,
              comment: comment[1].comment,
              userProfile: comment[1].createdBy.userProfile,
              likedBy: comment[1].likedBy,
            });
          }
        }
        if (activePostCommentData && activePostCommentData.length > 0) {

          for (const comment of activePostCommentData) {
            const postId = comment[0].split("_")[0];
            const singlePost = (await getSingleMainPost(
              postId
            )) as PostResponse;

            userActiveComments.push({
              commentId: comment[0],
              postMetaData: singlePost.data[0].postMetaData,
              comment: comment[1].comment,
              userProfile: comment[1].createdBy.userProfile,
              likedBy: comment[1].likedBy,
            });
          }
        }
        return [...userActiveComments, ...userArchivedComments];
      }
    } catch (err) {
      console.error("Error liking comment : ", err);
    }
  };

  const getRewardsOfUser = async () => {
    let rewards = [];
    try {
      const response = (await backend.listCommentersReward()) as RewardsResponse;
      console.log("claim res", response);

      // let obj: RewardsResponse = {
      //   status: true,
      //   data:
      //     [
      //       {
      //         amount: 25000000n,
      //         claimedStatus: false,
      //         likes: 4n,
      //         postId: "#3512677225"
      //       }
      //     ],
      //   error: [""]
      // };

      if (response && response.status == true) {
        if (response.data[0]) {
          let data = response.data[0];

          rewards.push({
            amount: (Number(data?.amount) / Math.pow(10, 8)),
            claimedStatus: data?.claimedStatus,
            likes: Number(data?.likes),
            postId: data?.postId,
            status: true,
          })
        } else {
          const lastIndex = response?.error[1].lastIndexOf(":");
          const errorMsg = response?.error[1].slice(lastIndex + 2);
          rewards.push({
            status: false,
            error: errorMsg
          });
        }
      } else {
        rewards.push({
          status: false,
          error: response.error[0]
        });
      }

      // rewards.push({
      //   amount: 1.5,
      //   claimedStatus: true,
      //   likes: 0,
      //   postId: "#1234567",
      //   status: true
      // },{
      //   amount: 1.5,
      //   claimedStatus: false,
      //   likes: 0,
      //   postId: "#53764342",
      //   status: true
      // },{
      //   amount: 1.5,
      //   claimedStatus: false,
      //   likes: 0,
      //   postId: "#78786876",
      //   status: true
      // },);
      console.log("rewards", rewards);
      return rewards;
    } catch (err) {
      if (err instanceof Error) {
        const lastIndex = err.message.lastIndexOf(":");
        const errorMsg = err.message.slice(lastIndex + 2);
        rewards.push({
          status: false,
          error: errorMsg
        });
        return rewards;
      } else {
        let errorMsg = "Error: Something went wrong, Please try again later!";
        rewards.push({
          status: false,
          error: errorMsg
        });
        console.error("Error: ", err);
        return rewards;
      }
    }
  };

  const claimReward = async (postId: string) => {
    let result = { status: false } as ClaimResponse;
    try {
      console.log(postId)
      const response = (await backend.claimReward(postId)) as ClaimResponse;
      if (response?.Ok || response?.ok) {
        result.status = true;
      } else {
        result.status = false;
        const lastIndex = response.err[1].lastIndexOf(":");
        const errorMsg = response.err[1].slice(lastIndex + 2);
        result.msg = errorMsg;
      }
      console.log("claim", response);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        const lastIndex = err.message.lastIndexOf(":");
        const errorMsg = err.message.slice(lastIndex + 2);
        result.status = false;
        result.msg = errorMsg;

        return result;
      } else {
        let errorMsg = "Error: Something went wrong, Please try again later!";
        result.status = false;
        result.msg = errorMsg;

        console.error("Error: ", err);
        return result;
      }
    }
  };


  return {
    getAllComments,
    getAllReplies,
    getUserCommentInfo,
    createComment,
    getAllCommentsOfArchivedPost,
    createCommentReply,
    likeComment,
    dislikeComment,
    getUserSingleComment,
    likeCommentReply,
    getAllCommentOfUser,
    getRewardsOfUser,
    claimReward
  };
};

export default CommentsApiHanlder;
