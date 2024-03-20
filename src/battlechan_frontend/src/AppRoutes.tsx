import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';

// Adjust the import paths as per your project structure
const Landing = React.lazy(() => import('./pages/Landing/Landing'));
const DashboardRoutes = React.lazy(() => import('./pages/Routes'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Landing />
          </Suspense>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <Suspense fallback={<Loader />}>
            <DashboardRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
