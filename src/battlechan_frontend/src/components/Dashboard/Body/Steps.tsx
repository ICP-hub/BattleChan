import React from "react";

const Steps = () => {
  const className = "Steps";
  return (
    <div
      className={
        className +
        " " +
        `flex big_tablet:flex-row-center justify-between big_tablet:justify-evenly small_phone:py-8 py-4 px-3 big_tablet:p-10 my-8 mx-4 big_tablet:mx-16  border border-light-green rounded-xl bg-light dark:bg-dark text-xs gap-2 big_tablet:text-lg`
      }
    >
      <div className="flex flex-col gap-4 items-center">
        <span
          className={`hidden big_tablet:inline-block py-2 px-4 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          1
        </span>
        <span>Connect your Wallet.</span>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <span
          className={`hidden big_tablet:inline-block py-2 px-4 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          2
        </span>
        <span>Make Post : Earn Time</span>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <span
          className={`hidden big_tablet:inline-block py-2 px-4 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          3
        </span>
        <span>Cast your vote</span>
      </div>
    </div>
  );
};

export default Steps;
