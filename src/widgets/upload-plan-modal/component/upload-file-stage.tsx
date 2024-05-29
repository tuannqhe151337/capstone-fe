import { AnimatePresence, Variants, motion } from "framer-motion";
import { cn } from "../../../shared/utils/cn";
import { useFileUpload } from "../../../shared/hooks/use-file-upload";
import { useRef, useState } from "react";
import { Button } from "../../../shared/button";
import { DisabledSelect } from "../ui/disabled-select";
import { TEInput } from "tw-elements-react";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { EmptyFileUploadUI } from "../ui/empty-file-upload-ui";
import { ProcessingFileUI } from "../ui/processing-file-ui";
import { FileUploadStage } from "../type";

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
  [AnimationStage.HIDDEN]: {
    opacity: 0.2,
    y: 5,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const callToActionAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0.8,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
  },
};

const animation: Variants = {
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 10,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

interface Props {
  hide?: boolean;
  onPreviousState?: () => any;
  onNextStage?: () => any;
}

export const UploadFileStage: React.FC<Props> = ({
  hide,
  onPreviousState,
  onNextStage,
}) => {
  // UI: file over
  const [isFileOver, setIsFileOver] = useState<boolean>(false);

  // Ref
  let inputFile = useRef<HTMLInputElement>(null);

  // UI: file processing
  const [fileUploadStage, setFileUploadStage] = useState<FileUploadStage>(
    FileUploadStage.EMPTY
  );
  const [fileName, setFileName] = useState<string>();
  const [fileSize, setFileSize] = useState<number>();

  // Handling upload file
  const { dragLeaveHandler, dragOverHandler, dropHandler, inputFileHandler } =
    useFileUpload({
      fileDropHandler() {
        setIsFileOver(false);
      },
      fileLeaveHandler() {
        setIsFileOver(false);
      },
      fileOverHandler() {
        setIsFileOver(true);
      },
      fileUploadHandler(files) {
        if (files.length > 0) {
          const file = files[0];

          setFileUploadStage(FileUploadStage.PROCESSING);
          setFileName(file.name);
          setFileSize(file.size);

          setTimeout(() => {
            setFileUploadStage(FileUploadStage.SUCCESS);
          }, 2000);
        }
      },
    });

  return (
    <motion.div
      className="pt-5 md:w-full lg:w-[900px] xl:w-[1000px]"
      initial={AnimationStage.HIDDEN}
      animate={hide ? AnimationStage.HIDDEN : AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Disabled term and department select box */}
      <motion.div
        className="flex flex-row flex-wrap items-center justify-center gap-3"
        variants={childrenAnimation}
      >
        <div className="flex-1 pt-5">
          <TEInput className="w-full" label="Plan name" />
        </div>
        <DisabledSelect
          className="w-[300px]"
          label="Term"
          value="Financial plan December Q3 2021"
        />
        <DisabledSelect
          className="w-[200px]"
          label="Department"
          value="BU 01"
        />
      </motion.div>

      {/* Download template button */}
      <motion.div
        className="flex flex-row flex-wrap items-center mt-3"
        variants={childrenAnimation}
      >
        <Button
          variant="secondary"
          containerClassName="ml-auto"
          className="flex flex-row flex-wrap items-center"
        >
          <BsFillFileEarmarkArrowDownFill className="mr-3 dark:text-primary-600" />
          <span className="text-sm dark:text-primary-500">
            Download template
          </span>
        </Button>
      </motion.div>

      {/* File dropzone */}
      <div
        className={cn({
          "relative h-[290px] mt-2 gap-16 group border-2 border-dashed rounded-lg duration-200":
            true,
          "cursor-pointer bg-primary-50/50 hover:bg-primary-50 hover:border-primary-300 dark:hover:border-primary-600/70 dark:bg-neutral-700/30 dark:border-neutral-600":
            fileUploadStage === FileUploadStage.EMPTY,
          "bg-primary-300/30 dark:bg-primary-800/40 border-primary-400 dark:border-primary-800 shadow-inner":
            fileUploadStage === FileUploadStage.EMPTY && isFileOver,
          "bg-primary-50 border-primary-300 dark:bg-neutral-700/50 dark:border-neutral-500":
            fileUploadStage === FileUploadStage.PROCESSING,
          "bg-green-200/30 dark:bg-green-950/40 border-green-200 dark:border-green-900":
            fileUploadStage === FileUploadStage.SUCCESS,
        })}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onClick={() => {
          inputFile.current && inputFile.current.click();
        }}
      >
        <input
          key={new Date().toISOString()}
          ref={inputFile}
          hidden
          type="file"
          onChange={inputFileHandler}
          disabled={fileUploadStage !== FileUploadStage.EMPTY}
        />

        <AnimatePresence>
          {fileUploadStage === FileUploadStage.EMPTY && (
            <motion.div
              className="absolute w-full h-full"
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              exit={AnimationStage.HIDDEN}
              variants={animation}
            >
              <EmptyFileUploadUI />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {fileUploadStage !== FileUploadStage.EMPTY && (
            <motion.div
              className="absolute w-full h-full"
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              exit={AnimationStage.HIDDEN}
              variants={animation}
            >
              <ProcessingFileUI
                fileUploadStage={fileUploadStage}
                fileName={fileName}
                fileSize={fileSize}
                onCancel={() => {
                  setFileUploadStage(FileUploadStage.EMPTY);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <motion.div
        className="flex flex-row flex-wrap items-center gap-5 mt-5 w-full"
        variants={callToActionAnimation}
      >
        <Button
          variant="tertiary"
          className="w-[300px]"
          onClick={() => {
            onPreviousState && onPreviousState();
          }}
        >
          Cancel
        </Button>
        <Button
          containerClassName="flex-1"
          onClick={() => {
            onNextStage && onNextStage();
          }}
        >
          Continue to confirm expenses
        </Button>
      </motion.div>
    </motion.div>
  );
};
