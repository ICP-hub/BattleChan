import React, { useEffect } from "react";
import "./NavConnectButton.scss";

import { useMediaQuery } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";
import { ConnectButton, useDialog } from "@connect2ic/react";
// import { ConnectDialog, useConnect, useDialog } from "@connect2ic/react"

const NavConnectButton = () => {
  const is820px = useMediaQuery("(min-width: 820px)");
  // const { open } = useDialog();

  // const loginHandler = () => {
  //   console.log("LOGIN");
  //   open();
  // }

  useEffect(() => {
    const button = document.querySelector(".connect-button");

    if (button && !is820px) {
      button.setAttribute("data-value", "");
    }
  });

  return (
    <ConnectButton>
      <span className="flex-row-center text-light">
        {is820px && "Connect Wallet "}
        <MdArrowOutward className="tablet:text-2xl text-lg" />
      </span>
    </ConnectButton>
  );
};

export default NavConnectButton;
