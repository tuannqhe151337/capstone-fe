import { Variants, motion } from "framer-motion";
import { Pagination } from "../../shared/pagination";
import { NumericFormat } from "react-number-format";
import { Checkbox } from "../../shared/checkbox";
import { Tag } from "../../shared/tag";
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
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 10,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const rowAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

export interface Expense {
  id: number;
  expenseName: string;
  costType: string;
  unitPrice: number;
  amount: number;
  projectName: string;
  supplierName: string;
  pic: string;
  notes: string;
}

interface Props {
  listSelectedIndex?: Set<number>;
  onRowClick?: (index: number) => any;
  expenses?: Expense[];
}

export const TablePlanExpenses: React.FC<Props> = ({
  listSelectedIndex,
  onRowClick,
  expenses,
}) => {
  return (
    <div>
      <table className="table-auto sm:mt-3 lg:mt-7 xl:mx-auto">
        <motion.thead
          className="border-b-2 border-primary-100 dark:border-neutral-700/60 xl:text-base lg:text-sm md:text-sm sm:text-sm"
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          variants={rowAnimation}
        >
          <tr>
            <th className="pl-2.5 pr-1 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              <Checkbox className="ml-1 mt-0.5" />
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70 text-left">
              Expenses
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Cost type
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Unit price (VND)
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Amount
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Total (VND)
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Project name
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Supplier name
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              PiC
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Notes
            </th>
            <th className="px-1 xl:px-3 lg:py-1 xl:py-3 font-bold dark:font-bold text-primary/70">
              Status
            </th>
          </tr>
        </motion.thead>
        <motion.tbody
          className="xl:text-sm lg:text-sm md:text-sm sm:text-sm text-neutral-500/90 dark:text-neutral-400/80"
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          variants={staggerChildrenAnimation}
        >
          {expenses &&
            expenses.map((expense, index) => (
              <motion.tr
                key={expense.id}
                className={clsx({
                  "cursor-pointer duration-200": true,
                  "bg-primary-100 dark:bg-primary-950":
                    listSelectedIndex && listSelectedIndex.has(index),
                  "hover:bg-primary-100/70 hover:dark:bg-neutral-800":
                    listSelectedIndex && !listSelectedIndex.has(index),
                  "bg-primary-50/70 dark:bg-neutral-800/70":
                    index % 2 === 1 &&
                    listSelectedIndex &&
                    !listSelectedIndex.has(index),
                })}
                variants={rowAnimation}
                onClick={() => {
                  onRowClick && onRowClick(index);
                }}
              >
                <td className="pl-3.5 pr-2 py-3">
                  <Checkbox
                    className="m-auto"
                    checked={listSelectedIndex && listSelectedIndex.has(index)}
                  />
                </td>
                <td className="px-2 py-3 xl:py-5 lg:w-min sm:w-[100px] font-extrabold text-left">
                  {expense.expenseName}
                </td>
                <td className="px-2 py-3 xl:py-5 lg:w-min sm:w-[100px] font-bold text-center">
                  {expense.costType}
                </td>
                <td className="px-2 py-3 xl:py-5 xl:w-min font-bold text-right">
                  <NumericFormat
                    displayType="text"
                    value={expense.unitPrice}
                    disabled
                    thousandSeparator
                  />
                </td>
                <td className="px-2 py-3 xl:py-5 xl:w-min font-bold text-center">
                  {expense.amount}
                </td>
                <td className="px-2 py-3 xl:py-5 xl:w-min font-bold text-right">
                  <NumericFormat
                    displayType="text"
                    value={expense.unitPrice * expense.amount}
                    thousandSeparator
                  />
                </td>
                <td className="px-2 py-3 xl:py-5 xl:w-min font-bold text-center">
                  {expense.projectName}
                </td>
                <td className="px-2 py-3 xl:py-5 lg:w-min sm:w-[100px] font-bold text-center">
                  {expense.supplierName}
                </td>
                <td className="px-2 py-3 xl:py-5 xl:w-min font-bold text-center">
                  {expense.pic}
                </td>
                <td className="px-2 py-3 xl:py-5 lg:w-min sm:w-[100px] text-sm font-bold text-center text-neutral-400 dark:text-neutral-500">
                  {expense.notes}
                </td>
                <td className="px-2 py-3">
                  <Tag background="filled" variant="reviewed">
                    Accepted
                  </Tag>
                </td>
              </motion.tr>
            ))}
        </motion.tbody>
      </table>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        variants={childrenAnimation}
        transition={{ delay: 0.4 }}
      >
        <Pagination className="mt-3" page={1} totalPage={20} />
      </motion.div>
    </div>
  );
};
