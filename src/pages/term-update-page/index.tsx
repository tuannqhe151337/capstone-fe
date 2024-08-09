import { useEffect, useState } from "react";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { Variants, motion } from "framer-motion";
import { z, ZodType } from "zod";
import {
  Duration,
  useLazyFetchTermDetailQuery,
  useUpdateTermMutation,
} from "../../providers/store/api/termApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { ErrorData } from "../../providers/store/api/type";
import { TEInput } from "tw-elements-react";
import { InputValidationMessage } from "../../shared/validation-input-message";
import RadioCardOption from "../../entities/radio-card-option";
import { RadioInput } from "../../shared/radio-input";
import { CgSpinner } from "react-icons/cg";
import { parseISOInResponse } from "../../shared/utils/parse-iso-in-response";
import { formatISODateForBody } from "../../shared/utils/format-iso-date-for-body";
import { DatePickerInputWithErrorAndLabel } from "../../entities/date-picker-input-with-error-and-label";
import { InputSkeleton } from "../../shared/input-skeleton";
import { formatDate } from "../../shared/utils/format-date";
import { addDate } from "../../shared/utils/add-date";

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
  endDate: Date;
  reuploadStartDate: Date;
  reuploadEndDate: Date;
};

const NameSchema = z.string().min(1, "Name cannot be empty");

const DurationSchema = z.nativeEnum(Duration);

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

