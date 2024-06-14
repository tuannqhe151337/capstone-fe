import { useState } from "react";
import { Variants, motion } from "framer-motion";
import { SearchBox } from "../../../shared/search-box";
import { Term, TermList } from ".././component/term-list";
import { Pagination } from "../../../shared/pagination";
import { produce } from "immer";

const DUMMY_TERM_LIST = [
  {
    id: 1,
    termName: "Financial plan December Q3 2021",
    type: "Quarterly",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    termName: "Financial plan December Q3 2021",
    type: "Half year",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 3,
    termName: "Financial plan December Q3 2021",
    type: "Quarterly",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 4,
    termName: "Financial plan December 2021",
    type: "Monthly",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 5,
    termName: "Financial plan December Q3 2021",
    type: "Monthly",
    startDate: new Date(),
    endDate: new Date(),
  },
];

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
  [AnimationStage.HIDDEN]: {
    opacity: 0.2,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const totalPage = 20;

interface Props {
  hide?: boolean;
  onTermSelected: (term: Term) => any;
}

export const ChooseTermStage: React.FC<Props> = ({ hide, onTermSelected }) => {
  const [page, setPage] = useState<number | undefined | null>(1);

  return (
    <motion.div
      className="pt-6"
      initial={AnimationStage.HIDDEN}
      animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <motion.div variants={childrenAnimation}>
        <SearchBox autoFocus />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TermList
          hide={hide}
          terms={DUMMY_TERM_LIST}
          onClick={(term) => {
            onTermSelected && onTermSelected(term);
          }}
        />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <Pagination
          page={page}
          totalPage={20}
          onPageChange={(page) => {
            setPage(page);
          }}
          onPrevious={() => {
            setPage(
              produce((page) => {
                if (page === null || page === undefined) {
                  return totalPage;
                } else if (page > 1) {
                  return page - 1;
                }
              })
            );
          }}
          onNext={() => {
            setPage(
              produce((page) => {
                if (page === null || page === undefined) {
                  return 1;
                } else if (page < totalPage) {
                  return page + 1;
                }
              })
            );
          }}
        />
      </motion.div>
    </motion.div>
  );
};
