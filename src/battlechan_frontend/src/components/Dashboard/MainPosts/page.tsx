import React, { useState } from "react";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
}) => {
    

    return (
      <div className="flex gap-1">
        {/* prev button  */}
        <button
          className=" h-7 px-1 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] font-medium text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2]"
          type="button"
        >
          Prev...
        </button>

        {/* active page button  */}
        <button
          className="relative h-7 max-h-[40px] w-7 max-w-[40px] select-none rounded-md bg-green text-center align-middle text-[10px] font-medium uppercase text-[#fff] shadow-md shadow-green/10 transition-all hover:shadow-lg hover:shadow-[rgb(17 24 39 / 0.2)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            1
          </span>
        </button>

        {/* inactive page button  */}
        <button
          className="relative h-7 w-7 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] font-medium uppercase text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2]"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            2
          </span>
        </button>
        <button
          className="relative h-7 w-7 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] font-medium uppercase text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2]"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            3
          </span>
        </button>
        <button
          className="relative h-7 w-7 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] font-medium uppercase text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2]"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            ...
          </span>
        </button>
        <button
          className=" h-7 px-1 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] font-medium text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2]"
          type="button"
        >
          Next
        </button>
      </div>
    );
};

export default Pagination;
