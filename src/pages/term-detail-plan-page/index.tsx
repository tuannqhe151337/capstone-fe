import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa6";

import { TESelect } from "tw-elements-react";
import clsx from "clsx";
import { Tag } from "../../shared/tag";

// Định nghĩa kiểu cho status
type StatusType = "new" | "approve" | "inProgress" | "denied";
const renderButton = (status: StatusType) => {
  switch (status) {
    case "new":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="new">
          Approved
        </Tag>
      );
    case "inProgress":
      return (
        <Tag className="ml-4 mt-1" background="filled" variant="inProgress">
          Waiting for approval
        </Tag>
      );
    case "denied":
      return (
        <Tag className="ml-4 mt-1" background="unfilled" variant="denied">
          Deny
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
    status: "inProgress",
  },

  {
    id: 2,
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v3",
    status: "denied",
  },
  {
    id: 3,
    plan: "BU name_termplan",
    term: "Financial plan December Q3 2021",
    department: "BU 1",
    version: "v4",
    status: "new",
  },
];

export const TermDetailPlanPage: React.FC = () => {
  const [listSelectedIndex] = useState<Set<number>>(new Set());
  const [_, setShowReviewExpense] = useState<boolean>(false);

  // const [hoverRowIndex, setHoverRowIndex] = useState<number>();

  useEffect(() => {
    if (listSelectedIndex.size !== 0) {
      setShowReviewExpense(true);
    } else {
      setShowReviewExpense(false);
    }
  }, [listSelectedIndex]);

  return (
    <motion.div>
      <motion.div
        className=""
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={staggerChildrenAnimation}
      >
        <motion.div className="flex justify-end mt-4">
          <motion.div variants={childrenAnimation} className="mr-4 ">
            <TESelect data={[]} label="Cost type" />
          </motion.div>

          <motion.div variants={childrenAnimation} className="mr-4">
            <TESelect data={[]} label="Status" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={staggerChildrenAnimation}
      >
        <motion.table
          className="text-center text-sm font-light mt-6 min-w-full  overflow-hidden "
          variants={childrenAnimation}
        >
          <tbody>
            {tablePlanDataList.map((row, index) => (
              <tr
                key={row.id}
                className={clsx({
                  "bg-white  dark:bg-neutral-800/50 ": index % 2 === 0,
                  "bg-primary-50  dark:bg-neutral-800/80  ": index % 2 === 1,
                })}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  <div className="flex flex-row flex-wrap">
                    <div className="text-neutral-300 dark:text-neutral-600">
                      <FaChartLine className="text-xl mt-2" />
                    </div>
                    <p className="font-extrabold text-neutral-500 dark:font-bold dark:text-neutral-500 py-2 ml-3">
                      {row.plan}
                    </p>
                    <div>{renderButton(row.status)}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
};
