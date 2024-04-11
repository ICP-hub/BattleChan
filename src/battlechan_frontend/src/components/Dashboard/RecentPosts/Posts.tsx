import React, { useState, useEffect } from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
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

  const getAllPostFilter = async (selectedBoard: string) => {
    try {
      const res = await getRecentPosts({ ["recent"]: null },
        postsPerPage,
        currentPage,
        selectedBoard);
      
      return res;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = (await getBoards()) as BackendResponse;
        if (response.status == false) {
          throw new Error("Failed to fetch communities");
        }
        const boards = response.data[0];
        if (boards && boards.length > 0) {
          setBoardsData(boards[0]?.boardName);
          setSelectedBoard(boards[0]?.boardName);
        } else {
          
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = (await getAllPostFilter(selectedBoard)) as PostResponse;
      if (response.status === true && response.data) {
        
        const posts = response.data.flat(); 
        
        const commentsCountPromises = posts.map(element => getCommentsCounts(element.postId));
        
        const commentsCounts = await Promise.all(commentsCountPromises);
        posts.forEach((element, index) => {
          
          const timestamp = convertNanosecondsToTimestamp(BigInt(element.createdAt));
          
          element.createdAt = timestamp;
          element.upvotes = Number(element.upvotes);
          
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

      <section className={className + "__trendingPosts w-full"}>
        <div
          className={
            className +
            "__postCards my-20 w-full gap-8 flex flex-wrap px-[100px] justify-center items-start"
          }
        >
          {postsData.map((post, index) => (
            <Link
              key={post.postId}
              to={`/dashboard/postDetails/${encodeURIComponent(post.postId)}?type=archive`}
            >
              <div className="trendingPostCard w-[380px] rounded-lg bg-light text-dark shadow-md shadow-dark">
                <img
                  src={convertInt8ToBase64(post.postMetaData)}
                  alt="Post Cover Image"
                  className="postImage w-full"
                />

                <div className="postData w-full p-6 flex-direction-col gap-4">
                  <div className="top flex-row-center justify-between">
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

                    <section className="flex-direction-row gap-2 text-[15px]">
                      <span className="text-xs">{post.createdAt}</span>
                      <span className="text-xs">{post.postId}</span>
                    </section>
                  </div>

                  <p className="postContent">{post.postDes.length > 70
                    ? `${post.postDes.slice(0, 220)}...`
                    : post.postDes}</p>

                  <div className="bottom flex-row-center justify-between">
                    
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