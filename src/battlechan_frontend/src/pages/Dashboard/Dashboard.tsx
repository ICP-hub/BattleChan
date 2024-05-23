import Navbar from "../../components/Dashboard/Navbar/Navbar";
import Body from "../../components/Dashboard/Body/Body";
import RecentPosts from "../../components/Dashboard/RecentPosts/RecentPosts";

type Theme = {
  handleThemeSwitch: Function;
};

function Dashboard(props: Theme) {
  const className: string = "HomePage";

  return (
    <div className={className + " " + `bg-[#ECECEC] dark:bg-dark`}>
      <Body />
      <RecentPosts />
    </div>
  );
}

export default Dashboard;
