import React, { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from './components/Loader/Loader';


// Adjust the import paths as per your project structure
const Landing = React.lazy(() => import('./pages/Landing/Landing'));
const DashboardRoutes = React.lazy(() => import('./pages/Routes'));

import { rolesHandlerRequest } from "./components/StateManagement/Redux/Reducers/RoleReducer";
import { useNavigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";

// -----

const DashBoard = lazy(() => import("./pages/Dashboard/Dashboard"));
// const Landings = lazy(() => import("./pages/Landing/Landing"));
const Error404 = lazy(() => import("./pages/Error404Page/Error404Page"));

const AppRoutes = ({ setModalOpen}) => {
  const actor = useSelector((currState) => currState.actors.actor);
  const isAuthenticated = useSelector(
    (currState) => currState.internet.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const roleNames = isAuthenticated
  //   ? allRoles.roles?.map((role) => role.name)
  //   : [];

  const publicRoutes = [
    { path: "/", element: <Landing  setModalOpen={setModalOpen} /> },
    { path: "/dashboard", element: <DashBoard   /> },

  ];

  // const protectedRoutes = [
  //   {
  //     path: "/dashboard",
  //     component: Dashboard,
  //   },
  // ];

return (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* {protectedRoutes.map((route, index) => {
        const isAuthorized = route?.allowedRoles?.includes(specificRole);
        return (
          <Route
            key={index}
            path={route.path}
            element={isAuthorized ? <route.component /> : <Navigate to="/" />}
          />
        );
      })} */}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Error404 />} />
    </Routes>
  </Suspense>
);
};

export default AppRoutes;