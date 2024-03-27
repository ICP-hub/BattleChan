import React from "react";
import { Link } from "react-router-dom";


const NavButtons = () => {
  const [active, setActive] = React.useState("Home");
  const className = "Home__NavButtons";

  return (
    <div
      className={
        className +
        "__navigation" +
        ` gap-12 py-8 flex-row-center justify-center font-normal text-lg bg-transparent`
      }
    >
      <p
        className={`${active === "Home" ? `text-dark dark:text-light` : "text-grey"}`}
        onClick={() => setActive("Home")}
      >
        Home
      </p>
      <p
        className={`${
          active === "Archive" ? `text-dark dark:text-light` : "text-grey"
        }`}
        onClick={() => setActive("Archive")}
      >
        Archive
      </p>
      <p
        className={`${
          active === "Dashboard" ? `text-dark dark:text-light` : "text-grey"
        }`}
        onClick={() => setActive("Dashboard")}
      >
        Dashboard
      </p>
    </div>
  );
};

export default NavButtons;
