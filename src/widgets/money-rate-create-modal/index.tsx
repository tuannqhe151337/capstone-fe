import { IoClose } from "react-icons/io5";
import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { TEInput } from "tw-elements-react";
import { ErrorNotificationCard } from "../../shared/error-notification-card";
import clsx from "clsx";
import { NumericFormat } from "react-number-format";
import { CgSpinner } from "react-icons/cg";
import { Button } from "../../shared/button";
import { InputRate } from "./ui/input-rate";
import { useCreateCostTypeMutation } from "../../providers/store/api/costTypeAPI";
import { useEffect, useState } from "react";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { ErrorData } from "../../providers/store/api/type";

interface Props {
  show: boolean;
  onClose: () => any;
  onCreateSuccessfully?: () => any;
}

export const MoneyRateCreateModal: React.FC<Props> = ({
  show,
  onClose,
  onCreateSuccessfully,
}) => {
  // Mutation
  const [create, { isLoading, isError, error }] = useCreateCostTypeMutation();

  // Error message
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (isError) {
      if (error && "data" in error && "message" in (error.data as any)) {
        setErrorMessage(
          uppercaseFirstCharacter((error.data as ErrorData).message)
        );
      } else {
        setErrorMessage("Something went wrong, please try again!");
      }
    }
  }, [isError]);

  return (
    <Modal
      className="w-[45vw] h-max flex flex-col justify-center items-center"
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

        <form className="w-full">
          <div className="flex flex-col items-center w-full">
            <div className="font-bold dark:font-extra bold text-2xl text-primary-400 dark:text-primary-500/70 -mt-2.5">
              New monthly rate conversion
            </div>

            <ErrorNotificationCard
              className="mt-3"
              show={!isLoading && isError}
              errorMessage={errorMessage}
            />

            <div
              className={clsx({
                "w-full": true,
                "mt-5": !isError,
                "mt-1.5": isError,
              })}
            >
              <TEInput
                className="!text-neutral-600 font-semibold"
                size="lg"
                label="Month"
                value={"01/2024"}
              />

              <div className="border-b-2 border-b-neutral-100 mt-5"></div>

              <div className="flex flex-row flex-wrap items-center gap-3 mt-5">
                <p className="w-[40px] text-sm text-neutral-400 font-semibold">
                  USD
                </p>
                <NumericFormat
                  className="!text-neutral-500 font-semibold"
                  customInput={TEInput}
                  value={1}
                  allowNegative={false}
                  prefix="$"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </div>

              <InputRate
                label="VNĐ"
                input={
                  <NumericFormat
                    className="!text-neutral-500 font-semibold"
                    customInput={TEInput}
                    value={20000}
                    allowNegative={false}
                    suffix="đ"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                }
              />

              <InputRate
                label="JPY"
                input={
                  <NumericFormat
                    className="!text-neutral-500 font-semibold"
                    customInput={TEInput}
                    value={147}
                    allowNegative={false}
                    prefix="¥"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                }
              />

              <InputRate
                label="KRW"
                input={
                  <NumericFormat
                    className="!text-neutral-500 font-semibold"
                    customInput={TEInput}
                    value={1.374}
                    allowNegative={false}
                    prefix="₩"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                }
              />
            </div>
          </div>

          <div className="mt-10 flex flex-row gap-3 w-full">
            <Button
              type="button"
              variant="tertiary"
              tabIndex={-1}
              className="font-bold w-[200px] p-3"
              onClick={() => {
                onClose && onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              //   disabled={!isValid}
              tabIndex={-1}
              containerClassName="flex-1"
              className="p-3"
            >
              {!isLoading && "New monthly rate"}
              {isLoading && (
                <CgSpinner className="m-auto text-lg animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
