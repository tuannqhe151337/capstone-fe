import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { Variants, motion } from "framer-motion";
import { Button } from "../../shared/button";
import { useEffect, useState } from "react";
import { TEInput } from "tw-elements-react";
import { z, ZodType } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Duration,
  useCreateTermMutation,
} from "../../providers/store/api/termApi";
import { toast } from "react-toastify";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { ErrorData } from "../../providers/store/api/type";
import { InputValidationMessage } from "../../shared/validation-input-message";
import { CgSpinner } from "react-icons/cg";
import { formatISODateForBody } from "../../shared/utils/format-iso-date-for-body";
import DurationRadioOption from "../../entities/duration-radio-option";
import { RadioInput } from "../../shared/radio-input";
import { DatePickerInputWithErrorAndLabel } from "../../entities/date-picker-input-with-error-and-label";
import { formatDate } from "../../shared/utils/format-date";
import { addDate } from "../../shared/utils/add-date";

interface Props {
  show: boolean;
  onClose: () => any;
}

const childrenAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

type FormData = {
  name: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  reuploadStartDate: Date;
  reuploadEndDate: Date;
};

const NameSchema = z.string().min(1, "Name cannot be empty");

const DurationSchema = z.string();

const StartDateSchema = z.date({
  required_error: "Start date cannot be null",
});

const EndDateSchema = z
  .date({
    required_error: "End date cannot be null",
  })
  .refine((date) => new Date(date) > new Date(), {
    message: "Must be in the future",
  });

const ReuploadStartDateSchema = z
  .date({
    required_error: "Cannot be null",
  })
  .refine((date) => new Date(date) > new Date(), {
    message: "Must be in the future",
  });

const ReuploadEndDateSchema = z
  .date({
    required_error: "Cannot be null",
  })
  .refine((date) => new Date(date) > new Date(), {
    message: "Must be in the future",
  });

export const CreateTermSchema: ZodType<FormData> = z
  .object({
    name: NameSchema,
    duration: DurationSchema,
    startDate: StartDateSchema,
    endDate: EndDateSchema,
    reuploadStartDate: ReuploadStartDateSchema,
    reuploadEndDate: ReuploadEndDateSchema,
  })
  .superRefine((data, ctx) => {
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after the start date",
        path: ["endDate"],
      });
    }

    if (new Date(data.reuploadStartDate) <= new Date(data.endDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reupload start date must be after end date",
        path: ["reuploadStartDate"],
      });
    }

    if (new Date(data.reuploadEndDate) <= new Date(data.reuploadStartDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reupload end date must be after reupload start date",
        path: ["reuploadEndDate"],
      });
    }
  });

