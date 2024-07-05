import { useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";
import { FaUpload } from "react-icons/fa6";
import { ListPlanFilter } from "../../widgets/list-plan-filter";
import { Variants, motion } from "framer-motion";
import { TableReportManagement } from "../../widgets/table-report";

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
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const ReportManagementList: React.FC = () => {
  const [showUploadPlanModal, setShowUploadPlanModal] =
    useState<boolean>(false);

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-extrabold text-2xl w-fit ml-7">
            Report management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                setShowUploadPlanModal(true);
              }}
            >
              <div className="flex flex-row flex-wrap gap-3">
                <FaUpload className="mt-0.5" />
                <p className="text-sm font-semibold">Upload report</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <motion.div variants={childrenAnimation}>
        <ListPlanFilter />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TableReportManagement
          onCreatePlanClick={() => {
            setShowUploadPlanModal(true);
          }}
        />
      </motion.div>

      <UploadPlanModal
        show={showUploadPlanModal}
        onClose={() => {
          setShowUploadPlanModal(false);
        }}
      />
    </motion.div>
  );
};
