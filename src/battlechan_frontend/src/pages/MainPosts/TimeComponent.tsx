import React, { useEffect, useMemo, useState } from "react";
import PostApiHanlder from "../../API_Handlers/post";

interface TimeDisplayProps {
  id: string;
  expireAt: BigInt;
}

const TimeComponent: React.FC<TimeDisplayProps> = ({ id, expireAt }) => {
  const [time, setTime] = useState("0:00");
  const { archivePost } = PostApiHanlder();
  // console.log("id, expireat: ", id, expireAt)

  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9); // Convert remaining time from nanoseconds to seconds
    const minutes = Math.floor(seconds / 60); // Get remaining minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds
    // console.log(`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const archive = async () => {
    const response = (await archivePost(id)) as Response;
    if (response && response?.ok) {
      // console.log("POST ARCHIVED!");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = BigInt(Date.now()) * BigInt(1000000); // Current time in nanoseconds
      const remainingTime = Number(expireAt) - Number(currentTime); // Convert BigInt to bigint for arithmetic

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime("0:00");
        archive();
        // console.log("Post archived");
      } else {
        setTime(formatTime(BigInt(remainingTime))); // Convert back to BigInt for formatting
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]);

  return (
    <span className={`${time === "0:00" ? "text-red" : "text-light-green"}`}>
      {time}
    </span>
  );
};

export default TimeComponent;
