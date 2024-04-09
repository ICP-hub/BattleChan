// AppRoutes.tsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { useConnect } from "@connect2ic/react";

// Lazy load pages
const Landing = React.lazy(() => import("./pages/Landing/Landing"));
const DashboardRoutes = React.lazy(() => import("./pages/Routes"));
const UserSetting = React.lazy(
  () => import("../src/components/Dashboard/SettingProfile/SettingProfile")
);
const UserProfile = React.lazy(
  () => import("../src/components/Dashboard/UserProfile/UserProfile")
);
const MainPosts = React.lazy(
  () => import("../src/components/Dashboard/MainPosts/MainPosts")
);
const ArchivePosts = React.lazy(
  () => import("../src/components/Dashboard/ArchivePosts/ArchivePosts")
);
const Analytics = React.lazy(
  () => import("../src/components/Dashboard/Analytics/Analytics")
);
const DashboardPage = React.lazy(
  () => import("../src/components/Dashboard/DashboardPage/DashboardPage")
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
      <Route
        path="/dashboard/dashboard/*"
        element={
          allow == true ? (
            <Suspense fallback={<Loader />}>
              <DashboardPage handleThemeSwitch={handleThemeSwitch} />
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
