import React from "react";

import bg from "../../../images/faq_bg.png";

const list = [
  {
    index: 1,
    question: "Can startups & investors also be part of this Tendr platform?",
  },
  {
    index: 2,
    question: "Is my personal info safe with Tendrs?",
  },
  {
    index: 3,
    question: "Is my personal info safe with Tendrs?",
  },
  {
    index: 4,
    question: "Is my personal info safe with Tendrs?",
  },
  {
    index: 5,
    question: "Is my personal info safe with Tendrs?",
  },
  {
    index: 6,
    question: "Is my personal info safe with Tendrs?",
  },
];

const FAQs = () => {
  const darkColor = document.documentElement.className;
  const className = "LandingPage__FAQs";

  return (
    <div
      className={
        className +
        ` w-full h-[100%] ${
          darkColor == "dark" ? "bg-[#121212]" : "bg-light"
        } text-dark dark:text-light flex-direction-row`
      }
    >
      {/* Questions section */}
      <section
        className={
          className +
          "__left" +
          " h-full pl-36 py-20 w-[55%] gap-20 flex flex-col"
        }
      >
        <h1 className="font-bold text-5xl">Frequently Asked Questions</h1>

        <div className="questions gap-4 flex-direction-col items-start">
          {list &&
            list.map((item) => (
              <p className="questionPara flex-row-center p-2 border border-green rounded-[2rem]">
                <span
                  className={`py-1 px-3 font-semibold text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
                >
                  {item.index}
                </span>

                <span className="mx-8">{item.question}</span>
              </p>
            ))}
        </div>
      </section>

      <section
        className={
          className +
          "__right" +
          " w-[45%] pr-36 bg-contain bg-no-repeat flex-col-center relative"
        }
        style={darkColor == "dark" ? { backgroundImage: `url(${bg})` } : {}}
      >
        <p
          className={`text-light dark:text-dark bg-dark dark:bg-light font-semibold top-[30%] absolute p-4 rounded-lg`}
        >
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi l
        </p>
      </section>
    </div>
  );
};

export default FAQs;
