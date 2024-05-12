import { useTranslation } from "react-i18next";
import { TERipple } from "tw-elements-react";
import { PiTranslateBold } from "react-icons/pi";
import { IconButton } from "../../shared/icon-button";
import { useState } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion";
import { useCloseOutside } from "../../shared/hooks/useClosePopup";

const languages = ["en", "vi"];

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

export const LanguageChanger = () => {
  const { t, i18n } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const ref = useCloseOutside({
    open: isDropdownOpen,
    onClose: () => {
      setIsDropdownOpen(false);
    },
  });

  return (
    <div ref={ref} className="relative">
      <IconButton
        className="p-[7px]"
        tooltip="Change language"
        showTooltip={!isDropdownOpen}
        onClick={() => {
          setIsDropdownOpen((prevState) => !prevState);
        }}
      >
        <PiTranslateBold className="text-2xl text-primary-500 dark:text-primary-600" />
      </IconButton>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute shadow bg-white dark:bg-neutral-700 z-20 rounded-lg mt-2 overflow-hidden"
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={animation}
          >
            {languages.map((language) => (
              <TERipple
                key={language}
                rippleColor="light"
                className="w-full"
                onClick={() => {
                  i18n.changeLanguage(language);
                }}
              >
                <div className="px-5 py-3 cursor-pointer select-none hover:bg-primary-100 dark:hover:bg-primary-900 text-base font-semibold duration-200">
                  {language}
                </div>
              </TERipple>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
