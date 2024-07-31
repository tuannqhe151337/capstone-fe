import { useEffect, useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";
import { Variants, motion } from "framer-motion";
import _ from "lodash";
import { Row, TableDepartment } from "../../widgets/table-department";
import { SearchBox } from "../../shared/search-box";
import { FaPlusCircle } from "react-icons/fa";
import {
  Department,
  ListDepartmentParameters,
  useLazyGetListDepartmentQuery,
} from "../../providers/store/api/departmentApi";

const generateEmptyDepartments = (total: number): Department[] => {
  const departments: Row[] = [];

  for (let i = 0; i < total; i++) {
    departments.push({
      departmentId: 0,
      name: "",
      createdAt: "",
      updatedAt: "",
      isFetching: true,
    });
  }

  return departments;
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

export const DepartmentManagementList: React.FC = () => {
  // UI: show modal
  const [showUploadPlanModal, setShowUploadPlanModal] =
    useState<boolean>(false);

  // Query
  const [fetchDepartments, { data, isFetching }] =
    useLazyGetListDepartmentQuery();

  // Searchbox state
  const [searchboxValue, setSearchboxValue] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  // Is data empty (derived from data)
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>();

  useEffect(() => {
    setIsDataEmpty(!isFetching && data && data.data && data.data.length === 0);
  }, [data]);

  // On delete plan successfully (for re-rendering)
  const [deletedDepartmentId, setDeletedDepartmentId] = useState<
    string | number
  >();

  // Fetch plan on change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const paramters: ListDepartmentParameters = {
        query: searchboxValue,
        sortBy: "name",
        sortType: "asc",
        page,
        pageSize: 10,
      };

      fetchDepartments(paramters, true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchboxValue, page, deletedDepartmentId]);

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
            Department management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                setShowUploadPlanModal(true);
              }}
            >
              <div className="flex flex-row flex-wrap items-center gap-2.5">
                <FaPlusCircle className="text-xl" />
                <p className="text-sm font-semibold">New department</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <motion.div className="mt-14" variants={childrenAnimation}>
        <SearchBox
          value={searchboxValue}
          onChange={(e) => setSearchboxValue(e.currentTarget.value)}
        />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TableDepartment
          onCreatePlanClick={() => {
            setShowUploadPlanModal(true);
          }}
          onDeleteSuccessfully={(plan) => {
            setDeletedDepartmentId(plan.planId);
          }}
          departments={isFetching ? generateEmptyDepartments(10) : data?.data}
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
