import { Variants, motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa6";
import { useLazyFetchReportsQuery } from "../../providers/store/api/reportsAPI";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

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

export const TermDetailReportPage: React.FC = () => {
  const { termId } = useParams<{ termId: string }>();

  const [fetchReports, { data: reports }] = useLazyFetchReportsQuery();

  useEffect(() => {
    let termIdInt = 0;

    if (termId) {
      if (typeof termId === "number") {
        termIdInt = termId;
      } else {
        termIdInt = parseInt(termId);
      }
    }

    fetchReports({ termId: termIdInt, page: 1, pageSize: 1 });
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
          className="text-center text-sm font-light mt-6 min-w-full  overflow-hidden "
          variants={childrenAnimation}
        >
          <tbody>
            <tr className={"bg-white  dark:bg-neutral-800/50"}>
              {reports && reports.data.length > 0 && (
                <td className="group whitespace-nowrap px-6 py-4 font-medium cursor-pointer">
                  <div className="flex flex-row flex-wrap">
                    <div className="text-neutral-300 dark:text-neutral-600">
                      <FaChartLine className="text-xl mt-2" />
                    </div>
                    <p className="font-extrabold text-neutral-500 dark:font-bold dark:text-neutral-500 py-2 ml-5 group-hover:underline">
                      {reports.data[0].name}
                    </p>
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
};
