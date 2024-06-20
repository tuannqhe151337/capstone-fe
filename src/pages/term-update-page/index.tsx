import { useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { Variants, motion } from "framer-motion";
import { DatePickerInput } from "../../shared/date-picker-input";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const TermUpdate: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("monthly");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {``
    setSelectedOption(event.target.id);
  };

  const getClassNames = (id: string) => {
    return selectedOption === id
      ? "bg-blue-100 text-primary w-4/12 h-[66px] dark:bg-neutral-800/70 dark:border-neutral-500"
      : "bg-white text-neutral-600 w-4/12 h-[66px] dark:bg-neutral-800/50 dark:border-neutral-600";
  };

  const getTextColorClassNames = (id: string) => {
    return selectedOption === id
      ? "text-primary-600 font-extrabold opacity-70 dark:text-primary-500"
      : "text-neutral-700 font-extrabold opacity-70 dark:text-primary-700";
  };

  const getSubTextColorClassNames = (id: string) => {
    return selectedOption === id
      ? "text-primary-500 text-sm font-bold opacity-70 dark:text-primary-500"
      : "text-neutral-500 text-sm font-bold opacity-70 dark:text-primary-600";
  };

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-bold text-2xl w-fit ml-7">
            Term management <span className="ml-3">{`>`}</span>{" "}
            <span className="ml-3 font-bold">Term detail</span>
            <span className="ml-3">{`>`}</span>{" "}
            <span className="ml-3 font-extrabold">Update</span>
          </p>
        </div>
      </BubbleBanner>

      <div className="border pb-12 mt-10 rounded-lg dark:border-neutral-800 dark:shadow-black flex flex-col">
        <motion.div
          variants={childrenAnimation}
          className=" custom-wrapper w-10/12 mx-auto mt-8 border py-2 px-6 rounded font-bold text-xl text-neutral-600/70 dark:border-neutral-600 dark:text-neutral-500"
        >
          Financial plan December Q3 2021
        </motion.div>
        <div className="w-10/12 mx-auto">
          <div className="flex flex-col flex-wrap gap-0.5 mt-8">
            <motion.div
              className="text-sm font-semibold text-neutral-400 dark:font-bold dark:text-neutral-500"
              variants={childrenAnimation}
            >
              Start date
            </motion.div>
            <motion.div
              variants={childrenAnimation}
              className="custom-wrapper w-[200px]"
            >
              <DatePickerInput value={new Date()} allowEmpty />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-row gap-6 pt-10 w-full"
            variants={childrenAnimation}
          >
            <div
              className={`flex flex-row items-center border rounded p-4 ${getClassNames(
                "monthly"
              )}`}
            >
              <div className="flex items-center mb-[0.125rem] mr-4 min-h-[1.5rem]">
                <input
                  className="relative float-left mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="inlineRadioOptions"
                  id="monthly"
                  value="monthly"
                  checked={selectedOption === "monthly"}
                  onChange={handleRadioChange}
                />
                <label
                  className="flex flex-col pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="monthly"
                >
                  <p className={getTextColorClassNames("monthly")}>Monthly</p>
                  <p className={getSubTextColorClassNames("monthly")}>
                    01/01/2022 - 01/02/2022
                  </p>
                </label>
              </div>
            </div>

            <div
              className={`flex flex-row items-center border rounded p-4 ${getClassNames(
                "quarterly"
              )}`}
            >
              <div className="flex items-center mb-[0.125rem] mr-4 min-h-[1.5rem]">
                <input
                  className="relative float-left mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="inlineRadioOptions"
                  id="quarterly"
                  value="quarterly"
                  checked={selectedOption === "quarterly"}
                  onChange={handleRadioChange}
                />
                <label
                  className="flex flex-col pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="quarterly"
                >
                  <p className={getTextColorClassNames("quarterly")}>
                    Quarterly
                  </p>
                  <p className={getSubTextColorClassNames("quarterly")}>
                    01/01/2022 - 01/04/2022
                  </p>
                </label>
              </div>
            </div>

            <div
              className={`flex flex-row items-center border rounded p-4 ${getClassNames(
                "halfyear"
              )}`}
            >
              <div className="flex items-center mb-[0.125rem] mr-4 min-h-[1.5rem]">
                <input
                  className="relative float-left mr-2 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  name="inlineRadioOptions"
                  id="halfyear"
                  value="halfyear"
                  checked={selectedOption === "halfyear"}
                  onChange={handleRadioChange}
                />
                <label
                  className="flex flex-col pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="halfyear"
                >
                  <p className={getTextColorClassNames("halfyear")}>
                    Half year
                  </p>
                  <p className={getSubTextColorClassNames("halfyear")}>
                    01/01/2022 - 01/06/2022
                  </p>
                </label>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col flex-wrap gap-0.5 mt-8">
            <motion.div
              className="text-sm font-semibold text-neutral-400 dark:font-bold dark:text-neutral-500"
              variants={childrenAnimation}
            >
              Plan due date
            </motion.div>
            <motion.div
              variants={childrenAnimation}
              className="custom-wrapper w-[200px]"
            >
              <DatePickerInput value={new Date()} allowEmpty />
            </motion.div>
          </div>
        </div>

        {/* Buttons */}
        <motion.div
          className="flex flex-row flex-wrap items-center gap-5 mt-12 w-10/12 mx-auto"
          variants={childrenAnimation}
        >
          <Button variant="tertiary" className="w-[300px]">
            Back
          </Button>
          <Button containerClassName="flex-1">Create new plan</Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
