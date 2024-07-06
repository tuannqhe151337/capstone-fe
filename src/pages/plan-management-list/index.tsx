import { useEffect, useMemo, useRef, useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";
import { FaUpload } from "react-icons/fa6";
import { ListPlanFilter } from "../../widgets/list-plan-filter";
import { Row, TablePlanManagement } from "../../widgets/table-plan";
import { Variants, motion } from "framer-motion";
import {
  ListPlanParameters,
  useLazyFetchPlansQuery,
} from "../../providers/store/api/plansApi";
import _ from "lodash";

const generateEmptyPlans = (total: number): Row[] => {
  const plans: Row[] = [];

  for (let i = 0; i < total; i++) {
    plans.push({
      planId: 0,
      name: "",
      department: {
        id: 0,
        name: "",
      },
      term: {
        id: 0,
        name: "",
      },
      status: {
        id: 0,
        name: "",
        code: "",
      },
      role: {
        id: 0,
        code: "",
        name: "",
      },
      version: 0,
      isDelete: false,
      isFetching: true,
    });
  }

  return plans;
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

export const PlanManagementList: React.FC = () => {
  const [showUploadPlanModal, setShowUploadPlanModal] =
    useState<boolean>(false);

  // Query
  const [fetchPlan, { data, error, isFetching }] = useLazyFetchPlansQuery();

  // Searchbox state
  const [searchboxValue, setSearchboxValue] = useState<string>("");

  const [termId, setTermId] = useState<number | null>();
  const [departmentId, setDepartmentId] = useState<number | null>();
  const [statusId, setStatusId] = useState<number | null>();

  const [page, setPage] = useState<number>(1);

  // Is data empty (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(!isFetching && data && data.data && data.data.length === 0);
  }, [data]);

  // Fetch plan on change
  useEffect(() => {
    fetchPlan({ page: 1, pageSize: 10 });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const paramters: ListPlanParameters = {
        query: searchboxValue,
        page,
        pageSize: 10,
      };

      if (termId) {
        paramters.termId = termId;
      }

      if (departmentId) {
        paramters.departmentId = departmentId;
      }

      if (statusId) {
        paramters.statusId = statusId;
      }

      fetchPlan(paramters, true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchboxValue, page, termId, departmentId, statusId]);

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
            Plan management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                setShowUploadPlanModal(true);
              }}
            >
              <div className="flex flex-row flex-wrap gap-3">
                <FaUpload className="mt-0.5" />
                <p className="text-sm font-semibold">Upload plan</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <motion.div variants={childrenAnimation}>
        <ListPlanFilter
          searchboxValue={searchboxValue}
          onSearchboxChange={(value) => {
            setSearchboxValue(value);
          }}
          onTermIdChange={(termId) => {
            setTermId(termId);
          }}
          onDepartmentIdChange={(departmentId) => {
            setDepartmentId(departmentId);
          }}
          onStatusIdChange={(statusId) => {
            setStatusId(statusId);
          }}
        />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TablePlanManagement
          onCreatePlanClick={() => {
            setShowUploadPlanModal(true);
          }}
          plans={isFetching ? generateEmptyPlans(10) : data?.data}
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
