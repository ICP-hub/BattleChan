import React from "react";

import { HiLink } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";

import { SiMedium } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const className = "LandingPage__Footer";

  return (
    <footer
      className={
        className + " w-full bg-dirty-light-green text-light flex-direction-col"
      }
    >
      <div className={className + "__top p-8 flex-direction-row"}>
        {/* Links */}
        <section className="__left w-1/2 flex-direction-row justify-evenly">
          {/* Left */}
          <div className="flex-direction-col items-start">
            <a href="#" className="m-4">
              Guide
            </a>
            <a href="#" className="m-4 gap-2 flex-row-center">
              Internet Computer
              <HiLink />
            </a>

            <a href="#" className="m-4 gap-2 flex-row-center">
              Zealy Contest
              <HiLink />
            </a>
          </div>

          {/* Right */}
          <div className="flex-direction-col items-start">
            <a href="#" className="m-4 gap-2 flex-row-center">
              Support
              <FaTelegramPlane />
            </a>
            <a href="#" className="m-4 gap-2 flex-row-center">
              White Papers
              <HiLink />
            </a>
            <a href="#" className="m-4 gap-2 flex-row-center">
              Deck
              <HiLink />
            </a>
          </div>
        </section>

        {/* Signup email input */}
        <section className="__right w-1/2 flex-direction-col gap-4">
          <p className="font-semibold">
            Signup for latest updates to keep up to date with us
          </p>

          <div className="emailInput gap-4 flex-row-center">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="emailInput rounded-[2rem] text-lg px-4 py-1"
            />
            <button type="button" className="small-button bg-dark text-light">
              Get Updates
            </button>
          </div>
        </section>
      </div>

      {/* Bottom */}
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
