import { useEffect, useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { Variants, motion } from "framer-motion";
import { DatePickerInput } from "../../shared/date-picker-input";
import { z, ZodType } from "zod";
import {
  Duration,
  useLazyFetchTermDetailQuery,
  useUpdateTermMutation,
} from "../../providers/store/api/termApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { add, format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { ErrorData } from "../../providers/store/api/type";
import { TEInput } from "tw-elements-react";
import { InputValidationMessage } from "../../shared/validation-input-message";
import DurationRadioOption from "../../entities/duration-radio-option";
import { RadioInput } from "../../shared/radio-input";
import { CgSpinner } from "react-icons/cg";
import { InputSkeleton } from "../user-edit-page/ui/input-skeleton";

enum AnimationStage {
  HIDDEN = "hidden",
  VISIBLE = "visible",
}

const staggerChildrenAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
  [AnimationStage.VISIBLE]: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.2,
    },
  },
};

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

export const UpdateTermSchema: ZodType<FormData> = z
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

export const TermUpdate: React.FC = () => {
  // Navigate
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<Duration>();

  // Get term detail
  const { termId } = useParams<{ termId: string }>();

  const [
    fetchTermDetail,
    { data: term, isFetching, isSuccess: isFetchTermDetailSuccess },
  ] = useLazyFetchTermDetailQuery();

  useEffect(() => {
    if (termId) {
      fetchTermDetail(parseInt(termId, 10), true);
    }
  }, [termId]);
  // Form
  const {
    register,
    control,
    watch,
    formState: { dirtyFields, isValid, errors },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(UpdateTermSchema), // Apply the zodResolver
  });

  useEffect(() => {
    if (!isFetching && isFetchTermDetailSuccess && term) {
      setValue("name", term.name);
      setValue("duration", term.duration);
      setValue("startDate", parseISO(term.startDate, { additionalDigits: 2 }));
      setValue(
        "planDueDate",
        parseISO(term.planDueDate, { additionalDigits: 2 })
      );

      setSelectedOption(term.duration as Duration);
    }
  }, [isFetching, isFetchTermDetailSuccess, term]);

  // Mutation update term
  const [updateTerm, { isLoading, isSuccess, isError, error }] =
    useUpdateTermMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const startDateString = data.startDate.toISOString().replace("Z", "");
    const planDueDateString = data.planDueDate.toISOString().replace("Z", "");

    if (termId) {
      const numericTermId = parseInt(termId, 10);

      updateTerm({
        id: numericTermId,
        name: data.name,
        duration: data.duration as Duration,
        startDate: startDateString,
        planDueDate: planDueDateString,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast("Update term successfully!", { type: "success" });

      navigate("/term-management");
    }
  }, [isLoading, isSuccess]);

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

  useEffect(() => {
    if (isError) {
      toast(errorMessage, { type: "error" });
    }
  }, [isError, errorMessage]);

  function handleOnClickRadio(duration: Duration) {
    setSelectedOption(duration);
  }

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto  z-10">
          <p className="text-primary dark:text-primary/70 font-bold text-2xl w-fit ml-7 space-x-2">
            <Link
              to={`../../term-management`}
              className="font-bold opacity-70 hover:opacity-100 hover:underline duration-200"
            >
              Term management
            </Link>
            <span className="text-base opacity-40">&gt;</span>
            <Link
              to={`/term-management/detail/information/${termId}`}
              className="font-bold opacity-70 hover:opacity-100 hover:underline duration-200"
            >
              Term detail
            </Link>
            <span className="text-base opacity-40">&gt;</span>
            <span>Update {term?.name}</span>
          </p>
        </div>
      </BubbleBanner>

      <div className="border p-12 pb-12 mt-10 rounded-lg dark:border-neutral-800 dark:shadow-black flex flex-col">
        <motion.div variants={childrenAnimation} className="">
          <TEInput
            type="text"
            label="Term name"
            className="bg-white dark:bg-neutral-900 custom-wrapper mt-8 border rounded font-bold opacity-70 "
            autoFocus
            {...register("name", { required: true })}
          />
          <InputValidationMessage
            show={true}
            validateFn={() => NameSchema.parse(watch("name"))}
          />
        </motion.div>

        <div className="">
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
              {!isFetching && isFetchTermDetailSuccess && term && (
                <>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <DatePickerInput
                        value={parseISO(term.startDate, {
                          additionalDigits: 2,
                        })}
                        onChange={(value) => onChange(value)}
                      />
                    )}
                  />

                  <InputValidationMessage
                    className="mt-1"
                    show={dirtyFields.startDate || false}
                    validateFn={() => StartDateSchema.parse(watch("startDate"))}
                  />
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            className="flex flex-row gap-6 pt-6 w-full"
            variants={childrenAnimation}
          >
            {!isFetching && isFetchTermDetailSuccess && selectedOption && (
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
            )}
            {!isFetching && isFetchTermDetailSuccess && selectedOption && (
              <DurationRadioOption
                radioInput={
                  <RadioInput
                    value={Duration.QUARTERLY}
                    checked={selectedOption === Duration.QUARTERLY}
                    {...register("duration")}
                  />
                }
                onClick={() => handleOnClickRadio(Duration.QUARTERLY)}
                isSelected={selectedOption === Duration.QUARTERLY}
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
            )}

            {!isFetching && isFetchTermDetailSuccess && selectedOption && (
              <DurationRadioOption
                radioInput={
                  <RadioInput
                    value={Duration.HALF_YEARLY}
                    checked={selectedOption === Duration.HALF_YEARLY}
                    {...register("duration")}
                  />
                }
                onClick={() => handleOnClickRadio(Duration.HALF_YEARLY)}
                isSelected={selectedOption === Duration.HALF_YEARLY}
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
            )}
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
              {!isFetching && isFetchTermDetailSuccess && term && (
                <>
                  <Controller
                    name="planDueDate"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <DatePickerInput
                        value={parseISO(term.planDueDate, {
                          additionalDigits: 2,
                        })}
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
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Buttons */}
        <motion.div
          className="flex flex-row flex-wrap items-center gap-5 mt-12 "
          variants={childrenAnimation}
        >
          <Button variant="tertiary" className="w-[300px] p-3">
            Back
          </Button>
          <Button
            disabled={!isValid}
            containerClassName="flex-1"
            className="font-bold p-3 h-[51px]"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            {!isLoading && "Update term"}
            {isLoading && <CgSpinner className="m-auto text-lg animate-spin" />}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
