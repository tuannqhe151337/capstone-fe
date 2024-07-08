import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { LoadOptions } from "react-select-async-paginate";
import { SearchBox } from "../../shared/search-box";
import { StatusTermFilter } from "../../entities/status-term-filter";

interface TermOption {
  value: number;
  label: string;
}
const pageSize = 10;

const defaultOptionTerm = {
  value: 0,
  label: "Term",
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

interface Props {
  searchboxValue?: string;
  onSearchboxChange?: (value: string) => any;
  onStatusIdChange?: (statusId: number | null | undefined) => any;
}

export const ListTermFiler: React.FC<Props> = ({
  searchboxValue,
  onSearchboxChange,
  onStatusIdChange,
}) => {
  // Select state
  const [selectedOptionTerm, setSelectedOptionTerm] =
    useState<TermOption | null>(defaultOptionTerm);

  // Fetch initial data
  const [pageTerm, setPageTerm] = useState<number>(1);

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

  return (
    <>
      <div className="flex flex-row flex-wrap w-full items-center mt-14 ">
        <div className="w-10/12">
          <SearchBox></SearchBox>
        </div>
        <div className="pl-3 w-2/12">
          <StatusTermFilter
            onChange={(option) => {
              onStatusIdChange && onStatusIdChange(option?.value);
            }}
          />
        </div>
      </div>
    </>
  );
};
