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
      className="w-[70vw] xl:w-[56vw] h-[70vh] flex flex-col justify-center items-center"
      show={show}
      onClose={onClose}
    >
      <div className="relative pt-5 w-full h-full flex flex-col items-center justify-center">
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

        <div className="flex flex-col items-center gap-4">
          <FaCheckCircle className="text-[140px] text-primary-500 dark:opacity-80" />
          <div className="font-bold text-2xl text-primary-600 dark:text-primary-600 mt-4">
            Active user
          </div>
          <div className="font-bold text-primary-600 dark:text-primary-600 mt-2">
            You're going to deactivate user "AnhLN7".
          </div>
          <div className="font-bold text-primary-600 dark:text-primary-600 mt-2">
            Are you sure?
          </div>
        </div>

        <div className="mt-8 flex flex-row gap-6">
          <Button className="font-bold w-[300px] p-3 text-primary-500 bg-white hover:text-white hover:bg-red-500 focus:bg-red-500 focus:text-white focus:!border-red-500 border-neutral-200 active:bg-red-500 dark:text-white/80 dark:hover:text-white dark:bg-red-600 dark:border-red-600 dark:hover:bg-red-700 dark:focus:bg-red-700 dark:hover:border-red-600 dark:focus:border-red-600">
            No, cancel
          </Button>

          <Button className="font-bold w-[300px] p-3">Yes, active user</Button>
        </div>
      </div>
    </Modal>
  );
};
