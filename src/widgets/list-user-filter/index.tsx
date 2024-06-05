import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { SearchBox } from "../../shared/search-box";
import { IconButton } from "../../shared/icon-button";
import { FaFilter } from "react-icons/fa6";

interface RoleOption {
  value: number;
  label: string;
}

interface DeptOption {
  value: number;
  label: string;
}

interface PositionOption {
  value: number;
  label: string;
}

const pageSize = 10;

const defaultOptionRole = {
  value: 0,
  label: "Role",
};

const defaultOptionDept = {
  value: 0,
  label: "Department",
};

const defaultOptionPosition = {
  value: 0,
  label: "Position",
};

const RoleDummyData = [
  {
    id: 1,
    name: "Role 1",
  },
  {
    id: 2,
    name: "Role 2",
  },
  {
    id: 3,
    name: "Role 3",
  },
  {
    id: 4,
    name: "Role 4",
  },
  {
    id: 5,
    name: "Role 5",
  },
  {
    id: 6,
    name: "Role 6",
  },
  {
    id: 7,
    name: "Role 7",
  },
  {
    id: 8,
    name: "Role 8",
  },
  {
    id: 9,
    name: "Role 9",
  },
  {
    id: 10,
    name: "Role 10",
  },
  {
    id: 11,
    name: "Role 11",
  },
  {
    id: 12,
    name: "Role 12",
  },
  {
    id: 13,
    name: "Role 13",
  },
  {
    id: 14,
    name: "Role 14",
  },
  {
    id: 15,
    name: "Role 15",
  },
];

const DepartmentDummyData = [
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

const PositionDummyData = [
  {
    id: 1,
    name: "Position 1",
  },
  {
    id: 2,
    name: "Position 2",
  },
  {
    id: 3,
    name: "Position 3",
  },
  {
    id: 4,
    name: "Position 4",
  },
  {
    id: 5,
    name: "Position 5",
  },
  {
    id: 6,
    name: "Position 6",
  },
  {
    id: 7,
    name: "Position 7",
  },
  {
    id: 8,
    name: "Position 8",
  },
  {
    id: 9,
    name: "Position 9",
  },
  {
    id: 10,
    name: "Position 10",
  },
  {
    id: 11,
    name: "Position 11",
  },
  {
    id: 12,
    name: "Position 12",
  },
  {
    id: 13,
    name: "Position 13",
  },
  {
    id: 14,
    name: "Position 14",
  },
  {
    id: 15,
    name: "Position 15",
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

export const ListUserFiler: React.FC = () => {
  // UI: show 3 select box
  const [showFillterBtn, setShowFillterBtn] = useState(false);

  // Select state
  const [selectedOptionRole, setSelectedOptionRole] =
    useState<RoleOption | null>(defaultOptionRole);

  const [selectedOptionDept, setSelectedOptionDept] =
    useState<DeptOption | null>(defaultOptionDept);
  const [selectedOptionPosition, setSelectedOptionPosition] =
    useState<PositionOption | null>(defaultOptionPosition);

  // Fetch initial data
  const [pageRole, setPageRole] = useState<number>(1);
  const [pageDept, setPageDept] = useState<number>(1);
  const [pagePosition, setPagePosition] = useState<number>(1);

  // Convert data to option for Role
  const loadRoleOptions: LoadOptions<RoleOption, any, any> = async () => {
    // Fetch data
    // const data = RoleDummyData;

    // Load options
    const hasMoreRole = pageRole * pageSize < RoleDummyData.length;

    const loadOptionsRole = {
      options: RoleDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMoreRole,
    };

    if (pageRole === 1) {
      loadOptionsRole.options.unshift(defaultOptionRole);
    }

    // Update page
    if (hasMoreRole) {
      setPageRole((pageRole) => pageRole + 1);
    }
    return loadOptionsRole;
  };

  // Convert data to option for Department
  const loadDepartmentOptions: LoadOptions<DeptOption, any, any> = async () => {
    // Fetch data
    // const data = RoleDummyData;

    // Load options
    const hasMoreDept = pageDept * pageSize < DepartmentDummyData.length;

    const loadOptionsDept = {
      options: DepartmentDummyData?.map(({ id, name }) => ({
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

  // Convert data to option for Position
  const loadPositionOptions: LoadOptions<
    PositionOption,
    any,
    any
  > = async () => {
    // Fetch data
    // const data = RoleDummyData;

    // Load options
    const hasMorePosition = pagePosition * pageSize < PositionDummyData.length;

    const loadOptionsPosition = {
      options: PositionDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMorePosition,
    };

    if (pagePosition === 1) {
      loadOptionsPosition.options.unshift(defaultOptionPosition);
    }

    // Update page
    if (hasMorePosition) {
      setPagePosition((pagePosition) => pagePosition + 1);
    }

    return loadOptionsPosition;
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
            value={selectedOptionRole}
            // isLoading={isFetching}
            onChange={(value) => setSelectedOptionRole(value)}
            options={[defaultOptionRole]}
            loadOptions={loadRoleOptions}
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
            value={selectedOptionPosition}
            // isLoading={isFetching}
            onChange={(value) => setSelectedOptionPosition(value)}
            options={[defaultOptionPosition]}
            loadOptions={loadPositionOptions}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <div className="flex flex-row flex-wrap w-full items-center mt-14 ">
        <div className="flex-1">
          <SearchBox></SearchBox>
        </div>
        <div className="pl-3">
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
