import React, { useEffect } from "react";
import "./NavConnectButton.scss";

import { useMediaQuery } from "@mui/material";
import { MdArrowOutward } from "react-icons/md";
import { ConnectButton } from "@connect2ic/react";

const NavConnectButton = () => {
  const is820px = useMediaQuery("(min-width: 820px)");

  useEffect(() => {
    const button = document.querySelector(".connect-button");
    console.log(button);

    if (button && !is820px) {
      button.setAttribute("data-value", "");
    }
  });

  return (
    <ConnectButton>
      <span className="flex-row-center">
        {is820px && "Connect Wallet "}
        <MdArrowOutward className="tablet:text-2xl text-lg" />
      </span>
    </ConnectButton>
  );
};

export default NavConnectButton;
