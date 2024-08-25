import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { Button } from "../../shared/button";
import { IoIosWarning } from "react-icons/io";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDeleteMonthlyExchangeRateMutation } from "../../providers/store/api/exchangeRateApi";
import { useTranslation } from "react-i18next";

interface Props {
  month: string;
  show: boolean;
  onClose: () => any;
  onDeleteSuccessfully?: () => any;
}

export const DeleteExchangeRateModal: React.FC<Props> = ({
  month,
  show,
  onClose,
  onDeleteSuccessfully,
}) => {
  // i18n
  const { t } = useTranslation(["exchange-rate"]);

  // Mutation
  const [deleteExchangeRate, { isError, isLoading, isSuccess }] =
    useDeleteMonthlyExchangeRateMutation();

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast("Delete monthly money rate successfully!", { type: "success" });
      onClose && onClose();
      onDeleteSuccessfully && onDeleteSuccessfully();
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
          <div className="flex flex-row flex-wrap items-center justify-center size-[100px] bg-red-100 dark:bg-red-900/50 rounded-full">
            <IoIosWarning className="text-[56px] text-red-500/80 dark:text-red-700/80" />
          </div>
          <div className="font-bold dark:font-extrabold text-2xl text-red-400 dark:text-red-500/70 mt-5">
            {t("Delete monthly exchange rate")}
          </div>
          <div className="font-semibold dark:font-bold text-red-400 dark:text-red-500 mt-5">
            {t("delete_currencyMonthly_message.part1")}{" "}
            <span className="font-extrabold text-red-500 dark:text-red-600">
              "
              {t("delete_currencyMonthly_message.part2", {
                currencyMonthlyName: month,
              })}
              "
            </span>
            {t("delete_currencyMonthly_message.part3")}
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
            No, cancel
          </Button>
          <Button
            containerClassName="flex-1"
            className="p-3"
            variant="error"
            buttonType="outlined"
            onClick={() => {
              deleteExchangeRate({ month });
            }}
          >
            Yes, delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
