import React from "react";
import { Link } from "react-router-dom";

type Theme = {
  darkColor: string;
  lightColor: string;
};

const NavButtons = (props: Theme) => {
  const [active, setActive] = React.useState("Home");
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "Home__NavButtons";

  return (
    <div
      className={
        className +
        "__navigation" +
        ` gap-12 py-8 flex-row-center justify-center font-normal text-lg bg-${darkColor}`
      }
    >
      <p
        className={`${active === "Home" ? `text-${lightColor}` : "text-grey"}`}
        onClick={() => setActive("Home")}
      >
        Home
      </p>
      <p
        className={`${
          active === "Archive" ? `text-${lightColor}` : "text-grey"
        }`}
        onClick={() => setActive("Archive")}
      >
        Archive
      </p>
      <p
        className={`${
          active === "Dashboard" ? `text-${lightColor}` : "text-grey"
        }`}
        onClick={() => setActive("Dashboard")}
      >
        Dashboard
      </p>
    </div>
  );
};

export default NavButtons;
