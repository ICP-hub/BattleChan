import React from "react";

const Comment = () => {
  return (
    <div className="flex flex-col gap-4">
        {/* comment user details  */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 tablet:w-12 tablet:h-12 bg-[#686868] text-[#fff] flex items-center justify-center rounded bg-[url('/src/images/comment-avatar.jpg')] bg-cover bg-no-repeat bg-center">
        </div>
        <h1 className="font-semibold">IamCool_1122</h1>
        <div className=" ml-6 text-[#000] dark:text-[#fff] text-xs text-opacity-50 dark:text-opacity-50">
          2 day ago ; &000001253
        </div>
      </div>
      {/* comment content  */}
      <div className="dark:text-[#fff] dark:text-opacity-50 ml-[62px]">
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam
      </div>
      {/* upvote downvote and reply button  */}
      <div className="flex gap-10 ml-[62px]">
        <div className="flex gap-2">
          <button
            className={`inline-flex items-center justify-center h-5 w-5  tablet:w-6 tablet:h-6 select-none rounded-sm tablet:rounded-md bg-green text-center align-middle text-[10px] font-medium uppercase shadow-md shadow-green/10 transition-all hover:shadow-lg hover:shadow-[rgb(17 24 39 / 0.2)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none text-[#fff]`}
            type="button"
          >
            <svg
              className="w-[11px] h-[7px] tablet:w-4 tablet:h-2"
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
            className={`inline-flex items-center justify-center h-5 w-5  tablet:w-6 tablet:h-6 select-none rounded-sm tablet:rounded-md bg-[#A2A2A2] text-center align-middle text-[10px] font-medium uppercase shadow-md shadow-green/10 transition-all hover:shadow-lg hover:shadow-[rgb(17 24 39 / 0.2)] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none text-[#fff]`}
            type="button"
          >
            <svg
              className="w-[11px] h-[7px] tablet:w-4 tablet:h-2"
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
        <div>
          <button
            className="inline-flex items-center justify-center text-[#000] dark:text-[#fff] text-opacity-50 dark:text-opacity-50 gap-1 cursor-pointer"
            type="button"
          >
            <svg
              className="w-4 h-5"
              viewBox="0 0 17 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 6L11 1M16 6L11 11M16 6L9.5 6M6 6C4.333 6 0.999999 7 0.999999 11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span>Reply</span>
          </button>
        </div>
      </div>
      <div>
        <button className="text-sm ml-[62px]">View replies</button>
      </div>
    </div>
  );
};

export default Comment;
