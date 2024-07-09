import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { AnnualReport } from "../../providers/store/api/annualsAPI";
import { cn } from "../../shared/utils/cn";
import { formatISODate } from "../../shared/utils/format-iso-date";
import { formatViMoney } from "../../shared/utils/format-vi-money";
import { useNavigate } from "react-router-dom";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

export interface Row extends AnnualReport {
  isFetching?: boolean;
}

interface Props {
  onCreatePlanClick?: () => any;
  isFetching?: boolean;
  annual?: Row[];
  page?: number | undefined | null;
  totalPage?: number;
  isDataEmpty?: boolean;
  onPageChange?: (page: number | undefined | null) => any;
  onPrevious?: () => any;
  onNext?: () => any;
}

export const TableAnnualReport: React.FC<Props> = ({
  onCreatePlanClick,
  annual,
  isFetching,
  page,
  totalPage,
  isDataEmpty,
  onPageChange,
  onPrevious,
  onNext,
}) => {
  // Navigation
  const navigate = useNavigate();

  return (
    <div>
      <table className="text-center text-sm font-light mt-6 min-w-full shadow overflow-hidden rounded-lg">
        <thead className="bg-primary-100 dark:bg-primary-950/50 font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Report
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Total expense
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Total term
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Total department
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Created date
            </th>
          </tr>
        </thead>
        <tbody>
          {annual &&
            annual.map((row, index) => (
              <tr
                key={index}
                className={clsx({
                  "group cursor-pointer border-b-2 border-neutral-100 dark:border-neutral-800 duration-200":
                    true,
                  "text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-400":
                    true,
                  "bg-white hover:bg-primary-50/50 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/70":
                    index % 2 === 0,
                  "bg-primary-50 hover:bg-primary-100 dark:bg-neutral-800/80 dark:hover:bg-neutral-800":
                    index % 2 === 1,
                })}
                // onMouseEnter={() => {
                //   setHoverRowIndex(index);
                // onMouseLeave={() => {
                //   setHoverRowIndex(undefined);
                // }}
                onClick={() => {
                  navigate(`detail/chart/${row.annualReportId}`);
                }}
              >
                <td className="whitespace-nowrap px-6 py-4 font-bold">
                  {isFetching ? (
                    <span
                      className={cn(
                        "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded w-[200px]"
                      )}
                    ></span>
                  ) : (
                    <div>Report {row.year}</div>
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
                    <div> {formatViMoney(row.totalExpense)}</div>
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
                    <div> {row.totalTerm}</div>
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
                    <div> {row.totalDepartment}</div>
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
                    <div> {formatISODate(row.createDate)}</div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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
            page={page}
            totalPage={totalPage || 1}
            onNext={onNext}
            onPageChange={onPageChange}
            onPrevious={onPrevious}
          />
        </motion.div>
      )}
    </div>
  );
};
