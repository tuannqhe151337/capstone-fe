import { AnimatePresence, Variants, motion } from "framer-motion";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { RiDeleteRow } from "react-icons/ri";
import { Button } from "../../shared/button";
import { FaListCheck } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FaFilter } from "react-icons/fa6";
import { useState } from "react";
import { TERipple } from "tw-elements-react";
import { useCloseOutside } from "../../shared/hooks/use-close-popup";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { CostTypeFilter } from "../../entities/cost-type-filter";
import { StatusPlanFilter } from "../../entities/status-plan-filter";

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
  showReviewExpense?: boolean;
  searchboxValue?: string;
  onSearchboxChange?: (value: string) => any;
  onCostTypeIdChange?: (costTypeId: number | null | undefined) => any;
  onStatusIdChange?: (statusId: number | null | undefined) => any;
}

export const ListPlanDetailFilter: React.FC<Props> = ({
  className,
  showReviewExpense,
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
          <div className="relative self-start mt-0.5">
            <AnimatePresence>
              {showReviewExpense && (
                <div
                  className="absolute right-0 top-0"
                  style={{ width: ReviewExpenseWidth }}
                >
                  <motion.div
                    className="flex flex-row flex-wrap items-center"
                    initial={AnimationStage.HIDDEN}
                    animate={AnimationStage.VISIBLE}
                    variants={staggerChildrenAnimation}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div variants={childrenAnimation}>
                      <Button variant="error" containerClassName="mr-3">
                        <div className="flex flex-row flex-wrap items-center gap-3">
                          <RiDeleteRow className="text-xl" />
                          <p className="text-sm font-semibold">Deny expense</p>
                        </div>
                      </Button>
                    </motion.div>

                    <motion.div variants={childrenAnimation}>
                      <Button containerClassName="mr-3">
                        <div className="flex flex-row flex-wrap items-center gap-3">
                          <FaListCheck className="text-lg" />
                          <p className="text-sm font-semibold">
                            Approve expense
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <motion.div
              initial={AnimationStage.HIDDEN}
              animate={
                showReviewExpense
                  ? AnimationStage.VISIBLE
                  : AnimationStage.HIDDEN
              }
              variants={widthPlaceholderAnimation}
            />
          </div>

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
                        <BsFillFileEarmarkArrowDownFill className="mb-0.5 mr-3 text-primary-400 dark:text-neutral-400" />
                        <p className="mt-0.5 text-primary-400 dark:text-neutral-400">
                          Download plan
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
                  <StatusPlanFilter
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
