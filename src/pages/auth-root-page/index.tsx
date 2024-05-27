import { Outlet } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { ThemeChanger } from "../../features/theme-changer";
import { LanguageChanger } from "../../features/language-changer";
import { DarkmodeChanger } from "../../features/darkmode-changer";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

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

export const AuthRootPage: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap w-full">
      <div className="flex flex-row flex-wrap items-center w-full">
        <div className=" text-5xl text-primary-500 ml-16 p-6">
          <span className="text-4xl font-black">F</span>
          <span className="text-3xl font-extrabold">in</span>
          <span className="text-4xl font-black">P</span>
          <span className="text-3xl font-extrabold">lanning</span>
        </div>

        <div className="ml-auto flex flex-row flex-wrap items-center pr-10">
          <ThemeChanger></ThemeChanger>
          <DarkmodeChanger></DarkmodeChanger>
          <div className="ml-1.5">
            <LanguageChanger></LanguageChanger>
          </div>
        </div>
      </div>

      <div className="absolute min-h-screen min-w-full -z-50 inset-0">
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute rounded-full size-[700px] bg-primary-300 dark:bg-primary-900/50 -top-32 -right-40 opacity-40"></div>
          <div className="absolute rounded-full size-[300px] bg-primary-200 dark:bg-primary-950 top-[400px] -right-40 opacity-40 "></div>
          <div className="absolute rounded-full size-[300px] bg-primary-300 dark:bg-primary-950 -bottom-32 -left-32 opacity-70"></div>
        </div>
      </div>

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

        <Outlet />
      </div>
    </div>
  );
};
