import { useLocation, useNavigate, Route, Routes } from "react-router-dom"
import RightSidebar from "../components/Sidebar/RightSidebar"
import LeftSidebar from "../components/Sidebar/LeftSidebar"
import Navbar from "../components/Navbar/Navbar"

import Home from "../pages/Home/Home"

const Routing = () => {

  return (
    <div className="w-full h-screen  bg-slate-100 overflow-hidden">
      <Navbar />
      <div className="w-full flex">
        <LeftSidebar />
        <div className="w-8/12 h-full">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Routing
