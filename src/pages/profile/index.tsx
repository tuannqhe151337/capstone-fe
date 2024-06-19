// import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BubbleBanner } from "../../entities/bubble-banner";
import { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { FaCircleUser } from "react-icons/fa6";
import { UserDetailCard } from "../../widgets/user-detail-card";
import { UserAvatarCard } from "../../widgets/user-avatar-card";
import { useMeQuery } from "../../providers/store/api/authApi";
import { Checkbox } from "../../shared/checkbox";
import { Switch } from "../../shared/switch";

interface TermOption {
  value: string | number;
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

export const Profile: React.FC = () => {
  // Get data
  const { data } = useMeQuery();

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
          className="flex flex-row w-full gap-4 h-max"
          variants={childrenAnimation}
        >
          <UserAvatarCard
            className="w-1/3"
            username={data?.username || ""}
            role={data?.role.name || ""}
            position={data?.position.name || ""}
            department={data?.department.name || ""}
          />
          <UserDetailCard
            className="w-2/3"
            address={data?.address || ""}
            dateOfBirth={data?.dob || ""}
            email={data?.email || ""}
            fullName={data?.fullName || ""}
            phone={data?.phoneNumber || ""}
          />
        </motion.div>

        <motion.div
          className="mt-6 px-10 py-6 w-full h-max border rounded-lg bg-white shadow dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-[0_0_15px_rgb(0,0,0,0.2)]"
          variants={childrenAnimation}
        >
          <p className="text-primary-500 font-extrabold text-xl dark:text-primary-600">
            Settings
          </p>

          {data && (
            <>
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
                <motion.div
                  variants={childrenAnimation}
                  className="ml-10 mt-5 "
                >
                  <AsyncPaginate
                    className="w-[200px] cursor-pointer"
                    value={{
                      value: data.settings.language,
                      label: data.settings.language,
                    }}
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
                    value={{
                      value: data.settings.theme,
                      label: data.settings.theme,
                    }}
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
                  <Switch
                    size="lg"
                    checked={data.settings.darkMode}
                    onChange={() => {}}
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
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
