import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Tag } from "../../shared/tag";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

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

// Định nghĩa kiểu cho dữ liệu bảng
type TableReportDataType = {
  id: number;
  plan: string;
  term: string;
  department: string;
  version: string;
  status: StatusType;
};

const tableReportDataList: TableReportDataType[] = [
  {
    id: 1,
    plan: "BU name_Q1_report",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v1",
    status: "new",
  },
  {
    id: 2,
    plan: "BU name_Q1_report",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v2",
    status: "approve",
  },
  {
    id: 3,
    plan: "BU name_Q1_report",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v3",
    status: "waiting for approval",
  },
  {
    id: 4,
    plan: "BU name_Q1_report",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v4",
    status: "denied",
  },
];

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

interface Props {
  onCreatePlanClick?: () => any;
}

export const TableReportManagement: React.FC<Props> = ({
  onCreatePlanClick,
}) => {
  // Navigation
  const navigate = useNavigate();

  // UI: show delete button
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();

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
            {/* <th scope="col" className="px-6 py-4"></th> */}
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
          {tableReportDataList.map((row, index) => (
            <tr
              key={row.id}
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
              // onClick={() => {
              //   navigate("detail/expenses");
              // }}
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <div className="flex flex-row flex-wrap">
                  <p className="font-extrabold py-2 ml-14">{row.plan}</p>
                  <div>{renderButton(row.status)}</div>
                </div>
              </td>
              {/* <td></td> */}
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.term}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.department}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.version}
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
                  <IconButton>
                    <FaTrash className="text-red-600 text-xl" />
                  </IconButton>
                </motion.div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        variants={animation}
      >
        <Pagination page={1} totalPage={20} className="mt-6" />
      </motion.div>
    </div>
  );
};
