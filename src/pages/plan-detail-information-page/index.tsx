import { Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { DetailPropertyItem } from "../../entities/detail-property-item";
import { FaChartLine } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import { RiProgress3Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useGetPlanDetailQuery } from "../../providers/store/api/plansApi";
import { formatISODateFromResponse } from "../../shared/utils/format-iso-date-from-response";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa6";

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
  // Parameters
  const { planId } = useParams<{ planId: string }>();

  // Query
  const { data, isFetching } = useGetPlanDetailQuery({
    planId: planId ? parseInt(planId, 10) : 0,
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
                  "text-green-600":
                    data?.status.code === "NEW" ||
                    data?.status.code === "APPROVED",
                  "text-primary-500":
                    data?.status.code === "REVIEWED" ||
                    data?.status.code === "WAITING_FOR_REVIEWED",
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

        {/* Version */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<BsStack className="text-2xl" />}
            title="Version"
            value={`v${data?.version}`}
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
