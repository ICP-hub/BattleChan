import { useEffect } from "react";
import "./NavConnectButton.scss";

import { useMediaQuery } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";
import { useConnect, useDialog, ConnectDialog } from "@connect2ic/react";
import toast from "react-hot-toast";

const NavConnectButton = () => {
  const is820px = useMediaQuery("(min-width: 820px)");
  const { open } = useDialog();
  const { isConnected, disconnect } = useConnect();

  const loginHandler = () => {
    open();
  };

  const logoutHandler = () => {
    disconnect()
    toast.success("Logout successfully.")
  };

  useEffect(() => {
    const button = document.querySelector(".connect-button");

    if (button && !is820px) {
      button.setAttribute("data-value", "");
    }
  });

  return (
    <div>
      {!isConnected && (
        <span className="flex-row-center text-light" onClick={loginHandler}>
          {is820px && "Connect Wallet"}
          <MdArrowOutward className="tablet:text-2xl text-lg" />
        </span>
      )}

      {isConnected && (
        <span className="flex-row-center text-light" onClick={logoutHandler}>
          {is820px && "Disconnect"}
          <MdArrowOutward className="tablet:text-2xl text-lg" />
        </span>
      )}

      <ConnectDialog />
    </div>
  );
};

export default NavConnectButton;
