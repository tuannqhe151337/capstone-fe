import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { Button } from "../../shared/button";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Department,
  useDeleteDepartmentMutation,
} from "../../providers/store/api/departmentApi";
import { ErrorData } from "../../providers/store/api/type";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { useTranslation } from "react-i18next";

interface Props {
  department: Department;
  show: boolean;
  onClose: () => any;
  onDeleteSuccessfully?: (department: Department) => any;
}

export const DeleteDepartmentModal: React.FC<Props> = ({
  department,
  show,
  onClose,
  onDeleteSuccessfully,
}) => {
  // i18n
  const { t } = useTranslation(["department-management"]);

  // Mutation
  const [deleteDepartment, { isError, isLoading, isSuccess, error }] =
    useDeleteDepartmentMutation();

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast("Delete department successfully!", { type: "success" });
      onClose && onClose();
      onDeleteSuccessfully && onDeleteSuccessfully(department);
    }
  }, [isError, isLoading, isSuccess]);

  // Error message
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (isError) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in (error.data as any)
      ) {
        setErrorMessage(
          uppercaseFirstCharacter((error.data as ErrorData).message)
        );
      } else {
        setErrorMessage("Something went wrong, please try again!");
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isError) {
      toast(errorMessage, { type: "error" });
    }
  }, [isError, errorMessage]);

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
          <div className="flex flex-row flex-wrap items-center justify-center size-[100px] bg-red-100 dark:bg-red-900/50 rounded-full">
            <IoIosWarning className="text-[56px] text-red-500/80 dark:text-red-700/80" />
          </div>
          <div className="font-bold dark:font-extra bold text-2xl text-red-400 dark:text-red-500/70 mt-5">
            {t("Delete department")}
          </div>
          <div className="font-semibold dark:font-bold text-red-400 dark:text-red-500 mt-5">
            {t("delete_department_message.part1")}{" "}
            <span className="font-extrabold text-red-500 dark:text-red-600">
              "
              {t("delete_department_message.part2", {
                departmentName: department.name,
              })}
              "
            </span>
            {t("delete_department_message.part3")}
          </div>
          <div className="mt-3 font-semibold dark:font-bold text-red-400 dark:text-red-500">
            {t("confirmation_message.part1")}{" "}
            <span className="font-extrabold text-red-500 dark:text-red-600">
              {t("confirmation_message.part2")}
            </span>{" "}
            {t("confirmation_message.part3")}
          </div>
        </div>

        <div className="mt-10 flex flex-row gap-6 w-full">
          <Button
            className="font-bold w-[250px] p-3"
            onClick={() => {
              onClose && onClose();
            }}
          >
            {t("No, cancel")}
          </Button>
          <Button
            containerClassName="flex-1"
            className="p-3"
            variant="error"
            buttonType="outlined"
            onClick={() => {
              deleteDepartment({ departmentId: department.departmentId });
            }}
          >
            {t("Yes, delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
