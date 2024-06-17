import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";

import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../../shared/button";

interface Props {
  show: boolean;
  onClose: () => any;
}

export const ActiveConfirmModal: React.FC<Props> = ({ show, onClose }) => {
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
          <FaCheckCircle className="text-[100px] text-primary-400 dark:text-primary-800" />
          <div className="font-bold text-2xl text-primary-500 dark:text-neutral-500 mt-5">
            Activate user
          </div>
          <div className="font-semibold dark:font-bold text-primary-500 dark:text-neutral-500 mt-5">
            You're going to activate user{" "}
            <span className="font-extrabold dark:text-neutral-400/70">
              "AnhLN7"
            </span>
            .
          </div>
          <div className="mt-3 font-semibold dark:font-bold text-primary-500 dark:text-neutral-500">
            Are you sure?
          </div>
        </div>

        <div className="flex flex-row flex-wrap w-full mt-10 gap-6">
          <Button
            variant="tertiary"
            className="w-[250px] p-3"
            onClick={() => {
              onClose && onClose();
            }}
          >
            No, cancel
          </Button>

          <Button containerClassName="flex-1" className="font-bold p-3">
            Yes, active user
          </Button>
        </div>
      </div>
    </Modal>
  );
};
