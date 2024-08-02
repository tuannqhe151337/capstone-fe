import { SiClockify } from "react-icons/si";
import { FaFileImport } from "react-icons/fa6";
import { Tag } from "../../shared/tag";
import { useLazyFetchTermDetailQuery } from "../../providers/store/api/termApi";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { parseISOInResponse } from "../../shared/utils/parse-iso-in-response";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../shared/utils/capitalized-string";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

interface Props {
  termId?: number;
  children?: React.ReactNode;
}

export const TermPreviewer: React.FC<Props> = ({ termId, children }) => {
  // Query
  const [fetchTermDetail, { data: term, isSuccess }] =
    useLazyFetchTermDetailQuery();

  // Hover state
  const [isHover, setIsHover] = useState<boolean>(false);

  // Load data
  useEffect(() => {
    if (termId && isHover) {
      fetchTermDetail(termId, true);
    }
  }, [termId, isHover]);

  return (
    <div
      className="relative w-max m-auto px-5 py-2"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <div>{children}</div>
      <AnimatePresence>
        {isHover && isSuccess && term && (
          <motion.div
            className="absolute left-[100%] -top-3 bg-white dark:bg-neutral-800 border dark:border-neutral-800 rounded-lg shadow dark:shadow-lg cursor-auto"
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={animation}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="px-7 py-5">
              <div className="flex flex-row flex-wrap items-center w-max gap-3 -mt-1">
                <Link
                  to={`/term-management/detail/information/${term.id}`}
                  className="ml-3 text-sm font-extrabold text-neutral-500 dark:text-neutral-400/70 hover:text-sky-600 dark:hover:text-sky-600 hover:underline duration-200"
                >
                  {term.name}
                </Link>
                <Tag className="shadow-none">
                  {capitalizeFirstLetter(term.duration)}
                </Tag>
              </div>

              <div className="mt-2.5 border-b-2 border-neutral-100 dark:border-neutral-600"></div>

              <div className="mt-3.5 mb-0.5 space-y-3.5 px-2">
                <div className="flex flex-row flex-wrap items-center gap-3 w-max">
                  <SiClockify className="text-lg text-neutral-400/30" />
                  <div className="space-y-1">
                    <p className="text-left text-xs text-neutral-400/70 dark:text-neutral-500/80">
                      Start - end date
                    </p>
                    <p className="text-sm font-bold text-neutral-500/80 dark:text-neutral-400/70">
                      {format(parseISOInResponse(term.startDate), "dd/MM/yyyy")}{" "}
                      - {format(parseISOInResponse(term.endDate), "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap items-center gap-3 w-max">
                  <FaFileImport className="text-lg text-neutral-400/30 -ml-0.5 mr-1" />
                  <div className="space-y-1">
                    <p className="text-left text-xs text-neutral-400/70 dark:text-neutral-500/80">
                      Reupload period
                    </p>
                    <p className="text-sm font-bold text-neutral-500/80 dark:text-neutral-400/70">
                      {format(
                        parseISOInResponse(term.reuploadStartDate),
                        "dd/MM/yyyy"
                      )}{" "}
                      -{" "}
                      {format(
                        parseISOInResponse(term.reuploadEndDate),
                        "dd/MM/yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
