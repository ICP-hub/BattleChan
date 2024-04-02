import React from "react";

import { LuPlusCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

const CreatePostBtn = () => {
  const className = "CreatePostButton";
  return (
    <div className={className + " " + "mt-12 flex justify-center"}>
      <Link to="/dashboard/createPost" replace={true}>
        <p className="green-button flex-row-center bg-dirty-light-green">
          <LuPlusCircle />
          <span>Create Post</span>
        </p>
      </Link>
    </div>
  );
};

export default CreatePostBtn;
