import { Variants, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TermCard } from "../ui/term-card";
import { useHotkeys } from "react-hotkeys-hook";
import { produce, nothing } from "immer";

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
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
  },
};

export interface Term {
  id: string | number;
  termName: string;
  type: string;
  startDate: Date;
  endDate: Date;
}

interface Props {
  hide?: boolean;
  terms: Term[];
  onClick?: (term: Term) => any;
}

export const TermList: React.FC<Props> = ({ hide, terms, onClick }) => {
  // State
  const [selectedTermIndex, setSelectedTermIndex] = useState<number>();

  // Enter
  useHotkeys("enter", () => {
    if (selectedTermIndex !== undefined && selectedTermIndex !== null) {
      onClick && onClick(terms[selectedTermIndex]);
    }
  });

  // Up and down hotkey
  useHotkeys(
    "up",
    () => {
      setSelectedTermIndex(
        produce((selectedTermIndex) => {
          if (selectedTermIndex === null || selectedTermIndex === undefined) {
            return terms.length - 1;
          } else if (selectedTermIndex === 0) {
            return nothing;
          } else {
            return selectedTermIndex - 1;
          }
        })
      );
    },
    { enableOnFormTags: ["input", "INPUT"] }
  );

  useHotkeys(
    "down",
    () => {
      setSelectedTermIndex(
        produce((selectedTermIndex) => {
          if (selectedTermIndex === null || selectedTermIndex === undefined) {
            return 0;
          } else if (selectedTermIndex === terms.length - 1) {
            return nothing;
          } else {
            return selectedTermIndex + 1;
          }
        })
      );
    },
    { enableOnFormTags: ["input", "INPUT"] }
  );

  // Deselect element when click outside
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setSelectedTermIndex(undefined);
      }
    },
    [ref.current]
  );

  useEffect(() => {
    document.addEventListener("click", clickHandler, true);

    return () => {
      document.removeEventListener("click", clickHandler, true);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col flex-wrap py-6 gap-3 w-full"
      initial={AnimationStage.HIDDEN}
      animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {terms.map((term, index) => (
        <motion.div
          key={term.id}
          className="w-full"
          variants={childrenAnimation}
        >
          <TermCard
            onClick={() => {
              onClick && onClick(term);
            }}
            selected={selectedTermIndex === index}
            termName={term.termName}
            type={term.type}
            startDate={term.startDate}
            endDate={term.endDate}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
