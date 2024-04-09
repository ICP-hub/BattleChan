import React from "react";

type Props = {
  display: boolean;
  setProfilePopUp: any;
};

const WithdrawOverlay = (props: Props) => {
  const className = "WithdrawOverlay";

  const handleClosePopup = () => {
    props.setProfilePopUp(false); // Close the popup
  };

  return (
    <div
      className={
        className +
        " " +
        `${
          props.display ? "block" : "hidden"
        } z-20 fixed top-0 left-0 w-full h-full bg-black backdrop-blur-md flex items-center justify-center`
      }
      onClick={handleClosePopup}
    >
      <div
        className={
          className +
          "__container" +
          " tablet:w-[400px] phone:w-[60vw] w-[70vw] p-4 flex flex-col gap-4 bg-dirty-light-green text-light rounded-lg"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <header className="text-center">Withdraw $TIME</header>

        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          className="rounded-[3rem] p-2 text-dark"
        />

        {/* Buttons */}
        <div className="buttons gap-4 flex-row-center justify-center">
          <button className="small-button bg-transparent border hover:bg-grey">
            Cancel
          </button>
          <button className="small-button bg-dirty-light-green  border hover:bg-dark-green">
            Confirm
          </button>
        </div>

        <p className="phone:text-sm text-xs italic text-center">
          NOTE: You have to leave at least 5 $TIME tokens in a post when you withdraw
        </p>
      </div>
    </div>
  );
};

export default WithdrawOverlay;
