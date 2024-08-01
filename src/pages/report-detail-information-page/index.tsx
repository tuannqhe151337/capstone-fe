import { Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill, RiProgress3Fill } from "react-icons/ri";
import { DetailPropertyItem } from "../../entities/detail-property-item";
import { FaCheck, FaClock } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { formatISODateFromResponse } from "../../shared/utils/format-iso-date-from-response";
import { useGetReportDetailQuery } from "../../providers/store/api/reportsAPI";
import clsx from "clsx";

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
      </div>
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Status */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={
              <RiProgress3Fill
                className={clsx({
                  "text-3xl -mr-1": true,
                  "text-green-600": data?.status.code === "APPROVED",
                  "text-primary-400 dark:text-primary-600":
                    data?.status.code === "REVIEWED",
                })}
              />
            }
            title="Status"
            value={
              <div
                className={clsx({
                  "flex flex-row flex-wrap items-center gap-2": true,
                  "text-green-600": data?.status.code === "APPROVED",
                  "text-primary-500":
                    data?.status.code === "REVIEWED" ||
                    data?.status.code === "WAITING_FOR_APPROVAL",
                })}
              >
                <p
                  className={clsx({
                    "font-extrabold": true,
                  })}
                >
                  {data?.status.name}
                </p>
                {data?.status.code === "REVIEWED" ||
                data?.status.code === "APPROVED" ? (
                  <FaCheck className="mb-0.5" />
                ) : null}
              </div>
            }
          />
        </motion.div>

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
      </div>
    </motion.div>
  );
};
