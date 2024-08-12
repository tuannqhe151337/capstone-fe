import { IoClose } from "react-icons/io5";
import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { TEInput } from "tw-elements-react";
import { ErrorNotificationCard } from "../../shared/error-notification-card";
import clsx from "clsx";
import { NumericFormat, PatternFormat } from "react-number-format";
import { CgSpinner } from "react-icons/cg";
import { Button } from "../../shared/button";
import { InputRate } from "./ui/input-rate";
import { useEffect, useState } from "react";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { AFFIX, ErrorData } from "../../providers/store/api/type";
import {
  CreateMonthlyExchangeRateBody,
  useCreateMonthlyExchangeRateMutation,
} from "../../providers/store/api/exchangeRateApi";
import { useGetAllCurrencyQuery } from "../../providers/store/api/currencyApi";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { InputValidationMessage } from "../../shared/validation-input-message";

const MonthSchema = z.string().refine(
  (month) => {
    const parts = month.split("/");

    if (parts.length !== 2) {
      return false;
    }

    if (parseInt(parts[0]) > 12) {
      return false;
    }

    return true;
  },
  {
    message: "Invalid month",
  }
);

const CurrencyIdSchema = z.number();

const AmountSchema = z.optional(z.number());

const MonthlyExchangeRateCreateSchema = z.object({
  month: MonthSchema,
  exchangeRates: z.array(
    z.object({ currencyId: CurrencyIdSchema, amount: AmountSchema })
  ),
});

interface Props {
  show: boolean;
  onClose: () => any;
  onCreateSuccessfully?: () => any;
}

export const ExchangeRateCreateModal: React.FC<Props> = ({
  show,
  onClose,
  onCreateSuccessfully,
}) => {
  // Form
  const {
    register,
    control,
    formState: { isValid, dirtyFields },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreateMonthlyExchangeRateBody>({
    resolver: zodResolver(MonthlyExchangeRateCreateSchema),
  });

  const onSubmit: SubmitHandler<CreateMonthlyExchangeRateBody> = (data) => {
    createMonthlyExchangeRate(data);
  };

  // Get all currencies
  const { data: currencies } = useGetAllCurrencyQuery();

  // Mutation
  const [createMonthlyExchangeRate, { isLoading, isSuccess, isError, error }] =
    useCreateMonthlyExchangeRateMutation();

  // Reset value on open modal
  useEffect(() => {
    reset();
  }, [show]);

  // Success
  useEffect(() => {
    if (isSuccess) {
      toast("Add new exchange rate successfully!", { type: "success" });
      onCreateSuccessfully && onCreateSuccessfully();
    }
  }, [isSuccess]);

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
              <Controller
                name="month"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <PatternFormat
                    className="!text-neutral-600 font-semibold"
                    autoFocus
                    value={value}
                    customInput={TEInput}
                    size="lg"
                    label="Month"
                    pattern="##/####"
                    format="##/####"
                    mask="_"
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <InputValidationMessage
                className="mt-1"
                show={dirtyFields.month || false}
                validateFn={() => MonthSchema.parse(watch("month"))}
              />

              <div className="border-b-2 border-b-neutral-100"></div>

              {currencies?.data.map(
                ({ currencyId, affix, name, symbol }, index) => (
                  <div key={currencyId}>
                    <input
                      type="hidden"
                      value={currencyId}
                      {...register(`exchangeRates.${index}.currencyId`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Controller
                      name={`exchangeRates.${index}.amount`}
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputRate
                          label={name}
                          input={
                            <NumericFormat
                              className="!text-neutral-500 font-semibold"
                              customInput={TEInput}
                              value={value || 0}
                              allowNegative={false}
                              prefix={
                                affix === AFFIX.PREFIX ? symbol : undefined
                              }
                              suffix={
                                affix === AFFIX.SUFFIX ? symbol : undefined
                              }
                              thousandSeparator=","
                              decimalSeparator="."
                              onValueChange={({ floatValue }) => {
                                onChange(floatValue);
                              }}
                              onBlur={onBlur}
                            />
                          }
                        />
                      )}
                    ></Controller>
                  </div>
                )
              )}
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
              disabled={!isValid}
              tabIndex={-1}
              containerClassName="flex-1"
              className="p-3"
              onClick={handleSubmit(onSubmit)}
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
