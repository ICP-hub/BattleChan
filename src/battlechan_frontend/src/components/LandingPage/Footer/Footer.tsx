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
      <div
        className={
          className +
          "__top  w-full laptop:p-8 small_phone:py-8 px-2 p-3 big_tablet:flex-direction-row flex flex-col-reverse big_tablet:gap-0 small_phone:gap-10 gap-4"
        }
      >
        {/* Links */}
        <section className="__left big_tablet:w-1/2 w-full flex-direction-row big_tablet:justify-evenly justify-evenly big_tablet:gap-20">
          {/* Left */}
          <div className="flex-direction-col items-start">
            <a href="#" className="m-4">
              Guide
            </a>
            <a
              href="https://internetcomputer.org"
              target="_blank"
              className="m-4 gap-2 flex-row-center"
            >
              Internet Computer
              <HiLink />
            </a>

            {/* <a href="#" className="m-4 gap-2 flex-row-center">
              Zealy Contest
              <HiLink />
            </a> */}
            <a
              href="https://t.me/BattleChanICP"
              target="_blank"
              className="m-4 gap-2 flex-row-center"
            >
              Support
              <FaTelegramPlane />
            </a>
          </div>

          {/* Right */}
          <div className="flex-direction-col items-start">
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
      </div>

      {/* Bottom */}
      <div
        className={
          className +
          "__bottom bg-light text-dark phone:flex-row-center flex-col-center flex-col-reverse justify-around"
        }
      >
        <section className="__links big_tablet:gap-10 tablet:gap-4 gap-2 flex-row-center small_phone:text-base text-sm font-semibold">
          <span>&copy; Battlechan</span>
        </section>

        {/* Social Medias */}
        <section className="__socialMedia flex-row-center py-2 big_tablet:gap-8 tablet:gap-4 phone:gap-2 gap-4 text-2xl">
          <a
            href="https://twitter.com/BattleCHAN_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://t.me/BattleChanICP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane />
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
