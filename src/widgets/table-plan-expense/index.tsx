import { Variants, motion } from "framer-motion";
import { Pagination } from "../../shared/pagination";
import { NumericFormat } from "react-number-format";
import { Checkbox } from "../../shared/checkbox";
import { Tag } from "../../shared/tag";

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

export const TablePlanExpenses: React.FC = () => {
  return (
    <div>
      <table className="table-auto sm:mt-3 lg:mt-7 xl:mx-auto">
        <thead className="border-b-2 border-primary-100 dark:border-neutral-700/60 xl:text-base lg:text-sm md:text-sm sm:text-sm">
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
        </thead>
        <motion.tbody
          className="[&>*:nth-child(even)]:bg-primary-50/70 [&>*:nth-child(even)]:dark:bg-neutral-800/50 xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-500/90 dark:text-neutral-400/80"
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          variants={staggerChildrenAnimation}
        >
          {DUMMY_EXPENSES.map((expense) => (
            <motion.tr key={expense.id} variants={rowAnimation}>
              <td className="pl-3.5 pr-2 py-3">
                <Checkbox className="m-auto" />
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
                  Reviewed
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
