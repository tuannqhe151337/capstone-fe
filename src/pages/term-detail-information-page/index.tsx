import { Variants, motion } from "framer-motion";
import { DetailPropertyItem } from "../../entities/detail-property-item";
import { useParams } from "react-router-dom";
import { useLazyFetchTermDetailQuery } from "../../providers/store/api/termApi";
import { useEffect } from "react";
import { SiClockify } from "react-icons/si";
import { format } from "date-fns";
import { parseISOInResponse } from "../../shared/utils/parse-iso-in-response";
import { FaFileImport } from "react-icons/fa6";
import { capitalizeFirstLetter } from "../../shared/utils/capitalized-string";

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

export const TermDetailInformationPage: React.FC = () => {
  // Get annual report expense
  const { termId } = useParams<{ termId: string }>();

  const [fetchTermReportDetail, { data: term, isFetching }] =
    useLazyFetchTermDetailQuery();

  useEffect(() => {
    if (termId) {
      fetchTermReportDetail(parseInt(termId, 10), true);
    }
  }, [termId]);

  return (
    <motion.div
      className="flex flex-row flex-wrap w-full px-4 py-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      <div className="flex flex-col flex-wrap flex-1 gap-9">
        {/* Start-end date */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<SiClockify className="text-2xl" />}
            title={capitalizeFirstLetter(term?.duration)}
            value={`${format(
              parseISOInResponse(term?.startDate),
              "dd/MM/yyyy"
            )} - ${format(parseISOInResponse(term?.endDate), "dd/MM/yyyy")}`}
          />
        </motion.div>

        {/* Reupload period */}
        <motion.div variants={childrenAnimation}>
          <DetailPropertyItem
            isFetching={isFetching}
            icon={<FaFileImport className="text-2xl -ml-1 mr-1" />}
            title="Reupload plan period"
            value={`${format(
              parseISOInResponse(term?.reuploadStartDate),
              "dd/MM/yyyy"
            )} - ${format(
              parseISOInResponse(term?.reuploadEndDate),
              "dd/MM/yyyy"
            )}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
