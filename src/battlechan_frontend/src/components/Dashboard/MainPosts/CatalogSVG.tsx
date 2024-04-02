import React from "react";

import { FiBox } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { GiPublicSpeaker } from "react-icons/gi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHardwareChipOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";

interface CatalogSVGProps {
  label: string;
}

const CatalogSVG: React.FC<CatalogSVGProps> = ({ label }) => {
  const getSVGComponent = (label: string) => {
    switch (label.toLowerCase()) {
      case "business":
        return <MdOutlineAddBusiness className="big_tablet:text-2xl text-lg" />;
      case "politics":
        return <GiPublicSpeaker className="big_tablet:text-2xl text-lg" />;
      case "sports":
        return <FaRunning className="big_tablet:text-2xl text-lg" />;
      case "games":
        return <IoGameControllerOutline className="big_tablet:text-2xl text-lg" />;
      case "technology":
        return <IoHardwareChipOutline className="big_tablet:text-2xl text-lg" />;
      case "crypto":
        return <FiBox className="big_tablet:text-2xl text-lg" />;
      case "cinema":
        return <BiMoviePlay className="big_tablet:text-2xl text-lg" />;
      default:
        return (
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.26164 5.21305L13.9129 0.287677L22.5642 5.21305L13.9129 10.1384L5.26164 5.21305Z"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M22.5936 6.48732L22.5334 16.4422L13.9423 21.4718L14.0024 11.5169L22.5936 6.48732Z"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M4.76728 6.48732L4.82742 16.4422L13.4186 21.4718L13.3584 11.5169L4.76728 6.48732Z"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        );
    }
  };

  return <>{getSVGComponent(label)}</>;
};

export default CatalogSVG;
