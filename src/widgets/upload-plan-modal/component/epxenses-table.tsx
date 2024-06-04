import { Variants, motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { Pagination } from "../../../shared/pagination";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0.2,
    y: 10,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

interface Expense {
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
  expenses: Expense[];
  hide?: boolean;
}

export const ExpensesTable: React.FC<Props> = ({ expenses, hide }) => {
  return (
    <motion.div
      initial={AnimationStage.HIDDEN}
      animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <motion.table
        className="table-auto sm:mt-3 lg:mt-7 mx-auto"
        variants={childrenAnimation}
      >
        <thead className="xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-400/70 dark:text-neutral-500">
          <tr>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Expenses
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Cost type
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Unit price (VND)
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Amount
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Total (VND)
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Project name
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">
              Supplier name
            </th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">PiC</th>
            <th className="px-1 lg:py-1 font-semibold dark:font-bold">Notes</th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-primary-50/70 [&>*:nth-child(even)]:dark:bg-neutral-700/50 xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-500/80 dark:text-neutral-400/80">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-2 py-3 lg:w-min sm:w-[100px] font-extrabold text-left">
                {expense.expenseName}
              </td>
              <td className="px-2 py-3 lg:w-min sm:w-[100px] font-bold text-center">
                {expense.costType}
              </td>
              <td className="px-2 py-3 xl:w-min font-bold text-right">
                <NumericFormat
                  displayType="text"
                  value={expense.unitPrice}
                  disabled
                  thousandSeparator
                />
              </td>
              <td className="px-2 py-3 xl:w-min font-bold text-center">
                {expense.amount}
              </td>
              <td className="px-2 py-3 xl:w-min font-bold text-right">
                <NumericFormat
                  displayType="text"
                  value={expense.unitPrice * expense.amount}
                  thousandSeparator
                />
              </td>
              <td className="px-2 py-3 xl:w-min font-bold text-center">
                {expense.projectName}
              </td>
              <td className="px-2 py-3 lg:w-min sm:w-[100px] font-bold text-center">
                {expense.supplierName}
              </td>
              <td className="px-2 py-3 xl:w-min font-bold text-center">
                {expense.pic}
              </td>
              <td className="px-2 py-3 lg:w-min sm:w-[100px] font-bold text-center text-neutral-400 dark:text-neutral-500">
                {expense.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>

      <motion.div variants={childrenAnimation}>
        <Pagination className="mt-3" page={1} totalPage={20} />
      </motion.div>
    </motion.div>
  );
};
