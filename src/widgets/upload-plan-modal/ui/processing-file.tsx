import { motion, Variants } from "framer-motion";
import { RiFileExcel2Fill } from "react-icons/ri";
import { IconButton } from "../../../shared/icon-button";
import { IoClose } from "react-icons/io5";

interface Props {
  onCancel?: () => any;
}

export const ProcessingFile: React.FC<Props> = ({ onCancel }) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center w-full h-full">
      <div className="relative bg-white dark:bg-neutral-800 rounded-lg shadow w-[175px] h-[225px]">
        <div className="absolute -top-4 -right-4">
          <IconButton
            className="p-1.5 bg-neutral-200/50 dark:bg-neutral-700/70 hover:bg-neutral-200"
            onClick={() => {
              onCancel && onCancel();
            }}
          >
            <IoClose className="text-2xl text-neutral-500/70 dark:text-neutral-400" />
          </IconButton>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center w-full h-full">
          <div>
            <RiFileExcel2Fill className="text-[110px] text-primary-200 dark:text-neutral-500 animate-pulse" />
            <p className="font-semibold dark:font-bold text-primary-200 dark:text-neutral-500 text-center mt-5 animate-pulse">
              <span>Processing</span>
              <motion.span
                className="font-bold"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0 }}
              >
                .
              </motion.span>
              <motion.span
                className="font-bold"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              >
                .
              </motion.span>
              <motion.span
                className="font-bold"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 2 }}
              >
                .
              </motion.span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
