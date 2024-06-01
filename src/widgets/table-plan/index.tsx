import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Tag } from "../../shared/tag";

// Định nghĩa kiểu cho status
type StatusType = "new" | "approve" | "waiting for approval" | "denied";
const renderButton = (status: StatusType) => {
  switch (status) {
    case "new":
      return (
        <Tag background="unfilled" variant="new">
          New
        </Tag>
      );
    case "approve":
      return (
        <Tag background="filled" variant="reviewed">
          Reviewed
        </Tag>
      );
    case "waiting for approval":
      return (
        <Tag background="unfilled" variant="waiting">
          Waiting for approval
        </Tag>
      );
    case "denied":
      return (
        <Tag background="unfilled" variant="denied">
          Denined
        </Tag>
      );
    default:
      return null;
  }
};

// Định nghĩa kiểu cho dữ liệu bảng
type TablePlanDataType = {
  id: number;
  plan: string;
  term: string;
  department: string;
  version: string;
  status: StatusType;
};

const tablePlanDataList: TablePlanDataType[] = [
  {
    id: 1,
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v1",
    status: "new",
  },
  {
    id: 2,
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v2",
    status: "approve",
  },
  {
    id: 3,
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v3",
    status: "waiting for approval",
  },
  {
    id: 4,
    plan: "BU name_termplan",
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
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export const TablePlanManagement: React.FC = () => {
  const [hoverRowIndex, setHoverRowIndex] = useState<number>();

  return (
    <div>
      <table className="text-center text-sm font-light mt-6 min-w-full shadow overflow-hidden rounded">
        <thead className="bg-primary-100 dark:bg-primary-950/50 font-medium dark:border-neutral-500 dark:bg-neutral-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Plan
            </th>
            {/* <th scope="col" className="px-6 py-4"></th> */}
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Term
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-extrabold text-primary-500 dark:text-primary-600"
            >
              Version
            </th>
            <th scope="col">
              <IconButton className="px-3">
                <FaPlusCircle className="text-2xl text-primary-500/80 hover:text-primary-500/80 mt-1" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {tablePlanDataList.map((row, index) => (
            <tr
              key={row.id}
              className={`group border-b cursor-pointer ${
                index % 2 === 0
                  ? "bg-white hover:bg-primary-50/50 dark:border-neutral-900 dark:bg-neutral-800/70 dark:hover:bg-neutral-800"
                  : "bg-primary-50 hover:bg-primary-100 dark:border-neutral-900 dark:bg-primary-950/30 dark:hover:bg-primary-950/70"
              }`}
              onMouseEnter={() => {
                setHoverRowIndex(index);
              }}
              onMouseLeave={() => {
                setHoverRowIndex(undefined);
              }}
            >
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <div className="flex flex-row flex-wrap">
                  <p className="text-primary-500 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-600 dark:group-hover:text-primary-500/90 ml-14">
                    {row.plan}
                  </p>
                  <div>{renderButton(row.status)}</div>
                </div>
              </td>
              {/* <td></td> */}
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.term}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
                {row.department}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
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

      <Pagination page={1} totalPage={20} className="mt-6" />
    </div>
  );
};
