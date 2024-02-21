import React, { FC } from "react"
import { Link } from "react-router-dom"
import Post from "../../components/Home/Post"

interface HomeProps {
  theme: string
}

const Home: FC<HomeProps> = ({ theme }) => {
  return (
    <div className="w-full h-screen px-6 overflow-scroll">
      <div className="w-full bg-white mt-6 rounded-lg p-3">
        <div className="w-full flex items-center justify-between px-2">
          <h1 className="text-lg font-bold">Popular</h1>
          <div className="flex gap-4 text-slate-600 text-sm">
            <Link to={"/"}>Hot</Link>
            <Link to={"/"}>Controversial</Link>
            <Link to={"/"}>Archive</Link>
          </div>
        </div>
        <div className="w-full mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Post key={`post-${index}`} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
