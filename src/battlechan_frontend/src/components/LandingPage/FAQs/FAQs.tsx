import React from "react";

import bg from "../../../images/faq_bg.png";

type Theme = {
  darkColor: string;
  lightColor: string;
};

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

const FAQs = (props: Theme) => {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const className = "LandingPage__FAQs";

  return (
    <div
      className={
        className +
        ` w-full h-[90vh] ${
          darkColor == "dark" ? "bg-[#121212]" : "light"
        } text-${lightColor} flex-direction-row`
      }
    >
      {/* Questions section */}
      <section
        className={
          className +
          "__left" +
          " h-full pl-36 py-20 w-[55%] flex flex-col justify-between"
        }
      >
        <h1 className="font-bold text-5xl">Frequently Asked Questions</h1>

        <div className="questions gap-4 flex-direction-col items-start">
          {list &&
            list.map((item) => (
              <p className="questionPara flex-row-center p-2 border border-green rounded-[2rem]">
                <span
                  className={`py-1 px-3 font-semibold bg-${lightColor} text-${darkColor} rounded-[50%]`}
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
          className={`bg-${lightColor} text-${darkColor} font-semibold top-[30%] absolute p-4 rounded-lg`}
        >
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi l
        </p>
      </section>
    </div>
  );
};

export default FAQs;
