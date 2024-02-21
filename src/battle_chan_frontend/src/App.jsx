import React, { Suspense, lazy, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { battle_chan_backend } from "declarations/battle_chan_backend"

// pages
const Landing = lazy(() => import("./pages/Landing/Landing"))
const MainRoutes = lazy(() => import("./Routes"))

// component
const Loader = lazy(() => import("./components/Loader/Loader"))

const App = () => {
  const a = battle_chan_backend.greet("Suraj Aswal");
  const b = battle_chan_backend.demo();
  useEffect(() => {

    console.log(a, b);
  }, [a, b]);
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
        path="/main/*"
        element={
          <Suspense fallback={<Loader />}>
            <MainRoutes />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