export const UpdateTermSchema: ZodType<FormData> = z
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
    formState: { dirtyFields, isValid },
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(UpdateTermSchema), // Apply the zodResolver
  });

  useEffect(() => {
    if (!isFetching && isFetchTermDetailSuccess && term) {
      setValue("name", term.name);
      setValue("duration", term.duration);
      setValue("startDate", parseISOInResponse(term.startDate));
      setValue("endDate", parseISOInResponse(term.endDate));
      setValue("reuploadStartDate", parseISOInResponse(term.reuploadStartDate));
      setValue("reuploadEndDate", parseISOInResponse(term.reuploadEndDate));

      setSelectedOption(term.duration as Duration);
    }
  }, [isFetching, isFetchTermDetailSuccess, term]);

  // Mutation update term
  const [updateTerm, { isLoading, isSuccess, isError, error }] =
    useUpdateTermMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const startDateString = formatISODateForBody(data.startDate);
    const endDateString = formatISODateForBody(data.endDate);
    const reuploadStartDateString = formatISODateForBody(
      data.reuploadStartDate
    );
    const reuploadEndDateString = formatISODateForBody(data.reuploadEndDate);

    if (termId) {
      const numericTermId = parseInt(termId, 10);

      updateTerm({
        id: numericTermId,
        name: data.name,
        duration: data.duration as Duration,
        startDate: startDateString,
        endDate: endDateString,
        reuploadStartDate: reuploadStartDateString,
        reuploadEndDate: reuploadEndDateString,
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
        <div className="flex flex-row flex-wrap w-full items-center mt-auto z-10">
          <p className="text-primary dark:text-primary/70 font-extrabold text-lg w-fit ml-7 space-x-2">
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

      <div className="border px-10 pb-12 mt-10 rounded-lg dark:border-neutral-800 dark:shadow-black flex flex-col">
        {/* Term name */}
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

        {/* Start - end date */}
        <div className="flex flex-row flex-wrap items-center gap-2 mt-3">
          <motion.div variants={childrenAnimation}>
            <InputSkeleton
              containerClassName="w-[200px]"
              skeletonClassName="w-[200px]"
              showSkeleton={isFetching}
              showInput={!isFetching && isFetchTermDetailSuccess}
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field: { value, onChange } }) =>
                  value && (
                    <DatePickerInputWithErrorAndLabel
                      label="Start date"
                      showValidationMessage={dirtyFields.startDate || false}
                      validateFn={() =>
                        StartDateSchema.parse(watch("startDate"))
                      }
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                    />
                  )
                }
              />
            </InputSkeleton>
          </motion.div>

          <motion.p
            className="mt-1.5 font-bold text-lg text-neutral-400"
            variants={childrenAnimation}
          >
            -
          </motion.p>

          <motion.div variants={childrenAnimation}>
            <InputSkeleton
              containerClassName="w-[200px]"
              skeletonClassName="w-[200px]"
              showSkeleton={isFetching}
              showInput={!isFetching && isFetchTermDetailSuccess}
            >
              <Controller
                name="endDate"
                control={control}
                render={({ field: { value, onChange } }) =>
                  value && (
                    <DatePickerInputWithErrorAndLabel
                      label="End date"
                      showValidationMessage={dirtyFields.endDate || false}
                      validateFn={() => {
                        EndDateSchema.parse(watch("endDate"));

                        if (watch("endDate") < watch("startDate")) {
                          throw new Error("Must be after start date");
                        }
                      }}
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                    />
                  )
                }
              />
            </InputSkeleton>
          </motion.div>
        </div>

        {/* Radio buttons */}
        <motion.div
          className="flex flex-row gap-6 pt-10 w-full"
          variants={childrenAnimation}
        >
          <RadioCardOption
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
            description={
              <>
                {formatDate(watch("startDate"))} -{" "}
                {formatDate(addDate(watch("startDate"), { months: 1 }))}
              </>
            }
          />

          <RadioCardOption
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
            description={
              <>
                {formatDate(watch("startDate"))} -{" "}
                {formatDate(addDate(watch("startDate"), { months: 3 }))}
              </>
            }
          />

          <RadioCardOption
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
            description={
              <>
                {formatDate(watch("startDate"))} -{" "}
                {formatDate(addDate(watch("startDate"), { months: 6 }))}
              </>
            }
          />
        </motion.div>

        {/* Reupload start - reupload end date */}
        <div className="flex flex-row flex-wrap items-center gap-2 mt-10">
          {/* Reupload start date */}
          <motion.div variants={childrenAnimation}>
            <InputSkeleton
              containerClassName="w-[200px]"
              skeletonClassName="w-[200px]"
              showSkeleton={isFetching}
              showInput={!isFetching && isFetchTermDetailSuccess}
            >
              <Controller
                name="reuploadStartDate"
                control={control}
                render={({ field: { value, onChange } }) =>
                  value && (
                    <DatePickerInputWithErrorAndLabel
                      label="Reupload start date"
                      modalPosition={{
                        top: -100,
                        right: -320,
                      }}
                      showValidationMessage={dirtyFields.startDate || false}
                      validateFn={() => {
                        ReuploadStartDateSchema.parse(
                          watch("reuploadStartDate")
                        );

                        if (watch("reuploadStartDate") < watch("endDate")) {
                          throw new Error("Must be after end date");
                        }
                      }}
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                    />
                  )
                }
              />
            </InputSkeleton>
          </motion.div>

          <motion.p
            className="mt-1.5 font-bold text-lg text-neutral-400"
            variants={childrenAnimation}
          >
            -
          </motion.p>

          {/* Reupload end date */}
          <motion.div variants={childrenAnimation}>
            <InputSkeleton
              containerClassName="w-[200px]"
              skeletonClassName="w-[200px]"
              showSkeleton={isFetching}
              showInput={!isFetching && isFetchTermDetailSuccess}
            >
              <Controller
                name="reuploadEndDate"
                control={control}
                render={({ field: { value, onChange } }) =>
                  value && (
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
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                    />
                  )
                }
              />
            </InputSkeleton>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div
          className="flex flex-row flex-wrap items-center gap-5 mt-12 "
          variants={childrenAnimation}
        >
          <Button
            variant="tertiary"
            className="w-[300px] p-3"
            onClick={() => {
              navigate(`/term-management/detail/information/${term?.id}`);
            }}
          >
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
