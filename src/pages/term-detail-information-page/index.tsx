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
import { useParams } from "react-router-dom";
import { useLazyFetchTermDetailQuery } from "../../providers/store/api/termApi";
import { useEffect } from "react";
import { formatISODate } from "../../shared/utils/format-iso-date";
import { Skeleton } from "../../shared/skeleton";
import { capitalizeFirstLetter } from "../../shared/utils/capitalized-string";

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
  // Get annual report expense
  const { termId } = useParams<{ termId: string }>();

  const [fetchTermReportDetail, { data: term, isFetching, isSuccess }] =
    useLazyFetchTermDetailQuery();

  useEffect(() => {
    if (termId) {
      fetchTermReportDetail(parseInt(termId, 10), true);
    }
  }, [termId]);

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
            isFetching={isFetching}
            icon={<AiOutlineFieldTime className="text-3xl" />}
            title={term ? capitalizeFirstLetter(term.duration) : ""}
            value={
              term
                ? formatISODate(term.startDate) +
                  " - " +
                  formatISODate(term.endDate)
                : ""
            }
          />
        </motion.div>

        {/* Plan due date */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<FaChartLine className="text-2xl mr-1" />}
            title="Plan due date"
            value={term ? formatISODate(term.planDueDate) : ""}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
