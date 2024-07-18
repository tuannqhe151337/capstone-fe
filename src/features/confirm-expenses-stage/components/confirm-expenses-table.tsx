import { Variants, motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { Pagination } from "../../../shared/pagination";
import { useState } from "react";
import { Expense } from "../type";

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

interface Props {
  expenses?: Expense[];
  hide?: boolean;
}

const pageSize = 5;

export const ConfirmExpensesTable: React.FC<Props> = ({ expenses, hide }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <div>
      <div className="min-h-[312px]">
        <table className="table-auto sm:mt-3 lg:mt-5 mx-auto">
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
              <th className="px-1 lg:py-1 font-semibold dark:font-bold">
                Notes
              </th>
            </tr>
          </thead>
          <motion.tbody
            key={page}
            className="[&>*:nth-child(even)]:bg-primary-50/70 [&>*:nth-child(even)]:dark:bg-neutral-700/50 xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-500/80 dark:text-neutral-400/80"
            initial={AnimationStage.HIDDEN}
            animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
            variants={staggerChildrenAnimation}
          >
            {expenses &&
              expenses
                .slice((page - 1) * pageSize, page * pageSize)
                .map((expense, index) => (
                  <motion.tr key={index} variants={rowAnimation}>
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-extrabold text-left">
                      {expense.name}
                    </td>
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-bold text-center">
                      {expense.costType.name}
                    </td>
                    <td className="px-4 py-4 xl:w-min font-bold text-right">
                      <NumericFormat
                        displayType="text"
                        value={expense.unitPrice}
                        disabled
                        thousandSeparator
                      />
                    </td>
                    <td className="px-4 py-4 xl:w-min font-bold text-center">
                      {expense.amount}
                    </td>
                    <td className="px-4 py-4 xl:w-min font-bold text-right">
                      <NumericFormat
                        displayType="text"
                        value={expense.unitPrice * expense.amount}
                        thousandSeparator
                      />
                    </td>
                    <td className="px-4 py-4 xl:w-min font-bold text-center">
                      {expense.projectName}
                    </td>
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-bold text-center">
                      {expense.supplierName}
                    </td>
                    <td className="px-4 py-4 xl:w-min font-bold text-center">
                      {expense.pic}
                    </td>
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-bold text-center text-neutral-400 dark:text-neutral-500">
                      {expense.notes}
                    </td>
                  </motion.tr>
                ))}
          </motion.tbody>
        </table>
      </div>

      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
        variants={childrenAnimation}
        transition={{ delay: 0.4 }}
      >
        <Pagination
          className="mt-1"
          page={page}
          totalPage={Math.ceil(expenses ? expenses.length / pageSize : 1)}
          onNext={() =>
            setPage((prevPage) => {
              if (expenses) {
                if (prevPage + 1 > expenses.length) {
                  return expenses.length;
                } else {
                  return prevPage + 1;
                }
              } else {
                return 1;
              }
            })
          }
          onPageChange={(page) => {
            setPage(page || 1);
          }}
          onPrevious={() =>
            setPage((prevPage) => {
              if (expenses) {
                if (prevPage === 1) {
                  return 1;
                } else {
                  return prevPage - 1;
                }
              } else {
                return 1;
              }
            })
          }
        />
      </motion.div>
    </div>
  );
};
