import { useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { HiDotsVertical } from "react-icons/hi";
import { TablePlanExpenses } from "../../widgets/table-plan-expense";
import { FaDownload, FaFilter, FaUpload } from "react-icons/fa6";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { RiDeleteRow } from "react-icons/ri";
import { Button } from "../../shared/button";
import { FaListCheck } from "react-icons/fa6";
import { ListPlanDetailFilter } from "../../widgets/list-plan-detail-filter";
import { produce } from "immer";
import { TableReportExpenses } from "../../widgets/table-report-expense";
import { CostTypeFilter } from "../../entities/cost-type-filter";
import { DepartmentFilter } from "../../entities/department-filter";

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

export const ReportDetailExpensePage: React.FC = () => {
  const [listSelectedIndex, setListSelectedIndex] = useState<Set<number>>(
    new Set()
  );

  const [costTypeId, setCostTypeId] = useState<number | null>();
  const [departmentId, setDepartmentId] = useState<number | null>();

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
      <div className="flex flex-row">
        {/* Search box */}
        <motion.div className="mt-4 w-[520px]" variants={childrenAnimation}>
          <SearchBox />
        </motion.div>

        <motion.div className="flex justify-end mt-5 ml-4">
          <motion.div variants={childrenAnimation} className="mr-4 ">
            <CostTypeFilter
              onChange={(option) => {
                setCostTypeId(option?.value);
              }}
            />
          </motion.div>

          <motion.div variants={childrenAnimation} className="mr-4">
            <DepartmentFilter
              onChange={(option) => {
                setDepartmentId(option?.value);
              }}
            />
          </motion.div>
        </motion.div>

        <div className="mt-5">
          <Button
          // onClick={() => {
          //   setShowUploadPlanModal(true);
          // }}
          >
            <div className="flex flex-row flex-wrap gap-3 ">
              <FaDownload className="mt-0.5" />
              <p className="text-sm font-semibold">Dowload report</p>
            </div>
          </Button>
        </div>
      </div>

      <TableReportExpenses
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
