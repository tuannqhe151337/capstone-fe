import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { TablePlanExpenses } from "../../widgets/table-plan-expense";
import { ListPlanDetailFilter } from "../../widgets/list-plan-detail-filter";
import { produce } from "immer";
import {
  ListPlanExpenseParameters,
  PlanExpense,
  useLazyFetchPlanExpensesQuery,
} from "../../providers/store/api/plansApi";
import { useParams } from "react-router-dom";

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

interface Row extends PlanExpense {
  isFetching?: boolean;
}

const generateEmptyPlanExpenses = (total: number): Row[] => {
  const planExpenses: Row[] = [];

  for (let i = 0; i < total; i++) {
    planExpenses.push({
      expenseId: i,
      name: "",
      costType: {
        costTypeId: 0,
        name: "",
        code: "",
      },
      unitPrice: 0,
      amount: 0,
      projectName: "",
      supplierName: "",
      pic: "",
      notes: "",
      status: {
        statusId: 0,
        code: "",
        name: "",
      },
      isFetching: true,
    });
  }

  return planExpenses;
};

export const PlanDetailExpensePage: React.FC = () => {
  const [listSelectedIndex, setListSelectedIndex] = useState<Set<number>>(
    new Set()
  );
  const [showReviewExpense, setShowReviewExpense] = useState<boolean>(false);
  useEffect(() => {
    if (listSelectedIndex.size !== 0) {
      setShowReviewExpense(true);
    } else {
      setShowReviewExpense(false);
    }
  }, [listSelectedIndex]);

  // Query
  const [fetchPlanExpense, { data, isFetching }] =
    useLazyFetchPlanExpensesQuery();

  const { planId } = useParams<{ planId: string }>();

  // Searchbox state
  const [searchboxValue, setSearchboxValue] = useState<string>("");
  const [costTypeId, setCostTypeId] = useState<number | null>();
  const [statusId, setStatusId] = useState<number | null>();
  const [page, setPage] = useState<number>(1);

  // Is data empty (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(!isFetching && data && data.data && data.data.length === 0);
  }, [data]);

  // Fetch report expense on change
  useEffect(() => {
    if (planId) {
      const timeoutId = setTimeout(() => {
        const paramters: ListPlanExpenseParameters = {
          planId: parseInt(planId, 10),
          query: searchboxValue,
          page,
          pageSize: 10,
        };

        if (costTypeId) {
          paramters.costTypeId = costTypeId;
        }

        if (statusId) {
          paramters.statusId = statusId;
        }
        fetchPlanExpense(paramters, true);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [searchboxValue, page, costTypeId, statusId]);

  return (
    <motion.div
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <ListPlanDetailFilter
        className="pl-3 mt-7"
        showReviewExpense={showReviewExpense}
        searchboxValue={searchboxValue}
        onSearchboxChange={(value) => {
          setSearchboxValue(value);
        }}
        onCostTypeIdChange={(costTypeId) => {
          setCostTypeId(costTypeId);
        }}
        onStatusIdChange={(statusId) => {
          setStatusId(statusId);
        }}
      />

      <TablePlanExpenses
        listSelectedIndex={listSelectedIndex}
        // expenses={DUMMY_EXPENSES}
        onRowClick={(index) => {
          setListSelectedIndex(
            produce((state) => {
              if (state.has(index)) {
                state.delete(index);
              } else {
                state.add(index);
              }

              return state;
            })
          );
        }}
        expenses={isFetching ? generateEmptyPlanExpenses(10) : data?.data}
        isDataEmpty={isDataEmpty}
        page={page}
        totalPage={data?.pagination.numPages}
        onNext={() =>
          setPage((prevPage) => {
            if (data?.pagination.numPages) {
              if (prevPage + 1 > data?.pagination.numPages) {
                return data?.pagination.numPages;
              } else {
                return prevPage + 1;
              }
            } else {
              return 1;
            }
          })
        }
        onPageChange={(page) => {
          setPage(page || 1);
        }}
        onPrevious={() =>
          setPage((prevPage) => {
            if (data?.pagination.numPages) {
              if (prevPage === 1) {
                return 1;
              } else {
                return prevPage - 1;
              }
            } else {
              return 1;
            }
          })
        }
        isFetching={isFetching}
      />
    </motion.div>
  );
};
