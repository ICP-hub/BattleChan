import React from "react";
import list from './FAQList'
import bg from "../../../images/faq_bg.png";

const FAQs = () => {
  const darkColor = document.documentElement.className;
  const className = "LandingPage__FAQs";

  return (
    <div
      className={
        className +
        ` w-full h-[100%] ${
          darkColor == "dark" ? "bg-[#121212]" : "bg-light"
        } text-dark dark:text-light flex-direction-row bg-right-top bg-contain bg-no-repeat`
      }
      style={darkColor == "dark" ? { backgroundImage: `url(${bg})` } : {}}
    >
      {/* Questions section */}
      <section
        className={
          className +
          "__left" +
          " h-full laptop:pl-32 tablet:px-16 px-10 py-20 xl:w-[55%] w-full tablet:gap-20 gap-16 flex flex-col"
        }
      >
        <h1 className="font-bold laptop:text-5xl text-4xl">Frequently Asked Questions</h1>

        <div className="questions gap-4 flex-direction-col items-start">
          {list &&
            list.map((item) => (
              <p className="questionPara flex-row-center tablet:p-2 p-1 border border-green rounded-[2rem]">
                <span
                  className={`py-1 px-3 font-semibold tablet:text-base text-sm dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
                >
                  {item.index}
                </span>

                <span className="tablet:mx-8 mx-4">{item.question}</span>
              </p>
            ))}
        </div>
      </section>

      <section
        className={
          className +
          "__right" +
          " xl:w-[45%] w-0 xl:flex hidden xl:pr-32 pr-8 flex-col-center relative"
        }
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
