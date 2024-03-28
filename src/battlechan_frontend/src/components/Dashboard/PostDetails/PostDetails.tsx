import React from "react";
import Navbar from "../Navbar/Navbar";

import postImage from "../../../images/trendingPost_coverImg.png";
import NavButtons from "../NavButtons/NavButtons";

type Theme = {
  handleThemeSwitch: Function;
};

const PostDetails = (props: Theme) => {
  const className = "Dasboard__PostDetails";

  return (
    <React.Fragment>
      <Navbar handleThemeSwitch={props.handleThemeSwitch} />
      <NavButtons />
      
      <div
        className={className + " " + "w-full p-16 bg-[#ECECEC] dark:bg-dark"}
      >
        <img src={postImage} alt="Post Image" />
      </div>
    </React.Fragment>
  );
};

export default PostDetails;
