import React from "react";

type TdTagProps = {
  para: string;
};

const Posts = () => {
  const className = "dashboard__postData";
  const padding =
    "tablet:py-4 py-2 xl:px-52 laptop:px-40 big_tablet:px-32 tablet:px-12 phone:px-8 px-4";
  const fontSize = "tablet:text-base phone:text-sm text-xs";

  return (
    <React.Fragment>
      <header
        className={
          className +
          " " +
          padding +
          " " +
          "flex items-center justify-between mb-3 font-sans text-base"
        }
      >
        <h1 className="tablet:text-2xl text-lg font-bold dark:text-[#fff]">
          Popular
        </h1>
        <div className="flex items-center justify-center gap-2">
          <button className="tablet:text-base text-xs border border-[#000] dark:border-[#fff] text-[#000] dark:text-[#fff] rounded-md px-6 py-2 font-semibold">
            Sports
          </button>
          <button className="flex items-center justify-center tablet:text-base text-xs bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000]  rounded-md px-6 py-2 font-semibold">
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
              />
            </svg>
            Filter
          </button>
        </div>
      </header>

      <div
        className={
          className +
          "__table " +
          padding +
          " " +
          fontSize +
          " " +
          "w-full mb-8"
        }
      >
        <table className="w-full bg-dirty-light-green text-light rounded-lg">
          {tableHeading.map((name, i) => (
            <thead className="border-b" key={i}>
              <ThTag para={name.id} />
              <ThTag para={name.date_time} />
              <ThTag para={name.votes} />
              <ThTag para={name.time} />
            </thead>
          ))}

          <tbody>
            {tableData.map((data, i) => (
              <tr key={i}>
                <TdTag para={data.id} />
                <TdTag para={data.date_time} />
                <TdTag para={data.votes} />
                <TdTag para={data.timeLeft} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Posts;

const TdTag: React.FC<TdTagProps> = ({ para }) => {
  return <td className="tablet:py-5 py-3 text-center">{para}</td>;
};

const ThTag: React.FC<TdTagProps> = ({ para }) => {
  return <th className="tablet:py-5 py-3 text-center">{para}</th>;
};

const tableHeading = [
  {
    id: "Post ID",
    date_time: "Date and Time",
    votes: "Total Votes",
    time: "Time Left",
  },
];
const tableData = [
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
  {
    id: "#0123456789",
    date_time: "Oct 29,2023 ; 14:35",
    votes: "120K",
    timeLeft: "12:36",
  },
];
