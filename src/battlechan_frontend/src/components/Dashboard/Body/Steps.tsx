import { useConnect, useDialog } from "@connect2ic/react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Steps = () => {
  const className = "Steps";
  const { open } = useDialog();
  const { isConnected } = useConnect();

  const loginHandler = () => {
    open();
  }

  const connectedHnadler = () => {
    toast.success("You're all set! Update your profile and then move on to the next step to create engaging posts and dive into the battle!")
  }

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
          className={`small_phone:py-2 py-1 small_phone:px-4 px-2 cursor-default text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          1
        </p>
        {!isConnected && (
          <p className="font-semibold text-center hover:text-light-green hover:cursor-pointer" onClick={loginHandler}>Connect your Wallet.</p>
        )}
        {isConnected && (
          <p className="font-semibold text-center hover:text-light-green hover:cursor-pointer" onClick={connectedHnadler}>Connect your Wallet.</p>
        )}
      </div>

      <div className="w-1/3 flex flex-col gap-4 items-center">
        <p
          className={`small_phone:py-2 py-1 small_phone:px-4 px-2 cursor-default text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          2
        </p>
        {!isConnected && (
          <p className="font-semibold text-center hover:text-light-green hover:cursor-pointer" onClick={loginHandler}>Make Post : Earn Time.</p>
        )}
        {isConnected && (
          <Link to="/dashboard/createPost">
            <p className="font-semibold text-center hover:text-light-green hover:cursor-pointer">Make Post : Earn Time.</p>
          </Link>
        )}
      </div>
      <div className="w-1/3 flex flex-col gap-4 items-center">
        <p
          className={`small_phone:py-2 py-1 small_phone:px-4 px-2 cursor-default text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
        >
          3
        </p>
        <Link to="/dashboard/mainPosts">
          <p className="font-semibold text-center hover:text-light-green">
            Cast your vote.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Steps;
