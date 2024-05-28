import { FaUpload } from "react-icons/fa";
import { cn } from "../../../shared/utils/cn";
import { useFileUpload } from "../hook/use-file-upload";
import { useRef, useState } from "react";
import { Button } from "../../../shared/button";
import { DisabledSelect } from "../ui/disabled-select";
import { TEInput } from "tw-elements-react";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";

interface Props {
  onPreviousState?: () => any;
  onNextStage?: () => any;
}

export const UploadFileStage: React.FC<Props> = ({
  onPreviousState,
  onNextStage,
}) => {
  const [isFileOver, setIsFileOver] = useState<boolean>(false);

  let inputFile = useRef<HTMLInputElement>(null);

  const { dragLeaveHandler, dragOverHandler, dropHandler, inputFileHandler } =
    useFileUpload({
      fileDropHandler(event) {
        setIsFileOver(false);
      },
      fileLeaveHandler(event) {
        setIsFileOver(false);
      },
      fileOverHandler(event) {
        setIsFileOver(true);
      },
      fileUploadHandler() {},
    });

  return (
    <div className="pt-5 md:w-full lg:w-[900px] xl:w-[1000px]">
      {/* Disabled term and department select box */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
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
      </div>

      {/* File dropzone */}
      <div className="flex flex-row flex-wrap items-center mt-3">
        <Button
          variant="secondary"
          containerClassName="ml-auto"
          className="flex flex-row flex-wrap items-center"
        >
          <BsFillFileEarmarkArrowDownFill className="mr-3 dark:text-primary-700" />
          <span className="text-sm dark:text-primary-600">
            Download template
          </span>
        </Button>
      </div>
      <div
        className={cn({
          "flex flex-col flex-wrap items-center justify-center mt-2 gap-16 group border-2 border-primary-200 hover:border-primary-300 dark:border-primary-900 dark:hover:border-primary-600/70 dark:bg-primary-950/40 border-dashed pt-10 pb-3 rounded-lg cursor-pointer duration-200":
            true,
          "bg-primary-50": !isFileOver,
          "bg-primary-300/30 dark:bg-primary-800/40 border-primary-400 dark:border-primary-800 shadow-inner":
            isFileOver,
        })}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onClick={() => {
          inputFile.current && inputFile.current.click();
        }}
      >
        <div className="flex flex-col flex-wrap justify-center items-center">
          <input
            ref={inputFile}
            hidden
            type="file"
            onChange={inputFileHandler}
          />
          <div>
            <FaUpload
              size={75}
              className={
                "text-primary-200/70 group-hover:text-primary-200/90 dark:text-primary-900/80 dark:group-hover:text-primary-900 duration-150"
              }
            />
          </div>
          <p className="mt-3 text-xl font-bold text-primary-500/50 group-hover:text-primary-500/80 duration-150">
            Select plan file to upload
          </p>
          <p className="text-sm text-primary-400/60 group-hover:text-primary-500/60 dark:group-hover:text-primary-500/90 font-semibold duration-150">
            or drag and drop here
          </p>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-center gap-1">
          <p className="text-sm text-primary-400/60 dark:text-primary-600/70 group-hover:text-primary-500/60 dark:group-hover:text-primary-500/90 font-bold duration-150">
            Allow file type: xls, xlsx, csv
          </p>
          <p className="text-xs text-primary-400/60 dark:text-primary-600/70 group-hover:text-primary-500/60 dark:group-hover:text-primary-500/90 font-semibold duration-150">
            Maximum file size: 500Mb
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-5 mt-5 w-full">
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
      </div>
    </div>
  );
};
