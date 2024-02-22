import React from "react"

// React third Party
import { Route, Routes } from "react-router-dom"

// Components
import RightSidebar from "./components/Sidebar/RightSidebar"
import LeftSidebar from "./components/Sidebar/LeftSidebar"
import Navbar from "./components/Navbar/Navbar"

// pages
import Home from "./pages/Home/Home"

const Routing = () => {
  const theme = "Light"
  return (
    <div className="w-full h-screen  bg-slate-100 overflow-hidden">
      <Navbar />
      <div className="w-full flex">
        <LeftSidebar />
        <div className="w-8/12 h-full">
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
          </Routes>
        </div>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Routing
