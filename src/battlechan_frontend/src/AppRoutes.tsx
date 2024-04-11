
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import { useConnect } from "@connect2ic/react";


const DashboardRoutes = lazy(() => import("./pages/Routes"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const MainPosts = lazy(() => import("./pages/MainPosts/MainPosts"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));
const ArchivePosts = lazy(() => import("./pages/ArchivePosts/ArchivePosts"));
const UserSetting = lazy(() => import("./pages/SettingProfile/SettingProfile"));
const CreatePost = lazy(() => import("./pages/CreatePost/CreatePost"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));

interface AppRoutesProps {
  handleThemeSwitch: () => void; 
}

const AppRoutes: React.FC<AppRoutesProps> = ({ handleThemeSwitch }) => {
  let { isConnected, principal, isIdle, isInitializing } = useConnect();
  const [allow, setAllow] = useState<null | boolean>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitializing == false) {
      setAllow(principal ? true : false);
    }
    
  }, [principal, isInitializing]);

  

  React.useEffect(() => {
    if (principal) {
      
      
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
        path="/dashboard/createPost/*"
        element={
          allow == true ? (
            <Suspense fallback={<Loader />}>
              <CreatePost handleThemeSwitch={handleThemeSwitch} />
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
