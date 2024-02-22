import React from "react"
import { Link } from "react-router-dom"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { MdOutlineModeComment, MdShare, MdMoreVert } from "react-icons/md"

interface PostProps {
  data: number
}

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="w-full h-28 rounded-md border my-5 hover:border-gray-200 cursor-pointer flex p-2" id="post">
      <div className="w-2/12 overflow-hidden rounded-md">
        <img src="/test.jpg" alt="Post Image" className="w-full h-full object-contain" />
      </div>
      <div className="w-7/12 px-8">
        <h1 className="font-medium h-[80%]">{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ea provident vero ex voluptatum eum."}</h1>
        <div className="text-xs text-slate-600 flex justify-between">
          <div>
            Posted by
            <Link to={"/"} className="text-green-500 ml-1">
              Suraj Aswal
            </Link>
          </div>

          <Link to={"/"} className="text-green-500 ml-1">
            21/02/2024 at 12:12:12 AM
          </Link>
        </div>
      </div>
      <div className="w-2/12 flex flex-col px-4 justify-center items-start">
        <div className="my-2 text-center text-slate-600 text-xs font-medium flex items-center gap-1">
          <MdOutlineModeComment />
          300 Comment
        </div>
        <div className="my-2 text-center text-slate-600 text-xs font-medium flex items-center gap-1">
          <MdShare />
          300 Share
        </div>
        <div className="my-2 text-center text-slate-600 text-xs font-medium flex items-center gap-1">
          <MdMoreVert />
          More
        </div>
      </div>
      <div className="w-1/12 flex flex-col px-4 justify-center">
        <button className="text-green-500 w-fit px-4 p-2 text-sm rounded bg-green-200">
          <FaChevronUp />
        </button>
        <div className="my-2 text-center text-slate-600 text-xs font-medium">30K</div>
        <button className="text-red-500 w-fit px-4 p-2 text-sm rounded bg-red-200">
          <FaChevronDown />
        </button>
      </div>
    </div>
  )
}

export default Post
