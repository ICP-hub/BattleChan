import React, { useState, useEffect } from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import PostApiHanlder from "../../../API_Handlers/post";
import postList from "./PostsList";
import Constant from "../../../utils/constants";
import CommentsApiHanlder from "../../../API_Handlers/comments";
import { Link } from "react-router-dom";

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
  commentsCount: number;
};

interface Board {
  boardName: string;
  boardSize: string;
}

interface BackendResponse {
  status: boolean;
  data: Board[][];
  error: string[];
}

interface PostResponse {
  status: boolean;
  data: PostInfo[][];
  error: string[];
}

interface CommentsResponse {
  status: boolean;
  data: [][];
  error: string[];
}

const Post = () => {
  const [votes, setVotes] = React.useState<boolean[]>(
    Array(postList.length).fill(true)
  );
  const [postsData, setPostsData] = useState<PostInfo[]>([]);
  const [boardsData, setBoardsData] = useState<string>("");
  const [activeSelection, setActiveSelection] = useState("Recent");
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentCounts, setCommentsCount] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const { getRecentPosts, getArchivePosts, getBoards } = PostApiHanlder();
  const { convertNanosecondsToTimestamp, convertInt8ToBase64 } = Constant();
  const { getAllComments } = CommentsApiHanlder()
  const className = "LandingPage__TrendingPosts";

  const getAllPostFilter = async () => {
    try {
      const res = await getRecentPosts();
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a fetch call to your backend API
        const response = (await getBoards()) as BackendResponse;
        if (response.status == false) {
          throw new Error("Failed to fetch communities");
        }
        const boards = response.data[0];
        if (boards && boards.length > 0) {
          setBoardsData(boards[0]?.boardName);
        } else {
          console.log("No boards found.");
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchData();
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = (await getAllPostFilter()) as PostResponse;
      console.log("Main Posts Response: ", response);
      if (response.status === true && response.data) {
        // console.log(response);
        const posts = response.data
          .flatMap((nestedArray) => nestedArray)
          .flatMap((element) => {
            if (
              Array.isArray(element) &&
              element.length === 2 &&
              typeof element[1] === "object"
            ) {
              return [element[1]]; // Include only the object part
            }
            return [];
          });
        // console.log(posts);
        // Create an array to store promises for comments count retrieval
        const commentsCountPromises = posts.map(element => getCommentsCounts(element.postId));
        // Wait for all comments count retrieval promises to resolve
        const commentsCounts = await Promise.all(commentsCountPromises);
        posts.forEach((element, index) => {
          // console.log("ele.createdAt", element.createdAt);
          const timestamp = convertNanosecondsToTimestamp(BigInt(element.createdAt));
          // console.log(timestamp);
          element.createdAt = timestamp;
          element.upvotes = Number(element.upvotes);
          // Assign comments count to each post
          element.commentsCount = commentsCounts[index] || 0;
        });
        setPostsData(posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const getCommentsCounts = async (id: string) => {
    const response = (await getAllComments(id)) as CommentsResponse;
    if (response && response.status == true) {
      let data = response.data[0];
      if (data && data.length > 0) {
        console.log(length);
        return data.length;
      }
    }
  };


  const handleVote = (index: number, vote: boolean) => {
    const newVotes = [...votes];
    newVotes[index] = vote;
    setVotes(newVotes);
  };

  return (
    <div
      className={
        className + ` w-full gap-40 flex-direction-col`
      }
    >
      {/* Trending data counts */}

      <section className={className + "__trendingPosts w-full"}>
        {/* Cards block */}
        <div
          className={
            className +
            "__postCards my-20 w-full gap-8 flex flex-wrap px-[100px] justify-center items-start"
          }
        >
          {/* Card */}
          {postsData.map((post, index) => (
            <Link
              key={post.postId}
              to={`/dashboard/postDetails/${encodeURIComponent(post.postId)}?type=archive`}
            >
              <div className="trendingPostCard w-[380px] rounded-lg bg-light text-dark shadow-md shadow-dark">
                {/* Cover Image */}
                <img
                  src={convertInt8ToBase64(post.postMetaData)}
                  alt="Post Cover Image"
                  className="postImage w-full"
                />

                {/* Details */}
                <div className="postData w-full p-6 flex-direction-col gap-4">
                  <div className="top flex-row-center justify-between">
                    {/* Owner Profile Photo and Name */}
                    <section className="owner flex-row-center gap-2">
                      <img
                        src={convertInt8ToBase64(post.createdBy.userProfile)}
                        alt="Profile Image"
                        className="w-[35px]"
                      />
                      <span className="text-[20px] font-semibold">
                        {post.createdBy.userName}
                      </span>
                    </section>

                    {/* Date, Time and ID  */}
                    <section className="flex-direction-row gap-2 text-[15px]">
                      <span className="text-xs">{post.createdAt}</span>
                      <span className="text-xs">{post.postId}</span>
                    </section>
                  </div>

                  <p className="postContent">{post.postDes.length > 70
                    ? `${post.postDes.slice(0, 220)}...`
                    : post.postDes}</p>

                  <div className="bottom flex-row-center justify-between">
                    {/* Upvote and Downvote buttons */}
                    {/* <section className="buttons flex-row-center gap-2 text-3xl">
                    <TbSquareChevronUpFilled
                      className={`${votes[index]
                        ? "text-dirty-light-green"
                        : "text-[#C1C1C1]"
                        } cursor-pointer`}
                      onClick={() => handleVote(index, true)}
                    />

                    <TbSquareChevronDownFilled
                      className={`${!votes[index]
                        ? "text-dirty-light-green"
                        : "text-[#C1C1C1]"
                        } cursor-pointer`}
                      onClick={() => handleVote(index, false)}
                    />
                  </section> */}

                    {/* Total tokens and comments count */}
                    <section className="counts gap-4 flex-direction-row">
                      <span className="timeToken flex-row-center gap-1">
                        <MdOutlineVerifiedUser />
                        {post.upvotes}
                      </span>
                      <span className="comments flex-row-center gap-1">
                        <LiaCommentSolid />
                        {post.commentsCount} Comments
                      </span>
                    </section>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div >
  );
};

export default Post;