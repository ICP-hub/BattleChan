import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import { battle_chan_backend } from "declarations/battle_chan_backend"

// pages
const Landing = lazy(() => import("./pages/Landing/Landing"))
const MainRoutes = lazy(() => import("./pages/Routes"))

// component
const Loader = lazy(() => import("./components/Loader/Loader"))

const App = () => {
  return (
    <Router>
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
          path="/main/*"
          element={
            <Suspense fallback={<Loader />}>
              <MainRoutes />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
