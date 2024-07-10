import { Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BubbleBanner } from "../../entities/bubble-banner";
import { OverviewCard } from "./ui/overview-card";
import { FaDownload, FaPiggyBank } from "react-icons/fa6";
import TabList from "../../shared/tab-list";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { IconButton } from "../../shared/icon-button";
import { HiDotsVertical } from "react-icons/hi";
import { PiTreeStructureFill } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";
import { Button } from "../../shared/button";
import { useLazyFetchAnnualReportDetailQuery } from "../../providers/store/api/annualsAPI";
import { useEffect } from "react";
import { formatViMoney } from "../../shared/utils/format-vi-money";

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

export const AnnualReportDetailRootPage: React.FC = () => {
  const navigate = useNavigate();

  // Get annual report detail
  const { annualReportId } = useParams<{ annualReportId: string }>();

  const [fetchAnnualReportDetail, { data: annual, isFetching, isSuccess }] =
    useLazyFetchAnnualReportDetailQuery();

  useEffect(() => {
    if (annualReportId) {
      fetchAnnualReportDetail(parseInt(annualReportId, 10), true);
    }
  }, [annualReportId]);

  if (!isFetching && isSuccess && !annual) return <p>No annual found</p>;

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-extrabold text-lg w-fit ml-7 space-x-2">
            <Link
              to={`/annual-report`}
              className="font-bold opacity-70 hover:opacity-100 hover:underline duration-200"
            >
              Annual Report
            </Link>
            <span className="ml-3 text-base opacity-40">&gt;</span>
            <span>Report {annual?.year}</span>
          </p>
          <div className="ml-auto">
            <Button>
              <div className="flex flex-row flex-wrap items-center gap-2">
                <FaDownload className="text-xl mb-0.5" />
                <p className="text-sm font-bold">Download report</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      {/* Title */}
      <motion.div
        className="flex flex-row flex-wrap items-center mt-6 px-7"
        variants={childrenAnimation}
      >
        <p className="text-2xl font-extrabold text-primary mr-5">
          Annual report of {annual?.year}
        </p>

        <div className="flex flex-row flex-wrap gap-3 ml-auto">
          <IconButton>
            <HiDotsVertical className="text-xl text-primary" />
          </IconButton>
        </div>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-between gap-5 mt-10 px-5 w-full">
        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<RiCalendarScheduleFill className="text-4xl" />}
            label={"Total terms"}
            value={annual?.totalTerm}
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<PiTreeStructureFill className="text-4xl" />}
            label={"Total departments"}
            value={annual?.totalDepartment}
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            className="flex-1"
            icon={<FaPiggyBank className="text-4xl" />}
            label={"Total expenses"}
            value={annual?.totalExpense}
            // {formatViMoney(annual?.totalExpense)}
          />
        </motion.div>
      </div>

      <div className="mt-7 px-5">
        <div className="w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl py-7 px-8">
          <div className="border-b-2 border-b-neutral-200 dark:border-b-neutral-700">
            <TabList
              className="-mb-0.5"
              items={[
                { id: "chart", name: "Overview" },
                { id: "table", name: "Detail" },
              ]}
              onItemChangeHandler={({ id }) => {
                switch (id) {
                  case "chart":
                    navigate(`./chart/${annualReportId}`);
                    break;

                  case "table":
                    navigate(`./table/${annualReportId}`);
                    break;

                  default:
                    break;
                }
              }}
            />
          </div>
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};
