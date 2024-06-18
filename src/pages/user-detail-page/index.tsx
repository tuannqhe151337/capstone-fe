// import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BubbleBanner } from "../../entities/bubble-banner";
import { FaCircleUser, FaLocationDot, FaUpload, FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { Button } from "../../shared/button";
import { RiPencilFill } from "react-icons/ri";
import { UserAvatarCard } from "../../widgets/user-avatar-card";
import { UserDetailCard } from "../../widgets/user-detail-card";
import { useNavigate } from "react-router-dom";

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

// User detail data object
const userDetailData = {
  fullName: "Nguyễn Lan Anh",
  username: "AnhNL2",
  role: "Accountant",
  position: "Techlead",
  department: "Department 1",
  phone: "0983231234",
  email: "user@email.com",
  dateOfBirth: "29 December 2002",
  address: "22 Avenue Street",
};

export const UserDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative px-6">
      {/* Banner */}
      <BubbleBanner />

      <motion.div
        className="relative z-10 pb-10 w-11/12 -mt-10 mx-auto"
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={staggerChildrenAnimation}
      >
        <motion.div
          className="flex w-full gap-4 h-max"
          variants={childrenAnimation}
        >
          <UserAvatarCard
            className="w-1/3"
            username={userDetailData.username || ""}
            role={userDetailData.role || ""}
            position={userDetailData.position || ""}
            department={userDetailData.department || ""}
          />

          <UserDetailCard
            className="w-2/3"
            address={userDetailData.address}
            dateOfBirth={userDetailData.dateOfBirth}
            email={userDetailData.email}
            fullName={userDetailData.fullName}
            phone={userDetailData.phone}
            actionComponent={
              <Button
                className="flex flex-row flex-wrap gap-2 items-center"
                onClick={() => {
                  navigate("/user-management/edit");
                }}
              >
                <RiPencilFill className="text-xl mb-0.5" />
                <p className="text-sm font-bold">Update user</p>
              </Button>
            }
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
