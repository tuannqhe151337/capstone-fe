import { TEInput } from "tw-elements-react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { LanguageChanger } from "../../features/language-changer";
import { ThemeChanger } from "../../features/theme-changer";
import { DarkmodeChanger } from "../../features/darkmode-changer";
import { BubbleBackground } from "../../entities/bubble-background";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmailTokenAndOtpToken,
  selectOtpToken,
} from "../../providers/store/slices/forgotPasswordSlice";
import { z, ZodType } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "../../providers/store/api/usersApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uppercaseFirstCharacter } from "../../shared/utils/uppercase-first-character";
import { ErrorData } from "../../providers/store/api/type";
import { Button } from "../../shared/button";
import { CgSpinner } from "react-icons/cg";
import { InputValidationMessage } from "../../shared/validation-input-message";
import { FaCircleExclamation } from "react-icons/fa6";

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

const imageAnimation: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const heightPlaceholderAnimation: Variants = {
  hidden: {
    height: 0,
    transition: {
      delay: 0.5,
    },
  },
  visible: {
    height: 60,
  },
};

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const NewPasswordSchema = z.string().min(1, "New password cannot be empty");
const ConfirmPasswordSchema = z
  .string()
  .min(1, "Confirm password cannot be empty");

export const ResetPasswordSchema: ZodType<FormData> = z
  .object({
    newPassword: NewPasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password must equal new password",
        path: ["confirmPassword"],
      });
    }
  });
export const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation(["reset-password"]);

  const dispatch = useDispatch();
  const otpToken = useSelector(selectOtpToken);

  // Navigate
  const navigate = useNavigate();

  // Form
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // Mutation
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(otpToken);
    if (otpToken) {
      resetPassword({
        newPassword: data.newPassword,
        otpToken: otpToken,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast("Reset password successfully!", { type: "success" });
      dispatch(deleteEmailTokenAndOtpToken());
      navigate("/auth/login");
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
    <div className="flex flex-row flex-wrap w-full">
      <div className="flex flex-row flex-wrap items-center w-full z-20">
        <div className=" text-5xl text-primary-500 ml-16 p-6">
          <span className="text-4xl font-black">F</span>
          <span className="text-3xl font-extrabold">in</span>
          <span className="text-4xl font-black">P</span>
          <span className="text-3xl font-extrabold">lanning</span>
        </div>

        <div className="ml-auto flex flex-row flex-wrap items-center pr-10 z-20">
          <div className="ml-1.5">
            <LanguageChanger />
          </div>
          <ThemeChanger />
          <DarkmodeChanger />
        </div>
      </div>

      <BubbleBackground />

      <div className="flex flex-row flex-wrap w-full">
        <div className="flex-1">
          <motion.div className="flex justify-center items-center dark:brightness-50">
            <motion.img
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              variants={imageAnimation}
              src="/images/doimatkhau.svg"
              alt=""
              className="h-[500px]"
            />
          </motion.div>
        </div>

        <div className="flex-1 z-10">
          <div className="flex justify-center items-center h-full">
            <motion.div
              className="w-[560px] "
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              variants={staggerChildrenAnimation}
            >
              <motion.div
                variants={childrenAnimation}
                className="mb-8 font-bold text-center text-3xl text-primary-500"
              >
                {t("enterNewPassword")}
              </motion.div>

              <div className="relative w-full">
                <AnimatePresence>
                  {!isLoading && isError && (
                    <div className="absolute w-full">
                      <div className="flex flex-row flex-wrap items-center p-3 gap-3 bg-red-400/30 dark:bg-red-800/30 rounded-lg w-full">
                        <FaCircleExclamation className="text-red-500 dark:text-red-600" />
                        <p className="text-sm text-red-600 dark:text-red-500 font-semibold">
                          {errorMessage}
                        </p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={AnimationStage.HIDDEN}
                  animate={
                    isError ? AnimationStage.VISIBLE : AnimationStage.HIDDEN
                  }
                  variants={heightPlaceholderAnimation}
                />
              </div>

              <motion.div variants={childrenAnimation}>
                <TEInput
                  type="password"
                  label={t("newPassword")}
                  className="w-full bg-white dark:bg-neutral-900"
                  size="lg"
                  autoFocus
                  {...register("newPassword", { required: true })}
                ></TEInput>
                <InputValidationMessage
                  show={true}
                  validateFn={() =>
                    NewPasswordSchema.parse(watch("newPassword"))
                  }
                  className="mb-4"
                />
              </motion.div>

              <motion.div variants={childrenAnimation}>
                <TEInput
                  type="password"
                  label={t("confirmNewPassword")}
                  className="w-full bg-white dark:bg-neutral-900"
                  size="lg"
                  autoFocus
                  {...register("confirmPassword", { required: true })}
                ></TEInput>

                <InputValidationMessage
                  show={true}
                  validateFn={() => {
                    ConfirmPasswordSchema.parse(watch("confirmPassword"));

                    if (watch("newPassword") !== watch("confirmPassword")) {
                      throw new Error(
                        "Confirm new password must equal new password"
                      );
                    }
                  }}
                  className="mb-4"
                />
              </motion.div>

              <motion.div className="mt-5" variants={childrenAnimation}>
                <Button
                  disabled={!isValid}
                  containerClassName="w-full"
                  className="font-bold"
                  onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                >
                  {!isLoading && <>{t("changePassword")}</>}
                  {isLoading && (
                    <CgSpinner className="m-auto text-lg animate-spin" />
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
