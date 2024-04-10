import { ConnectButton } from "@connect2ic/react";
import React from "react";
import { Link } from "react-router-dom";

const Steps = () => {
  const className = "Steps";
  return (
    <div
      className={
        className +
        " " +
        `flex big_tablet:flex-row-center justify-between big_tablet:justify-evenly small_phone:py-8 py-4 px-3 big_tablet:p-10 my-8 mx-4 big_tablet:mx-16  border border-light-green rounded-xl bg-light dark:bg-dark gap-2 big_tablet:text-lg small_phone:text-sm text-xs`
      }
    >
      <div className="flex flex-col gap-4 items-center">
        <span
          className={`hidden tablet:inline-block py-2 px-4 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          1
        </span>
        <ConnectButton>
          <span className="font-semibold">Connect your Wallet.</span>
        </ConnectButton>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <span
          className={`hidden tablet:inline-block py-2 px-4 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          2
        </span>
        <Link to="/dasboard/createPost">
          <span className="font-semibold">Make Post : Earn Time.</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <span
          className={`hidden tablet:inline-block py-2 px-4 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          3
        </span>
        <Link to="/dashboard/mainPosts">
          <span className="font-semibold">Cast your vote.</span>
        </Link>
      </div>
    </div>
  );
};

export default Steps;
