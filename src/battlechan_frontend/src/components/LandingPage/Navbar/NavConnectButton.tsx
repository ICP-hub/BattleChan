import React, { useEffect } from "react";
import "./NavConnectButton.scss";

import { useMediaQuery } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";
import { ConnectButton } from "@connect2ic/react";

const NavConnectButton = () => {
  const is780px = useMediaQuery("(min-width: 780px)");

  useEffect(() => {
    const button = document.querySelector(".connect-button");
    console.log(button);

    if (button && !is780px) {
      button.setAttribute("data-value", "");
    }
  });

  return (
    <ConnectButton>
      <span className="flex-row-center">
        {is780px && "Connect Wallet "}
        <MdArrowOutward className="tablet:text-2xl text-lg" />
      </span>
    </ConnectButton>
  );
};

export default NavConnectButton;
