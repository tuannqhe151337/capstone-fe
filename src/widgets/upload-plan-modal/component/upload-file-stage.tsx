import clsx from "clsx";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { TEInput } from "tw-elements-react";
import { Button } from "../../../shared/button";
import { useFileUpload } from "../../../shared/hooks/use-file-upload";
import { cn } from "../../../shared/utils/cn";
import { FileUploadStage } from "../type";
import { DisabledSelect } from "../ui/disabled-select";
import { EmptyFileUploadUI } from "../ui/empty-file-upload-ui";
import { ProcessingFileUI } from "../ui/processing-file-ui";
import { ExpensesTable } from "./expenses-table";

const DUMMY_EXPENSES = [
  {
    id: 1,
    expenseName: "Promotion event",
    costType: "Direct cost",
    unitPrice: 200000000,
    amount: 3,
    projectName: "IN22",
    supplierName: "Internal",
    pic: "AnhMN2",
    notes: "N/A",
  },
  {
    id: 2,
    expenseName: "Social media",
    costType: "Direct cost",
    unitPrice: 15000000,
    amount: 50,
    projectName: "CAM1",
    supplierName: "Internal",
    pic: "LanNT12",
    notes: "N/A",
  },
  {
    id: 3,
    expenseName: "Office supplies",
    costType: "Administration cost",
    unitPrice: 1000000,
    amount: 100,
    projectName: "REC1",
    supplierName: "Hong Ha",
    pic: "HongHD9",
    notes: "N/A",
  },
  {
    id: 4,
    expenseName: "Internal training",
    costType: "Operating cost",
    unitPrice: 2000000,
    amount: 6,
    projectName: "RECT",
    supplierName: "Fresher Academy",
    pic: "LinhHM2",
    notes: "N/A",
  },
  {
    id: 5,
    expenseName: "Team Building",
    costType: "Administration cost",
    unitPrice: 100000000,
    amount: 6,
    projectName: "TB1",
    supplierName: "Saigon Tourist",
    pic: "TuNM",
    notes: "Approximate",
  },
  // {
  //   id: 6,
  //   expenseName: "Customer visit",
  //   costType: "Indirect cost",
  //   unitPrice: 400000000,
  //   amount: 1,
  //   projectName: "NSK",
  //   supplierName: "Internal",
  //   pic: "TrungDQ",
  //   notes: "Deposit required",
  // },
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

  // Auto move to next stage
  useEffect(() => {
    if (fileUploadStage === FileUploadStage.SUCCESS) {
      const timeoutId = setTimeout(() => {
        onNextStage && onNextStage();
      }, 1250);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [fileUploadStage]);

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

          // TODO: Handle file upload logic here

          setTimeout(() => {
            setFileUploadStage(FileUploadStage.VALIDATION_ERROR);
          }, 2000);
        }
      },
    });

  return (
    <motion.div
      className={clsx({
        "pt-5": true,
        "md:w-full lg:w-[900px] xl:w-[1000px]":
          fileUploadStage !== FileUploadStage.VALIDATION_ERROR,
        "lg:w-[950px] xl:w-[1100px]":
          fileUploadStage === FileUploadStage.VALIDATION_ERROR,
      })}
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

      {/* File dropzone */}
      <div className="relative h-[380px]">
        <AnimatePresence>
          {fileUploadStage !== FileUploadStage.VALIDATION_ERROR && (
            <motion.div
              className="absolute w-full"
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              exit={AnimationStage.HIDDEN}
              variants={animation}
            >
              {/* Download template button */}
              <motion.div
                className="flex flex-row flex-wrap items-center w-full mt-3"
                initial={AnimationStage.HIDDEN}
                animate={AnimationStage.VISIBLE}
                exit={AnimationStage.HIDDEN}
                variants={animation}
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
                  "relative h-[300px] mt-2 gap-16 group border-2 border-dashed rounded-lg duration-200":
                    true,
                  "cursor-pointer bg-primary-50/50 hover:bg-primary-50 hover:border-primary-300 dark:hover:border-primary-600/70 dark:bg-neutral-700/30 dark:border-neutral-600":
                    fileUploadStage === FileUploadStage.EMPTY,
                  "bg-primary-300/30 dark:bg-primary-800/40 border-primary-400 dark:border-primary-800 shadow-inner":
                    fileUploadStage === FileUploadStage.EMPTY && isFileOver,
                  "bg-primary-50 border-primary-300 dark:bg-neutral-700/50 dark:border-neutral-500":
                    fileUploadStage === FileUploadStage.PROCESSING,
                  "bg-green-200/30 dark:bg-green-950/40 border-green-200 dark:border-green-900":
                    fileUploadStage === FileUploadStage.SUCCESS,
                  "bg-red-200/30 dark:bg-red-950/40 border-red-200 dark:border-red-900":
                    fileUploadStage === FileUploadStage.INVALID_FORMAT_ERROR,
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
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {fileUploadStage === FileUploadStage.VALIDATION_ERROR && (
            <motion.div
              className="absolute w-full"
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              exit={AnimationStage.HIDDEN}
              variants={animation}
            >
              <div className="pt-3">
                <ExpensesTable expenses={DUMMY_EXPENSES} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <motion.div
        className="flex flex-row flex-wrap items-center gap-5 w-full mt-auto"
        variants={callToActionAnimation}
      >
        <Button
          variant="tertiary"
          className="w-[300px]"
          onClick={() => {
            onPreviousState && onPreviousState();
          }}
        >
          Back
        </Button>

        {fileUploadStage === FileUploadStage.VALIDATION_ERROR ? (
          <Button
            containerClassName="flex-1"
            onClick={() => {
              setFileUploadStage(FileUploadStage.EMPTY);
            }}
          >
            Upload again
          </Button>
        ) : (
          <Button
            disabled={fileUploadStage !== FileUploadStage.SUCCESS}
            containerClassName="flex-1"
            onClick={() => {
              onNextStage && onNextStage();
            }}
          >
            Continue to confirm expenses
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};
