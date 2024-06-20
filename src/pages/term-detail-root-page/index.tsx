import { AnimatePresence, Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Tag } from "../../shared/tag";
// import { OverviewCard } from "./ui/overview-card";
import {
  FaMoneyBillTrendUp,
  FaCoins,
  FaFilter,
  FaPlay,
  FaTrash,
} from "react-icons/fa6";
import TabList from "../../shared/tab-list";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCloseOutside } from "../../shared/hooks/useClosePopup";
import { IconButton } from "../../shared/icon-button";
import { HiDotsVertical } from "react-icons/hi";
import { TERipple } from "tw-elements-react";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { Button } from "../../shared/button";
import { MdEdit } from "react-icons/md";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      delayChildren: 0.15,
      duration: 0.15,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
      duration: 0.15,
    },
  },
};

const childrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

export const TermDetailRootPage: React.FC = () => {
  const navigate = useNavigate();

  // Filter section
  const [showFillterBtn, setShowFillterBtn] = useState(false);

  // Show dropdown options
  const [showOptions, setShowOptions] = useState(false);

  const ref = useCloseOutside({
    open: showOptions,
    onClose: () => {
      setShowOptions(false);
    },
  });

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-bold text-2xl w-fit ml-7">
            Term management <span className="ml-3">{`>`}</span>{" "}
            <span className="ml-3 font-extrabold">Term detail</span>
          </p>
        </div>
      </BubbleBanner>

      {/* Title */}
      <motion.div
        className="flex flex-row flex-wrap items-center mt-6 px-7"
        variants={childrenAnimation}
      >
        <p className="text-2xl font-extrabold text-primary mr-5">
          Financial plan December Q3 2021
        </p>

        <div className="flex flex-row flex-wrap gap-3">
          <Tag background="filled" variant="inProgress">
            In progress
          </Tag>
        </div>

        <div className="flex flex-row flex-wrap gap-3 ml-auto">
          {/* Filter icon */}
          <motion.div variants={childrenAnimation}>
            <Button
              className="flex flex-row flex-wrap py-1.5 px-3 mt-1"
              onClick={() => {
                navigate(`/term-management/update`);
              }}
            >
              <MdEdit className="text-white dark:text-neutral-300 text-base mr-2 mt-[1.25px]" />
              <div className="text-white dark:text-neutral-300 text-sm font-bold">
                Edit
              </div>
            </Button>
          </motion.div>

          {/* Three dots icon */}
          <motion.div variants={childrenAnimation}>
            <div className="relative" ref={ref}>
              <IconButton
                onClick={() => {
                  setShowOptions((prevState) => !prevState);
                }}
              >
                <HiDotsVertical className="text-xl text-primary" />
              </IconButton>

              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    className="absolute right-0 z-20 shadow bg-white dark:bg-neutral-800 rounded-lg mt-2 overflow-hidden"
                    initial={AnimationStage.HIDDEN}
                    animate={AnimationStage.VISIBLE}
                    exit={AnimationStage.HIDDEN}
                    variants={animation}
                  >
                    <TERipple
                      rippleColor="light"
                      className="w-[160px]"
                      onClick={() => {}}
                    >
                      <div className="w-full flex flex-row flex-wrap items-center px-5 py-3 cursor-pointer select-none hover:bg-primary-100 dark:hover:bg-primary-900 text-base font-bold duration-200">
                        <FaPlay className="mb-0.5 text-primary-400 dark:text-primary-600 mr-3 mt-[1.25px] dark:opacity-80" />
                        <p className="mt-0.5 text-primary-400 dark:text-primary-600 dark:opacity-80">
                          Start term
                        </p>
                      </div>
                    </TERipple>
                    <TERipple
                      rippleColor="light"
                      className="w-[160px]"
                      onClick={() => {}}
                    >
                      <div className="w-full flex flex-row flex-wrap items-center px-5 py-3 cursor-pointer select-none hover:bg-primary-100 dark:hover:bg-primary-900 text-base font-bold duration-200">
                        {/* <BsFillFileEarmarkArrowDownFill className="mb-0.5 mr-3 text-primary-400 dark:text-neutral-400" /> */}
                        <FaTrash className="mb-0.5 mr-3 text-red-400 dark:text-red-600 dark:opacity-80" />

                        <p className="mt-0.5 text-red-400 dark:text-red-600 dark:opacity-80">
                          Delete term
                        </p>
                      </div>
                    </TERipple>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-7 px-5">
        <div className="w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl py-7 px-8">
          <div className="border-b-2 border-b-neutral-200 dark:border-b-neutral-700">
            <TabList
              className="-mb-0.5"
              items={[
                { id: "information", name: "Detail" },
                { id: "plan", name: "Plan" },
                { id: "report", name: "Report" },
              ]}
              onItemChangeHandler={({ id }) => {
                switch (id) {
                  case "information":
                    navigate("./information");
                    break;

                  case "plan":
                    navigate("./plan");
                    break;

                  case "report":
                    navigate("./report");
                    break;

                  default:
                    break;
                }
              }}
            />
          </div>
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};