export const TermCreateModal: React.FC<Props> = ({ show, onClose }) => {
  // Navigate
  const [selectedOption, setSelectedOption] = useState<Duration>(
    Duration.MONTHLY
  );

  // Form
  const {
    register,
    control,
    watch,
    formState: { dirtyFields, isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(CreateTermSchema),
  });

  // Mutation
  const [createTerm, { isLoading, isSuccess, isError, error }] =
    useCreateTermMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const duration = Duration[data.duration as keyof typeof Duration];

    createTerm({
      name: data.name,
      duration: duration,
      startDate: formatISODateForBody(data.startDate),
      endDate: formatISODateForBody(data.endDate),
      reuploadStartDate: formatISODateForBody(data.reuploadStartDate),
      reuploadEndDate: formatISODateForBody(data.reuploadEndDate),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast("Create term successfully!", { type: "success" });
      onClose && onClose();
    }
  }, [isSuccess]);

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

  function handleOnClickRadio(duration: Duration) {
    setSelectedOption(duration);
  }

  return (
    <Modal
      className="w-[70vw] xl:w-[66vw] h-max flex flex-col justify-center items-center"
      show={show}
      onClose={onClose}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-10 py-8">
        <div className="font-bold text-3xl text-primary-500">Create term</div>

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

        <motion.div variants={childrenAnimation} className="w-11/12 mx-auto">
          <TEInput
            type="text"
            label="Term name"
            className="bg-white dark:bg-neutral-900 custom-wrapper mt-8 border rounded font-bold opacity-70 "
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.currentTarget.blur();
              } else if (e.key === "Enter") {
                handleSubmit(onSubmit)();
              }
            }}
            {...register("name", { required: true })}
          />
          <InputValidationMessage
            show={true}
            validateFn={() => NameSchema.parse(watch("name"))}
          />
        </motion.div>

        <div className="w-11/12 mx-auto mt-3">
          {/* Start - end date */}
          <div className="flex flex-row flex-wrap items-center gap-2">
            <motion.div variants={childrenAnimation}>
              <Controller
                name="startDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePickerInputWithErrorAndLabel
                    label="Start date"
                    showValidationMessage={dirtyFields.startDate || false}
                    validateFn={() => StartDateSchema.parse(watch("startDate"))}
                    value={new Date()}
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </motion.div>

            <p className="-mt-1.5 font-bold text-lg text-neutral-400">-</p>

            <motion.div variants={childrenAnimation}>
              <Controller
                name="endDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePickerInputWithErrorAndLabel
                    label="End date"
                    showValidationMessage={dirtyFields.startDate || false}
                    validateFn={() => {
                      EndDateSchema.parse(watch("endDate"));
                      if (watch("endDate") < watch("startDate")) {
                        throw new Error("Must be after start date");
                      }
                    }}
                    value={addDate(new Date(), { days: 5 })}
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </motion.div>
          </div>

          {/* Term duration radio boxes */}
          <motion.div
            className="flex flex-row gap-6 pt-3 w-full"
            variants={childrenAnimation}
          >
            <DurationRadioOption
              radioInput={
                <RadioInput
                  value={Duration.MONTHLY}
                  checked={selectedOption === Duration.MONTHLY}
                  {...register("duration")}
                />
              }
              onClick={() => handleOnClickRadio(Duration.MONTHLY)}
              isSelected={selectedOption === Duration.MONTHLY}
              label={"Monthly"}
              fromToDate={
                <>
                  {formatDate(watch("startDate"))} -{" "}
                  {formatDate(addDate(watch("startDate"), { months: 1 }))}
                </>
              }
            />

            <DurationRadioOption
              disabled
              radioInput={
                <RadioInput
                  disabled
                  value={Duration.QUARTERLY}
                  checked={selectedOption === Duration.QUARTERLY}
                  {...register("duration")}
                />
              }
              // onClick={() => handleOnClickRadio(Duration.QUARTERLY)}
              // isSelected={selectedOption === Duration.QUARTERLY}
              tooltip="We'll complete this feature in the future"
              label={"Quarterly"}
              fromToDate={
                <>
                  {formatDate(watch("startDate"))} -{" "}
                  {formatDate(addDate(watch("startDate"), { months: 3 }))}
                </>
              }
            />

            <DurationRadioOption
              disabled
              radioInput={
                <RadioInput
                  disabled
                  value={Duration.HALF_YEARLY}
                  checked={selectedOption === Duration.HALF_YEARLY}
                  {...register("duration")}
                />
              }
              // onClick={() => handleOnClickRadio(Duration.HALF_YEARLY)}
              // isSelected={selectedOption === Duration.HALF_YEARLY}
              tooltip="We'll complete this feature in the future"
              label={"Half year"}
              fromToDate={
                <>
                  {formatDate(watch("startDate"))} -{" "}
                  {formatDate(addDate(watch("startDate"), { months: 6 }))}
                </>
              }
            />
          </motion.div>

          <div className="flex flex-row flex-wrap items-center mt-8 gap-2">
            {/* Reupload start date */}
            <motion.div variants={childrenAnimation}>
              <Controller
                name="reuploadStartDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePickerInputWithErrorAndLabel
                    label="Reupload start date"
                    modalPosition={{
                      top: -100,
                      right: -320,
                    }}
                    showValidationMessage={dirtyFields.startDate || false}
                    validateFn={() => {
                      ReuploadStartDateSchema.parse(watch("reuploadStartDate"));

                      if (watch("reuploadStartDate") < watch("endDate")) {
                        throw new Error("Must be after end date");
                      }
                    }}
                    value={addDate(new Date(), { days: 20 })}
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </motion.div>

            <p className="-mt-1.5 font-bold text-lg text-neutral-400">-</p>

            {/* Reupload end date */}
            <motion.div variants={childrenAnimation}>
              <Controller
                name="reuploadEndDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePickerInputWithErrorAndLabel
                    label="Reupload end date"
                    modalPosition={{
                      top: -100,
                      right: -320,
                    }}
                    showValidationMessage={dirtyFields.startDate || false}
                    validateFn={() => {
                      ReuploadEndDateSchema.parse(watch("reuploadEndDate"));

                      if (
                        watch("reuploadEndDate") < watch("reuploadStartDate")
                      ) {
                        throw new Error("Must be after reupload start date");
                      }
                    }}
                    value={addDate(new Date(), { days: 21 })}
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap w-11/12 mt-3 gap-6">
          <Button
            disabled={!isValid}
            containerClassName="flex-1"
            className="font-bold p-3"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            {!isLoading && "Create new term"}
            {isLoading && <CgSpinner className="m-auto text-lg animate-spin" />}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
