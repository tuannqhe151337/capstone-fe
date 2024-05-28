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

interface Props {
  onPreviousState?: () => any;
  onNextStage?: () => any;
}

export const ConfirmExpensesStage: React.FC<Props> = ({
  onPreviousState,
  onNextStage,
}) => {
  return (
    <div className="w-max">
      {/* Disabled term and department select box */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 mt-5">
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
      </div>

      <table className="table-auto sm:mt-3 lg:mt-7 mx-auto">
        <thead className="xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-300 dark:text-neutral-500 dark:font-extrabold">
          <tr>
            <th className="px-1 xl:py-1 font-semibold">Expenses</th>
            <th className="px-1 xl:py-1 font-semibold">Cost type</th>
            <th className="px-1 xl:py-1 font-semibold">Unit price (VND)</th>
            <th className="px-1 xl:py-1 font-semibold">Amount</th>
            <th className="px-1 xl:py-1 font-semibold">Total (VND)</th>
            <th className="px-1 xl:py-1 font-semibold">Project name</th>
            <th className="px-1 xl:py-1 font-semibold">Supplier name</th>
            <th className="px-1 xl:py-1 font-semibold">PiC</th>
            <th className="px-1 xl:py-1 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-primary-50/70 [&>*:nth-child(even)]:dark:bg-neutral-700/50 xl:text-base lg:text-sm md:text-sm sm:text-sm text-neutral-500 dark:text-neutral-400">
          {DUMMY_EXPENSES.map((expense) => (
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
      </table>

      {/* Pagination */}
      <Pagination className="mt-3" page={1} totalPage={20} />

      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-5 mt-5 w-full">
        <Button
          variant="tertiary"
          className="w-[300px]"
          onClick={() => {
            onPreviousState && onPreviousState();
          }}
        >
          Cancel
        </Button>
        <Button
          containerClassName="flex-1"
          onClick={() => {
            onNextStage && onNextStage();
          }}
        >
          Create new plan
        </Button>
      </div>
    </div>
  );
};
