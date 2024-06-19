import { motion, Variants } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { cn } from "../../shared/utils/cn";

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
    y: 3,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface Props {
  className?: string;
  username: string;
  role: string;
  position: string;
  department: string;
}

export const UserAvatarCard: React.FC<Props> = ({
  className,
  username,
  role,
  position,
  department,
}) => {
  return (
    <motion.div
      className={cn(
        "border rounded-lg p-4 bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]",
        className
      )}
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <div className="flex justify-center items-center dark:brightness-50 mx-auto rounded-full">
        <FaCircleUser className="text-[160px] opacity-80 text-primary-200 dark:text-primary-300" />
      </div>

      <motion.div
        className="mt-4 text-primary-600/80 font-extrabold text-2xl text-center dark:text-primary-600"
        variants={childrenAnimation}
      >
        {username}
      </motion.div>
      <motion.div
        className="mt-4 py-2 bg-primary-500 text-center text-white font-bold mx-auto w-1/2 rounded dark:bg-primary-800 dark:text-white/80"
        variants={childrenAnimation}
      >
        {role}
      </motion.div>
      <motion.div
        className="mt-4 opacity-40 text-neutral-400/70 font-bold text-lg text-center dark:opacity-60"
        variants={childrenAnimation}
      >
        {position} at {department}
      </motion.div>
    </motion.div>
  );
};
