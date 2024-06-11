import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";

import { RiErrorWarningFill } from "react-icons/ri";
import { Button } from "../../shared/button";

interface Props {
  show: boolean;
  onClose: () => any;
}

export const DeactiveConfirmModal: React.FC<Props> = ({ show, onClose }) => {
  return (
    <Modal
      className={`w-[70vw] xl:w-[60vw] h-[70vh]`}
      show={show}
      onClose={onClose}
    >
      <>
        <div className="relative pt-5">
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

          <div className="absolute right-[380px]">
            <RiErrorWarningFill className="text-[140px] text-red-500 dark:opacity-80" />
          </div>

          <div className="absolute right-[380px] top-[180px] font-bold text-2xl text-primary-600 dark:text-primary-600">
            Deactive user
          </div>

          <div className="absolute right-[300px] top-[240px] font-bold text-primary-600 dark:text-primary-600">
            You're going to deactivate user "AnhLN7".
          </div>

          <div className="absolute right-[400px] top-[300px] font-bold text-primary-600 dark:text-primary-600">
            Are you sure?
          </div>

          <div className="absolute right-[50px] top-[360px] flex flex-row gap-6">
            <Button className="font-bold w-[400px] p-3 ">No, cancel</Button>
            <Button className="font-bold w-[400px] p-3 text-red-500 bg-white hover:text-white hover:bg-red-500 focus:bg-red-500  focus:text-white border-neutral-200 active:bg-red-500 dark:text-white/80 dark:hover:text-white dark:bg-red-600 dark:border-red-600 dark:hover:bg-red-700 dark:focus:bg-red-700 dark:hover:border-red-600 dark:focus:border-red-600">
              Yes, deactive
            </Button>
          </div>
        </div>

        <div className="pt-6"></div>
      </>
    </Modal>
  );
};
