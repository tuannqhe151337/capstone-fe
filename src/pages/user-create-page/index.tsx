import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { FaCircleExclamation, FaLocationDot, FaUser } from "react-icons/fa6";
import { Variants, motion } from "framer-motion";
import { TEInput } from "tw-elements-react";
import { FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiTreeStructureFill } from "react-icons/pi";
import { DatePickerInput } from "../../shared/date-picker-input";
import { InputValidationMessage } from "../../shared/validation-input-message";
import { DepartmentFilter } from "../../entities/department-filter";
import { RoleFilter } from "../../entities/role-filter";
import { PositionFilter } from "../../entities/position-filter";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { useCreateUserMutation } from "../../providers/store/api/usersApi";
import { CgSpinner } from "react-icons/cg";
import { ErrorData } from "../../providers/store/api/type";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { toast } from "react-toastify";
import { allowOnlyNumber } from "../../shared/utils/allow-only-number";
import { formatISODateForBody } from "../../shared/utils/format-iso-date-for-body";
import { ErrorNotificationCard } from "../../shared/error-notification-card";

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
  [AnimationStage.HIDDEN]: {
    opacity: 0,
    y: 10,
  },
  [AnimationStage.VISIBLE]: {
    opacity: 1,
    y: 0,
  },
};

const errorAnimation: Variants = {
  [AnimationStage.HIDDEN]: {
    height: 0,
    opacity: 0,
  },
  [AnimationStage.VISIBLE]: {
    height: 45,
    opacity: 1,
  },
};

type Id = number;

type FormData = {
  fullName: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  departmentId: Id;
  roleId: Id;
  positionId: Id;
  address?: string | null;
};

const FullNameSchema = z
  .string()
  .min(5, "Full name length must be at least 5 characters");

const PhoneNumberSchema = z
  .string()
  .regex(/^[0-9]+$/)
  .min(10, "Phone number must be at least 10 numbers")
  .max(15, "Phone number must be at least 15 numbers");

const EmailSchema = z.string().email();

const PositionIdSchema = z.number().gt(0, "Please choose a position");

const DepartmentIdSchema = z.number().gt(0, "Please choose a department");

const AddressSchema = z.string().nullable();

const RoleIdSchema = z.number().gt(0, "Please choose a role");

const BirthDateSchema = z.date();

export const CreateUserSchema: ZodType<FormData> = z.object({
  fullName: FullNameSchema,
  phoneNumber: PhoneNumberSchema,
  email: EmailSchema,
  birthDate: BirthDateSchema,
  roleId: RoleIdSchema,
  positionId: PositionIdSchema,
  departmentId: DepartmentIdSchema,
  address: AddressSchema,
});

