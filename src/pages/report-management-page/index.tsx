import { useEffect, useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";
import { Variants, motion } from "framer-motion";
import { Row, TableReportManagement } from "../../widgets/table-report";
import {
  ListReportParameters,
  useLazyFetchReportsQuery,
} from "../../providers/store/api/reportsAPI";
import _ from "lodash";
import { ListReportFilter } from "../../widgets/list-report-filter";

const generateEmptyReports = (total: number): Row[] => {
  const reports: Row[] = [];

  for (let i = 0; i < total; i++) {
    reports.push({
      reportId: 0,
      name: "",
      version: "",
      month: "",
      term: {
        id: 0,
        name: "",
      },
      isFetching: true,
      status: {
        code: "WAITING_FOR_REVIEWED",
      },
      createdAt: "",
    });
  }

  return reports;
};

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const ReportManagementList: React.FC = () => {
  const [showUploadPlanModal, setShowUploadPlanModal] =
    useState<boolean>(false);

  // Query
  const [fetchReport, { data, isFetching }] = useLazyFetchReportsQuery();

  // Searchbox state
  const [searchboxValue, setSearchboxValue] = useState<string>("");

  const [termId, setTermId] = useState<number | null>();

  const [page, setPage] = useState<number>(1);

  // Is data empty (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(!isFetching && data && data.data && data.data.length === 0);
  }, [data]);

  // Fetch plan on change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const paramters: ListReportParameters = {
        query: searchboxValue,
        page,
        pageSize: 10,
      };

      if (termId) {
        paramters.termId = termId;
      }

      fetchReport(paramters, true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchboxValue, page, termId]);

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-extrabold text-2xl w-fit ml-7">
            Report management
          </p>
        </div>
      </BubbleBanner>

      <motion.div variants={childrenAnimation}>
        <ListReportFilter
          searchboxValue={searchboxValue}
          onSearchboxChange={(value) => {
            setSearchboxValue(value);
          }}
          onTermIdChange={(termId) => {
            setTermId(termId);
          }}
        />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TableReportManagement
          onCreatePlanClick={() => {
            setShowUploadPlanModal(true);
          }}
          reports={isFetching ? generateEmptyReports(10) : data?.data}
          isDataEmpty={isDataEmpty}
          page={page}
          totalPage={data?.pagination.numPages}
          onNext={() =>
            setPage((prevPage) => {
              if (data?.pagination.numPages) {
                if (prevPage + 1 > data?.pagination.numPages) {
                  return data?.pagination.numPages;
                } else {
                  return prevPage + 1;
                }
              } else {
                return 1;
              }
            })
          }
          onPageChange={(page) => {
            setPage(page || 1);
          }}
          onPrevious={() =>
            setPage((prevPage) => {
              if (data?.pagination.numPages) {
                if (prevPage === 1) {
                  return 1;
                } else {
                  return prevPage - 1;
                }
              } else {
                return 1;
              }
            })
          }
          isFetching={isFetching}
        />
      </motion.div>

      <UploadPlanModal
        show={showUploadPlanModal}
        onClose={() => {
          setShowUploadPlanModal(false);
        }}
      />
    </motion.div>
  );
};
