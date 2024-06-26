import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa6";

import { TESelect } from "tw-elements-react";
import clsx from "clsx";

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
  report: string;
};

const tablePlanDataList: TablePlanDataType[] = [
  {
    id: 1,
    report: "BU 01_Q1_report",
  },

  {
    id: 2,
    report: "BU 02_Q2_report",
  },
  {
    id: 3,
    report: "BU 03_Q3_report",
  },
];

// const animation: Variants = {
//   [AnimationStage.HIDDEN]: {
//     opacity: 0,
//   },
//   [AnimationStage.VISIBLE]: {
//     opacity: 1,
//   },
// };

export const TermDetailReportPage: React.FC = () => {
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
            <TESelect data={[]} label="Department" />
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
                      {row.report}
                    </p>
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