export const UserCreate: React.FC = () => {
  // Navigate
  const navigate = useNavigate();

  // Form
  const {
    register,
    control,
    watch,
    formState: { dirtyFields, isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(CreateUserSchema), // Apply the zodResolver
  });

  // Mutation
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const birthDateString = formatISODateForBody(data.birthDate);

    createUser({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      departmentId: data.departmentId,
      roleId: data.roleId,
      positionId: data.positionId,
      dob: birthDateString,
      address: data.address || "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast("Create user successfully!", { type: "success" });
      navigate("/user-management");
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

  useEffect(() => {
    if (isError) {
      toast(errorMessage, { type: "error" });
    }
  }, [isError, errorMessage]);

  return (
    <motion.div
      className="px-6 pb-32"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto z-10">
          <p className="text-primary dark:text-primary/70 font-extrabold text-lg w-fit ml-7 space-x-2">
            <Link
              to={`/user-management`}
              className="font-bold opacity-70 hover:opacity-100 hover:underline duration-200"
            >
              User management
            </Link>
            <span className="text-base opacity-40">&gt;</span>
            <span>Create new user</span>
          </p>
        </div>
      </BubbleBanner>

      <div className="border pb-12 mt-10 rounded-lg dark:border-neutral-800 dark:shadow-black ">
        {/* Fullname */}
        <div className="flex flex-row gap-6 pl-10 pt-10">
          <div>
            <FaUser className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div
            variants={childrenAnimation}
            className="w-[500px] custom-wrapper"
          >
            <TEInput
              type="text"
              label="Full name"
              className="mb-4 bg-white dark:bg-neutral-900"
              autoFocus
              {...register("fullName", { required: true })}
            />
            <InputValidationMessage
              className="-mt-3"
              show={dirtyFields.fullName || false}
              validateFn={() => FullNameSchema.parse(watch("fullName"))}
            />
          </motion.div>
        </div>

        {/* Role */}
        <div className="flex flex-row gap-6 pl-10 mt-4">
          <div>
            <RiUserSettingsFill className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation}>
            <Controller
              name="roleId"
              control={control}
              render={({ field: { onChange } }) => (
                <RoleFilter
                  defaultOption={{ value: 0, label: "Select role" }}
                  onChange={(option) => option && onChange(option.value)}
                />
              )}
            />
            <InputValidationMessage
              className="mt-1"
              show={dirtyFields.roleId || false}
              validateFn={() => RoleIdSchema.parse(watch("roleId"))}
            />
          </motion.div>
        </div>

        {/* Phone */}
        <div className="flex flex-row gap-6 pl-10 mt-5">
          <div>
            <FaPhoneAlt className="text-2xl mt-2 opacity-30 " />
          </div>
          <motion.div
            variants={childrenAnimation}
            className="w-[500px] custom-wrapper"
          >
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TEInput
                  label="Phone"
                  className="mb-4 w-full bg-white dark:bg-neutral-900"
                  value={value}
                  onChange={(e) => {
                    onChange(allowOnlyNumber(e.currentTarget.value));
                  }}
                />
              )}
            />
            <InputValidationMessage
              className="-mt-3"
              show={dirtyFields.phoneNumber || false}
              validateFn={() => PhoneNumberSchema.parse(watch("phoneNumber"))}
            />
          </motion.div>
        </div>

        {/* Email */}
        <div className="flex flex-row gap-6 pl-10 mt-6">
          <div>
            <MdEmail className="text-2xl mt-1 opacity-30" />
          </div>
          <motion.div
            variants={childrenAnimation}
            className="w-[500px] custom-wrapper"
          >
            <TEInput
              type="email"
              label="Email"
              className="mb-4 w-full bg-white dark:bg-neutral-900"
              {...register("email", { required: true })}
            />
            <InputValidationMessage
              className="-mt-3"
              show={dirtyFields.email || false}
              validateFn={() => EmailSchema.parse(watch("email"))}
            />
          </motion.div>
        </div>

        <div className="w-10/12 mx-auto border-t-[2px] mt-6 dark:opacity-10 "></div>

        {/* Department */}
        <div className="flex flex-row gap-6 pl-10 mt-10">
          <div>
            <PiTreeStructureFill className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation}>
            <Controller
              name="departmentId"
              control={control}
              render={({ field: { onChange } }) => (
                <DepartmentFilter
                  className="z-30 dark:z-30"
                  defaultOption={{ value: 0, label: "Select department" }}
                  onChange={(option) => option && onChange(option.value)}
                />
              )}
            />
            <InputValidationMessage
              className="mt-1"
              show={dirtyFields.departmentId || false}
              validateFn={() => DepartmentIdSchema.parse(watch("departmentId"))}
            />
          </motion.div>
        </div>

        {/* Position */}
        <div className="flex flex-row gap-6 pl-10 mt-6">
          <div>
            <PiBagSimpleFill className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation}>
            <Controller
              name="positionId"
              control={control}
              render={({ field: { onChange } }) => (
                <PositionFilter
                  className="z-20 dark:z-20"
                  defaultOption={{ value: 0, label: "Select position" }}
                  onChange={(option) => option && onChange(option.value)}
                />
              )}
            />
            <InputValidationMessage
              className="mt-1"
              show={dirtyFields.positionId || false}
              validateFn={() => PositionIdSchema.parse(watch("positionId"))}
            />
          </motion.div>
        </div>

        <div className="w-10/12 mx-auto border-t-[2px] mt-6 dark:opacity-10"></div>

        {/* Birthdate */}
        <div className="flex flex-row gap-6 pl-10 mt-10">
          <div>
            <FaBirthdayCake className="text-2xl mt-1 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation} className="custom-wrapper">
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DatePickerInput
                  value={new Date()}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          </motion.div>
        </div>

        {/* Location */}
        <div className="flex flex-row gap-6 pl-10 mt-10">
          <div>
            <FaLocationDot className="text-2xl mt-1 opacity-30" />
          </div>
          <motion.div
            variants={childrenAnimation}
            className="w-[500px] custom-wrapper"
          >
            <TEInput
              type="text"
              label="Address"
              className="mb-4 w-full bg-white dark:bg-neutral-900"
              {...register("address")}
            />
          </motion.div>
        </div>

        <ErrorNotificationCard
          show={!isLoading && isError}
          errorMessage={errorMessage}
        />

        <div className="mx-7 flex justify-center mt-4">
          <Button
            disabled={!isValid}
            containerClassName="w-full"
            className="py-2 dark:text-white/80"
            onClick={handleSubmit(onSubmit)}
          >
            {!isLoading && "Create user"}
            {isLoading && <CgSpinner className="m-auto text-lg animate-spin" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
