import { Variants, motion } from "framer-motion";
import { TEInput } from "tw-elements-react";
import { DisabledSelect } from "../../shared/disabled-select";
import { Button } from "../../shared/button";
import { ExpensesTable } from "../../entities/expenses-table";
import { Expense } from "./type";

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

interface Props {
  expenses?: Expense[];
  hide?: boolean;
  onPreviousState?: () => any;
  onNextStage?: () => any;
}

export const ConfirmExpensesStage: React.FC<Props> = ({
  expenses,
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
        className="flex flex-row flex-wrap items-center justify-center gap-3 mt-3"
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

      {/* Table */}
      <ExpensesTable expenses={expenses} hide={hide} />

      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-5 mt-4 w-full">
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
      </div>
    </motion.div>
  );
};
