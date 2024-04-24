import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import SettingProfile from "./SettingProfile/SettingProfile";
import UserProfile from "./UserProfile/UserProfile";
import MainPosts from "./MainPosts/MainPosts";
import PostDetails from "./PostDetails/PostDetails";
import CreatePost from "./CreatePost/CreatePost";
import ArchivePosts from "./ArchivePosts/ArchivePosts";
import Analytics from "./Analytics/Analytics";
import DashboardPage from "./DashboardPage/DashboardPage";
import SearchPosts from "./SearchPosts/SearchPosts";

type Theme = {
  handleThemeSwitch: Function;
};

function Routing(props: Theme) {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={<Dashboard handleThemeSwitch={props.handleThemeSwitch} />}
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage handleThemeSwitch={props.handleThemeSwitch} />
          }
        />

        <Route
          path="/settingProfile"
          element={
            <SettingProfile handleThemeSwitch={props.handleThemeSwitch} />
          }
        />
        <Route
          path="/userProfile"
          element={<UserProfile handleThemeSwitch={props.handleThemeSwitch} />}
        />
        <Route
          path="/mainPosts"
          element={<MainPosts handleThemeSwitch={props.handleThemeSwitch} />}
        />
        <Route
          path="/archivePosts"
          element={<ArchivePosts handleThemeSwitch={props.handleThemeSwitch} />}
        />
        <Route
          path="/searchPosts"
          element={<SearchPosts handleThemeSwitch={props.handleThemeSwitch} />}
        />
        <Route
          path="/analytics"
          element={<Analytics handleThemeSwitch={props.handleThemeSwitch} />}
        />

        <Route
          path="/postDetails/:postId"
          element={<PostDetails handleThemeSwitch={props.handleThemeSwitch} />}
        />
        <Route
          path="/createPost"
          element={<CreatePost handleThemeSwitch={props.handleThemeSwitch} />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default Routing;
