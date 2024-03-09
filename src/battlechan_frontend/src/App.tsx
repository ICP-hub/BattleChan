

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css" ; 
// Lazy load pages
const Landing = lazy(() => import("./pages/Landing/Landing"));
const DashboardRoutes = lazy(() => import("./pages/Routes"));

import Loader from "./components/Loader/Loader";

function App() {
  return (
    <Router>
      
      <div>
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
      </div>
    </Router>
  );
}

export default App;


