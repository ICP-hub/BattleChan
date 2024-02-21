import React from "react"

import { HiOutlineHome, HiOutlineArrowTrendingUp, HiOutlineArchiveBoxArrowDown, HiOutlineCog6Tooth } from "react-icons/hi2"
import { HiOutlineSearch } from "react-icons/hi"
import { Link } from "react-router-dom"
import { MdNotifications } from "react-icons/md"

const Navbar = () => {
  return (
    <div className="w-full bg-white p-1 px-6 sticky top-0">
      <div className="flex justify-between items-center h-full">
        <div className="w-2/12">
          <div className="text-2xl font-semibold flex items-center gap-1">
            <img src="/battle-chan-logo.png" alt="battle-chan-logo" className="w-14 h-14 object-contain" />
            BattleChan
          </div>
        </div>
        <div className="w-3/12 flex items-center justify-center gap-6">
          <Link to={"/main"} className="flex items-center gap-1 hover:text-green-600">
            <HiOutlineHome size={18} />
            Home
          </Link>
          <Link to={"/home"} className="flex items-center gap-1 hover:text-green-600">
            <HiOutlineArrowTrendingUp size={18} />
            Popular
          </Link>
          <Link to={"/home"} className="flex items-center gap-1 hover:text-green-600">
            <HiOutlineArchiveBoxArrowDown size={18} />
            Archive
          </Link>
        </div>
        <div className="w-4/12 flex items-center gap-6 px-3">
          <div className="w-10/12 border border-slate-200 bg-slate-100 rounded flex items-center gap-1">
            <span className="p-2">
              <HiOutlineSearch size={18} />
            </span>
            <input type="text" className="bg-inherit h-full focus:outline-none placeholder:text-sm text-sm" placeholder="Find board or post" />
          </div>
        </div>
        <div className="w-3/12 flex items-center gap-6">
          <Link to={"/create_post"} className="bg-green-500 text-white p-2  text-sm font-medium rounded px-4">
            Create Post
          </Link>
          <Link to={"/profile"} className="text-gray-600">
            <HiOutlineCog6Tooth size={20} />
          </Link>
          <Link to={"/profile"} className="text-gray-600">
            <MdNotifications size={20} />
          </Link>
          <div className="flex cursor-pointer">
            <img src="/public/user-icon.svg" alt="User Default" className="w-10 h-10 object-contain" />
            <div className="flex flex-col ml-2">
              <span className="text-sm font-medium">Suraj Aswal</span>
              <span className="text-xs text-slate-500">ID: 23890329</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
