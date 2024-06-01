import { Variants, motion } from "framer-motion";
import { TEInput } from "tw-elements-react";
import { Button } from "../../../shared/button";
import { Pagination } from "../../../shared/pagination";
import { DisabledSelect } from "../ui/disabled-select";
import { NumericFormat } from "react-number-format";

const DUMMY_EXPENSES = [
  {
    id: 1,
    expenseName: "Promotion event",
    costType: "Direct cost",
    unitPrice: 200000000,
    amount: 3,
    projectName: "IN22",
    supplierName: "Internal",
    pic: "AnhMN2",
    notes: "N/A",
  },
  {
    id: 2,
    expenseName: "Social media",
    costType: "Direct cost",
    unitPrice: 15000000,
    amount: 50,
    projectName: "CAM1",
    supplierName: "Internal",
    pic: "LanNT12",
    notes: "N/A",
  },
  {
    id: 3,
    expenseName: "Office supplies",
    costType: "Administration cost",
    unitPrice: 1000000,
    amount: 100,
    projectName: "REC1",
    supplierName: "Hong Ha",
    pic: "HongHD9",
    notes: "N/A",
  },
  {
    id: 4,
    expenseName: "Internal training",
    costType: "Operating cost",
    unitPrice: 2000000,
    amount: 6,
    projectName: "RECT",
    supplierName: "Fresher Academy",
    pic: "LinhHM2",
    notes: "N/A",
  },
  {
    id: 5,
    expenseName: "Team Building",
    costType: "Administration cost",
    unitPrice: 100000000,
    amount: 6,
    projectName: "TB1",
    supplierName: "Saigon Tourist",
    pic: "TuNM",
    notes: "Approximate",
  },
  // {
  //   id: 6,
  //   expenseName: "Customer visit",
  //   costType: "Indirect cost",
  //   unitPrice: 400000000,
  //   amount: 1,
  //   projectName: "NSK",
  //   supplierName: "Internal",
  //   pic: "TrungDQ",
  //   notes: "Deposit required",
  // },
];

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

const tableRowAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0.3,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const callToActionAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0.8,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

interface Props {
  hide?: boolean;
  onPreviousState?: () => any;
  onNextStage?: () => any;
}

export const ConfirmExpensesStage: React.FC<Props> = ({
  hide,
  onPreviousState,
  onNextStage,
}) => {
  return (
    <motion.div
      className="w-max"
      initial={AnimationStage.HIDDEN}
      animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Disabled term and department select box */}
      <motion.div
        className="flex flex-row flex-wrap items-center justify-center gap-3 mt-5"
        variants={childrenAnimation}
      >
        <div className="flex-1 pt-5">
          <TEInput className="w-full" label="Plan name" />
        </div>
        <DisabledSelect
          className="w-[300px]"
          label="Term"
          value="Financial plan December Q3 2021"
        />
        <DisabledSelect
          className="w-[200px]"
          label="Department"
          value="BU 01"
        />
      </motion.div>

      <motion.table
        className="table-auto sm:mt-3 lg:mt-7 mx-auto"
        initial={AnimationStage.HIDDEN}
        animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
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
        <motion.tbody
          className="[&>*:nth-child(even)]:bg-primary-50/70 [&>*:nth-child(even)]:dark:bg-neutral-700/50 xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-500/80 dark:text-neutral-400/80"
          initial={AnimationStage.HIDDEN}
          animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
          variants={staggerChildrenAnimation}
        >
          {DUMMY_EXPENSES.map((expense) => (
            <motion.tr key={expense.id} variants={tableRowAnimation}>
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
            </motion.tr>
          ))}
        </motion.tbody>
      </motion.table>

      {/* Pagination */}
      <motion.div variants={childrenAnimation}>
        <Pagination className="mt-3" page={1} totalPage={20} />
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-row flex-wrap items-center gap-5 mt-5 w-full"
        variants={callToActionAnimation}
      >
        <Button
          variant="tertiary"
          className="w-[300px]"
          onClick={() => {
            onPreviousState && onPreviousState();
          }}
        >
          Back
        </Button>
        <Button
          containerClassName="flex-1"
          onClick={() => {
            onNextStage && onNextStage();
          }}
        >
          Create new plan
        </Button>
      </motion.div>
    </motion.div>
  );
};
