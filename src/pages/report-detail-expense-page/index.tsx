import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { TableReportExpenses } from "../../widgets/table-report-expense";
import { ListReportExpenseFilter } from "../../widgets/list-report-expense-filter";
import {
  ListReportExpenseParameters,
  ReportExpense,
  useLazyFetchReportExpensesQuery,
} from "../../providers/store/api/reportsAPI";
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

interface Row extends ReportExpense {
  isFetching?: boolean;
}

const generateEmptyReportExpenses = (total: number): Row[] => {
  const reportExpenses: Row[] = [];

  for (let i = 0; i < total; i++) {
    reportExpenses.push({
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

  return reportExpenses;
};

export const ReportDetailExpensePage: React.FC = () => {
  const [listSelectedIndex, _] = useState<Set<number>>(
    new Set()
  );

  // Query
  const [fetchReport, { data, isFetching }] =
    useLazyFetchReportExpensesQuery();

  const { reportId } = useParams<{ reportId: string }>();

  // Searchbox state
  const [searchboxValue, setSearchboxValue] = useState<string>("");
  const [costTypeId, setCostTypeId] = useState<number | null>();
  const [statusId, setStatusId] = useState<number | null>();
  const [page, setPage] = useState<number>(1);

  const [_showReviewExpense, setShowReviewExpense] = useState<boolean>(false);

  useEffect(() => {
    if (listSelectedIndex.size !== 0) {
      setShowReviewExpense(true);
    } else {
      setShowReviewExpense(false);
    }
  }, [listSelectedIndex]);

  // Is data empty (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(!isFetching && data && data.data && data.data.length === 0);
  }, [data]);

  // Fetch report expense on change
  useEffect(() => {
    if (reportId) {
      const timeoutId = setTimeout(() => {
        const paramters: ListReportExpenseParameters = {
          reportId: parseInt(reportId, 10),
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
        fetchReport(paramters, true);
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
      <ListReportExpenseFilter
        className="pl-3 mt-7"
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

      <TableReportExpenses
        expenses={isFetching ? generateEmptyReportExpenses(10) : data?.data}
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
