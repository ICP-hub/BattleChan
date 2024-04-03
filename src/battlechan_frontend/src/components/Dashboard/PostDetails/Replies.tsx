import React from "react";

import { TbSquareChevronUpFilled } from "react-icons/tb";
import { TbSquareChevronDownFilled } from "react-icons/tb";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import CommentsApiHanlder from "../../../API_Handlers/comments";

function convertNanosecondsToTimestamp(nanoseconds: bigint): string {
    const milliseconds = Number(nanoseconds) / 1000000; // Convert nanoseconds to milliseconds
    const date = new Date(milliseconds); // Convert milliseconds to a Date object

    // Get the month, day, year, hour, and minute from the Date object
    const month = date.toLocaleString('default', { month: 'short' }); // Short month name (e.g., Jan)
    const day = date.getDate(); // Day of the month (1-31)
    const year = date.getFullYear(); // Full year (e.g., 2023)
    const hour = date.getHours(); // Hour (0-23)
    const minute = date.getMinutes(); // Minute (0-59)
    // Format the timestamp string
    const timestamp = `${month} ${day},${year}; ${hour}:${minute < 10 ? '0' + minute : minute}`;

    return timestamp;
}

interface CommentInfo {
    comment: string;
    commentId: string;
    createdAt: string;
    likedBy: [];
};

interface RepliesProps {
    commentId: string;
  }

interface BackendResponse {
    status: boolean;
    data: [][];
    error: string[];
}

const Replies: React.FC<RepliesProps> = ({ commentId }) => {
    const [vote, setVote] = React.useState(true);
    const handleVote = (vote: boolean) => {
        setVote(vote);
    };
    const { getAllReplies } = CommentsApiHanlder();
    const [commentsData, setcommentsData] = React.useState<CommentInfo[]>([]);


    const getReplies = async () => {
        const response = (await getAllReplies(commentId)) as BackendResponse;
        if (response && response.status == true) {
            const comments = response.data[0];
            if (comments && comments.length > 0) {
                comments.forEach((element: any) => {
                    const timestamp: string = convertNanosecondsToTimestamp(BigInt(element.createdAt));
                    console.log(timestamp);
                    element.createdAt = timestamp;
                });
                setcommentsData(comments);
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {/* comment details */}
            {commentsData.map((comment, index) => (
                <div key={index}>
                    {/* user details */}
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded bg-[url('/src/images/comment-avatar.jpg')] bg-cover bg-no-repeat bg-center"></div>

                        <h1 className="font-semibold">IamCool_1122</h1>
                        <div className="ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
                            {comment.createdAt}
                        </div>
                    </div>

                    {/* comment content */}
                    <div className="dark:text-[#fff] tablet:text-base text-sm dark:text-opacity-50 ml-[62px]">
                        {comment.comment}
                    </div>

                    {/* upvote downvote and reply button */}
                    <div className="flex-row-center gap-10 ml-[62px]">
                        <div className="flex gap-2 text-3xl">
                            <TbSquareChevronUpFilled
                                className={`${vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                                    } cursor-pointer`}
                                onClick={() => handleVote(true)}
                            />

                            <TbSquareChevronDownFilled
                                className={`${!vote ? "text-dirty-light-green" : "text-[#C1C1C1]"
                                    } cursor-pointer`}
                                onClick={() => handleVote(false)}
                            />
                        </div>

                        <div>
                            <button
                                className="flex-row-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 cursor-pointer"
                                type="button"
                            >
                                <PiArrowBendUpRightBold />
                                <span>Reply</span>
                            </button>
                        </div>
                    </div>
{/* 
                    <div>
                        <button className="text-sm ml-[62px]">View replies</button>
                    </div> */}
                </div>
            ))}
        </div>
    );
};

export default Replies;