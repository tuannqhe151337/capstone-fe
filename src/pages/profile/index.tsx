// import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BubbleBanner } from "../../entities/bubble-banner";
import { FaCircleUser, FaLocationDot, FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";

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
  {
    id: 4,
    name: "Term 4",
  },
  {
    id: 5,
    name: "Term 5",
  },
  {
    id: 6,
    name: "Term 6",
  },
  {
    id: 7,
    name: "Term 7",
  },
  {
    id: 8,
    name: "Term 8",
  },
  {
    id: 9,
    name: "Term 9",
  },
  {
    id: 10,
    name: "Term 10",
  },
  {
    id: 11,
    name: "Term 11",
  },
  {
    id: 12,
    name: "Term 12",
  },
  {
    id: 13,
    name: "Term 13",
  },
  {
    id: 14,
    name: "Term 14",
  },
  {
    id: 15,
    name: "Term 15",
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

// Profile data object
const profileData = {
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

export const Profile: React.FC = () => {
  // Select state
  const [selectedOptionTerm, setSelectedOptionTerm] =
    useState<TermOption | null>(defaultOptionTerm);

  // Fetch initial data
  const [pageTerm, setPageTerm] = useState<number>(1);

  // Convert data to option for Term
  const loadTermOptions: LoadOptions<TermOption, any, any> = async () => {
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
          className="flex w-full gap-4 h-[340px]"
          variants={childrenAnimation}
        >
          <div className="w-1/3 border rounded-lg p-4 bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]">
            <div className="flex justify-center items-center dark:brightness-50 mx-auto rounded-full">
              <FaCircleUser className="text-[160px] opacity-80 text-primary-200 dark:text-primary-300" />
            </div>

            <div className="mt-4 text-primary-600/80 font-extrabold text-2xl text-center dark:text-primary-600">
              {profileData.username}
            </div>
            <div className="mt-4 py-2 bg-primary-500 text-center text-white font-bold mx-auto w-1/2 rounded dark:bg-primary-800 dark:text-white/80">
              {profileData.role}
            </div>
            <div className="mt-4 opacity-40 font-bold text-lg text-center dark:opacity-60">
              {profileData.position} at {profileData.department}
            </div>
          </div>

          <div className="w-2/3 border rounded-lg p-6 bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]">
            <div className="flex gap-4 mt-2">
              <div className="w-1/12 pt-3 pl-4">
                <FaUser className="text-xl opacity-40 dark:opacity-30" />
              </div>
              <div className="w-11/12">
                <div className="font-bold text-sm opacity-40 dark:opacity-30">
                  Full name
                </div>
                <div className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
                  {profileData.name}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-1/12 pt-3 pl-4">
                <FaPhoneAlt className="text-xl opacity-40 dark:opacity-30" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-30">
                  Phone
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
                  {profileData.phone}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-1/12 pt-3 pl-3">
                <HiOutlineMailOpen className="text-2xl opacity-40 dark:opacity-30" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-30">
                  Email
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
                  {profileData.email}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-1/12 pt-2 pl-2">
                <LiaBirthdayCakeSolid className="text-3xl opacity-40 dark:opacity-30" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-30">
                  Date of birth
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
                  {profileData.dateOfBirth}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-1/12 pt-2 pl-3">
                <FaLocationDot className="text-2xl opacity-40 dark:opacity-30" />
              </div>
              <div className="w-11/12">
                <p className="font-bold text-sm opacity-40 dark:opacity-30">
                  Address
                </p>
                <p className="text-xm font-bold opacity-80 dark:opacity-60 mt-1">
                  {profileData.address}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 px-10 py-6 w-full h-max border rounded-lg bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]"
          variants={childrenAnimation}
        >
          <p className="text-primary-500 font-extrabold text-xl dark:text-primary-600">
            Settings
          </p>

          <motion.div
            className="flex gap-3 mt-3"
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={staggerChildrenAnimation}
          >
            <p className="mt-6 text-[16px] font-bold opacity-50 w-[100px] dark:opacity-60">
              Language
            </p>
            <motion.div variants={childrenAnimation} className="ml-10 mt-5 ">
              <AsyncPaginate
                className="w-[200px] cursor-pointer "
                value={selectedOptionTerm}
                onChange={(value) => setSelectedOptionTerm(value)}
                options={[defaultOptionTerm]}
                loadOptions={loadTermOptions}
                classNamePrefix="custom-select"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={staggerChildrenAnimation}
          >
            <p className="mt-6 text-[16px] font-bold opacity-50 w-[100px] dark:opacity-60">
              Theme
            </p>
            <motion.div variants={childrenAnimation} className="ml-10 mt-5">
              <AsyncPaginate
                className="w-[200px] cursor-pointer"
                value={selectedOptionTerm}
                onChange={(value) => setSelectedOptionTerm(value)}
                options={[defaultOptionTerm]}
                loadOptions={loadTermOptions}
                classNamePrefix="custom-select"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={staggerChildrenAnimation}
          >
            <p className="mt-6 text-[16px] font-bold opacity-50 w-[100px] dark:opacity-60">
              Mode
            </p>
            <motion.div variants={childrenAnimation} className="ml-10 mt-5">
              <AsyncPaginate
                className="w-[200px] cursor-pointer"
                value={selectedOptionTerm}
                onChange={(value) => setSelectedOptionTerm(value)}
                options={[defaultOptionTerm]}
                loadOptions={loadTermOptions}
                classNamePrefix="custom-select"
              />
            </motion.div>
          </motion.div>

          <div>
            <p className="mt-12 font-bold opacity-40 inline-block dark:opacity-30">
              Need to change password?{" "}
            </p>
            <span className="ml-2 inline-block font-bold text-primary-500 underline dark:text-primary-700">
              <a href="">Click here</a>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
