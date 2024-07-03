import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType, ZodError, ZodArray } from "zod";
import { BubbleBanner } from "../../entities/bubble-banner";
import { Button } from "../../shared/button";
import { FaLocationDot, FaUser } from "react-icons/fa6";
import { Variants, motion } from "framer-motion";
import { TEInput } from "tw-elements-react";
import { FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiUserSettingsFill } from "react-icons/ri";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { PiTreeStructureFill } from "react-icons/pi";
import { DatePickerInput } from "../../shared/date-picker-input";
import { getZodMessasges } from "../../shared/utils/get-zod-messages";
import { InputValidationMessage } from "../../shared/validation-input-message";

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

interface TermOption {
  value: number;
  label: string;
}

const pageSize = 10;

const defaultOptionTerm = {
  value: 0,
  label: "Term",
};

const termDummyData = [
  {
    id: 1,
    name: "Term 1",
  },
  {
    id: 2,
    name: "Term 2",
  },
  {
    id: 3,
    name: "Term 3",
  },
];

type FormData = {
  fullName: string;
  phoneNumber: string;
  email: string;
};

const FullNameSchema = z
  .string()
  .min(5, "Full name length must be at least 5 characters");

const PhoneNumberSchema = z
  .string()
  .min(10, "Phone number must be at least 10 numbers")
  .max(15, "Phone number must be at least 15 numbers");

const EmailSchema = z.string().email();

export const CreateUserSchema: ZodType<FormData> = z.object({
  fullName: FullNameSchema,
  phoneNumber: PhoneNumberSchema,
  email: EmailSchema,
});

export const UserCreate: React.FC = () => {
  // Form
  const { register, watch, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(CreateUserSchema), // Apply the zodResolver
  });

  // Select state
  const [selectedOptionTerm, setSelectedOptionTerm] =
    useState<TermOption | null>(defaultOptionTerm);

  // Fetch initial data
  const [pageTerm, setPageTerm] = useState<number>(1);

  // Convert data to option for Term
  const loadTermOptions: LoadOptions<TermOption, any, any> = async () => {
    // Load options
    const hasMoreTerm = pageTerm * pageSize < termDummyData.length;

    const loadOptionsTerm = {
      options: termDummyData?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
      hasMoreTerm,
    };

    if (pageTerm === 1) {
      loadOptionsTerm.options.unshift(defaultOptionTerm);
    }

    // Update page
    if (hasMoreTerm) {
      setPageTerm((pageTerm) => pageTerm + 1);
    }
    return loadOptionsTerm;
  };

  return (
    <motion.div
      className="px-6 pb-10"
      initial={AnimationStage.HIDDEN}
      animate={AnimationStage.VISIBLE}
      variants={staggerChildrenAnimation}
    >
      {/* Banner */}
      <BubbleBanner>
        <div className="flex flex-row flex-wrap w-full items-center mt-auto">
          <p className="text-primary dark:text-primary/70 font-extrabold text-2xl w-fit ml-7">
            User management {`>`} Create User
          </p>
        </div>
      </BubbleBanner>

      <div className="border pb-12 mt-10 rounded-lg dark:border-neutral-800 dark:shadow-black ">
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
              validateFn={() => FullNameSchema.parse(watch("fullName"))}
            />
          </motion.div>
        </div>

        <div className="flex flex-row gap-6 pl-10 mt-6">
          <div>
            <RiUserSettingsFill className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation}>
            <AsyncPaginate
              className="w-[200px] cursor-pointer "
              value={selectedOptionTerm}
              onChange={(value) => setSelectedOptionTerm(value)}
              options={[defaultOptionTerm]}
              loadOptions={loadTermOptions}
              classNamePrefix="custom-select"
            />
          </motion.div>
        </div>

        <div className="flex flex-row gap-6 pl-10 mt-10">
          <div>
            <FaPhoneAlt className="text-2xl mt-2 opacity-30 " />
          </div>
          <motion.div
            variants={childrenAnimation}
            className="w-[500px] custom-wrapper"
          >
            <TEInput
              type="text"
              label="Phone"
              className="mb-4 w-full bg-white dark:bg-neutral-900 "
              {...register("phoneNumber", { required: true })}
            />
            <InputValidationMessage
              className="-mt-3"
              validateFn={() => PhoneNumberSchema.parse(watch("phoneNumber"))}
            />
          </motion.div>
        </div>

        <div className="flex flex-row gap-6 pl-10 mt-6">
          <div>
            <HiOutlineMailOpen className="text-2xl mt-1 opacity-30" />
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
              validateFn={() => EmailSchema.parse(watch("email"))}
            />
          </motion.div>
        </div>

        <div className="w-10/12 mx-auto border-t-[2px] mt-6 dark:opacity-10 "></div>

        <div className="flex flex-row gap-6 pl-10 mt-10">
          <div>
            {/* <FcDepartment className="text-2xl mt-2 opacity-30" /> */}
            {/* <FaRegBuilding className="text-2xl mt-2 opacity-30" /> */}
            <PiTreeStructureFill className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation}>
            <AsyncPaginate
              className="w-[200px] cursor-pointer "
              value={selectedOptionTerm}
              onChange={(value) => setSelectedOptionTerm(value)}
              options={[defaultOptionTerm]}
              loadOptions={loadTermOptions}
              classNamePrefix="custom-select"
            />
          </motion.div>
        </div>

        <div className="flex flex-row gap-6 pl-10 mt-8">
          <div>
            <RiUserSettingsFill className="text-2xl mt-2 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation}>
            <AsyncPaginate
              className="w-[200px] cursor-pointer "
              value={selectedOptionTerm}
              onChange={(value) => setSelectedOptionTerm(value)}
              options={[defaultOptionTerm]}
              loadOptions={loadTermOptions}
              classNamePrefix="custom-select"
            />
          </motion.div>
        </div>

        <div className="w-10/12 mx-auto border-t-[2px] mt-10 dark:opacity-10"></div>

        <div className="flex flex-row gap-6 pl-10 mt-10">
          <div>
            <FaBirthdayCake className="text-2xl mt-1 opacity-30" />
          </div>
          <motion.div variants={childrenAnimation} className="custom-wrapper">
            <DatePickerInput value={new Date()} allowEmpty />
          </motion.div>
        </div>

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
            ></TEInput>
          </motion.div>
        </div>

        <div className="w-10/12 mx-auto flex justify-center mt-12">
          <Button
            className="w-[1180px] py-2 dark:text-white/80"
            onClick={() => {
              console.log("asdf");
              handleSubmit((data) => console.log(data))();
            }}
          >
            Create user
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
