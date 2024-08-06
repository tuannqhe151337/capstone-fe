import { AnimatePresence, Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BubbleBanner } from "../../entities/bubble-banner";
import { FaMoneyBillTrendUp, FaCoins } from "react-icons/fa6";
import TabList from "../../shared/tab-list";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { formatViMoney } from "../../shared/utils/format-vi-money";
import { Skeleton } from "../../shared/skeleton";
import { useEffect, useState } from "react";
import { OverviewCard } from "../../entities/overview-card";
import {
  useGetReportActualCostQuery,
  useGetReportDetailQuery,
  useGetReportExpectedCostQuery,
} from "../../providers/store/api/reportsAPI";
import { ReportTag } from "../../entities/report-tag";
import { UploadReviewExpenseModal } from "../../widgets/upload-review-expense-modal";
import { Button } from "../../shared/button";
import { FaUpload } from "react-icons/fa";
import { useIsAuthorizedAndTimeToReviewReport } from "../../features/use-is-authorized-time-to-review-report";
import { useHotkeys } from "react-hotkeys-hook";

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

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

type TabId = "expenses" | "detail";

export const ReportDetailRootPage: React.FC = () => {
  // Location
  const location = useLocation();

  // Navigation
  const navigate = useNavigate();

  // Parameters
  const { reportId } = useParams<{ reportId: string }>();

  // Query
  const {
    data: report,
    isError,
    isFetching,
    isSuccess,
  } = useGetReportDetailQuery({
    reportId: reportId ? parseInt(reportId) : 0,
  });

  const { data: expectedCostData } = useGetReportExpectedCostQuery({
    reportId: reportId ? parseInt(reportId) : 0,
  });

  const { data: actualCostData } = useGetReportActualCostQuery({
    reportId: reportId ? parseInt(reportId) : 0,
  });

  // Tablist state
  const [selectedTabId, setSelectedTabId] = useState<TabId>("expenses");

  useEffect(() => {
    const currentTabUrl = location.pathname
      .replace("/report-management/detail/", "")
      .split("/")[0];

    switch (currentTabUrl) {
      case "expenses":
        setSelectedTabId("expenses");
        break;

      case "information":
        setSelectedTabId("detail");
        break;
    }
  }, [location]);

  // UI: upload report's expenses modal
  const [showReportReviewExpensesModal, setShowReportReviewExpensesModal] =
    useState<boolean>(false);

  const isAuthorizedAndTimeToReviewReport =
    useIsAuthorizedAndTimeToReviewReport({
      reportStatusCode: report?.status.code,
      termEndDate: report?.term.endDate,
      termReuploadStartDate: report?.term.reuploadStartDate,
      termReuploadEndDate: report?.term.reuploadEndDate,
      finalEndTermDate: report?.term.finalEndTermDate,
    });

  useHotkeys("ctrl + u", (e) => {
    e.preventDefault();
    setShowReportReviewExpensesModal(true);
  });

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          {/* Left */}
          <p className="text-primary dark:text-primary/70 font-extrabold text-lg w-fit ml-7 space-x-2">
            <Link
              to={`/report-management`}
              className="font-bold opacity-70 hover:opacity-100 hover:underline duration-200"
            >
              Report management
            </Link>
            <span className="ml-3 text-base opacity-40">&gt;</span>
            <span>Report detail</span>
          </p>

          {/* Right */}
          {isAuthorizedAndTimeToReviewReport && (
            <div className="ml-auto">
              <Button
                onClick={() => {
                  setShowReportReviewExpensesModal(true);
                }}
              >
                <div className="flex flex-row flex-wrap gap-3 ">
                  <FaUpload className="mt-0.5" />
                  <p className="text-sm font-semibold">Upload review file</p>
                </div>
              </Button>
            </div>
          )}
        </div>
      </BubbleBanner>

      {/* Title */}
      <motion.div className="mt-6 px-7" variants={childrenAnimation}>
        <div className="relative w-full h-[32px]">
          <AnimatePresence>
            {isFetching && <Skeleton className="w-[500px] h-[32px]" />}
            {!isFetching && !isError && isSuccess && (
              <motion.div
                className="flex flex-row flex-wrap items-center"
                variants={animation}
                initial={AnimationStage.HIDDEN}
                animate={AnimationStage.VISIBLE}
                exit={AnimationStage.HIDDEN}
              >
                <p className="text-2xl font-extrabold text-primary mr-5">
                  {report?.name}
                </p>
                <ReportTag statusCode={report.status.code} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-between gap-5 mt-10 px-5 w-full">
        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<RiCalendarScheduleFill className="text-4xl" />}
            label={"Term"}
            isFetching={isFetching}
            value={report?.term.name}
            meteors
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<FaMoneyBillTrendUp className="text-4xl" />}
            label={"Expected cost"}
            isFetching={isFetching}
            value={formatViMoney(expectedCostData?.expectedCost || 0)}
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<FaCoins className="text-4xl" />}
            label={"Actual cost"}
            isFetching={isFetching}
            value={formatViMoney(actualCostData?.actualCost || 0)}
          />
        </motion.div>
      </div>

      <div className="mt-7 px-5">
        <div className="relative w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl py-7 px-8">
          <div className="border-b-2 border-b-neutral-200 dark:border-b-neutral-700">
            <TabList
              className="-mb-0.5"
              selectedItemId={selectedTabId}
              items={[
                { id: "expenses", name: "Expenses" },
                { id: "detail", name: "Detail" },
              ]}
              onItemChangeHandler={({ id }) => {
                switch (id) {
                  case "expenses":
                    navigate(`./expenses/${reportId}`);
                    break;

                  case "detail":
                    navigate(`./information/${reportId}`);
                    break;

                  default:
                    break;
                }
              }}
            />
          </div>

          <motion.div layout>
            <Outlet />
          </motion.div>
        </div>
      </div>

      <UploadReviewExpenseModal
        reportId={reportId}
        show={showReportReviewExpensesModal}
        onClose={() => {
          setShowReportReviewExpensesModal(false);
        }}
      />
    </motion.div>
  );
};
