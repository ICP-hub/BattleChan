import React from "react";
import TokensApiHanlder from "../../../API_Handlers/tokens";
import toast from "react-hot-toast";
import PostApiHanlder from "../../../API_Handlers/post";
type Props = {
  display: boolean;
  setProfilePopUp: any;
  postId: string;
  getPosts: (params?: string) => void;
};

interface Response {
  status: boolean;
  err: string;
}

const WithdrawOverlay = (props: Props) => {
  const [amount, setAmount] = React.useState(0);
  const className = "WithdrawOverlay";
  const { withdrawPost } = TokensApiHanlder();
  const { getSingleMainPost } = PostApiHanlder();

  const handleClosePopup = () => {
    props.setProfilePopUp(false);
  };

  const handleWithdrawButton = (amount: number) => {
    withdrawPostFn(amount);
  };

  const withdrawPostFn = async (amount: number) => {
    try {
      const confirmBtn = document.getElementById("confirmBtn");
      if (confirmBtn) {
        confirmBtn.setAttribute("disabled", "true");
        confirmBtn.style.border = "0px";
        confirmBtn.style.pointerEvents = "none"; // Disable pointer events to prevent hover effects
        confirmBtn.innerHTML = "<span class='small_loader'></span>";
      }

      const data = await withdrawPost(props.postId, amount);

      if (data.status === true) {
        const singlePost = await getSingleMainPost(props.postId);
        console.log(singlePost);

        const data = props.getPosts();
        console.log(data);
        toast.success(
          `Successfully Withdrawn ${amount} Tokens from Post: ${props.postId}`
        );
      } else {
        toast.error(data.err);
      }
    } catch (error) {
      console.error("Error withdrawing post:", error);
      toast.error("An error occurred while withdrawing the post.");
    } finally {
      props.setProfilePopUp(false);
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

        <div className="buttons gap-4 flex-row-center justify-center">
          <button
            className="small-button bg-transparent border hover:bg-grey"
            onClick={handleClosePopup}
          >
            Cancel
          </button>
          <button
            id="confirmBtn"
            className="small-button bg-dirty-light-green flex items-center border hover:bg-dark-green"
            onClick={() => handleWithdrawButton(amount)}
          >
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
