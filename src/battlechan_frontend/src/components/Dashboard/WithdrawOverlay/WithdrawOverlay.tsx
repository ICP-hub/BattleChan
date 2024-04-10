import React from "react";
import TokensApiHanlder from "../../../API_Handlers/tokens";
import toast from "react-hot-toast";

type Props = {
  display: boolean;
  setProfilePopUp: any;
  postId: string;
};

interface Response {
  status: boolean;
  err: string;
};

const WithdrawOverlay = (props: Props) => {
  const className = "WithdrawOverlay";
  const [amount, setAmount] = React.useState(0);
  const { withdrawPost } = TokensApiHanlder();

  const handleClosePopup = () => {
    props.setProfilePopUp(false); // Close the popup
  };

  const handleWithdrawButton = (amount: number) => {
    withdrawPostFn(amount);
  };

  const withdrawPostFn = async (amount: number) => {
    const data = (await withdrawPost(props.postId, amount)) as Response;
    if (data.status == true) {
      toast.success(`Successfully Withdrawn $Time Tokens from Post: ${props.postId}`);
      props.setProfilePopUp(false); // Close the popup
    } else {
      toast.error(data.err);
      props.setProfilePopUp(false); // Close the popup
    }
  };


  return (
    <div
      className={
        className +
        " " +
        `${props.display ? "block" : "hidden"
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
          min={1}
          placeholder="Enter Amount"
          className="rounded-[3rem] p-2 text-dark"
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />

        {/* Buttons */}
        <div className="buttons gap-4 flex-row-center justify-center">
          <button
            className="small-button bg-transparent border hover:bg-grey"
            onClick={handleClosePopup}
          >
            Cancel
          </button>
          <button className="small-button bg-dirty-light-green  border hover:bg-dark-green" onClick={() => handleWithdrawButton(amount)}>
            Confirm
          </button>
        </div>

        <p className="phone:text-sm text-xs italic text-center">
          NOTE: You have to leave at least 5 $TIME tokens in a post when you
          withdraw
        </p>
      </div>
    </div>
  );
};

export default WithdrawOverlay;
