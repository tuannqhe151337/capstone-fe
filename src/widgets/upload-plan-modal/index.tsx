import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";

import { useEffect, useState } from "react";
import { StepProgress } from "./component/step-progress";
import { ChooseTermStage } from "./component/choose-term-stage";
import { UploadFileStage } from "./component/upload-file-stage";
import { ConfirmExpensesStage } from "./component/confirm-expenses-stage";

interface Props {
  show: boolean;
  onClose: () => any;
}

export const UploadPlanModal: React.FC<Props> = ({ show, onClose }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (show) {
      const timeoutId = setTimeout(() => {
        setStage(1);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setStage(0);
    }
  }, [show]);

  return (
    <Modal className={`w-[90vw] h-[95vh]`} show={show} onClose={onClose}>
      <>
        {/* Header */}
        <div className="relative pt-5">
          <p className="w-fit m-auto text-xl font-bold text-primary-500 dark:text-primary-600">
            Choose term
          </p>
          <div className="absolute top-3 right-5">
            <IconButton
              onClick={() => {
                onClose && onClose();
              }}
            >
              <IoClose className="text-3xl text-neutral-400" />
            </IconButton>
          </div>
        </div>

        {/* Body */}
        <div className="pt-6">
          <div className="flex flex-col flex-wrap items-center justify-center w-full">
            <StepProgress stage={stage} />

            {stage === 1 && (
              <ChooseTermStage
                onTermSelected={() => {
                  setStage(2);
                }}
              />
            )}

            {stage === 2 && (
              <UploadFileStage
                onPreviousState={() => {
                  setStage(1);
                }}
                onNextStage={() => {
                  setStage(3);
                }}
              />
            )}

            {stage === 3 && (
              <ConfirmExpensesStage
                onPreviousState={() => {
                  setStage(2);
                }}
                onNextStage={() => {
                  setStage(4);
                }}
              />
            )}
          </div>
        </div>
      </>
    </Modal>
  );
};
