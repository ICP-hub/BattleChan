import React from "react";

const Catalog = () => {
  const items = [
    { id: 1, label: "Business" },
    { id: 2, label: "Politics" },
    { id: 3, label: "Sports" },
    { id: 4, label: "Games" },
    { id: 5, label: "Technology" },
    { id: 6, label: "Cinema" },
    { id: 7, label: "Random" },
    { id: 8, label: "Astrology" },
    // Add more items as needed
  ];

  return (
    <div className="hidden w-full tablet:inline-flex flex-nowrap mb-20 overflow-x-auto no-scrollbar">
      <ul className="flex items-center justify-start">
        {items.map((item) => (
          <li key={item.id} className="mr-4">
            <button className="inline-flex items-center gap-2 justify-center text-base px-11 py-4 my-4 bg-[#EDEDED] dark:bg-[#fff] text-[#0D0D0D] text-opacity-50 dark:text-[#000] rounded-full font-semibold shadow-sm shadow-[#0000001F]">
              <svg
                className="w-6 h-5"
                viewBox="0 0 26 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="currentColor"
                  d="M20.8 23V19.0571H16.9V17.7429H20.8V13.8H22.1V17.7429H26V19.0571H22.1V23H20.8ZM1.599 19.7143V11.8286H0V10.5143L1.5002 3.94286H19.2998L20.8 10.5143V11.8286H19.201V16.1263H17.901V11.8286H11.999V19.7143H1.599ZM2.899 18.4H10.699V11.8286H2.899V18.4ZM1.5002 1.31429V0H19.2998V1.31429H1.5002ZM1.3156 10.5143H19.4844L18.2806 5.25714H2.5194L1.3156 10.5143Z"
                />
              </svg>
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
