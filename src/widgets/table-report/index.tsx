import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Tag } from "../../shared/tag";
// import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { DeleteReportModal } from "../delete-report-modal";
import { Report } from "../../providers/store/api/reportsAPI";
import { cn } from "../../shared/utils/cn";

// Định nghĩa kiểu cho status
type StatusType = "new" | "approve" | "waiting for approval" | "denied";
const renderButton = (status: StatusType) => {
  switch (status) {
    case "new":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="new">
          New
        </Tag>
      );
    case "approve":
      return (
        <Tag className="ml-4 mt-1" background="filled" variant="reviewed">
          Approved
        </Tag>
      );
    case "waiting for approval":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="waiting">
          Waiting for approval
        </Tag>
      );
    case "denied":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="denied">
          Denied
        </Tag>
      );
    default:
      return null;
  }
};

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
  // const navigate = useNavigate();

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
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500/80 dark:text-primary-600/80"
            >
              Version
            </th>
            <th scope="col">
              <IconButton
                className="px-3"
                tooltip="Add new plan"
                onClick={() => {
                  onCreatePlanClick && onCreatePlanClick();
                }}
              >
                <FaPlusCircle className="text-[21px] text-primary-500/60 hover:text-primary-500/80 my-0.5" />
              </IconButton>
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
                  navigate("detail/expenses");
                }}
              >
                <td className="whitespace-nowrap px-6 py-4 font-extrabold">
                  {isFetching ? (
                    <span
                      className={cn(
                        "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded w-[200px]"
                      )}
                    ></span>
                  ) : (
                    <>{row.name}</>
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
                    <>{row.term.name}</>
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
                    <>{row.version}</>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <motion.div
                    initial={AnimationStage.HIDDEN}
                    animate={
                      hoverRowIndex === index
                        ? AnimationStage.VISIBLE
                        : AnimationStage.HIDDEN
                    }
                    exit={AnimationStage.HIDDEN}
                    variants={animation}
                  >
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClick();
                      }}
                    >
                      <FaTrash className="text-red-600 text-xl" />
                    </IconButton>
                  </motion.div>
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
