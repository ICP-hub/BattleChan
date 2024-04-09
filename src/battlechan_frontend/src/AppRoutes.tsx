// AppRoutes.tsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import { useConnect } from "@connect2ic/react";

// Lazy load pages
const DashboardRoutes = React.lazy(() => import("./pages/Routes"));
const Landing = React.lazy(() => import("./pages/Landing/Landing"));
const MainPosts = React.lazy(() => import("./pages/MainPosts/MainPosts"));
const Analytics = React.lazy(() => import("./pages/Analytics/Analytics"));
const UserProfile = React.lazy(() => import("./pages/UserProfile/UserProfile"));
const ArchivePosts = React.lazy(
  () => import("./pages/ArchivePosts/ArchivePosts")
);
const UserSetting = React.lazy(
  () => import("./pages/SettingProfile/SettingProfile")
);

interface AppRoutesProps {
  handleThemeSwitch: () => void; // Adjust based on the actual implementation
}

const AppRoutes: React.FC<AppRoutesProps> = ({ handleThemeSwitch }) => {
  let { isConnected, principal, isIdle, isInitializing } = useConnect();
  const [allow, setAllow] = useState<null | boolean>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitializing == false) {
      setAllow(principal ? true : false);
    }
    console.log("intitilizing is ", isInitializing);
  }, [principal, isInitializing]);

  console.log("allow is: ", allow, "and principal is: ", principal);

  React.useEffect(() => {
    if (principal) {
      console.log("Principalm eff of aepr :", principal);
      // Perform any other actions that depend on the updated principal value
    }
  }, [principal]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Landing handleThemeSwitch={handleThemeSwitch} />
          </Suspense>
        }
      />

      <Route
        path="/dashboard/*"
        element={
          <Suspense fallback={<Loader />}>
            <DashboardRoutes handleThemeSwitch={handleThemeSwitch} />
          </Suspense>
        }
      />
      <Route
        path="/dashboard/settingProfile/*"
        element={
          allow == true ? (
            <Suspense fallback={<Loader />}>
              <UserSetting handleThemeSwitch={handleThemeSwitch} />
            </Suspense>
          ) : allow == false ? (
            <Navigate to="/" />
          ) : null
        }
      />
      <Route
        path="/dashboard/UserProfile/*"
        element={
          allow == true ? (
            <Suspense fallback={<Loader />}>
              <UserProfile handleThemeSwitch={handleThemeSwitch} />
            </Suspense>
          ) : allow == false ? (
            <Navigate to="/" />
          ) : null
        }
      />
      <Route
        path="/dashboard/mainPosts/*"
        element={
          <Suspense fallback={<Loader />}>
            <MainPosts handleThemeSwitch={handleThemeSwitch} />
          </Suspense>
        }
      />
      <Route
        path="/dashboard/archivePosts/*"
        element={
          <Suspense fallback={<Loader />}>
            <ArchivePosts handleThemeSwitch={handleThemeSwitch} />
          </Suspense>
        }
      />
      <Route
        path="/dashboard/analytics/*"
        element={
          allow == true ? (
            <Suspense fallback={<Loader />}>
              <Analytics handleThemeSwitch={handleThemeSwitch} />
            </Suspense>
          ) : allow == false ? (
            <Navigate to="/" />
          ) : null
        }
      />
    </Routes>
  );
};

export default AppRoutes;
