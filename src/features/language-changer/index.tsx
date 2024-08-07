import { FaChevronDown } from "react-icons/fa6";
import { TERipple } from "tw-elements-react";
import { useEffect, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useCloseOutside } from "../../shared/hooks/use-close-popup";
import {
  useMeQuery,
  useUserSettingMutation,
} from "../../providers/store/api/authApi";
import { changeLanguage } from "i18next";
import { LanguageCode, LanguageCodes, languages } from "../../type";

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

  // Selected language
  const [selectedLanguageCode, setSelectedLanguageCode] =
    useState<LanguageCode>("en");

  const ref = useCloseOutside({
    open: isOpened,
    onClose: () => {
      setIsOpened(false);
    },
  });

  const handleOnClick = () => {
    setIsOpened((prevState) => !prevState);
  };

  // Get data
  const { data } = useMeQuery();

  // Mutation
  const [updateUserSetting] = useUserSettingMutation();

  // Change language (by changing classes in the body)
  useEffect(() => {
    changeLanguage(selectedLanguageCode);
    if (data) {
      updateUserSetting({
        theme: data.settings.theme,
        language: selectedLanguageCode,
        darkMode: data.settings.darkMode,
      });
    }
  }, [selectedLanguageCode]);

  useEffect(() => {
    if (data) {
      let typedSelectedLanguageCode: LanguageCode = "en";

      try {
        typedSelectedLanguageCode = LanguageCodes.check(
          data?.settings.language
        );
      } catch (_) {
      } finally {
        setSelectedLanguageCode(typedSelectedLanguageCode);
      }
    }
  }, [data?.settings.language]);

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
          {Object.values(languages).map(({ code, name }) => (
            <TERipple
              key={name}
              rippleColor="light"
              className="w-full"
              onClick={() => {
                setSelectedLanguageCode(code);
              }}
            >
              <div className="select-none min-w-max py-2 px-4 cursor-pointer text-neutral-500/90 font-semibold hover:bg-primary-400 hover:text-white duration-200 dark:text-neutral-300 dark:hover:bg-primary-900">
                {name}
              </div>
            </TERipple>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className="relative z-20 rounded-lg">
      <TERipple
        className="flex flex-row flex-wrap items-center px-3 group gap-2 mb-1 cursor-pointer"
        onClick={handleOnClick}
      >
        <span className="text-lg mt-0.5 font-bold text-primary-500/80 group-hover:text-primary-500 dark:text-primary-600 select-none duration-200">
          {/* {language} */}
          {selectedLanguageCode}
        </span>{" "}
        <FaChevronDown className="text-sm text-primary-500/60 group-hover:text-primary-500/80 mt-1 duration-200" />
      </TERipple>

      <AnimatePresence>{modalLanguage}</AnimatePresence>
    </div>
  );
};
