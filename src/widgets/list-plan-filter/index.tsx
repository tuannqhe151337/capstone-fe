import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { FaFilter } from "react-icons/fa6";

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

const heightPlaceholderAnimation: Variants = {
  hidden: {
    height: 0,
    transition: {
      delay: 0.5,
    },
  },
  visible: {
    height: 60,
  },
};

export const ListPlanFiler: React.FC = () => {
  // UI: show 3 select box
  const [showFillterBtn, setShowFillterBtn] = useState(false);

  // Select state
  const [selectedOptionTerm, setSelectedOptionTerm] =
    useState<TermOption | null>(defaultOptionTerm);

  const [selectedOptionDept, setSelectedOptionDept] =
    useState<DeptOption | null>(defaultOptionDept);
  const [selectedOptionStatus, setSelectedOptionStatus] =
    useState<StatusOption | null>(defaultOptionStatus);

  // Fetch initial data
  const [pageTerm, setPageTerm] = useState<number>(1);
  const [pageDept, setPageDept] = useState<number>(1);
  const [pageStatus, setPageStatus] = useState<number>(1);

  // Convert data to option for Term
  const loadTermOptions: LoadOptions<TermOption, any, any> = async () => {
    // Fetch data
    // const data = termDummyData;

    // Load options
    const hasMoreTerm = pageTerm * pageSize < termDummyData.length;

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
  const loadDepartmentOptions: LoadOptions<DeptOption, any, any> = async () => {
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
  const loadStatusOptions: LoadOptions<StatusOption, any, any> = async () => {
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

  const filterBtnGroup = (
    <motion.div
      className="absolute w-full"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <motion.div className="flex justify-end mt-4">
        <motion.div variants={childrenAnimation} className="mr-4">
          <AsyncPaginate
            className="w-[340px] cursor-pointer"
            value={selectedOptionTerm}
            // isLoading={isFetching}
            onChange={(value) => setSelectedOptionTerm(value)}
            options={[defaultOptionTerm]}
            loadOptions={loadTermOptions}
          />
        </motion.div>

        <motion.div variants={childrenAnimation} className="mr-4">
          <AsyncPaginate
            className="w-[200px] cursor-pointer"
            value={selectedOptionDept}
            // isLoading={isFetching}
            onChange={(value) => setSelectedOptionDept(value)}
            options={[defaultOptionDept]}
            loadOptions={loadDepartmentOptions}
          />
        </motion.div>

        <motion.div variants={childrenAnimation} className="">
          <AsyncPaginate
            className="w-[180px] cursor-pointer"
            value={selectedOptionStatus}
            // isLoading={isFetching}
            onChange={(value) => setSelectedOptionStatus(value)}
            options={[defaultOptionStatus]}
            loadOptions={loadStatusOptions}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <div className="flex flex-row flex-wrap w-full items-center mt-14 ">
        <div className="w-11/12">
          <SearchBox></SearchBox>
        </div>
        <div className="pl-8">
          <div className="relative z-10 mr-3">
            <IconButton
              className="px-3"
              onClick={() => {
                setShowFillterBtn((prevState) => !prevState);
              }}
            >
              <FaFilter className="text-xl text-primary-500/80 hover:text-primary-500/80 mt-1" />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <AnimatePresence>{showFillterBtn && filterBtnGroup}</AnimatePresence>

        <motion.div
          initial={AnimationStage.HIDDEN}
          animate={
            showFillterBtn ? AnimationStage.VISIBLE : AnimationStage.HIDDEN
          }
          variants={heightPlaceholderAnimation}
        />
      </div>
    </>
  );
};
