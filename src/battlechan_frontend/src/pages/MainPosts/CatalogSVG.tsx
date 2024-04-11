import React from "react";

import { FiBox } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { GiPublicSpeaker } from "react-icons/gi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoHardwareChipOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";

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
        return (
          <IoGameControllerOutline className="big_tablet:text-2xl text-lg" />
        );
      case "technology":
        return (
          <IoHardwareChipOutline className="big_tablet:text-2xl text-lg" />
        );
      case "crypto":
        return <FiBox className="big_tablet:text-2xl text-lg" />;
      case "cinema":
        return <BiMoviePlay className="big_tablet:text-2xl text-lg" />;
      default:
        return <FaRandom />;
    }
  };

  return <>{getSVGComponent(label)}</>;
};

export default CatalogSVG;
