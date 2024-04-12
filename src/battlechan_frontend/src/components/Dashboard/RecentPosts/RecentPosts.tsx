import Posts from "./Posts";

const RecentPosts = () => {
  const className = "HomePage__RecentPosts";

  return (
    <div className={className + " " + `text-dark dark:text-light`}>
      <div className="font-[800] text-center laptop:text-4xl text-laptop:text-4xl tablet:text-3xl small_phone:text-2xl text-lg ">
        Recent Post{" "}
      </div>
      <Posts />
    </div>
  );
};

export default RecentPosts;
