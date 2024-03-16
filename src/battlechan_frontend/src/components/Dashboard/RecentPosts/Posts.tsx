import React from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";

import Cover_Image from "../../../images/trendingPost_coverImg.png";
import Profile_Pic from "../../../images/trendingPost_profile.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};


const postList = [
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
  {
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },{
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },{
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },{
    commentCount: "750",
    timeToken: "250k",
    postId: "#12356890",
    coverImg: Cover_Image,
    ownerImage: Profile_Pic,
    ownerName: "Alexander Frem",
    date_and_time: "Oct 29,2023 ; 13:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ",
  },
];

const Post = (props: Theme) => {
  const [votes, setVotes] = React.useState<boolean[]>(
    Array(postList.length).fill(true)
  );
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "LandingPage-->TrendingPosts";

  const handleVote = (index: number, vote: boolean) => {
    const newVotes = [...votes];
    newVotes[index] = vote;
    setVotes(newVotes);
  };

  return (
    <div
      className={
        className + ` w-full gap-40 py-16 bg-${darkColor} flex-direction-col`
      }
    >
      {/* Trending data counts */}
      

      <section className={className + "__trendingPosts w-full"}>
       
        

        {/* Cards block */}
        <div
          className={
            className +
            "__postCards my-20 w-full gap-8 flex flex-wrap px-[100px] justify-center"
          }
        >
          {/* Card */}
          {postList.map((post, index) => (
            <div className="trendingPostCard w-[380px] rounded-lg bg-light text-dark shadow-md shadow-dark">
              {/* Cover Image */}
              <img
                src={post.coverImg}
                alt="Post Cover Image"
                className="postImage w-full"
              />

              {/* Details */}
              <div className="postData w-full p-6 flex-direction-col gap-4">
                <div className="top flex-row-center justify-between">
                  {/* Owner Profile Photo and Name */}
                  <section className="owner flex-row-center gap-2">
                    <img
                      src={post.ownerImage}
                      alt="Profile Image"
                      className="w-[35px]"
                    />
                    <span className="text-[20px] font-semibold">
                      {post.ownerName}
                    </span>
                  </section>

                  {/* Date, Time and ID  */}
                  <section className="flex-direction-row gap-2 text-[15px]">
                    <span className="text-xs">{post.date_and_time}</span>
                    <span className="text-xs">{post.postId}</span>
                  </section>
                </div>

                <p className="postContent">{post.text}</p>

                <div className="bottom flex-row-center justify-between">
                  {/* Upvote and Downvote buttons */}
                  <section className="buttons flex-row-center gap-2 text-3xl">
                    <TbSquareChevronUpFilled
                      className={`${
                        votes[index]
                          ? "text-dirty-light-green"
                          : "text-[#C1C1C1]"
                      } cursor-pointer`}
                      onClick={() => handleVote(index, true)}
                    />

                    <TbSquareChevronDownFilled
                      className={`${
                        !votes[index]
                          ? "text-dirty-light-green"
                          : "text-[#C1C1C1]"
                      } cursor-pointer`}
                      onClick={() => handleVote(index, false)}
                    />
                  </section>

                  {/* Total tokens and comments count */}
                  <section className="counts gap-4 flex-direction-row">
                    <span className="timeToken flex-row-center gap-1">
                      <MdOutlineVerifiedUser />
                      {post.timeToken}
                    </span>
                    <span className="comments flex-row-center gap-1">
                      <LiaCommentSolid />
                      {post.commentCount} Comments
                    </span>
                  </section>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Post;