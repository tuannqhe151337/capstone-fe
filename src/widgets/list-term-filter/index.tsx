import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { SearchBox } from "../../shared/search-box";
import { StatusTermFilter } from "../../entities/status-term-filter";

// enum AnimationStage {
//   HIDDEN = "hidden",
//   VISIBLE = "visible",
// }

// const staggerChildrenAnimation: Variants = {
//   [AnimationStage.HIDDEN]: {
//     transition: {
//       staggerChildren: 0.1,
//       staggerDirection: -1,
//       delayChildren: 0.2,
//       duration: 0.2,
//     },
//   },
//   [AnimationStage.VISIBLE]: {
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//       duration: 0.2,
//     },
//   },
// };

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
  return (
    <>
      <div className="flex flex-row flex-wrap w-full items-center mt-14 ">
        <div className="w-10/12">
          <SearchBox
            value={searchboxValue}
            onChange={(e) =>
              onSearchboxChange && onSearchboxChange(e.currentTarget.value)
            }
          />
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
