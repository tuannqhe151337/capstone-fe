import { Variants, motion } from "framer-motion";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Tag } from "../../shared/tag";
import { OverviewCard } from "./ui/overview-card";
import { FaMoneyBillTrendUp, FaCoins } from "react-icons/fa6";
import TabList from "../../shared/tab-list";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetPlanDetailQuery } from "../../providers/store/api/plansApi";
import { formatViMoney } from "../../shared/utils/format-vi-money";
import { Meteors } from "../../shared/meteors";

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

export const PlanDetailRootPage: React.FC = () => {
  // Navigation
  const navigate = useNavigate();

  // Parameters
  const { planId } = useParams<{ planId: string }>();

  // Query
  const { data } = useGetPlanDetailQuery({
    planId: planId ? parseInt(planId, 10) : 0,
  });

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <BubbleBanner></BubbleBanner>

      {/* Title */}
      <motion.div
        className="flex flex-row flex-wrap items-center mt-6 px-7"
        variants={childrenAnimation}
      >
        <p className="text-2xl font-extrabold text-primary mr-5">
          {data?.name}
        </p>

        <div className="flex flex-row flex-wrap gap-3">
          <Tag background="unfilled" variant="waiting">
            v{data?.version}
          </Tag>
          <Tag background="unfilled" variant="waiting">
            {data?.status.name}
          </Tag>
        </div>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-between gap-5 mt-10 px-5 w-full">
        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<RiCalendarScheduleFill className="text-4xl" />}
            label={"Term"}
            value={data?.term.name}
            meteors
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            icon={<FaMoneyBillTrendUp className="text-4xl" />}
            label={"Biggest expenditure"}
            value={formatViMoney(data?.biggestExpenditure || 0)}
          />
        </motion.div>

        <motion.div className="flex-1" variants={childrenAnimation}>
          <OverviewCard
            className="flex-1"
            icon={<FaCoins className="text-4xl" />}
            label={"Total plan"}
            value={formatViMoney(data?.totalPlan || 0)}
          />
        </motion.div>
      </div>

      <div className="mt-7 px-5">
        <div className="relative w-full h-full border shadow dark:border-neutral-800 dark:shadow-[0_0_15px_rgb(0,0,0,0.3)] rounded-xl py-7 px-8">
          <div className="border-b-2 border-b-neutral-200 dark:border-b-neutral-700">
            <TabList
              className="-mb-0.5"
              items={[
                { id: "expenses", name: "Expenses" },
                { id: "detail", name: "Detail" },
                { id: "version", name: "Version" },
              ]}
              onItemChangeHandler={({ id }) => {
                switch (id) {
                  case "expenses":
                    navigate(`./expenses/${planId}`);
                    break;

                  case "detail":
                    navigate(`./information/${planId}`);
                    break;

                  case "version":
                    navigate(`./version/${planId}`);
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
