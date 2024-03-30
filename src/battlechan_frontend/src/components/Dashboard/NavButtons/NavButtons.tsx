import React from "react";
import { Link } from "react-router-dom";

const NavButtons = () => {
  const [active, setActive] = React.useState("Dashboard");
  const className = "Home__NavButtons";

  return (
    <div
      className={
        className +
        "__navigation" +
        ` gap-12 py-8 flex-row-center justify-center font-normal tablet:text-lg text-1xl bg-transparent`
      }
    >
      <Link to="/dashboard/mainPosts">
        <button
          className={`${
            active === "Home" ? `text-dark dark:text-light` : "text-grey"
          }`}
          onMouseEnter={() => setActive("Home")}
        >
          Home
        </button>
      </Link>

      <Link to="/dashboard/archivePosts">
        <button
          className={`${
            active === "Archive" ? `text-dark dark:text-light` : "text-grey"
          }`}
          onMouseEnter={() => setActive("Archive")}
        >
          Archive
        </button>
      </Link>
      
      <Link to="/dashboard/">
        <button
          className={`${
            active === "Dashboard" ? `text-dark dark:text-light` : "text-grey"
          }`}
          onMouseEnter={() => setActive("Dashboard")}
        >
          Dashboard
        </button>
      </Link>
    </div>
  );
};

export default NavButtons;
