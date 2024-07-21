import { AnimatePresence, Variants, motion } from "framer-motion";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { RiDeleteRow } from "react-icons/ri";
import { Button } from "../../shared/button";
import { FaDownload, FaListCheck } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FaFilter } from "react-icons/fa6";
import { useState } from "react";
import { TERipple, TESelect } from "tw-elements-react";
import { useCloseOutside } from "../../shared/hooks/use-close-popup";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { DepartmentFilter } from "../../entities/department-filter";
import { StatusPlanFilter } from "../../entities/status-plan-filter";
import { StatusTermFilter } from "../../entities/status-term-filter";
import { CostTypeFilter } from "../../entities/cost-type-filter";

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

const heightPlaceholderAnimation: Variants = {
  hidden: {
    height: 0,
    transition: {
      delay: 0.5,
    },
  },
  visible: {
    height: 60,
  },
};

const ReviewExpenseWidth = 360;
const widthPlaceholderAnimation: Variants = {
  hidden: {
    height: 0,
    transition: {
      delay: 0.4,
    },
  },
  visible: {
    width: ReviewExpenseWidth,
    transition: {
      duration: 0.4,
    },
  },
};

interface Props {
  className?: string;
  searchboxValue?: string;

  onSearchboxChange?: (value: string) => any;
  onCostTypeIdChange?: (costTypeId: number | null | undefined) => any;
  onStatusIdChange?: (statusId: number | null | undefined) => any;
}

export const ListReportExpenseFilter: React.FC<Props> = ({
  className,
  searchboxValue,
  onSearchboxChange,
  onCostTypeIdChange,
  onStatusIdChange,
}) => {
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
    <div className={className}>
      <motion.div
        className={"flex flex-row flex-wrap items-center gap-2"}
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        variants={staggerChildrenAnimation}
      >
        {/* Search box */}
        <motion.div className="flex-1" variants={childrenAnimation}>
          <SearchBox
            value={searchboxValue}
            onChange={(e) =>
              onSearchboxChange && onSearchboxChange(e.currentTarget.value)
            }
          />
        </motion.div>

        {/* Review expenses section */}
        <div className="flex flex-row flex-wrap items-center ml-2">
          {/* Filter icon */}
          <motion.div variants={childrenAnimation}>
            <IconButton
              onClick={() => {
                setShowFillterBtn((prevState) => !prevState);
              }}
            >
              <FaFilter className="text-xl text-primary -mb-0.5 mt-0.5" />
            </IconButton>
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
                      className="w-max"
                      onClick={() => {}}
                    >
                      <div className="flex flex-row flex-wrap items-center px-5 py-3 cursor-pointer select-none hover:bg-primary-100 dark:hover:bg-primary-900 text-base font-bold duration-200">
                        <FaDownload className="mb-0.5 mr-3 text-primary-400 dark:text-neutral-400" />

                        <p className="mt-0.5 text-primary-400 dark:text-neutral-400">
                          Download report
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

      {/* Filter dropdown section */}
      <div className="relative w-full">
        <AnimatePresence>
          {showFillterBtn && (
            <motion.div
              className="absolute w-full"
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              exit={AnimationStage.HIDDEN}
              variants={staggerChildrenAnimation}
            >
              <motion.div className="flex justify-end mt-4">
                <motion.div variants={childrenAnimation} className="mr-4 ">
                  <CostTypeFilter
                    onChange={(option) => {
                      onCostTypeIdChange && onCostTypeIdChange(option?.value);
                    }}
                  />
                </motion.div>

                <motion.div variants={childrenAnimation} className="mr-4">
                  <StatusTermFilter
                    onChange={(option) => {
                      onStatusIdChange && onStatusIdChange(option?.value);
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={AnimationStage.HIDDEN}
          animate={
            showFillterBtn ? AnimationStage.VISIBLE : AnimationStage.HIDDEN
          }
          variants={heightPlaceholderAnimation}
        />
      </div>
    </div>
  );
};
