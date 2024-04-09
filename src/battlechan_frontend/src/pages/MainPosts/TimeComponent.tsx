import React, { useMemo } from "react";

interface TimeDisplayProps {
  time: string;
  type?: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, type }) => {
  return useMemo(
    () => (
      <span
        className={`${type === "archive" ? "text-red" : "text-light-green"}`}
      >
        {type === "archive" ? "0:00 " : `${time} `}
      </span>
    ),
    [time, type]
  );
};

export default TimeDisplay;
