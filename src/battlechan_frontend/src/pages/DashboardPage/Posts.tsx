import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Constant from "../../utils/constants";
import UserApiHanlder from "../../API_Handlers/user";
import PostApiHanlder from "../../API_Handlers/post";
import TimeComponent from "../MainPosts/TimeComponent";

type TdTagProps = {
  para: any;
};

interface PostData {
  postId: string;
  postMetaData: Int8Array;
  postName: string;
  upvotedBy: [];
  expireAt: BigInt;
  createdAt: string;
}

interface PostResponse {
  status: boolean;
  data: PostData[][];
  error: string[];
}

const Posts = () => {
  const className = "dashboard__postData";
  const padding =
    "tablet:py-4 py-2 xl:px-52 laptop:px-40 big_tablet:px-32 tablet:px-12 phone:px-8 px-4";

  const [postData, setPostData] = useState<PostData[]>([]);
  const { getUsersMainPosts } = PostApiHanlder();
  const { convertNanosecondsToTimestamp } = Constant();
  const fontSize = "tablet:text-base phone:text-sm text-xs";

  useEffect(() => {
    const fetchData = async () => {
      const response = (await getUsersMainPosts()) as PostResponse;
      if (response.status == true && response.data.length > 0) {
        const posts = response.data.flat();
        setPostData(posts);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <header
        className={
          className +
          " " +
          padding +
          " " +
          "flex items-center justify-between font-sans text-base"
        }
      >
        <h1 className="tablet:text-2xl text-lg font-bold dark:text-[#fff]">
          Popular
        </h1>
      </header>

      <div
        className={
          className +
          "__table " +
          padding +
          " " +
          fontSize +
          " " +
          "w-full phone:mb-8 mb-4"
        }
      >
        <table className="w-full bg-dirty-light-green text-light rounded-lg">
          {tableHeading.map((name, i) => (
            <thead className="border-b" key={i}>
              <ThTag para={name.id} />
              <ThTag para={name.date_time} />
              <ThTag para={name.votes} />
              <ThTag para={name.time} />
            </thead>
          ))}

          <tbody>
            {postData.map((post, i) => (
              <tr key={post.postId}>
                <TdTag para={post.postId} />
                <TdTag
                  para={convertNanosecondsToTimestamp(BigInt(post.createdAt))}
                />
                <TdTag para={post.upvotedBy.length} />
                <TdTag
                  para={
                    <TimeComponent expireAt={post.expireAt} id={post.postId} type={""} />
                  }
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Posts;

const TdTag: React.FC<TdTagProps> = ({ para }) => {
  return <td className="tablet:py-5 py-3 text-center">{para}</td>;
};

const ThTag: React.FC<TdTagProps> = ({ para }) => {
  return <th className="tablet:py-5 py-3 text-center">{para}</th>;
};

const tableHeading = [
  {
    id: "Post ID",
    date_time: "Date and Time",
    votes: "Total Votes",
    time: "Time Left",
  },
];
const tableData = [
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
];
