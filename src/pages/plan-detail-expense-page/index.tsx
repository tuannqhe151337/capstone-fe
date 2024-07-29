import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { TablePlanExpenses } from "../../widgets/table-plan-expense";
import { ListPlanDetailFilter } from "../../widgets/list-plan-detail-filter";
import { produce } from "immer";
import {
  ListPlanExpenseParameters,
  PlanExpense,
  plansApi,
  useApproveExpensesMutation,
  useDenyExpensesMutation,
  useLazyFetchPlanExpensesQuery,
} from "../../providers/store/api/plansApi";
import { useParams } from "react-router-dom";
import { useMeQuery } from "../../providers/store/api/authApi";
import { LocalStorageItemKey, Role } from "../../providers/store/api/type";
import { useAppDispatch } from "../../providers/store/hook";
import { toast } from "react-toastify";
import { usePlanDetailContext } from "../plan-detail-root-page";
import { downloadFileFromServer } from "../../shared/utils/download-file-from-server";

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
        code: "NEW",
        name: "",
      },
      isFetching: true,
    });
  }

  return planExpenses;
};

const pageSize = 10;

export const PlanDetailExpensePage: React.FC = () => {
  // Dispatch
  const dispatch = useAppDispatch();

  // Get show upload modal method
  const { plan, setShowReuploadModal, showReuploadButton } =
    usePlanDetailContext();

  // Get params
  const { planId } = useParams<{ planId: string }>();

  // Get me's data
  const { data: me } = useMeQuery();

  // Selectable row
  const [listSelectedId, setListSelectedId] = useState<Set<number>>(new Set());
  const [showReviewExpense, setShowReviewExpense] = useState<boolean>(false);
  useEffect(() => {
    if (listSelectedId.size !== 0) {
      setShowReviewExpense(true);
    } else {
      setShowReviewExpense(false);
    }
  }, [listSelectedId]);

  // Approve and deny mutation
  const [approveExpenses, { isSuccess: approveExpensesSuccess }] =
    useApproveExpensesMutation();
  const [denyExpenses, { isSuccess: denyExpensesSuccess }] =
    useDenyExpensesMutation();

  // Query
  const [fetchPlanExpense, { data, isFetching }] =
    useLazyFetchPlanExpensesQuery();

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
          planId: parseInt(planId),
          query: searchboxValue,
          page,
          pageSize,
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
  }, [searchboxValue, page, costTypeId, statusId, planId]);

  // Show successfully toast on approve or deny expenses
  useEffect(() => {
    if (approveExpensesSuccess) {
      toast("Approve expenses successfully!", { type: "success" });
    }
  }, [approveExpensesSuccess]);

  useEffect(() => {
    if (denyExpensesSuccess) {
      toast("Deny expenses successfully!", { type: "success" });
    }
  }, [denyExpensesSuccess]);

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
        onApproveExpensesClick={() => {
          if (planId) {
            let planIdInt: number;
            try {
              // Parse planId to int
              if (typeof planId === "string") {
                planIdInt = parseInt(planId);
              } else {
                planIdInt = planId;
              }

              // Call API approve expenses
              approveExpenses({
                planId: planIdInt,
                listExpenseId: Array.from(listSelectedId),
              });

              // Manually update cache
              dispatch(
                plansApi.util.updateQueryData(
                  "fetchPlanExpenses",
                  {
                    planId: planIdInt,
                    costTypeId,
                    query: searchboxValue,
                    page,
                    pageSize,
                  },
                  (draft) => {
                    draft.data.forEach((expense, index) => {
                      if (listSelectedId.has(expense.expenseId)) {
                        (draft.data[index].status.code = "APPROVED"),
                          (draft.data[index].status.name = "Approved");
                      }
                    });
                  }
                )
              );
            } catch {}
          }
        }}
        onDenyExpensesClick={() => {
          if (planId) {
            // Parse planId to int
            let planIdInt: number;
            try {
              if (typeof planId === "string") {
                planIdInt = parseInt(planId);
              } else {
                planIdInt = planId;
              }

              // Call API deny expenses
              denyExpenses({
                planId: planIdInt,
                listExpenseId: Array.from(listSelectedId),
              });

              // Manually update cache
              dispatch(
                plansApi.util.updateQueryData(
                  "fetchPlanExpenses",
                  {
                    planId: planIdInt,
                    costTypeId,
                    query: searchboxValue,
                    page,
                    pageSize,
                  },
                  (draft) => {
                    draft.data.forEach((expense, index) => {
                      if (listSelectedId.has(expense.expenseId)) {
                        (draft.data[index].status.code = "DENIED"),
                          (draft.data[index].status.name = "Denied");
                      }
                    });
                  }
                )
              );
            } catch {}
          }
        }}
        showReupload={showReuploadButton}
        onDownloadClick={() => {
          const token = localStorage.getItem(LocalStorageItemKey.TOKEN);

          if (token && planId) {
            downloadFileFromServer(
              `${
                import.meta.env.VITE_BACKEND_HOST
              }plan/download/last-version-xlsx?planId=${planId}`,
              token,
              plan.name
            );
          }
        }}
        onReuploadClick={() => {
          setShowReuploadModal(true);
        }}
      />

      <TablePlanExpenses
        isRowSelectable={me?.role.code === Role.ACCOUNTANT}
        listSelectedId={listSelectedId}
        onRowClick={(expenseId) => {
          setListSelectedId(
            produce((state) => {
              if (state.has(expenseId)) {
                state.delete(expenseId);
              } else {
                state.add(expenseId);
              }

              return state;
            })
          );
        }}
        expenses={isFetching ? generateEmptyPlanExpenses(10) : data?.data}
        isDataEmpty={isDataEmpty}
        page={page}
        totalPage={data?.pagination.numPages}
        onNext={() => {
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
          });

          // Reset selected index
          setListSelectedId(new Set());
        }}
        onPageChange={(page) => {
          setPage(page || 1);

          // Reset selected index
          setListSelectedId(new Set());
        }}
        onPrevious={() => {
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
          });

          // Reset selected index
          setListSelectedId(new Set());
        }}
        isFetching={isFetching}
      />
    </motion.div>
  );
};
