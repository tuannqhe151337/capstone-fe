import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { Variants, motion } from "framer-motion";

import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../../shared/button";
import { useState } from "react";
import { DatePickerInput } from "../../shared/date-picker-input";
import { TEInput } from "tw-elements-react";

interface Props {
  show: boolean;
  onClose: () => any;
}

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

export const TermCreateModal: React.FC<Props> = ({ show, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("monthly");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ``;
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
    <Modal
      className="w-[70vw] xl:w-[66vw] h-max flex flex-col justify-center items-center"
      show={show}
      onClose={onClose}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-10 py-8">
        <div className="font-extrabold text-3xl text-primary-500">
          Create term
        </div>

        <div className="absolute top-3 right-5">
          <IconButton
            className="hover:bg-neutral-100"
            onClick={(event) => {
              event.stopPropagation();
              onClose && onClose();
            }}
          >
            <IoClose className="text-3xl text-neutral-500" />
          </IconButton>
        </div>

        <motion.div variants={childrenAnimation} className="w-11/12 mx-auto">
          <TEInput
            type="text"
            label="Term name"
            className="bg-white dark:bg-neutral-900 custom-wrapper mt-8 border rounded font-bold opacity-70 "
            autoFocus
          />
        </motion.div>
        <div className="w-11/12 mx-auto">
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

        <div className="flex flex-row flex-wrap w-11/12 mt-10 gap-6">
          <Button containerClassName="flex-1" className="font-bold p-3">
            Create new term
          </Button>
        </div>
      </div>
    </Modal>
  );
};
