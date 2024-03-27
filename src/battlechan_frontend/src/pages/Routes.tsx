import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import SettingProfile from "../components/Dashboard/SettingProfile/SettingProfile";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import PostDetails from "../components/Dashboard/PostDetails/PostDetails";

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
        <Route path="/userProfile" element={<UserProfile />} />

        <Route
          path="/postDetails"
          element={<PostDetails handleThemeSwitch={props.handleThemeSwitch} />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default Routing;
