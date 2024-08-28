import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { FaFilter } from "react-icons/fa6";
import { TermFilter } from "../../entities/term-filter";
import { StatusReportFilter } from "../../entities/status-report-filter";

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
``;
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

interface Props {
  searchboxValue?: string;
  onSearchboxChange?: (value: string) => any;
  onTermIdChange?: (termId: number | null | undefined) => any;
  onStatusIdChange?: (termId: number | null | undefined) => any;
}

export const ListReportFilter: React.FC<Props> = ({
  searchboxValue,
  onSearchboxChange,
  onTermIdChange,
  onStatusIdChange,
}) => {
  // UI: show 3 select box
  const [showFilterBtn, setShowFilterBtn] = useState(false);

  const filterBtnGroup = (
    <motion.div
      className="absolute w-full"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <motion.div className="flex justify-end mt-4">
        <motion.div variants={childrenAnimation} className="mr-4 ">
          <TermFilter
            onChange={(option) => {
              onTermIdChange && onTermIdChange(option?.value);
            }}
          />
        </motion.div>
        <motion.div variants={childrenAnimation} className="mr-4 ">
          <StatusReportFilter
            onChange={(option) => {
              onStatusIdChange && onStatusIdChange(option?.value);
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <div className="flex flex-row flex-wrap w-full items-center mt-14 ">
        <div className="flex-1">
          <SearchBox
            value={searchboxValue}
            onChange={(e) =>
              onSearchboxChange && onSearchboxChange(e.currentTarget.value)
            }
          />
        </div>
        <div className="pl-3 flex flex-row flex-wrap items-center">
          <div className="relative z-10 mr-3">
            <IconButton
              className="px-3"
              onClick={() => {
                setShowFilterBtn((prevState) => !prevState);
              }}
            >
              <FaFilter className="text-xl text-primary-500/80 hover:text-primary-500/80 mt-1" />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <AnimatePresence>{showFilterBtn && filterBtnGroup}</AnimatePresence>

        <motion.div
          initial={AnimationStage.HIDDEN}
          animate={
            showFilterBtn ? AnimationStage.VISIBLE : AnimationStage.HIDDEN
          }
          variants={heightPlaceholderAnimation}
        />
      </div>
    </>
  );
};
