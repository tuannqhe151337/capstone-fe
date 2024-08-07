import { Variants, motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { Pagination } from "../../../shared/pagination";
import { useCallback, useState } from "react";
import { ExpenseError } from "../type";
import { HiExclamationCircle } from "react-icons/hi";
import { TETooltip } from "tw-elements-react";
import { EmptyText } from "../ui/empty-text";
import { ExpenseTag } from "../../../entities/expense-tag";
import { ExpenseStatusCodes } from "../../../providers/store/api/type";
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

const calculateTotalCost = (
  unitPrice: string | number | null | undefined,
  amount: string | number | null | undefined
): number => {
  let unitPriceNumber = 0;
  if (typeof unitPrice === "number") {
    unitPriceNumber = unitPrice;
  } else {
    unitPriceNumber = unitPrice ? parseFloat(unitPrice) : 0;
  }

  let amountNumber = 0;
  if (typeof amount === "number") {
    amountNumber = amount;
  } else {
    amountNumber = amount ? parseFloat(amount) : 0;
  }

  return unitPriceNumber * amountNumber;
};

interface Props {
  expenses?: ExpenseError[];
  hide?: boolean;
  showExpenseCodeColumn?: boolean;
  showStatusColumn?: boolean;
}

const pageSize = 5;

export const ErrorExpensesTable: React.FC<Props> = ({
  expenses,
  hide,
  showExpenseCodeColumn,
  showStatusColumn,
}) => {
  const [page, setPage] = useState<number>(1);

  const renderExpenseCodeValue = useCallback(
    (expenseCode?: string | number) => {
      if (expenseCode) {
        if (expenseCode.toString().length > 8) {
          return (
            <TETooltip className="cursor-default" title={expenseCode}>
              {expenseCode.toString().substring(0, 8)}...
            </TETooltip>
          );
        } else {
          return <>{expenseCode}</>;
        }
      }
    },
    []
  );

  const renderStatusCode = useCallback((statusCode?: string | number) => {
    if (statusCode) {
      if (typeof statusCode === "string") {
        try {
          const typedStatusCode = ExpenseStatusCodes.check(statusCode);
          if (typedStatusCode) {
            return <ExpenseTag statusCode={typedStatusCode} />;
          } else {
            return <>{statusCode}</>;
          }
        } catch {
          return <>{statusCode}</>;
        }
      } else {
        return <>{statusCode}</>;
      }
    } else {
      return <EmptyText />;
    }
  }, []);

  return (
    <div>
      <div className="min-h-[312px]">
        <table className="table-auto sm:mt-3 lg:mt-5 mx-auto">
          <thead className="xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-400/70 dark:text-neutral-500">
            <tr>
              {showExpenseCodeColumn && (
                <th
                  className={clsx({
                    "px-2 lg:py-1 font-semibold dark:font-bold": true,
                    "text-sm": showStatusColumn || showExpenseCodeColumn,
                  })}
                >
                  <div className="w-max">Code</div>
                </th>
              )}
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Expenses</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Cost type</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Unit price (VND)</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Amount</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Total (VND)</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Project name</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Supplier name</div>
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                PiC
              </th>
              <th
                className={clsx({
                  "px-2 lg:py-1 font-semibold dark:font-bold": true,
                  "text-sm": showStatusColumn || showExpenseCodeColumn,
                })}
              >
                <div className="w-max">Notes</div>
              </th>
              {showStatusColumn && (
                <th
                  className={clsx({
                    "px-2 lg:py-1 font-semibold dark:font-bold": true,
                    "text-sm": showStatusColumn || showExpenseCodeColumn,
                  })}
                >
                  Status
                </th>
              )}
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
                    {/* Expense code */}
                    {showExpenseCodeColumn && (
                      <td className="px-4 py-4 lg:w-min sm:w-[100px] font-extrabold text-left">
                        <div className="flex flex-row flex-wrap items-center w-max gap-1">
                          {expense.code.errorMessage && (
                            <TETooltip title={expense.code.errorMessage}>
                              <HiExclamationCircle className="text-xl text-red-600" />
                            </TETooltip>
                          )}
                          {expense.code.value ? (
                            <div
                              className={clsx({
                                "text-sm":
                                  showExpenseCodeColumn || showStatusColumn,
                              })}
                            >
                              {renderExpenseCodeValue(expense.code.value)}
                            </div>
                          ) : (
                            <EmptyText />
                          )}
                        </div>
                      </td>
                    )}

                    {/* Expense name */}
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-extrabold text-left">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.name.errorMessage && (
                          <TETooltip title={expense.name.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        {expense.name.value ? (
                          <div
                            className={clsx({
                              "text-sm":
                                showExpenseCodeColumn || showStatusColumn,
                            })}
                          >
                            {expense.name.value}
                          </div>
                        ) : (
                          <EmptyText />
                        )}
                      </div>
                    </td>

                    {/* Cost type */}
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-bold text-center">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.costType.errorMessage && (
                          <TETooltip title={expense.costType.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        {expense.costType.value ? (
                          <div
                            className={clsx({
                              "text-sm":
                                showExpenseCodeColumn || showStatusColumn,
                            })}
                          >
                            {expense.costType.value}
                          </div>
                        ) : (
                          <EmptyText />
                        )}
                      </div>
                    </td>

                    {/* Unit price */}
                    <td className="px-4 py-4 xl:w-min font-bold text-right">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.unitPrice.errorMessage && (
                          <TETooltip title={expense.unitPrice.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        <div
                          className={clsx({
                            "text-sm":
                              showExpenseCodeColumn || showStatusColumn,
                          })}
                        >
                          {typeof expense.unitPrice.value === "number" ? (
                            <NumericFormat
                              displayType="text"
                              value={expense.unitPrice.value}
                              disabled
                              thousandSeparator
                            />
                          ) : (
                            <div
                              className={clsx({
                                "text-sm":
                                  showExpenseCodeColumn || showStatusColumn,
                              })}
                            >
                              {expense.unitPrice.value ? (
                                expense.unitPrice.value
                              ) : (
                                <EmptyText />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-4 xl:w-min font-bold text-center">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.amount.errorMessage && (
                          <TETooltip title={expense.amount.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        <div
                          className={clsx({
                            "text-sm":
                              showExpenseCodeColumn || showStatusColumn,
                          })}
                        >
                          {typeof expense.amount.value === "number" ? (
                            <NumericFormat
                              displayType="text"
                              value={expense.amount.value}
                              disabled
                              thousandSeparator
                            />
                          ) : expense.amount.value ? (
                            expense.amount.value
                          ) : (
                            <EmptyText />
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Total cost */}
                    <td className="px-4 py-4 xl:w-min font-bold text-right">
                      <div
                        className={clsx({
                          "text-sm": showExpenseCodeColumn || showStatusColumn,
                        })}
                      >
                        <NumericFormat
                          displayType="text"
                          value={calculateTotalCost(
                            expense.unitPrice.value,
                            expense.amount.value
                          )}
                          thousandSeparator
                        />
                      </div>
                    </td>

                    {/* Project name */}
                    <td className="px-4 py-4 xl:w-min font-bold text-center">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.projectName.errorMessage && (
                          <TETooltip title={expense.projectName.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        {expense.projectName.value ? (
                          <div
                            className={clsx({
                              "text-sm":
                                showExpenseCodeColumn || showStatusColumn,
                            })}
                          >
                            {expense.projectName.value}
                          </div>
                        ) : (
                          <EmptyText />
                        )}
                      </div>
                    </td>

                    {/* Supplier name */}
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-bold text-center">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.supplierName.errorMessage && (
                          <TETooltip title={expense.supplierName.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        {expense.supplierName.value ? (
                          <div
                            className={clsx({
                              "text-sm":
                                showExpenseCodeColumn || showStatusColumn,
                            })}
                          >
                            {expense.supplierName.value}
                          </div>
                        ) : (
                          <EmptyText />
                        )}
                      </div>
                    </td>

                    {/* Pic */}
                    <td className="px-4 py-4 xl:w-min font-bold text-center">
                      <div className="flex flex-row flex-wrap items-center w-max gap-1">
                        {expense.pic.errorMessage && (
                          <TETooltip title={expense.pic.errorMessage}>
                            <HiExclamationCircle className="text-xl text-red-600" />
                          </TETooltip>
                        )}
                        {expense.pic.value ? (
                          <div
                            className={clsx({
                              "text-sm":
                                showExpenseCodeColumn || showStatusColumn,
                            })}
                          >
                            {expense.pic.value}
                          </div>
                        ) : (
                          <EmptyText />
                        )}
                      </div>
                    </td>

                    {/* Note */}
                    <td className="px-4 py-4 lg:w-min sm:w-[100px] font-bold text-center text-neutral-400 dark:text-neutral-500">
                      <div
                        className={clsx({
                          "text-sm": showExpenseCodeColumn || showStatusColumn,
                        })}
                      >
                        {expense.notes}
                      </div>
                    </td>

                    {/* Status */}
                    {showStatusColumn && (
                      <td>
                        <div className="flex flex-row flex-wrap items-center w-max gap-1">
                          {expense.status.errorMessage && (
                            <TETooltip title={expense.status.errorMessage}>
                              <HiExclamationCircle className="text-xl text-red-600" />
                            </TETooltip>
                          )}
                          <div
                            className={clsx({
                              "text-sm":
                                showExpenseCodeColumn || showStatusColumn,
                            })}
                          >
                            {renderStatusCode(expense.status.value)}
                          </div>
                        </div>
                      </td>
                    )}
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
