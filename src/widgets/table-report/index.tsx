import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { DeleteReportModal } from "../delete-report-modal";
import { Report } from "../../providers/store/api/reportsAPI";
import { cn } from "../../shared/utils/cn";
import { Skeleton } from "../../shared/skeleton";
import { ReportTag } from "../../entities/report-tag";
import { parseISOInResponse } from "../../shared/utils/parse-iso-in-response";
import { format } from "date-fns";

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

const rowAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

export interface Row extends Report {
  isFetching?: boolean;
}

interface Props {
  onCreatePlanClick?: () => any;
  isFetching?: boolean;
  reports?: Row[];
  page?: number | undefined | null;
  totalPage?: number;
  isDataEmpty?: boolean;
  onPageChange?: (page: number | undefined | null) => any;
  onPrevious?: () => any;
  onNext?: () => any;
}

export const TableReportManagement: React.FC<Props> = ({
  onCreatePlanClick,
  reports,
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

  // UI: show delete button
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();

  // UI: show delete button
  const [startModal, setStartModal] = useState<boolean>(false);

  const handleClick = () => {
    setStartModal(true);
  };

  const handleDeleteReportModal = () => {
    setStartModal(false);
  };

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
              Term
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Created at
            </th>
          </tr>
        </thead>
        <tbody>
          {reports &&
            reports.map((row, index) => (
              <motion.tr
                key={index}
                variants={rowAnimation}
                initial={AnimationStage.HIDDEN}
                animate={AnimationStage.VISIBLE}
                exit={AnimationStage.HIDDEN}
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
                onMouseEnter={() => {
                  setHoverRowIndex(index);
                }}
                onMouseLeave={() => {
                  setHoverRowIndex(undefined);
                }}
                onClick={() => {
                  navigate(`detail/expenses/${row.reportId} `);
                }}
              >
                <td className="whitespace-nowrap px-6 py-6 font-extrabold">
                  {isFetching ? (
                    <Skeleton className="w-[200px]" />
                  ) : (
                    <>
                      <span className="group-hover:underline">{row.name}</span>{" "}
                      <ReportTag statusCode={row.status.code} />
                    </>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-6 font-bold">
                  {isFetching ? (
                    <Skeleton className="w-[200px]" />
                  ) : (
                    <>{row.term.name}</>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-6 font-bold">
                  {isFetching ? (
                    <Skeleton className="w-[200px]" />
                  ) : (
                    <>
                      {format(
                        parseISOInResponse(row.createdAt),
                        "dd MMMM yyyy"
                      )}
                    </>
                  )}
                </td>
              </motion.tr>
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

      <DeleteReportModal show={startModal} onClose={handleDeleteReportModal} />
    </div>
  );
};
