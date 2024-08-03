import { AnimatePresence, Variants, motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "../../shared/hooks/use-file-upload";
import { TEInput } from "tw-elements-react";
import { Button } from "../../shared/button";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { cn } from "../../shared/utils/cn";
import { ProcessingFileUI } from "./ui/processing-file-ui";
import { EmptyFileUploadUI } from "./ui/empty-file-upload-ui";
import { Expense, ExpenseError, FileUploadStage } from "./type";
import { DisabledSelect } from "../../shared/disabled-select";
import { processFile } from "./model/process-file";
import { useGetAllCostTypeQuery } from "../../providers/store/api/costTypeAPI";
import { ErrorExpensesTable } from "./components/error-expenses-table";
import { useMeQuery } from "../../providers/store/api/authApi";
import { InputValidationMessage } from "../../shared/validation-input-message";
import { useGetAllExpenseStatusQuery } from "../../providers/store/api/statusApi";
import { getFileExtension } from "./util/get-file-extension";

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
  termName?: string;
  planName?: string;
  validateExpenseCode?: boolean;
  isPlanNameEditable?: boolean;
  hideBackButton?: boolean;
  onDownloadTemplateClick?: Function;
  onPreviousState?: () => any;
  onNextStage?: (expenses: Expense[], planName: string) => any;
}

export const UploadFileStage: React.FC<Props> = ({
  hide,
  termName,
  planName: propsPlanName,
  validateExpenseCode,
  isPlanNameEditable = true,
  hideBackButton = false,
  onDownloadTemplateClick,
  onPreviousState,
  onNextStage,
}) => {
  // Cost type
  const { data: costTypeListResult } = useGetAllCostTypeQuery();
  const { data: expenseStatusListResult } = useGetAllExpenseStatusQuery();

  // Department from user's detail
  const { data: me } = useMeQuery();

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

  // Plan name
  const [planName, setPlanName] = useState<string>(propsPlanName || "");

  // Expenses read from file
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseErrors, setExpenseErrors] = useState<ExpenseError[]>([]);

  // Auto move to next stage
  useEffect(() => {
    if (fileUploadStage === FileUploadStage.SUCCESS && planName) {
      const timeoutId = setTimeout(() => {
        onNextStage && onNextStage(expenses, planName);
      }, 1250);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [fileUploadStage, planName]);

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
      fileUploadHandler: async (files) => {
        if (files.length > 0) {
          const file = files[0];

          // UI: set to state for showing
          setFileUploadStage(FileUploadStage.PROCESSING);
          setFileName(file.name);
          setFileSize(file.size);

          // File extension
          const fileExtension = getFileExtension(file.name);
          if (fileExtension !== "xlsx") {
            setFileUploadStage(FileUploadStage.INVALID_FORMAT_ERROR);
            return;
          }

          // Handle file upload logic
          if (costTypeListResult?.data && expenseStatusListResult?.data) {
            const { errors, expenses, isError } = await processFile(
              file,
              costTypeListResult.data,
              expenseStatusListResult.data,
              { validateExpenseCode }
            );

            setExpenses(expenses);
            setExpenseErrors(errors);

            if (isError) {
              setFileUploadStage(FileUploadStage.VALIDATION_ERROR);
            } else {
              setFileUploadStage(FileUploadStage.SUCCESS);
            }
          }
        }
      },
    });

  return (
    <motion.div
      className={clsx({
        "pt-2": true,
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
        <div className="flex-1 -mb-[45px]">
          <TEInput
            className="w-full"
            label="Plan name"
            disabled={!isPlanNameEditable}
            value={planName}
            onChange={(e) => setPlanName(e.currentTarget.value)}
            autoFocus
          />
          <InputValidationMessage
            className="mt-1"
            validateFn={() => {
              if (!planName) {
                throw new Error("Plan name can not be empty.");
              }
            }}
          />
        </div>
        <DisabledSelect
          className="w-[300px]"
          label="Term"
          value={termName || ""}
        />
        <DisabledSelect
          className="w-[200px]"
          label="Department"
          value={me?.department.name || ""}
        />
      </motion.div>

      {/* File dropzone section */}
      <div className="relative h-[390px]">
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
                  onClick={() => {
                    onDownloadTemplateClick && onDownloadTemplateClick();
                  }}
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
                  accept=".xls,.xlsx,.csv"
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
              <ErrorExpensesTable expenses={expenseErrors} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <motion.div
        className="flex flex-row flex-wrap items-center gap-5 w-full mt-auto"
        variants={callToActionAnimation}
      >
        {!hideBackButton && (
          <Button
            variant="tertiary"
            className="w-[300px]"
            onClick={() => {
              onPreviousState && onPreviousState();
            }}
          >
            Back
          </Button>
        )}

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
            disabled={fileUploadStage !== FileUploadStage.SUCCESS || !planName}
            containerClassName="flex-1"
            onClick={() => {
              if (fileUploadStage === FileUploadStage.SUCCESS && planName) {
                onNextStage && onNextStage(expenses, planName);
              }
            }}
          >
            Continue to confirm expenses
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};
