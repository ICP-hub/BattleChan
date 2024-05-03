import React, { useEffect, useState } from "react";
import PostApiHanlder from "../../API_Handlers/post";

interface TimeDisplayProps {
  id: string;
  expireAt: BigInt;
  type: string;
}

const TimeComponent: React.FC<TimeDisplayProps> = ({ id, expireAt, type }) => {
  const [time, setTime] = useState("0:00");
  const { archivePost } = PostApiHanlder();

  const formatTime = (remainingTime: bigint) => {
    const seconds = Math.floor(Number(remainingTime) / 1e9);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const archive = async () => {
    const response = (await archivePost(id)) as Response;
    if (response && response?.ok) {
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = BigInt(Date.now()) * BigInt(1000000);
      const remainingTime = Number(expireAt) - Number(currentTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime("0:00");
        if(type !== "archive"){
          archive();
        }
      } else {
        setTime(formatTime(BigInt(remainingTime)));
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
