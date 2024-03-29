import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import SettingProfile from "../components/Dashboard/SettingProfile/SettingProfile";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import MainPosts from "../components/Dashboard/MainPosts/MainPosts";
import PostDetails from "../components/Dashboard/PostDetails/PostDetails";
import CreatePost from "../components/Dashboard/CreatePost/CreatePost";
import ArchivePosts from "../components/Dashboard/ArchivePosts/ArchivePosts";

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
          path="/settingProfile"
          element={
            <SettingProfile handleThemeSwitch={props.handleThemeSwitch} />
          }
        />
        <Route path="/userProfile" element={<UserProfile handleThemeSwitch={props.handleThemeSwitch} />} />
        <Route path="/mainPosts" element={<MainPosts handleThemeSwitch={props.handleThemeSwitch} />} />
        <Route path="/archivePosts" element={<ArchivePosts handleThemeSwitch={props.handleThemeSwitch} />} />

        <Route
          path="/postDetails"
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
