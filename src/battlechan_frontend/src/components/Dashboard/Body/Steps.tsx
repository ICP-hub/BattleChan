import { ConnectButton } from "@connect2ic/react";
import { Link } from "react-router-dom";

const Steps = () => {
  const className = "Steps";
  return (
    <div
      className={
        className +
        " " +
        `flex big_tablet:flex-row-center justify-between big_tablet:justify-evenly small_phone:py-8 py-4 px-1 big_tablet:p-10 my-8 mx-4 big_tablet:mx-16  border border-light-green rounded-xl bg-light dark:bg-dark small_phone:gap-2 gap-1 big_tablet:text-lg small_phone:text-sm text-xs`
      }
    >
      <div className="w-1/3 flex flex-col gap-4 items-center">
        <p
          className={`small_phone:py-2 py-1 small_phone:px-4 px-2 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          1
        </p>
        <ConnectButton>
          <p className="font-semibold text-center">Connect your Wallet.</p>
        </ConnectButton>
      </div>

      <div className="w-1/3 flex flex-col gap-4 items-center">
        <p
          className={`small_phone:py-2 py-1 small_phone:px-4 px-2 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          2
        </p>
        <Link to="/dashboard/createPost">
          <p className="font-semibold text-center">Make Post : Earn Time.</p>
        </Link>
      </div>
      <div className="w-1/3 flex flex-col gap-4 items-center">
        <p
          className={`small_phone:py-2 py-1 small_phone:px-4 px-2 text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          3
        </p>
        <Link to="/dashboard/mainPosts">
          <p className="font-semibold text-center">Cast your vote.</p>
        </Link>
      </div>
    </div>
  );
};

export default Steps;
