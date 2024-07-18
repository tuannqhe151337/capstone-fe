import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { produce } from "immer";
import { SearchBox } from "../../shared/search-box";
import { Pagination } from "../../shared/pagination";
import { TermList } from "./component/term-list";
import {
  ListTermWhenCreatePlanParameters,
  TermCreatePlan,
  useLazyGetListTermWhenCreatePlanQuery,
} from "../../providers/store/api/termApi";

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

interface Props {
  hide?: boolean;
  onTermSelected: (term: TermCreatePlan) => any;
}

export const ChooseTermStage: React.FC<Props> = ({ hide, onTermSelected }) => {
  // Pagination
  const [page, setPage] = useState<number>(1);

  // Searchbox
  const [searchboxValue, setSearchboxValue] = useState<string>("");

  // Mutation
  const [getListTermWhenCreatePlan, { data, isFetching }] =
    useLazyGetListTermWhenCreatePlanQuery();

  // Fetch list term on change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const paramters: ListTermWhenCreatePlanParameters = {
        query: searchboxValue,
        page,
        pageSize: 5,
      };

      getListTermWhenCreatePlan(paramters, true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchboxValue, page, hide]);

  return (
    <motion.div
      className="pt-6"
      initial={AnimationStage.HIDDEN}
      animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <motion.div variants={childrenAnimation}>
        <SearchBox
          autoFocus
          value={searchboxValue}
          onChange={(e) => {
            setSearchboxValue(e.currentTarget.value);
          }}
        />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TermList
          hide={hide}
          isFetching={isFetching}
          terms={data?.data || []}
          onClick={(term) => {
            onTermSelected && onTermSelected(term);
          }}
        />
      </motion.div>

      <motion.div className="mt-auto" variants={childrenAnimation}>
        <Pagination
          page={page}
          totalPage={data?.pagination.numPages || 1}
          onPageChange={(page) => {
            page ? setPage(page) : setPage(1);
          }}
          onPrevious={() => {
            setPage(
              produce((page) => {
                if (page === null || page === undefined) {
                  return data?.pagination.numPages;
                } else if (page > 1) {
                  return page - 1;
                }
              })
            );
          }}
          onNext={() => {
            setPage(
              produce((page) => {
                if (
                  page === null ||
                  page === undefined ||
                  !data?.pagination.numPages
                ) {
                  return 1;
                } else if (page < data?.pagination.numPages) {
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
