import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { ListUserFiler } from "../../widgets/list-user-filter";
import { HiUserAdd } from "react-icons/hi";
import { TableUserManagement } from "../../widgets/user-plan";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

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

export const UserManagementList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-extrabold text-2xl w-fit ml-7">
            User management
          </p>
          <div className="ml-auto">
            <Button
              onClick={() => {
                navigate(`/user-management/create`);
              }}
            >
              <div className="flex flex-row flex-wrap items-center gap-2">
                <HiUserAdd className="text-xl mb-0.5" />
                <p className="text-sm font-bold">Add new user</p>
              </div>
            </Button>
          </div>
        </div>
      </BubbleBanner>

      <motion.div variants={childrenAnimation}>
        <ListUserFiler />
      </motion.div>

      <motion.div variants={childrenAnimation}>
        <TableUserManagement />
      </motion.div>
    </motion.div>
  );
};
