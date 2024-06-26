import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa6";

import { TESelect } from "tw-elements-react";
import clsx from "clsx";
import { Pagination } from "../../shared/pagination";
import { ListAnnualReportFilter } from "../../widgets/list-annual-report-filter";

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
type TableAnnualReportDataType = {
  id: number;
  department: string;
  totalExpense: string;
  biggestExpenditure: string;
  costType: string;
};

const tableReportDataList: TableAnnualReportDataType[] = [
  {
    id: 1,
    department: "BU 02",
    totalExpense: "213.232.523.433 VNĐ",
    biggestExpenditure: "1.523.433 VNĐ",
    costType: "Marketing",
  },
  {
    id: 2,
    department: "BU 03",
    totalExpense: "23.232.523 VNĐ",
    biggestExpenditure: "23.433 VNĐ",
    costType: "Marketing",
  },
  {
    id: 3,
    department: "BU 04",
    totalExpense: "123.232.523 VNĐ",
    biggestExpenditure: "523.433 VNĐ",
    costType: "Marketing",
  },
  {
    id: 4,
    department: "BU 05",
    totalExpense: "123.232.523 VNĐ",
    biggestExpenditure: "127.533 VNĐ",
    costType: "Marketing",
  },
];

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

export const AnnualReportDetailTablePage: React.FC = () => {
  return (
    <motion.div
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
          <TESelect data={[]} label="Department" />
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
          {tableReportDataList.map((row, index) => (
            <tr
              key={row.id}
              className={clsx({
                // "group cursor-pointer border-b-2 border-neutral-100 dark:border-neutral-800 duration-200":
                //   true,
                // "text-primary-500 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-400":
                //   true,
                "text-neutral-500 dark:text-neutral-400 bg-whitedark:bg-neutral-800/50 ":
                  index % 2 === 0,
                "text-neutral-500 dark:text-neutral-400 bg-primary-50 dark:bg-neutral-800/80":
                  index % 2 === 1,
              })}
            >
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.department}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.totalExpense}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.biggestExpenditure}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.costType}
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        variants={animation}
      >
        <Pagination page={1} totalPage={20} className="mt-6" />
      </motion.div>
    </motion.div>
  );
};
