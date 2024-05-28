import { useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { UploadPlanModal } from "../../widgets/upload-plan-modal";
import { SearchBox } from "../../shared/search-box";
import { FaFilter, FaUpload } from "react-icons/fa6";
import { AsyncPaginate } from "react-select-async-paginate";
import type { LoadOptions } from "react-select-async-paginate";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { IconButton } from "../../shared/icon-button";

interface TermOption {
  value: number;
  label: string;
}

interface DeptOption {
  value: number;
  label: string;
}

interface StatusOption {
  value: number;
  label: string;
}

const pageSize = 10;

const defaultOptionTerm = {
  value: 0,
  label: "Term",
};

const defaultOptionDept = {
  value: 0,
  label: "Department",
};

const defaultOptionStatus = {
  value: 0,
  label: "Status",
};

const termDummyData = [
  {
    id: 1,
    name: "Term 1",
  },
  {
    id: 2,
    name: "Term 2",
  },
  {
    id: 3,
    name: "Term 3",
  },
  {
    id: 4,
    name: "Term 4",
  },
  {
    id: 5,
    name: "Term 5",
  },
  {
    id: 6,
    name: "Term 6",
  },
  {
    id: 7,
    name: "Term 7",
  },
  {
    id: 8,
    name: "Term 8",
  },
  {
    id: 9,
    name: "Term 9",
  },
  {
    id: 10,
    name: "Term 10",
  },
  {
    id: 11,
    name: "Term 11",
  },
  {
    id: 12,
    name: "Term 12",
  },
  {
    id: 13,
    name: "Term 13",
  },
  {
    id: 14,
    name: "Term 14",
  },
  {
    id: 15,
    name: "Term 15",
  },
];

const deptDummyData = [
  {
    id: 1,
    name: "Dept 1",
  },
  {
    id: 2,
    name: "Dept 2",
  },
  {
    id: 3,
    name: "Dept 3",
  },
  {
    id: 4,
    name: "Dept 4",
  },
  {
    id: 5,
    name: "Dept 5",
  },
  {
    id: 6,
    name: "Dept 6",
  },
  {
    id: 7,
    name: "Dept 7",
  },
  {
    id: 8,
    name: "Dept 8",
  },
  {
    id: 9,
    name: "Dept 9",
  },
  {
    id: 10,
    name: "Dept 10",
  },
  {
    id: 11,
    name: "Dept 11",
  },
  {
    id: 12,
    name: "Dept 12",
  },
  {
    id: 13,
    name: "Dept 13",
  },
  {
    id: 14,
    name: "Dept 14",
  },
  {
    id: 15,
    name: "Dept 15",
  },
];

const statusDummyData = [
  {
    id: 1,
    name: "Status 1",
  },
  {
    id: 2,
    name: "Status 2",
  },
  {
    id: 3,
    name: "Status 3",
  },
  {
    id: 4,
    name: "Status 4",
  },
  {
    id: 5,
    name: "Status 5",
  },
  {
    id: 6,
    name: "Status 6",
  },
  {
    id: 7,
    name: "Status 7",
  },
  {
    id: 8,
    name: "Status 8",
  },
  {
    id: 9,
    name: "Status 9",
  },
  {
    id: 10,
    name: "Status 10",
  },
  {
    id: 11,
    name: "Status 11",
  },
  {
    id: 12,
    name: "Status 12",
  },
  {
    id: 13,
    name: "Status 13",
  },
  {
    id: 14,
    name: "Status 14",
  },
  {
    id: 15,
    name: "Status 15",
  },
];

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

  const [showFillterBtn, setShowFillterBtn] = useState(false);

  const handleOnClick = () => {
    setShowFillterBtn(!showFillterBtn);
  };

  // Fetch initial data
  const [pageTerm, setPageTerm] = useState<number>(1);
  const [pageDept, setPageDept] = useState<number>(1);
  const [pageStatus, setPageStatus] = useState<number>(1);

  // Convert data to option for Term
  const loadOptionsTerm: LoadOptions<TermOption, any, any> = async () => {
    // Fetch data
    // const data = termDummyData;

    // Load options
    const hasMoreTerm = pageTerm * pageSize < termDummyData.length;
    const hasMoreDept = pageDept * pageSize < deptDummyData.length;
    const hasMoreStatus = pageStatus * pageSize < statusDummyData.length;

    const loadOptionsTerm = {
      options: termDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMoreTerm,
    };

    if (pageTerm === 1) {
      loadOptionsTerm.options.unshift(defaultOptionTerm);
    }

    // Update page
    if (hasMoreTerm) {
      setPageTerm((pageTerm) => pageTerm + 1);
    }
    return loadOptionsTerm;
  };

  // Convert data to option for Department
  const loadOptionsDept: LoadOptions<DeptOption, any, any> = async () => {
    // Fetch data
    // const data = termDummyData;

    // Load options
    const hasMoreDept = pageDept * pageSize < deptDummyData.length;

    const loadOptionsDept = {
      options: deptDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMoreDept,
    };

    if (pageDept === 1) {
      loadOptionsDept.options.unshift(defaultOptionDept);
    }

    // Update page

    if (hasMoreDept) {
      setPageDept((pageDept) => pageDept + 1);
    }
    return loadOptionsDept;
  };

  // Convert data to option for Status
  const loadOptionsStatus: LoadOptions<StatusOption, any, any> = async () => {
    // Fetch data
    // const data = termDummyData;

    // Load options
    const hasMoreStatus = pageStatus * pageSize < statusDummyData.length;

    const loadOptionsStatus = {
      options: statusDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMoreStatus,
    };

    if (pageStatus === 1) {
      loadOptionsStatus.options.unshift(defaultOptionStatus);
    }
    // Update page
    if (hasMoreStatus) {
      setPageStatus((pageStatus) => pageStatus + 1);
    }

    return loadOptionsStatus;
  };

  // Select state
  const [selectedOptionTerm, setSelectedOptionTerm] =
    useState<TermOption | null>(defaultOptionTerm);

  const [selectedOptionDept, setSelectedOptionDept] =
    useState<DeptOption | null>(defaultOptionDept);
  const [selectedOptionStatus, setSelectedOptionStatus] =
    useState<StatusOption | null>(defaultOptionStatus);
  // useEffect(() => {
  //   dispatch(setSelectedCategoryId(selectedOption?.value || 0));
  //   dispatch(setSelectedCategoryName(selectedOption?.label));
  // }, [selectedOption]);

  const filterBtnGroup = (
    <motion.div
      className=" flex justify-end mt-4"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <motion.div variants={childrenAnimation} className="mr-4">
        <AsyncPaginate
          className="w-[340px] cursor-pointer"
          value={selectedOptionTerm}
          // isLoading={isFetching}
          onChange={(value) => setSelectedOptionTerm(value)}
          options={[defaultOptionTerm]}
          loadOptions={loadOptionsTerm}
        />
      </motion.div>

      <motion.div variants={childrenAnimation} className="mr-4">
        <AsyncPaginate
          className="w-[200px] cursor-pointer"
          value={selectedOptionDept}
          // isLoading={isFetching}
          onChange={(value) => setSelectedOptionDept(value)}
          options={[defaultOptionDept]}
          loadOptions={loadOptionsDept}
        />
      </motion.div>

      <motion.div variants={childrenAnimation} className="mr-4">
        <AsyncPaginate
          className="w-[180px] cursor-pointer"
          value={selectedOptionStatus}
          // isLoading={isFetching}
          onChange={(value) => setSelectedOptionStatus(value)}
          options={[defaultOptionStatus]}
          loadOptions={loadOptionsStatus}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="px-6">
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary font-extrabold text-lg w-fit ml-7">
            Plan management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                setShowUploadPlanModal((prevProps) => !prevProps);
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

      <div className="flex flex-row flex-wrap w-full items-center mt-14 ">
        <div className="flex-1">
          <SearchBox></SearchBox>
        </div>
        <div className="pl-3">
          <div className="relative z-10 mr-3">
            <IconButton className="px-3" onClick={handleOnClick}>
              <FaFilter className="text-xl text-primary-500/80 hover:text-primary-500/80 mt-1" />
            </IconButton>
          </div>
        </div>
      </div>

      <AnimatePresence>{showFillterBtn && filterBtnGroup}</AnimatePresence>

      <UploadPlanModal
        show={showUploadPlanModal}
        onClose={() => {
          setShowUploadPlanModal(false);
        }}
      />
    </div>
  );
};
