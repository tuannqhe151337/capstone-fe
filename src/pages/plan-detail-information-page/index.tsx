import { Variants, motion } from "framer-motion";
import { format } from "date-fns";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { DetailPropertyItem } from "../../entities/detail-property-item";
import { FaChartLine } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import { RiProgress3Fill } from "react-icons/ri";

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

export const PlanDetailInformationPage: React.FC = () => {
  return (
    <motion.div
      className="flex flex-row flex-wrap w-full px-4 py-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Term */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<RiCalendarScheduleFill className="text-3xl" />}
            title="Term"
            value="Financial plan December Q3 2001"
          />
        </motion.div>

        {/* Plan due date */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<FaChartLine className="text-2xl" />}
            title="Plan due date"
            value={format(new Date(), "dd MMMM yyyy")}
          />
        </motion.div>

        {/* Department */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<PiTreeStructureFill className="text-3xl" />}
            title="Department"
            value="BU 01"
          />
        </motion.div>
      </div>
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Status */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<RiProgress3Fill className="text-3xl" />}
            title="Status"
            value={<p className="text-primary-500">Waiting for approval</p>}
          />
        </motion.div>

        {/* Version */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<BsStack className="text-2xl" />}
            title="Version"
            value="v3"
          />
        </motion.div>

        {/* Created at */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<FaClock className="text-2xl" />}
            title="Created at"
            value={format(new Date(), "dd MMMM yyyy")}
          />
        </motion.div>

        {/* Created by */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<HiUser className="text-3xl -ml-1" />}
            title="Created by"
            value="AnhLN2"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
