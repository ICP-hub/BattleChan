import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavButtons = () => {
  const location = useLocation();
  const [active, setActive] = React.useState("Dashboard");
  const className = "Home__NavButtons";
  console.log("active: ", active)

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    console.log("path:", path)
    setActive(path || "Dashboard");
  }, [location]);

  return (
    <div
      className={
        className +
        "__navigation" +
        ` gap-12 phone:py-8 py-6 tablet:mb-0 mb-4  flex-row-center justify-center font-normal tablet:text-lg phone:text-1xl text-sm bg-transparent`
      }
    >
      <Link to="/dashboard/mainPosts">
        <button
          className={`${
            active === "mainPosts" ? `font-semibold text-dark dark:text-light` : "text-grey"
          } hover:text-dark hover:dark:text-light`}
          
        >
          Home
        </button>
      </Link>

      <Link to="/dashboard/archivePosts">
        <button
          className={`${
            active === "archivePosts" ? `font-semibold text-dark dark:text-light` : "text-grey"
          } hover:text-dark hover:dark:text-light`}
          
        >
          Archive
        </button>
      </Link>
      
      <Link to="/dashboard/dashboard">
        <button
          className={`${
            active === "dashboard" ? `font-semibold text-dark dark:text-light` : "text-grey"
          } hover:text-dark hover:dark:text-light`}
          
        >
          Dashboard
        </button>
      </Link>
    </div>
  );
};

export default NavButtons;
