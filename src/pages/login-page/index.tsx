import { TERipple, TEInput } from "tw-elements-react";
import { Variants, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { LanguageChanger } from "../../features/language-changer";
import { ThemeChanger } from "../../features/theme-changer";
import { DarkmodeChanger } from "../../features/darkmode-changer";
import { BubbleBackground } from "../../entities/bubble-background";

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

const imageAnimation: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const LoginPage: React.FC = () => {
  const { t } = useTranslation(["login"]);

  return (
    <div className="flex flex-row flex-wrap w-full">
      <div className="flex flex-row flex-wrap items-center w-full z-20">
        <div className=" text-5xl text-primary-500 ml-16 p-6">
          <span className="text-4xl font-black">F</span>
          <span className="text-3xl font-extrabold">in</span>
          <span className="text-4xl font-black">P</span>
          <span className="text-3xl font-extrabold">lanning</span>
        </div>

        <div className="ml-auto flex flex-row flex-wrap items-center pr-10 z-20">
          <div className="ml-1.5">
            <LanguageChanger />
          </div>
          <ThemeChanger />
          <DarkmodeChanger />
        </div>
      </div>

      <BubbleBackground />

      <div className="flex flex-row flex-wrap w-full">
        <div className="flex-1">
          <motion.div className="flex justify-center items-center dark:brightness-50">
            <motion.img
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              variants={imageAnimation}
              src="/images/lamviec.svg"
              alt=""
            />
          </motion.div>
        </div>

        <div className="flex-1 z-10">
          <div className="flex justify-center items-center h-full">
            <motion.div
              className="w-[560px] "
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              variants={staggerChildrenAnimation}
            >
              <motion.div
                variants={childrenAnimation}
                className="mb-8 font-bold text-center text-3xl text-primary-500"
              >
                {t("login")}
              </motion.div>

              <motion.div variants={childrenAnimation}>
                <TEInput
                  type="text"
                  label="Username"
                  className="mb-4 w-full bg-white dark:bg-neutral-900 "
                  size="lg"
                  autoFocus
                ></TEInput>
              </motion.div>

              <motion.div variants={childrenAnimation}>
                <TEInput
                  type="text"
                  label="Password"
                  className="mb-4 w-full bg-white dark:bg-neutral-900"
                  size="lg"
                ></TEInput>
              </motion.div>

              <motion.div className="mt-5" variants={childrenAnimation}>
                <TERipple className="w-full">
                  <button
                    type="button"
                    className="!p-3 w-full inline-block rounded bg-primary-500 px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {t("login")}
                  </button>
                </TERipple>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
