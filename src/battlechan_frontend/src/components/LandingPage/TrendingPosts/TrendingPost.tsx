import React from "react";

import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";

import bg from "../../../images/trending_post_bg.png";
import Cover_Image from "../../../images/trendingPost_coverImg.png";
import Profile_Pic from "../../../images/trendingPost_profile.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const trendingData = [
  { number: "4k+", title: "Community Members" },
  { number: "200", title: "Active Users" },
  { number: "4h", title: "Average Task Due Date" },
  { number: "$15", title: "Average Reward Per Task" },
];

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
];

const TrendingPost = (props: Theme) => {
  const [votes, setVotes] = React.useState<boolean[]>(
    Array(postList.length).fill(true)
  );
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "LandingPage__TrendingPosts";

  const handleVote = (index: number, vote: boolean) => {
    const newVotes = [...votes];
    newVotes[index] = vote;
    setVotes(newVotes);
  };

  return (
    <div
      className={
        className +
        ` w-full gap-40 pt-48 ${
          darkColor ? "bg-[#121212]" : "light"
        } flex-direction-col bg-contain bg-top bg-no-repeat`
      }
      style={darkColor == "dark" ? { backgroundImage: `url(${bg})` } : {}}
    >
      {/* Trending data counts */}
      <section
        className={className + "__numbers flex-row-center justify-center"}
      >
        {trendingData &&
          trendingData.map((item, index) => (
            <div
              className={`dataCard w-[220px] h-[90px] text-${lightColor} flex-col-center justify-between ${
                index >= 0 && index < trendingData.length - 1
                  ? `border-e-2 border-${lightColor}`
                  : ""
              }`}
            >
              <h1 className={`font-bold text-5xl`}>{item.number}</h1>
              <p className={`text-base font-normal`}>{item.title}</p>
            </div>
          ))}
      </section>

      <section className={className + "__trendingPosts w-full"}>
        <h1 className="font-bold text-5xl text-center">
          This Week Trending Posts
        </h1>
        <br />
        <p className="text-2xl font-normal text-center">
          Stay Ahead with Trending Posts & Explore the Posts Everyone's Talking
          About
        </p>

        {/* Cards block */}
        <div
          className={
            className +
            "__postCards my-20 w-full gap-12 flex-row-center justify-center"
          }
        >
          {/* Card */}
          {postList.slice(0, 3).map((post, index) => (
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
                    <span className="text-md font-semibold">
                      {post.ownerName}
                    </span>
                  </section>

                  {/* Date, Time and ID  */}
                  <section className="flex-direction-row gap-2">
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

export default TrendingPost;
