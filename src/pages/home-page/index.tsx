import CountUp from "react-countup";
import { Variants, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { OverviewCard } from "../../entities/overview-card";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { FaPiggyBank } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { ExpenseMonthByMonthChart } from "../../widgets/expense-month-by-month-chart";
import { ExpenseByCostTypeChart } from "../../widgets/expense-by-cost-type-chart";
import { lazy, useEffect, useState } from "react";

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

  // Use in view

  const { ref, inView } = useInView();

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
            value={<CountUp start={0} end={6} duration={4} />}
            meteors
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<PiTreeStructureFill className="text-4xl" />}
            label={t("Total departments")}
            // isFetching={isFetching}
            value={<CountUp start={0} end={12} duration={4} />}
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<FaPiggyBank className="text-4xl" />}
            label={t("Total expenses")}
            // isFetching={isFetching}
            value={
              <CountUp start={0} end={126643732} duration={4} suffix=" VNĐ" />
            }
          />
        </motion.div>
      </div>

      <div className="flex flex-row justify-stretch items-stretch justify-items-stretch gap-5 mt-10 px-10 w-full">
        <motion.div className="flex-[2]" variants={childrenAnimation}>
          <ExpenseMonthByMonthChart />
        </motion.div>
        <motion.div className="flex-1" variants={childrenAnimation}>
          <ExpenseByCostTypeChart />
        </motion.div>
      </div>

      <div ref={ref} className="mt-20 mb-20">
        <div className="h-[510px]">{inView && <GlobeSection />}</div>
      </div>
    </motion.div>
  );
};
