import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { HiDotsVertical } from "react-icons/hi";
import { TablePlanExpenses } from "../../widgets/table-plan-expense";
import { FaFilter } from "react-icons/fa6";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { RiDeleteRow } from "react-icons/ri";
import { Button } from "../../shared/button";
import { FaListCheck } from "react-icons/fa6";
import { ListPlanDetailFilter } from "../../widgets/list-plan-detail-filter";
import { produce } from "immer";

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

export const TermDetailPlanPage: React.FC = () => {
  const [listSelectedIndex, setListSelectedIndex] = useState<Set<number>>(
    new Set()
  );
  const [showReviewExpense, setShowReviewExpense] = useState<boolean>(false);

  useEffect(() => {
    if (listSelectedIndex.size !== 0) {
      setShowReviewExpense(true);
    } else {
      setShowReviewExpense(false);
    }
  }, [listSelectedIndex]);

  return (
    <motion.div
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <ListPlanDetailFilter
        className="pl-3 mt-7"
        showReviewExpense={showReviewExpense}
      />

      <TablePlanExpenses
        listSelectedIndex={listSelectedIndex}
        expenses={DUMMY_EXPENSES}
        onRowClick={(index) => {
          setListSelectedIndex(
            produce((state) => {
              if (state.has(index)) {
                state.delete(index);
              } else {
                state.add(index);
              }

              return state;
            })
          );
        }}
      />
    </motion.div>
  );
};
