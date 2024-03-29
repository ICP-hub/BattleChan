import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { useConnect } from "@connect2ic/react";

// Lazy load pages
const Landing = React.lazy(() => import("./pages/Landing/Landing"));
const DashboardRoutes = React.lazy(() => import("./pages/Routes"));

interface AppRoutesProps {
  handleThemeSwitch: Function; // Adjust based on the actual implementation
}

const AppRoutes = (props: AppRoutesProps) => {
  let { isConnected, principal, isIdle, isInitializing } = useConnect();
  const [allow, setAllow] = useState<null | boolean>(null);

  useEffect(() => {
    if (isInitializing == false) {
      setAllow(principal ? true : false);
    }
    console.log("intitilizing is ", isInitializing);
  }, [principal, isInitializing]);

  console.log("allow is ", allow);
  console.log("principal is ", principal);

  let x = "a";

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
            <Landing handleThemeSwitch={props.handleThemeSwitch} />
          </Suspense>
        }
      />

      <Route
        path="/dashboard/*"
        element={
          allow == true ? (
            <Suspense fallback={<Loader />}>
              <DashboardRoutes handleThemeSwitch={props.handleThemeSwitch} />
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
