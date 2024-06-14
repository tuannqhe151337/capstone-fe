// import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BubbleBanner } from "../../entities/bubble-banner";
import { FaCircleUser, FaLocationDot, FaUpload, FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { Button } from "../../shared/button";
import { RiPencilFill } from "react-icons/ri";

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
  name: "Nguyễn Lan Anh",
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
  return (
    <div className="relative px-6">
      {/* Banner */}
      <BubbleBanner />

      <motion.div
        className="absolute pb-10 top-[80%] left-1/2 transform -translate-x-1/2 w-11/12 z-20"
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={staggerChildrenAnimation}
      >
        <motion.div
          className="flex w-full gap-4 h-[340px]"
          variants={childrenAnimation}
        >
          <div className="w-1/3 border rounded-lg p-4 bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]">
            <div className="flex justify-center items-center dark:brightness-50 mx-auto rounded-full">
              <FaCircleUser className="text-[160px] opacity-80 text-primary-200 dark:text-primary-300" />
            </div>

            <div className="mt-4 text-primary-600/80 font-extrabold text-2xl text-center dark:text-primary-800">
              {userDetailData.username}
            </div>
            <div className="mt-4 py-2 bg-primary-500 text-center text-white font-bold mx-auto w-1/2 rounded dark:bg-primary-800 dark:text-white/80">
              {userDetailData.role}
            </div>
            <div className="mt-4 opacity-40 font-bold text-lg text-center dark:opacity-60">
              {userDetailData.position} at {userDetailData.department}
            </div>
          </div>

          <div className="w-2/3 border rounded-lg p-6 bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]">
            <div className="flex mt-2">
              <div className="w-1/12 pt-3 pl-4">
                <FaUser className="text-xl opacity-40 dark:opacity-50" />
              </div>
              <div className="w-8/12">
                <div className="font-bold text-sm opacity-40 dark:opacity-50">
                  Full name
                </div>
                <div className="text-xm font-bold opacity-80 dark:opacity-75">
                  {userDetailData.name}
                </div>
              </div>

              <Button className="flex flex-row flex-wrap gap-3">
                <RiPencilFill className="text-xl" />

                <p className="text-sm font-semibold">Update user</p>
              </Button>
            </div>
            <div className="flex mt-4">
              <div className="w-1/12 pt-3 pl-4">
                <FaPhoneAlt className="text-xl opacity-40 dark:opacity-50" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-50">
                  Phone
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-75">
                  {userDetailData.phone}
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="w-1/12 pt-3 pl-3">
                <HiOutlineMailOpen className="text-2xl opacity-40 dark:opacity-50" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-50">
                  Email
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-75">
                  {userDetailData.email}
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="w-1/12 pt-2 pl-2">
                <LiaBirthdayCakeSolid className="text-3xl opacity-40 dark:opacity-50" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-50">
                  Date of birth
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-75">
                  {userDetailData.dateOfBirth}
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="w-1/12 pt-2 pl-3">
                <FaLocationDot className="text-2xl opacity-40 dark:opacity-50" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-50">
                  Address
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-75">
                  {userDetailData.address}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
