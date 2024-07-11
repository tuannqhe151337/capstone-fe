import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { Button } from "../../shared/button";
import { FaExclamation } from "react-icons/fa";
import { Term, useStartTermMutation } from "../../providers/store/api/termApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Props {
  term?: Term;
  show: boolean;
  onClose: () => any;
  onStartTermSuccessfully?: (term: Term) => any;
}

export const StartTermModal: React.FC<Props> = ({
  term,
  show,
  onClose,
  onStartTermSuccessfully,
}) => {
  const [startTerm, { isError, error, isLoading, isSuccess }] =
    useStartTermMutation();

  useEffect(() => {
    if (!isLoading && isSuccess && !isError && term) {
      toast("Activate term successfully!", { type: "success" });
      onStartTermSuccessfully && onStartTermSuccessfully(term);
      onClose && onClose();
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <Modal
      className="w-[70vw] xl:w-[50vw] h-max flex flex-col justify-center items-center"
      show={show}
      onClose={onClose}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-10 py-8">
        <div className="absolute top-3 right-5">
          <IconButton
            className="hover:bg-neutral-100"
            onClick={(event) => {
              event.stopPropagation();
              onClose && onClose();
            }}
          >
            <IoClose className="text-3xl text-neutral-500" />
          </IconButton>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-row flex-wrap items-center justify-center size-[100px] bg-primary-100 dark:bg-primary-900/50 rounded-full">
            <FaExclamation className="text-[42px] text-primary-500/80 dark:text-primary-600" />
          </div>

          <div className="font-bold text-2xl text-primary-500 dark:text-primary-500 mt-5">
            Start term
          </div>
          <div className="font-semibold dark:font-bold text-primary-400 dark:text-primary-600 mt-5">
            You're going to start term{" "}
            <span className="font-extrabold dark:text-primary-500">
              "Finalcial plan December Q3 2021"
            </span>
          </div>

          <div className="mt-3 font-semibold dark:font-bold text-primary-400 dark:text-primary-600">
            This action{" "}
            <span className="font-extrabold dark:text-primary-500">
              can not
            </span>{" "}
            be reversed. Are you sure?
          </div>
        </div>

        <div className="mt-10 flex flex-row gap-6 w-full">
          <Button
            variant="tertiary"
            className="font-bold w-[250px] p-3"
            onClick={() => {
              onClose && onClose();
            }}
          >
            No, cancel
          </Button>

          <Button
            containerClassName="flex-1"
            className="font-bold p-3"
            onClick={() => {
              if (term?.termId) {
                startTerm({ termId: term.termId });
              }
            }}
          >
            Yes, start term
          </Button>
        </div>
      </div>
    </Modal>
  );
};
