import { Variants, motion } from "framer-motion";
import clsx from "clsx";
import { format } from "date-fns";
import { BsStack } from "react-icons/bs";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

const childrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 10,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const rowAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

interface Version {
  id: number;
  version: string;
  createdAt: Date;
  author: string;
}

const DUMMY_VERSION_DATA: Version[] = [
  {
    id: 1,
    version: "v3",
    createdAt: new Date(),
    author: "AnhLN2",
  },
  {
    id: 2,
    version: "v2",
    createdAt: new Date(),
    author: "AnhLN2",
  },
  {
    id: 3,
    version: "v1",
    createdAt: new Date(),
    author: "AnhLN2",
  },
];

export const PlanDetailVersionPage: React.FC = () => {
  return (
    <div className="flex flex-col flex-wrap py-5 px-4">
      <div className="flex flex-row flex-wrap items-center ml-auto">
        <BsStack className="text-xl text-primary-300 dark:text-primary-700 mr-4" />
        <span className="text-lg font-extrabold text-primary-500 dark:text-primary-600 mr-1.5">
          2
        </span>
        <span className="text-base font-bold text-primary-400/80 dark:text-primary-600/90">
          total version
        </span>
      </div>

      <table className="mt-5">
        <thead className="border-b-2 border-neutral-100 dark:border-neutral-800">
          <tr>
            <th className="py-3 text-neutral-400 font-bold text-base">
              Version
            </th>
            <th className="py-3 text-neutral-400 font-bold text-base">
              Published date
            </th>
            <th></th>
            <th className="py-3 text-neutral-400 font-bold text-base text-center">
              Uploaded by
            </th>
          </tr>
        </thead>

        <motion.tbody
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          variants={staggerChildrenAnimation}
        >
          {DUMMY_VERSION_DATA.map(({ id, version, author, createdAt }, i) => (
            <motion.tr
              key={id}
              className={clsx({
                "bg-neutral-50 dark:bg-neutral-800/50": i % 2 === 1,
                "text-neutral-500/90 dark:text-neutral-400": i === 0,
                "text-neutral-400 dark:text-neutral-400/80": i !== 0,
              })}
              variants={rowAnimation}
            >
              <td className="text-sm font-bold  text-center py-5 w-[150px]">
                {version} {i === 0 && "(current)"}
              </td>
              <td className="text-sm font-bold text-center py-5 w-[200px]">
                {format(createdAt, "dd MMMM yyyy")}
              </td>
              <td></td>
              <td className="text-sm font-bold text-center py-5 w-[150px]">
                {author}
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
