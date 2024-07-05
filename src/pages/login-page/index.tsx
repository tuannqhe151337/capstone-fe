import { TERipple, TEInput } from "tw-elements-react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LanguageChanger } from "../../features/language-changer";
import { ThemeChanger } from "../../features/theme-changer";
import { DarkmodeChanger } from "../../features/darkmode-changer";
import { BubbleBackground } from "../../entities/bubble-background";
import { useEffect, useState } from "react";
import { Button } from "../../shared/button";
import {
  useLoginMutation,
  useMeQuery,
} from "../../providers/store/api/authApi";
import { FaCircleExclamation } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import { LocalStorageItemKey } from "../../providers/store/api/type";

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

const errorMessageAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
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

export const LoginPage: React.FC = () => {
  // Navigate
  const navigate = useNavigate();

  // Use translation
  const { t } = useTranslation(["login"]);

  // Redirect if user already logged in
  const { isSuccess: meQuerySuccess } = useMeQuery();

  useEffect(() => {
    if (meQuerySuccess) {
      navigate(`/`);
    }
  }, [meQuerySuccess]);

  // Mutation
  const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();

  // Username input state
  const [username, setUsername] = useState<string>("");
  const [isUsernameDirty, setIsUsernameDirty] = useState<boolean>(false);

  // Password input state
  const [password, setPassword] = useState<string>("");
  const [isPasswordDirty, setIsPasswordDirty] = useState<boolean>(false);

  // Handling submit
  const handleSubmit = async () => {
    if (username !== "" && password !== "") {
      login({ username, password });

      if (data) {
        localStorage.setItem(LocalStorageItemKey.TOKEN, data.token);
        localStorage.setItem(
          LocalStorageItemKey.REFRESH_TOKEN,
          data.refreshToken
        );
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        localStorage.setItem(LocalStorageItemKey.TOKEN, data.token);
        localStorage.setItem(
          LocalStorageItemKey.REFRESH_TOKEN,
          data.refreshToken
        );
      }

      navigate("/");
    }
  }, [isSuccess]);

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
              src="/images/lamviec.svg"
              alt=""
            />
          </motion.div>
        </div>

        <div className="flex-1 z-10">
          <div className="flex justify-center items-center h-full">
            <motion.div
              className="w-[560px]"
              initial={AnimationStage.HIDDEN}
              animate={AnimationStage.VISIBLE}
              variants={staggerChildrenAnimation}
            >
              {/* Title */}
              <motion.div
                variants={childrenAnimation}
                className="mb-4 font-bold text-center text-3xl text-primary-500"
              >
                {t("login")}
              </motion.div>

              <div className="relative w-full">
                <AnimatePresence>
                  {!isLoading && isError && (
                    <div className="absolute w-full">
                      <div className="flex flex-row flex-wrap items-center p-3 gap-3 bg-red-400/30 dark:bg-red-800/30 rounded-lg w-full">
                        <FaCircleExclamation className="text-red-500 dark:text-red-600" />
                        <p className="text-sm text-red-600 dark:text-red-500 font-semibold">
                          Wrong username or password
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

              {/* Username input */}
              <motion.div variants={childrenAnimation}>
                <TEInput
                  type="text"
                  label="Username"
                  className="w-full bg-white dark:bg-neutral-900"
                  size="lg"
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.currentTarget.value);
                  }}
                  onKeyDown={(e) => {
                    if (!isUsernameDirty) {
                      setIsUsernameDirty(true);
                    }

                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </motion.div>

              <motion.div
                className="pl-3 mb-3 text-sm text-red-500 font-semibold"
                initial={AnimationStage.HIDDEN}
                animate={
                  username === "" && isUsernameDirty
                    ? AnimationStage.VISIBLE
                    : AnimationStage.HIDDEN
                }
                variants={errorMessageAnimation}
              >
                Username can not be empty.
              </motion.div>

              {/* Password input */}
              <motion.div variants={childrenAnimation}>
                <TEInput
                  type="password"
                  label="Password"
                  className="w-full bg-white dark:bg-neutral-900"
                  size="lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                  onKeyDown={async (e) => {
                    if (!isPasswordDirty) {
                      setIsPasswordDirty(true);
                    }

                    if (e.key === "Enter") {
                      await handleSubmit();
                    }
                  }}
                />
              </motion.div>

              <motion.div
                className="pl-3 text-sm text-red-500 font-semibold"
                initial={AnimationStage.HIDDEN}
                animate={
                  password === "" && isPasswordDirty
                    ? AnimationStage.VISIBLE
                    : AnimationStage.HIDDEN
                }
                variants={errorMessageAnimation}
              >
                Password can not be empty.
              </motion.div>

              <motion.div
                className="text-right font-bold text-primary-500 hover:text-primary-600 underline dark:text-primary-700 dark:hover:text-primary-600 duration-200"
                variants={childrenAnimation}
              >
                <Link to={`/auth/forgot-password`}>Forgot password?</Link>
              </motion.div>

              {/* Submit button */}
              <motion.div className="mt-5" variants={childrenAnimation}>
                <TERipple className="w-full">
                  <Button
                    type="button"
                    containerClassName="w-full"
                    className="h-[45px]"
                    disabled={username === "" || password === "" || isLoading}
                    onClick={async () => {
                      await handleSubmit();
                    }}
                  >
                    {!isLoading && t("login")}
                    {isLoading && (
                      <CgSpinner className="m-auto text-lg animate-spin" />
                    )}
                  </Button>
                </TERipple>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
