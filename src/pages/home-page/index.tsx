import CountUp from "react-countup";
import { Variants, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { OverviewCard } from "../../entities/overview-card";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaPiggyBank } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { MonthlyCostTypeExpenseChart } from "../../widgets/monthly-cost-type-expense-chart";
import { YearlyCostTypeExpenseChart } from "../../widgets/yearly-cost-type-expense-chart";
import { lazy } from "react";
import { useScrollToTopOnLoad } from "../../shared/hooks/use-scroll-to-top-on-load";
import { MonthlyExpectedActualCostChart } from "../../widgets/monthly-expected-actual-cost-chart";
import { useMeQuery } from "../../providers/store/api/authApi";
import { Role } from "../../providers/store/api/type";
import { useFetchAnnualReportDetailQuery } from "../../providers/store/api/annualsAPI";

const GlobeSection = lazy(() => import("../../widgets/globe-section"));

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

export const HomePage: React.FC = () => {
  // i18n
  const { t } = useTranslation(["annual-report-detail"]);

  // Scroll to top
  useScrollToTopOnLoad();

  // Me query
  const { data: me } = useMeQuery();

  // Use in view
  const { ref, inView } = useInView();

  // Get annual report detail for overview card
  const { data: annual } = useFetchAnnualReportDetailQuery(
    new Date().getFullYear()
  );

  return (
    <motion.div
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <div className="flex flex-row flex-wrap justify-between gap-5 px-10 w-full">
        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<RiCalendarScheduleFill className="text-4xl" />}
            label={t("Total terms")}
            // isFetching={isFetching}
            value={
              <CountUp start={0} end={annual?.totalTerm || 0} duration={4} />
            }
            meteors
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<PiTreeStructureFill className="text-4xl" />}
            label={t("Total departments")}
            // isFetching={isFetching}
            value={
              <CountUp
                start={0}
                end={annual?.totalDepartment || 0}
                duration={4}
              />
            }
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<FaPiggyBank className="text-4xl" />}
            label={t("Total expenses")}
            // isFetching={isFetching}
            value={
              <CountUp
                start={0}
                end={annual?.totalExpense || 0}
                duration={4}
                suffix=" VNĐ"
              />
            }
          />
        </motion.div>
      </div>

      {me?.role.code === Role.ACCOUNTANT && (
        <motion.div className="mt-10 px-10">
          <MonthlyExpectedActualCostChart />
        </motion.div>
      )}

      <div className="flex flex-row justify-stretch items-stretch justify-items-stretch gap-5 mt-10 px-10 w-full">
        {(me?.role.code === Role.ACCOUNTANT ||
          me?.role.code === Role.FINANCIAL_STAFF) && (
          <motion.div className="flex-[2]" variants={childrenAnimation}>
            <MonthlyCostTypeExpenseChart />
          </motion.div>
        )}
        {(me?.role.code === Role.ACCOUNTANT ||
          me?.role.code === Role.FINANCIAL_STAFF) && (
          <motion.div className="flex-1" variants={childrenAnimation}>
            <YearlyCostTypeExpenseChart />
          </motion.div>
        )}
      </div>

      <div ref={ref} className="mt-20 mb-20">
        <div className="h-[510px]">{inView && <GlobeSection />}</div>
      </div>
    </motion.div>
  );
};
