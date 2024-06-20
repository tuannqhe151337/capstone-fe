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
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";

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

export const TermDetailInformationPage: React.FC = () => {
  return (
    <motion.div
      className="flex flex-row flex-wrap w-full px-4 py-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Quarterly */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<AiOutlineFieldTime className="text-3xl" />}
            title="Quaterly"
            value="1/9/2021 - 01/01/2022"
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

        {/* Report */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            icon={<BiSolidReport className="text-3xl" />}
            title="Report due date"
            value={format(new Date(), "dd MMMM yyyy")}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
