import React, { useState } from "react";
import CatalogSVG from "./CatalogSVG";

const Catalog = () => {
  const [activeItem, setActiveItem] = useState<number>(1);

  const handleClick = (itemId: number) => {
    setActiveItem(itemId);
  };

  const items = [
    { id: 1, label: "Business" },
    { id: 2, label: "Politics" },
    { id: 3, label: "Sports" },
    { id: 4, label: "Games" },
    { id: 5, label: "Technology" },
    { id: 6, label: "Crypto" },
    { id: 7, label: "Cinema" },
  ];

  return (
    <div className="hidden w-full tablet:inline-flex flex-nowrap mb-20 overflow-x-auto no-scrollbar">
      <ul className="flex items-center justify-start">
        {items.map((item) => (
          <li key={item.id} className="mr-4">
            <button onClick={() => handleClick(item.id)} className={`inline-flex items-center gap-2 justify-center text-base px-11 py-4 my-4 rounded-full font-semibold shadow-sm shadow-[#0000001F] ${activeItem === item.id ? "bg-[#000] dark:bg-[#fff] text-[#fff]  dark:text-[#000]": "bg-[#EDEDED] dark:bg-[#000] text-[#0D0D0D] dark:text-[#fff] text-opacity-50"}`}>
              <CatalogSVG label={item.label} />
              <span className="ml-1 leading-5">{item.label}</span>
              <svg
                className="w-[6px] h-[3px] tablet:w-[13px] tablet:h-[7px]"
                viewBox="0 0 6 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.81308 2.92915L0.0713045 0.383344C0.0255335 0.340866 0 0.284431 0 0.225744C0 0.167058 0.0255335 0.110623 0.0713045 0.068145L0.0744026 0.0654039C0.0965915 0.04474 0.1233 0.028286 0.152904 0.0170422C0.182507 0.00579834 0.214387 0 0.246603 0C0.278819 0 0.310699 0.00579834 0.340302 0.0170422C0.369906 0.028286 0.396614 0.04474 0.418803 0.0654039L3.00052 2.46275L5.5812 0.0654039C5.60338 0.04474 5.63009 0.028286 5.6597 0.0170422C5.6893 0.00579834 5.72118 0 5.7534 0C5.78561 0 5.81749 0.00579834 5.8471 0.0170422C5.8767 0.028286 5.90341 0.04474 5.9256 0.0654039L5.92869 0.068145C5.97447 0.110623 6 0.167058 6 0.225744C6 0.284431 5.97447 0.340866 5.92869 0.383344L3.18692 2.92915C3.1628 2.95154 3.1338 2.96936 3.10167 2.98154C3.06954 2.99372 3.03495 3 3 3C2.96504 3 2.93045 2.99372 2.89832 2.98154C2.86619 2.96936 2.8372 2.95154 2.81308 2.92915Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Catalog;
