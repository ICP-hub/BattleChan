// AppRoutes.tsx
import React, { Suspense  , lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './components/Loader/Loader';
import { RootState } from '../src/components/LandingPage/types/stateTypes'; // Adjust this import based on your actual file structure

// Lazy load pages
const Landing = React.lazy(() => import('./pages/Landing/Landing'));
const DashboardRoutes = React.lazy(() => import('./pages/Routes'));

const AppRoutes = ({ darkColor , lightColor, handleThemeSwitch }) => {
  // Replace the useSelector line below with the correct selector based on your state
  let isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

//   React.useEffect(() => {
//     console.log(`Authentication state is now: ${isAuthenticated}`);
//   }, [isAuthenticated]);
  

  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Landing darkColor={darkColor} lightColor={lightColor} handleThemeSwitch={handleThemeSwitch} />
          </Suspense>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? (
            <Suspense fallback={<Loader />}>
              <DashboardRoutes darkColor={darkColor} lightColor={lightColor} handleThemeSwitch={handleThemeSwitch} />
            </Suspense>
            
          ) : (
              <Navigate to="/"  />
          )
        }
      />
    </Routes>

  );
};

export default AppRoutes;
