import { motion, Variants } from "framer-motion";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { cn } from "../../shared/utils/cn";
import React from "react";
import { formatISODate } from "../../shared/utils/format-iso-date";
import { UserListItem } from "./ui/user-list-item";

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
  isLoading?: boolean;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  address: string;
  actionComponent?: React.ReactNode;
}

export const UserDetailCard: React.FC<Props> = ({
  className,
  isLoading,
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
      <div className="flex-1 space-y-4">
        <motion.div className="mt-2" variants={childrenAnimation}>
          <UserListItem
            isLoading={isLoading}
            icon={<FaUser />}
            label="Full name"
            value={fullName}
          />
        </motion.div>

        <motion.div variants={childrenAnimation}>
          <UserListItem
            isLoading={isLoading}
            icon={<FaPhoneAlt />}
            label="Phone"
            value={phone}
          />
        </motion.div>

        <motion.div variants={childrenAnimation}>
          <UserListItem
            isLoading={isLoading}
            icon={<HiOutlineMailOpen />}
            label="Email"
            value={email}
          />
        </motion.div>

        <motion.div variants={childrenAnimation}>
          <UserListItem
            isLoading={isLoading}
            icon={<LiaBirthdayCakeSolid />}
            label="Date of birth"
            value={formatISODate(dateOfBirth)}
          />
        </motion.div>

        <motion.div variants={childrenAnimation}>
          <UserListItem
            isLoading={isLoading}
            icon={<FaLocationDot />}
            label="Address"
            value={address}
          />
        </motion.div>
      </div>
      <div>{actionComponent}</div>
    </motion.div>
  );
};
