import { TERipple } from "tw-elements-react";
import { FaPalette } from "react-icons/fa";
import { IconButton } from "../../shared/icon-button";
import { useEffect, useState } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion";
import { useCloseOutside } from "../../shared/hooks/use-close-popup";

interface Theme {
  themeClasses: string;
  name: string;
}

const themes: Theme[] = [
  { themeClasses: "blue blue-flatten", name: "Blue" },
  { themeClasses: "emerald emerald-flatten", name: "Emerald" },
  { themeClasses: "teal teal-flatten", name: "Teal" },
  { themeClasses: "cyan cyan-flatten", name: "Cyan" },
  { themeClasses: "purple purple-flatten", name: "Purple" },
  { themeClasses: "orange orange-flatten", name: "Orange" },
  { themeClasses: "rose rose-flatten", name: "Rose" },
];

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

export const ThemeChanger = () => {
  // Selected theme
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(0);

  // UI
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const ref = useCloseOutside({
    open: isDropdownOpen,
    onClose: () => {
      setIsDropdownOpen(false);
    },
  });

  // Change theme (by changing classes in the body)
  useEffect(() => {
    document.body.className = `${themes[selectedThemeIndex].themeClasses} font-nunito dark:bg-neutral-900 min-h-screen`;
  }, [selectedThemeIndex]);

  return (
    <div ref={ref} className="relative z-30">
      <IconButton
        tooltip="Change theme"
        showTooltip={!isDropdownOpen}
        onClick={() => {
          setIsDropdownOpen((prevState) => !prevState);
        }}
      >
        <FaPalette className="text-xl text-primary-500 dark:text-primary-600" />
      </IconButton>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute z-2o shadow bg-white dark:bg-neutral-800 rounded-lg mt-2 overflow-hidden"
            initial={AnimationStage.HIDDEN}
            animate={AnimationStage.VISIBLE}
            exit={AnimationStage.HIDDEN}
            variants={animation}
          >
            {themes.map(({ name }, index) => (
              <TERipple
                key={name}
                rippleColor="light"
                className="w-full"
                onClick={() => {
                  setSelectedThemeIndex(index);
                }}
              >
                <div className="px-5 py-3 text-neutral-500 dark:text-neutral-300 cursor-pointer select-none hover:bg-primary-100 dark:hover:bg-primary-900 text-base font-semibold duration-200">
                  {name}
                </div>
              </TERipple>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
