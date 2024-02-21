import React from "react"
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div className="w-full bg-slate-800 h-[60vh] p-14">
      <h1 className="text-xl text-white">Landing Page</h1>
      <div className="w-full mt-6">
        <Link to={"/main"} className="bg-green-500 text-white p-2 rounded">
          Main Page
        </Link>
      </div>
    </div>
  )
}

export default Landing
