import { FaUpload } from "react-icons/fa";
import { cn } from "../../../shared/utils/cn";
import { useFileUpload } from "../hook/use-file-upload";
import { useRef, useState } from "react";
import { Button } from "../../../shared/button";
import { DisabledSelect } from "../ui/disabled-select";

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
    <div className="w-full pt-5 px-[70px]">
      {/* Disabled term and department select box */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-5">
        <DisabledSelect
          className="flex-1"
          label="Term"
          value="Financial plan December Q3 2021"
        />
        <DisabledSelect
          className="w-[300px]"
          label="Department"
          value="BU 01"
        />
      </div>

      {/* File dropzone */}
      <div className="mt-5">
        <a
          href="#"
          className="block w-max ml-auto underline font-semibold text-sm text-primary-500 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 duration-200"
        >
          Download template
        </a>
      </div>
      <div
        className={cn({
          "flex flex-col flex-wrap items-center justify-center mt-2 gap-16 group border-2 border-primary-200 hover:border-primary-300 dark:border-primary-900 dark:hover:border-primary-600/70 dark:bg-primary-950/40 border-dashed pt-14 pb-3 rounded-lg cursor-pointer duration-200":
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
          buttonType="secondary"
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
