import { IconButton } from "../../shared/icon-button";
import { Modal } from "../../shared/modal";
import { IoClose } from "react-icons/io5";
import { Variants, motion } from "framer-motion";
import { Button } from "../../shared/button";
import { useEffect, useState } from "react";
import { DatePickerInput } from "../../shared/date-picker-input";
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
import { useNavigate } from "react-router-dom";
import { InputValidationMessage } from "../../shared/validation-input-message";
import { add, format } from "date-fns";
import { CgSpinner } from "react-icons/cg";
import { formatISODateForBody } from "../../shared/utils/format-iso-date-for-body";
import DurationRadioOption from "../../entities/duration-radio-option";
import { RadioInput } from "../../shared/radio-input";

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
  planDueDate: Date;
};

const NameSchema = z.string().min(1, "Name cannot be empty");

const DurationSchema = z.nativeEnum(Duration);

const StartDateSchema = z.date({
  required_error: "Start date cannot be null",
});

const PlanDueDateSchema = z
  .date({
    required_error: "Plan due date cannot be null",
  })
  .refine((date) => new Date(date) > new Date(), {
    message: "Plan due date must be in the future",
  });

export const CreateTermSchema: ZodType<FormData> = z
  .object({
    name: NameSchema,
    duration: DurationSchema,
    startDate: StartDateSchema,
    planDueDate: PlanDueDateSchema,
  })
  .superRefine((data, ctx) => {
    if (new Date(data.planDueDate) <= new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Plan due date must be after the start date",
        path: ["planDueDate"],
      });
    }
  });

export const TermCreateModal: React.FC<Props> = ({ show, onClose }) => {
  // Navigate
  const navigate = useNavigate();
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
      planDueDate: formatISODateForBody(data.planDueDate),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast("Create term successfully!", { type: "success" });
      navigate("/term-management");
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
              }
            }}
            {...register("name", { required: true })}
          />
          <InputValidationMessage
            show={true}
            validateFn={() => NameSchema.parse(watch("name"))}
          />
        </motion.div>
        <div className="w-11/12 mx-auto">
          <div className="flex flex-col flex-wrap gap-0.5 mt-6">
            <motion.div
              className="text-sm font-semibold text-neutral-400 dark:font-bold dark:text-neutral-500"
              variants={childrenAnimation}
            >
              Start date
            </motion.div>
            <motion.div
              variants={childrenAnimation}
              className="custom-wrapper w-[200px]"
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePickerInput
                    value={new Date()}
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />

              <InputValidationMessage
                className="mt-1"
                show={dirtyFields.startDate || false}
                validateFn={() => StartDateSchema.parse(watch("startDate"))}
              />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-row gap-6 pt-6 w-full"
            variants={childrenAnimation}
          >
            <DurationRadioOption
              radioInput={
                <RadioInput
                  disabled
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
                  {/* TODO: Fix this: add try catch and extract to another utils */}
                  {watch("startDate") &&
                    format(watch("startDate"), "dd/MM/yyyy")}{" "}
                  -{" "}
                  {watch("startDate") &&
                    format(
                      add(watch("startDate"), { months: 1 }),
                      "dd/MM/yyyy"
                    )}
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
                  {watch("startDate") &&
                    format(watch("startDate"), "dd/MM/yyyy")}{" "}
                  -{" "}
                  {watch("startDate") &&
                    format(
                      add(watch("startDate"), { months: 3 }),
                      "dd/MM/yyyy"
                    )}
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
                  {watch("startDate") &&
                    format(watch("startDate"), "dd/MM/yyyy")}{" "}
                  -{" "}
                  {watch("startDate") &&
                    format(
                      add(watch("startDate"), { months: 6 }),
                      "dd/MM/yyyy"
                    )}
                </>
              }
            />
          </motion.div>

          <div className="flex flex-col flex-wrap gap-0.5 mt-10">
            <motion.div
              className="text-sm font-semibold text-neutral-400 dark:font-bold dark:text-neutral-500"
              variants={childrenAnimation}
            >
              Plan due date
            </motion.div>
            <motion.div
              variants={childrenAnimation}
              className="custom-wrapper w-[200px]"
            >
              <Controller
                name="planDueDate"
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePickerInput
                    value={new Date()}
                    onChange={(value) => onChange(value)}
                    modalPosition={{ top: -120, right: -340 }}
                  />
                )}
              />
              <InputValidationMessage
                className="mt-1"
                show={dirtyFields.planDueDate || false}
                validateFn={() => {
                  PlanDueDateSchema.parse(watch("planDueDate"));

                  if (
                    watch("planDueDate").getTime() <=
                    watch("startDate").getTime()
                  ) {
                    throw new Error(
                      "Plan due date must be greater that start date"
                    );
                  }
                }}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap w-11/12 mt-10 gap-6">
          <Button
            disabled={!isValid}
            containerClassName="flex-1"
            className="font-bold p-3"
            onClick={() => {
              handleSubmit(onSubmit)();
              onClose && onClose();
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
