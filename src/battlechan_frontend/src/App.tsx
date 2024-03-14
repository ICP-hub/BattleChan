import React, { Suspense, lazy } from "react";
import "./App.css";
import { ConnectButton,ConnectDialog, Connect2ICProvider} from "@connect2ic/react";
import "@connect2ic/core/style.css"
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const client = createClient({
  canisters: {
    
  },
  providers: defaultProviders,
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
