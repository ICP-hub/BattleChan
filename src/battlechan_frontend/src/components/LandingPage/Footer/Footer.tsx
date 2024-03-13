import React from "react";

import { SiMedium } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const className = "LandingPage-->Footer";
  return (
    <footer
      className={className + " w-full bg-dirty-light-green flex-direction-col"}
    >
      <div
        className={
          className +
          "__bottom bg-light text-dark flex-row-center justify-around"
        }
      >
        <section className="__links gap-10 flex-row-center text-base font-semibold">
          <span>&copy; Battlechan</span>
          <span>Terms of use</span>
          <span>Cookies</span>
          <span>Privacy Policy</span>
        </section>

        {/* Social Medias */}
        <section className="__socialMedia flex-row-center py-2 gap-8 text-2xl">
          <FaSquareXTwitter />
          <SiMedium />
          <FaLinkedin />
          <IoLogoYoutube />
        </section>
      </div>
    </footer>
  );
};

export default Footer;
