import { Variants, motion } from "framer-motion";
import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
interface TermOption {
  value: number;
  label: string;
}
const pageSize = 10;

const defaultStatusTerm = {
  value: 0,
  label: "In progress",
};

const statusTermDummyData = [
  {
    id: 1,
    name: "New",
    status: "new",
    icon: <FaCheckCircle />,
  },
  {
    id: 2,
    name: "In progress",
    status: "inProgress",
    icon: <FaExclamationCircle />,
  },
  {
    id: 3,
    name: "Closed",
    status: "closed",
    icon: <FaTimesCircle />,
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

// Custom Option component to display icons
// const CustomOption = (props: OptionProps<TermOption>) => {
//   return (
//     <components.Option {...props}>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         {props.data.icon}
//         <span style={{ marginLeft: 10 }}>{props.data.label}</span>
//       </div>
//     </components.Option>
//   );
// };

const CustomOption = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      asdf
      <span style={{ marginLeft: 10 }}>^^</span>
    </div>
  );
};

export const TermFilterStatus: React.FC = () => {
  // Select state
  const [selectedOptionTerm, setSelectedOptionTerm] =
    useState<TermOption | null>(defaultStatusTerm);

  // Fetch initial data
  const [pageTerm, setPageTerm] = useState<number>(1);

  // Convert data to option for Term
  const loadTermOptions: LoadOptions<TermOption, any, any> = async () => {
    // Fetch data
    // const data = statusTermDummyData;

    // Load options
    const hasMoreTerm = pageTerm * pageSize < statusTermDummyData.length;

    const loadOptionsTerm = {
      options: statusTermDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMoreTerm,
    };

    if (pageTerm === 1) {
      loadOptionsTerm.options.unshift(defaultStatusTerm);
    }

    // Update page
    if (hasMoreTerm) {
      setPageTerm((pageTerm) => pageTerm + 1);
    }
    return loadOptionsTerm;
  };

  return (
    <>
      <motion.div
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={staggerChildrenAnimation}
      >
        <motion.div className="">
          <motion.div variants={childrenAnimation} className="">
            <AsyncPaginate
              classNamePrefix="custom-select"
              className="cursor-pointer "
              value={selectedOptionTerm}
              onChange={(value) => setSelectedOptionTerm(value)}
              options={[defaultStatusTerm]}
              loadOptions={loadTermOptions}
              components={{ Option: CustomOption }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};
