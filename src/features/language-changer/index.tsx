import { FaChevronDown } from "react-icons/fa6";
import { TERipple } from "tw-elements-react";
import { useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useCloseOutside } from "../../shared/hooks/useClosePopup";
import { useTranslation } from "react-i18next";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const dropDownAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const LanguageChanger: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const [language, setLanguage] = useState("en");

  const { i18n } = useTranslation();

  const ref = useCloseOutside({
    open: isOpened,
    onClose: () => {
      setIsOpened(false);
    },
  });

  const handleOnClick = () => {
    setIsOpened(!isOpened);
  };

  let modalLanguage;
  if (isOpened) {
    modalLanguage = (
      <motion.div
        className="absolute right-0 mt-2"
        initial={AnimationStage.HIDDEN}
        animate={AnimationStage.VISIBLE}
        exit={AnimationStage.HIDDEN}
        variants={dropDownAnimation}
      >
        <div className="shadow rounded-lg bg-white/70 overflow-hidden dark:bg-neutral-800">
          <TERipple
            className="w-full"
            onClick={() => {
              i18n.changeLanguage("en");
              setLanguage("en");
            }}
          >
            <div className="select-none min-w-max py-2 px-4 cursor-pointer text-neutral-500/90 font-semibold hover:bg-primary-400 hover:text-white duration-200 dark:text-neutral-300 dark:hover:bg-primary-900 ">
              English
            </div>
          </TERipple>

          <TERipple
            className="w-full"
            onClick={() => {
              i18n.changeLanguage("vi");
              setLanguage("vi");
            }}
          >
            <div className="select-none min-w-max py-2 px-4 cursor-pointer text-neutral-500/90 font-semibold hover:bg-primary-400 hover:text-white duration-200 dark:text-neutral-300 dark:hover:bg-primary-900 ">
              Tiếng Việt
            </div>
          </TERipple>

          <TERipple
            className="w-full"
            onClick={() => {
              i18n.changeLanguage("ko");
              setLanguage("ko");
            }}
          >
            <div className="select-none min-w-max py-2 px-4 cursor-pointer text-neutral-500/90 font-semibold hover:bg-primary-400 hover:text-white duration-200 dark:text-neutral-300 dark:hover:bg-primary-900 ">
              한국어
            </div>
          </TERipple>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative z-10 mr-3" ref={ref}>
      <div
        onClick={handleOnClick}
        className="flex flex-row flex-wrap items-center gap-2 mb-1 cursor-pointer"
      >
        <span className="text-lg mt-0.5 font-bold text-primary-500 dark:text-primary-600 select-none ">
          {language}
        </span>{" "}
        <FaChevronDown className="text-sm text-primary-500/60 hover:text-primary-500/80 mt-1" />
      </div>

      <AnimatePresence>{modalLanguage}</AnimatePresence>
    </div>
  );
};
