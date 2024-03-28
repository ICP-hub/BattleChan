import React from "react";
import Navbar from "../Navbar/Navbar";

import postImage from "../../../images/trendingPost_coverImg.png";
import NavButtons from "../NavButtons/NavButtons";
import Comment from "./Comment";

type Theme = {
  handleThemeSwitch: Function;
};

const PostDetails = (props: Theme) => {
  return (
    <React.Fragment>
      <div
        className={`min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-top bg-contain bg-no-repeat`}
      >
        <Navbar handleThemeSwitch={props.handleThemeSwitch} />
        <div className="hidden tablet:block">
          <NavButtons />
        </div>

        <div className="container py-11 mx-auto px-4 tablet:px-40 dark:text-[#fff] overflow-hidden">
          <h1 className="font-bold dark:text-[#fff] mb-2 tablet:text-3xl tablet:mb-8">
            #123456780
          </h1>
          {/* post image  */}
          <div className="max-w-3xl">
            <img
              className="block h-auto w-full"
              src={postImage}
              alt="post image"
            />

            <div className="mt-4 flex items-center text-[9px] tablet:px-2 tablet:text-sm justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <svg
                    className="w-[10px] h-[8px] tablet:w-[18px] tablet:h-[17px]"
                    viewBox="0 0 7 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.64338 4.26217L4.50503 2.37172L4.19286 2.05516L2.64338 3.62861L2.03129 3.00705L1.71955 3.32405L2.64338 4.26217ZM3.10246 7.40418C3.92441 6.67784 4.57411 5.93921 5.05155 5.1883C5.52898 4.43709 5.7677 3.78741 5.7677 3.23925C5.7677 2.42707 5.51455 1.75666 5.00826 1.22804C4.50197 0.69941 3.8667 0.435244 3.10246 0.43554C2.3385 0.43554 1.70323 0.699706 1.19665 1.22804C0.690066 1.75637 0.43692 2.42677 0.437212 3.23925C0.437212 3.78741 0.675929 4.43709 1.15336 5.1883C1.63109 5.93921 2.28079 6.67814 3.10246 7.40418ZM3.10246 8C2.07501 7.07742 1.30114 6.21699 0.78086 5.41873C0.260287 4.62046 0 3.89396 0 3.23925C0 2.30009 0.301093 1.5255 0.90328 0.915478C1.50576 0.305159 2.23882 0 3.10246 0C3.96609 0 4.69915 0.305159 5.30163 0.915478C5.90382 1.5255 6.20491 2.30009 6.20491 3.23925C6.20491 3.89396 5.94477 4.62046 5.42449 5.41873C4.90391 6.21699 4.1299 7.07742 3.10246 8Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>250K</span>
                </div>
                <div className="flex items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <svg
                    className="w-[10px] h-[8px] tablet:w-[18px] tablet:h-[17px]"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.585938 0.700067C0.585938 0.31363 0.921937 0 1.33594 0H8.83594C9.24994 0 9.58594 0.31363 9.58594 0.700067V5.70055C9.58594 5.88622 9.50692 6.06428 9.36627 6.19557C9.22562 6.32686 9.03485 6.40061 8.83594 6.40061H4.68308L3.15179 7.82995C3.06439 7.91123 2.95316 7.96653 2.83213 7.9889C2.7111 8.01126 2.58569 7.99968 2.4717 7.95561C2.35771 7.91155 2.26025 7.83697 2.1916 7.74128C2.12295 7.64559 2.08618 7.53307 2.08594 7.41791V6.40061H1.33594C1.13703 6.40061 0.94626 6.32686 0.805607 6.19557C0.664955 6.06428 0.585938 5.88622 0.585938 5.70055V0.700067ZM1.33594 0.600057C1.30752 0.600057 1.28027 0.610594 1.26018 0.62935C1.24008 0.648105 1.22879 0.673543 1.22879 0.700067V5.70055C1.22879 5.75575 1.27679 5.80056 1.33594 5.80056H2.40737C2.49261 5.80056 2.57437 5.83217 2.63465 5.88843C2.69493 5.9447 2.72879 6.02101 2.72879 6.10058V7.37671L4.32308 5.88856C4.35289 5.86068 4.38829 5.83855 4.42726 5.82345C4.46624 5.80835 4.50802 5.80057 4.55022 5.80056H8.83594C8.86435 5.80056 8.89161 5.79002 8.9117 5.77126C8.93179 5.75251 8.94308 5.72707 8.94308 5.70055V0.700067C8.94308 0.673543 8.93179 0.648105 8.9117 0.62935C8.89161 0.610594 8.86435 0.600057 8.83594 0.600057H1.33594Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{750} Comments</span>
                </div>
                <div className="hidden tablet:flex items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1">
                  <svg
                    className="w-[10px] h-[8px] tablet:w-[18px] tablet:h-[17px]"
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5117 7.46667L12.6667 2.57067V5.19467L11.7589 5.33333C7.20944 5.984 4.12722 8.39467 2.36444 12.0853C4.81333 10.336 7.85333 9.49333 11.6111 9.49333H12.6667V12.3627M10.5556 10.5813C5.83722 10.8053 2.45944 12.5227 0 16C1.05556 10.6667 4.22222 5.33333 11.6111 4.26667V0L19 7.46667L11.6111 14.9333V10.56C11.2628 10.56 10.9144 10.5707 10.5556 10.5813Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span>{135} Share</span>
                </div>
              </div>
              <div className="tablet:text-xs">
                <span className={`text-[#18AF00]`}>5:00</span> min left
              </div>
            </div>
          </div>
          {/* upvote and downvote button  */}
          <div className="flex gap-2 mt-4 tablet:mt-11">
            <button
              className={`inline-flex items-center justify-center h-5 w-5  tablet:w-8 tablet:h-8 select-none rounded-sm tablet:rounded-[10px] bg-green text-center align-middle text-[10px] font-medium uppercase shadow-md shadow-green/10 transition-all hover:shadow-lg hover:shadow-[rgb(17 24 39 / 0.2)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none text-[#fff]`}
              type="button"
            >
              <svg
                className="w-[11px] h-[7px] tablet:w-6 tablet:h-3"
                viewBox="0 0 11 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.63887 0.796227L10.4149 6.03634C10.4946 6.12378 10.5391 6.23994 10.5391 6.36073C10.5391 6.48153 10.4946 6.59769 10.4149 6.68513L10.4095 6.69077C10.3708 6.7333 10.3243 6.76717 10.2727 6.79031C10.2211 6.81346 10.1656 6.82539 10.1095 6.82539C10.0534 6.82539 9.99785 6.81346 9.94628 6.79031C9.89471 6.76717 9.84819 6.7333 9.80954 6.69077L5.31237 1.75624L0.817005 6.69077C0.778354 6.7333 0.731829 6.76717 0.680262 6.79031C0.628695 6.81346 0.573163 6.82539 0.517044 6.82539C0.460926 6.82539 0.405395 6.81346 0.353827 6.79031C0.302259 6.76717 0.255735 6.7333 0.217084 6.69077L0.211686 6.68513C0.131956 6.59769 0.0874786 6.48153 0.0874786 6.36073C0.0874786 6.23994 0.131956 6.12378 0.211686 6.03634L4.98768 0.796227C5.02968 0.750142 5.08019 0.713453 5.13616 0.688385C5.19213 0.663317 5.25238 0.650391 5.31327 0.650391C5.37416 0.650391 5.43441 0.663317 5.49038 0.688385C5.54635 0.713453 5.59686 0.750142 5.63887 0.796227Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className={`inline-flex items-center justify-center h-5 w-5  tablet:w-8 tablet:h-8 select-none rounded-sm tablet:rounded-[10px] bg-[#A2A2A2] text-center align-middle text-[10px] font-medium uppercase shadow-md shadow-green/10 transition-all hover:shadow-lg hover:shadow-[rgb(17 24 39 / 0.2)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none text-[#fff]`}
              type="button"
            >
              <svg
                className="w-[11px] h-[7px] tablet:w-6 tablet:h-3"
                viewBox="0 0 11 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.46687 6.67936L11.2429 1.43925C11.3226 1.35181 11.3671 1.23565 11.3671 1.11485C11.3671 0.994055 11.3226 0.877894 11.2429 0.790461L11.2375 0.784818C11.1988 0.742285 11.1523 0.708417 11.1007 0.685274C11.0492 0.66213 10.9936 0.650195 10.9375 0.650195C10.8814 0.650195 10.8258 0.66213 10.7743 0.685274C10.7227 0.708417 10.6762 0.742285 10.6375 0.784818L6.14037 5.71935L1.64501 0.784818C1.60636 0.742285 1.55983 0.708417 1.50826 0.685274C1.4567 0.66213 1.40117 0.650195 1.34505 0.650195C1.28893 0.650195 1.2334 0.66213 1.18183 0.685274C1.13026 0.708417 1.08374 0.742285 1.04509 0.784818L1.03969 0.790461C0.959959 0.877894 0.915482 0.994055 0.915482 1.11485C0.915482 1.23565 0.959959 1.35181 1.03969 1.43925L5.81568 6.67936C5.85768 6.72544 5.9082 6.76213 5.96416 6.7872C6.02013 6.81227 6.08039 6.8252 6.14127 6.8252C6.20216 6.8252 6.26242 6.81227 6.31838 6.7872C6.37435 6.76213 6.42487 6.72544 6.46687 6.67936Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          {/* user avatar and post details  */}
          <div className="flex justify-between items-center mt-5 tablet:justify-start tablet:gap-8 tablet:mt-14">
            <div className="flex gap-2 items-center justify-center">
              <div className="w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded">
                <svg
                  className="w-5 h-5 tablet:w-9 tablet:h-9"
                  viewBox="0 0 11 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.50159 0.962891C6.12289 0.962891 6.71873 1.22769 7.15805 1.69904C7.59738 2.17039 7.84418 2.80967 7.84418 3.47625C7.84418 4.14284 7.59738 4.78212 7.15805 5.25347C6.71873 5.72482 6.12289 5.98962 5.50159 5.98962C4.8803 5.98962 4.28445 5.72482 3.84513 5.25347C3.40581 4.78212 3.159 4.14284 3.159 3.47625C3.159 2.80967 3.40581 2.17039 3.84513 1.69904C4.28445 1.22769 4.8803 0.962891 5.50159 0.962891ZM5.50159 7.2463C8.09016 7.2463 10.1868 8.37103 10.1868 9.75967V11.0163H0.816406V9.75967C0.816406 8.37103 2.91303 7.2463 5.50159 7.2463Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-[10px] font-semibold tablet:text-lg">
                Alexnder Frem
              </h1>
            </div>
            <div className="tablet:text-xs text-[10px] text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50">
              Oct 29,2023 ; 13:30 ; #12356890
            </div>
          </div>
          {/* post catalog name and post content and comment */}
          <div className="mt-4 tablet:text-lg tablet:mt-10">
            <h1 className="font-bold mb-3">Technology</h1>
            <div className="dark:text-[#fff] dark:text-opacity-50 text-xs tablet:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore
            </div>
          </div>

          {/* comment for mobile  */}
          <div className="tablet:hidden">
            <a className="cursor-pointer font-semibold text-[10px]" href="">
              See Comments
            </a>
          </div>

          {/* comment for desktop  */}
          <div className="hidden tablet:block mt-16">
            <h1 className="font-bold tablet:text-lg">Comments</h1>
            <div className="mt-8">
            <Comment />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostDetails;
