import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { Variants, motion } from "framer-motion";
import { Pagination } from "../../shared/pagination";
import {
  ListAnnualReportExpenseParameters,
  useLazyFetchAnnualReportExpenseQuery,
} from "../../providers/store/api/annualsAPI";
import { formatViMoney } from "../../shared/utils/format-vi-money";
import { DepartmentFilter } from "../../entities/department-filter";
import { cn } from "../../shared/utils/cn";
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

interface Props {}

export const AnnualReportDetailTablePage: React.FC<Props> = () => {
  // Get annual report expense
  const { annualReportId } = useParams<{ annualReportId: string }>();

  const [fetchAnnualReportExpense, { data: annual, isFetching, isSuccess }] =
    useLazyFetchAnnualReportExpenseQuery();

  const [costTypeId, setCostTypeId] = useState<number | null>();
  const [departmentId, setDepartmentId] = useState<number | null>();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (annualReportId) {
        const paramters: ListAnnualReportExpenseParameters = {
          annualReportId: parseInt(annualReportId, 10),
          costTypeId,
          departmentId,
          page,
          pageSize: 10,
        };

        if (costTypeId) {
          paramters.costTypeId = costTypeId;
        }

        if (departmentId) {
          paramters.departmentId = departmentId;
        }

        fetchAnnualReportExpense(paramters, true);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [page, annualReportId, departmentId, costTypeId]);

  // Is data empty (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(
      !isFetching && annual && annual.data && annual.data.length === 0
    );
  }, [annual]);

  if (!isFetching && isSuccess && !annual) return <p>No annual found</p>;

  return (
    <motion.div
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <motion.div className="flex justify-end mt-4">
        <motion.div variants={childrenAnimation} className="mr-4 ">
          <CostTypeFilter
            onChange={(option) => {
              setCostTypeId(option?.value);
            }}
          />
        </motion.div>

        <motion.div variants={childrenAnimation} className="mr-4">
          <DepartmentFilter
            onChange={(option) => {
              setDepartmentId(option?.value);
            }}
          />
        </motion.div>
      </motion.div>

      <motion.table
        className="text-center text-sm font-light mt-6 min-w-full overflow-hidden "
        variants={childrenAnimation}
      >
        <thead className="font-medium border-b-2 border-primary-100 dark:border-neutral-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Total expenses
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Biggest expenditure
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Cost type
            </th>
          </tr>
        </thead>
        <tbody>
          {annual?.data &&
            annual.data.map((row, index) => (
              <tr
                key={row.expenseId}
                className={clsx({
                  "text-neutral-500 dark:text-neutral-400 bg-whitedark:bg-neutral-800/50 ":
                    index % 2 === 0,
                  "text-neutral-500 dark:text-neutral-400 bg-primary-50 dark:bg-neutral-800/80":
                    index % 2 === 1,
                })}
              >
                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {isFetching ? (
                    <span
                      className={cn(
                        "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded w-[200px]"
                      )}
                    ></span>
                  ) : (
                    <>{row.department.name}</>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {isFetching ? (
                    <span
                      className={cn(
                        "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded w-[200px]"
                      )}
                    ></span>
                  ) : (
                    <>{formatViMoney(row.totalExpenses)}</>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {isFetching ? (
                    <span
                      className={cn(
                        "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded w-[200px]"
                      )}
                    ></span>
                  ) : (
                    <>{formatViMoney(row.biggestExpenditure)}</>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {isFetching ? (
                    <span
                      className={cn(
                        "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded w-[200px]"
                      )}
                    ></span>
                  ) : (
                    <>{row.costType.name}</>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </motion.table>

      {isDataEmpty && (
        <div className="flex flex-row flex-wrap items-center justify-center w-full min-h-[250px] text-lg font-semibold text-neutral-400 italic">
          No data found.
        </div>
      )}
      {!isDataEmpty && (
        <motion.div
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          variants={animation}
        >
          <Pagination
            className="mt-6"
            // {isFetching ? generateEmptyAnnualExpenses(10) : annual?.data}
            // isDataEmpty={isDataEmpty}
            page={page}
            totalPage={annual?.pagination.numPages || 1}
            onNext={() =>
              setPage((prevPage) => {
                if (annual?.pagination.numPages) {
                  if (prevPage + 1 > annual?.pagination.numPages) {
                    return annual?.pagination.numPages;
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
                if (annual?.pagination.numPages) {
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
          />
        </motion.div>
      )}
    </motion.div>
  );
};
