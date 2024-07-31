import { Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { DetailPropertyItem } from "../../entities/detail-property-item";
import { FaChartLine } from "react-icons/fa";
import { HiUser } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { formatISODateFromResponse } from "../../shared/utils/format-iso-date-from-response";
import { useGetReportDetailQuery } from "../../providers/store/api/reportsAPI";

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

export const ReportDetailInformationPage: React.FC = () => {
  // Parameters
  const { reportId } = useParams<{ reportId: string }>();

  // Query
  const { data, isFetching } = useGetReportDetailQuery({
    reportId: reportId ? parseInt(reportId, 10) : 0,
  });

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
            isFetching={isFetching}
            icon={<RiCalendarScheduleFill className="text-3xl" />}
            title="Term"
            value={data?.term.name}
          />
        </motion.div>

        {/* Plan due date */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<FaChartLine className="text-2xl mr-1.5" />}
            title="Plan due date"
            value={
              (data?.planDueDate &&
                formatISODateFromResponse(data?.planDueDate)) ||
              ""
            }
          />
        </motion.div>

        {/* Department */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<PiTreeStructureFill className="text-3xl" />}
            title="Department"
            value={data?.department.name}
          />
        </motion.div>
      </div>
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Created at */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<FaClock className="text-2xl" />}
            title="Created at"
            value={
              (data?.createdAt && formatISODateFromResponse(data?.createdAt)) ||
              ""
            }
          />
        </motion.div>

        {/* Created by */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<HiUser className="text-3xl -ml-1" />}
            title="Created by"
            value={data?.user.username}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
