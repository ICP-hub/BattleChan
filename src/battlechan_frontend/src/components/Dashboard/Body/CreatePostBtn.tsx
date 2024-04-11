
import { LuPlusCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

const CreatePostBtn = () => {
  const className = "dashboard__createPostButton";

  return (
    <div className={className + " " + "big_tablet:mt-6 mt-2 flex justify-center"}>
      <Link to="/dashboard/createPost" replace={true}>
        <p className="green-button flex-row-center bg-dirty-light-green phone:text-base text-xs">
          <LuPlusCircle />
          <span>Create Post</span>
        </p>
      </Link>
    </div>
  );
};

export default CreatePostBtn;
