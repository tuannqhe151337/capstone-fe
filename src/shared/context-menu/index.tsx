import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "../utils/cn";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

interface Props {
  show?: boolean;
  className?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  children?: React.ReactNode;
}

export const ContextMenu: React.FC<Props> = ({
  show,
  className,
  top,
  left,
  bottom,
  right,
  children,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            "absolute z-10 shadow-lg bg-white dark:bg-neutral-700 rounded-lg mt-2 overflow-hidden",
            className
          )}
          style={{
            top,
            left,
            bottom,
            right,
          }}
          initial={AnimationStage.HIDDEN}
          animate={AnimationStage.VISIBLE}
          exit={AnimationStage.HIDDEN}
          variants={animation}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
