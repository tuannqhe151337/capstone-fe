import { useEffect } from "react";
import { Variants, motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyFetchPlansQuery } from "../../providers/store/api/plansApi";
import { PlanPreviewer } from "../../entities/plan-previewer";

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

// TODO: Fetch infinite plan
const pageSize = 10;

export const TermDetailPlanPage: React.FC = () => {
  const navigate = useNavigate();

  const { termId } = useParams<{ termId: string }>();

  const [fetchPlans, { data: plans }] = useLazyFetchPlansQuery();

  useEffect(() => {
    let termIdInt = 0;

    if (termId) {
      if (typeof termId === "number") {
        termIdInt = termId;
      } else {
        termIdInt = parseInt(termId);
      }
    }

    fetchPlans({ termId: termIdInt, page: 1, pageSize });
  }, [termId]);

  return (
    <motion.div>
      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={staggerChildrenAnimation}
      >
        <motion.table
          className="text-sm font-light mt-3 min-w-full"
          variants={childrenAnimation}
        >
          <tbody>
            <tr>
              {plans?.data.map((plan) => (
                <td
                  className="group whitespace-nowrap px-6 py-4 font-medium cursor-pointer"
                  onClick={() => {
                    navigate(`/plan-management/detail/expenses/${plan.planId}`);
                  }}
                >
                  <div className="flex flex-row flex-wrap">
                    <div className="text-neutral-300 dark:text-neutral-600">
                      <FaChartLine className="text-xl mt-2" />
                    </div>
                    <PlanPreviewer
                      containerClassName="ml-0"
                      planId={plan.planId}
                    >
                      <p className="font-extrabold text-neutral-500/80 dark:text-neutral-500 pr-3 group-hover:underline duration-200">
                        {plan.name}
                      </p>
                    </PlanPreviewer>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
};
