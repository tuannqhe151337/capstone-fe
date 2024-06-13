import { useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";
import { FaUpload } from "react-icons/fa6";
import { ListPlanFiler } from "../../widgets/list-plan-filter";
import { TablePlanManagement } from "../../widgets/table-plan";
import { Variants, motion } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";
import { TableTermManagement } from "../../widgets/table-term";
import { ListTermFiler } from "../../widgets/list-term-filter";

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

export const TermManagementList: React.FC = () => {
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
            Term management
          </p>
          <div className="ml-auto">
            <Button>
              <div className="flex flex-row flex-wrap gap-3">
                <IoIosAddCircle className=" mt-0.5" />

                <p className="text-sm font-semibold">Add new term</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <motion.div variants={childrenAnimation}>
        <ListTermFiler />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TableTermManagement />
      </motion.div>
    </motion.div>
  );
};
