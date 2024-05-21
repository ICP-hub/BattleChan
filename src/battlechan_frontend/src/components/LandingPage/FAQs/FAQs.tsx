import { useState } from "react";
import list from "./FAQList";
import bg from "../../../images/faq_bg.png";
import { FaAngleRight } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const FAQs = () => {
  const [answerKey, setAnserKey] = useState(1);
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
          " h-full xl:pl-32 laptop:px-10 tablet:px-32 small_phone:px-10 px-8 phone:py-20 py-10 laptop:w-[55%] w-full laptop:gap-20 phone:gap-16 gap-12 flex flex-col"
        }
      >
        <h1 className="font-bold laptop:text-5xl phone:text-4xl text-3xl text-start">
          Frequently Asked Questions
        </h1>

        <div className="questions gap-4 flex-direction-col items-start">
          {list &&
            list.map((item, i) => (
              <div className="flex flex-col gap-y-2 p-2 border border-green rounded-[1.5rem]">
                <p
                  key={i}
                  className="cursor-pointer questionPara flex-row-center justify-between"
                >
                  <p className="flex-row-center">
                    <span
                      className={`py-1 phone:px-3 px-2.5 font-semibold tablet:text-base phone:text-sm text-xs text-light dark:text-dark bg-dark dark:bg-light rounded-[50%]`}
                    >
                      {item.index}
                    </span>
                    <span
                      onClick={() => setAnserKey(item.index)}
                      className="flex flex-row items-center gap-2 laptop:ml-8 phone:ml-4 ml-2 laptop:text-base text-sm"
                    >
                      {item.question}
                    </span>
                  </p>

                  <span>
                    {item.index != answerKey ? (
                      <RiArrowDropDownLine
                        className="laptop:hidden text-3xl"
                        onClick={() => setAnserKey(item.index)}
                      />
                    ) : (
                      <FaAngleRight
                        className="laptop:hidden text-lg m-2"
                        onClick={() => setAnserKey((0))}
                      />
                    )}
                  </span>
                </p>

                {item.index == answerKey && (
                  <p className="laptop:text-base text-sm laptop:hidden block p-2">
                    <span className="font-bold">Answer:</span> {item.ans}
                  </p>
                )}
              </div>
            ))}
        </div>
      </section>

      {list.map(
        (item) =>
          item.index == answerKey && (
            <section
              className={
                className +
                "__right" +
                " " +
                "laptop:w-[45%] w-0 laptop:flex hidden xl:pr-32 pr-8 flex-col-center relative"
              }
            >
              <p
                className={`text-light dark:text-dark bg-dark dark:bg-light font-semibold top-[30%] absolute p-4 rounded-lg`}
              >
                Answer: {item.ans}
              </p>
            </section>
          )
      )}
    </div>
  );
};

export default FAQs;
