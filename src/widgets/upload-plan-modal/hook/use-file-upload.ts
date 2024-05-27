import { ChangeEventHandler, DragEventHandler } from "react";

interface Props {
  fileUploadHandler?: any;
  fileDropHandler?: DragEventHandler<HTMLDivElement>;
  fileOverHandler?: DragEventHandler<HTMLDivElement>;
  fileLeaveHandler?: DragEventHandler<HTMLDivElement>;
}

export const useFileUpload = ({
  fileUploadHandler,
  fileDropHandler,
  fileOverHandler,
  fileLeaveHandler,
}: Props) => {
  const inputFileHandler: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    //   const sets: any[] = [];

    const filesLength = event.currentTarget.files?.length || 0;
    for (let i = 0; i < filesLength; i++) {
      const file = event.currentTarget.files?.item(i);
      // sets.push(...(await readfile(file, { addUniqueId: true })));
    }

    fileUploadHandler && fileUploadHandler(event);
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = async (event) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    // Read data from files
    //   const sets: SetWithTermWithId[] = [];

    if (event.dataTransfer) {
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        await Promise.all(
          [...event.dataTransfer.items].map(async (item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
              const file = item.getAsFile();
              // sets.push(...(await readfile(file, { addUniqueId: true })));
            }
          })
        );
      } else {
        // Use DataTransfer interface to access the file(s)
        await Promise.all(
          [...event.dataTransfer.files].map(async (file, i) => {
            //   sets.push(...(await readfile(file, { addUniqueId: true })));
          })
        );
      }
    }

    fileUploadHandler && fileUploadHandler(event);
    fileDropHandler && fileDropHandler(event);
  };

  const dragOverHandler: DragEventHandler<HTMLDivElement> = (event) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    fileOverHandler && fileOverHandler(event);
  };

  const dragLeaveHandler: DragEventHandler<HTMLDivElement> = (event) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    fileLeaveHandler && fileLeaveHandler(event);
  };

  return { inputFileHandler, dropHandler, dragOverHandler, dragLeaveHandler };
};
