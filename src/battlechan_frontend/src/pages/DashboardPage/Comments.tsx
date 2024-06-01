import React, { useEffect, useState } from "react";
import CommentsApiHanlder from "../../API_Handlers/comments";

type TdTagProps = {
  para: string;
};

interface AllUserComment {
  commentId: string;
  postMetaData: Int8Array;
  userProfile: Int8Array;
  likedBy: string[];
  comment: string;
}

const Comments = () => {
  const className = "dashboard__comments";
  const padding =
    "tablet:py-4 py-2 xl:px-52 laptop:px-40 big_tablet:px-32 tablet:px-12 phone:px-8 px-4";
  const fontSize = "tablet:text-base phone:text-sm text-xs";
  const { getAllCommentOfUser } = CommentsApiHanlder();
  const [commentData, setCommentData] = useState<AllUserComment[]>([]);

  useEffect(() => {
    const getUserComments = async () => {
      const userComments = (await getAllCommentOfUser()) as AllUserComment[];
      setCommentData(userComments);
    };
    getUserComments();
  }, []);

  return (
    <React.Fragment>
      <header
        className={
          className +
          " " +
          padding +
          " " +
          "flex flex-col justify-between font-sans text-base"
        }
      >
        <h1 className="tablet:text-2xl text-lg font-bold dark:text-[#fff]">
          Comments
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
          "w-full tablet:mb-8 phone:mb-4"
        }
      >
        <table className="w-full bg-dirty-light-green text-light rounded-lg">
          {tableHeadingComment.map((name, i) => (
            <thead className="border-b" key={i}>
              <ThTag para={name.id} />
              <ThTag para={name.date_time} />
              <ThTag para={name.votes} />
            </thead>
          ))}

          <tbody>
            {commentData &&
              commentData.length > 0 &&
              commentData.map((comment) => (
                <>
                  <tr key={comment.commentId}>
                    <TdTag para={comment.commentId} />
                    <TdTag
                      para={
                        comment.comment.length > 70
                          ? `${comment.comment.slice(0, 70)}...`
                          : comment.comment
                      }
                    />
                    <TdTag para={String(comment.likedBy.length)} />
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Comments;

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
  },
];

const tableHeadingComment = [
  {
    id: "Comment ID",
    date_time: "Comment",
    votes: "Total Votes",
  },
];

const tableData = [
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
  },
];
