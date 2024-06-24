import { Pagination } from "../../shared/pagination";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

// Định nghĩa kiểu cho dữ liệu bảng
type TableAnnualReportDataType = {
  id: number;
  report: string;
  totalExpense: string;
  totalDepartment: string;
  createdDate: string;
};

const tableReportDataList: TableAnnualReportDataType[] = [
  {
    id: 1,
    report: "Report 2022",
    totalExpense: "213.232.523 VNĐ",
    totalDepartment: "10",
    createdDate: "5 January 2023",
  },
  {
    id: 2,
    report: "Report 2021",
    totalExpense: "213.232.523 VNĐ",
    totalDepartment: "15",
    createdDate: "5 January 2022",
  },
  {
    id: 3,
    report: "Report 2020",
    totalExpense: "213.232.523 VNĐ",
    totalDepartment: "12",
    createdDate: "5 January 2021",
  },
  {
    id: 4,
    report: "Report 2019",
    totalExpense: "213.232.523 VNĐ",
    totalDepartment: "11",
    createdDate: "5 January 2020",
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

export const TableAnnualReport: React.FC<Props> = ({ onCreatePlanClick }) => {
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
              onClick={() => {
                navigate("detail/chart");
              }}
            >
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.report}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.totalExpense}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.totalDepartment}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {row.createdDate}
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
