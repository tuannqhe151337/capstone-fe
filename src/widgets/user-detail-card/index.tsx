import { motion, Variants } from "framer-motion";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { cn } from "../../shared/utils/cn";
import React from "react";

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
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
  actionComponent?: React.ReactNode;
}

export const UserDetailCard: React.FC<Props> = ({
  className,
  fullName,
  phone,
  email,
  dateOfBirth,
  address,
  actionComponent,
}) => {
  return (
    <motion.div
      className={cn(
        "flex flex-row flex-wrap border rounded-lg p-6 bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]",
        className
      )}
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      exit={AnimationStage.HIDDEN}
      variants={staggerChildrenAnimation}
    >
      <div className="flex-1">
        <motion.div className="flex gap-4 mt-2" variants={childrenAnimation}>
          <div className="w-1/12 pt-3 pl-4">
            <FaUser className="text-xl opacity-40 dark:opacity-30" />
          </div>
          <div className="w-11/12">
            <div className="font-bold text-sm opacity-40 dark:opacity-30">
              Full name
            </div>
            <div className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
              {fullName}
            </div>
          </div>
        </motion.div>

        <motion.div className="flex gap-4 mt-4" variants={childrenAnimation}>
          <div className="w-1/12 pt-3 pl-4">
            <FaPhoneAlt className="text-xl opacity-40 dark:opacity-30" />
          </div>
          <div className="w-11/12">
            <p className="font-bold text-sm opacity-40 dark:opacity-30">
              Phone
            </p>
            <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
              {phone}
            </p>
          </div>
        </motion.div>

        <motion.div className="flex gap-4 mt-4" variants={childrenAnimation}>
          <div className="w-1/12 pt-3 pl-3">
            <HiOutlineMailOpen className="text-2xl opacity-40 dark:opacity-30" />
          </div>
          <div className="w-11/12">
            <p className="font-bold text-sm opacity-40 dark:opacity-30">
              Email
            </p>
            <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
              {email}
            </p>
          </div>
        </motion.div>

        <motion.div className="flex gap-4 mt-4" variants={childrenAnimation}>
          <div className="w-1/12 pt-2 pl-2">
            <LiaBirthdayCakeSolid className="text-3xl opacity-40 dark:opacity-30" />
          </div>
          <div className="w-11/12">
            <p className="font-bold text-sm opacity-40 dark:opacity-30">
              Date of birth
            </p>
            <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
              {dateOfBirth}
            </p>
          </div>
        </motion.div>

        <motion.div className="flex gap-4 mt-4" variants={childrenAnimation}>
          <div className="w-1/12 pt-2 pl-3">
            <FaLocationDot className="text-2xl opacity-40 dark:opacity-30" />
          </div>
          <div className="w-11/12">
            <p className="font-bold text-sm opacity-40 dark:opacity-30">
              Address
            </p>
            <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
              {address}
            </p>
          </div>
        </motion.div>
      </div>
      <div>{actionComponent}</div>
    </motion.div>
  );
};
