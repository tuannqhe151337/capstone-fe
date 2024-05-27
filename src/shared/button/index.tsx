import { TERipple } from "tw-elements-react";
import { cn } from "../utils/cn";
import clsx from "clsx";
import { useDetectDarkmode } from "../hooks/useDetectDarkmode";

type ButtonType = "primary" | "secondary" | "tertiary";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonType?: ButtonType;
  containerClassName?: string;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  buttonType = "primary",
  containerClassName,
  className,
  ...props
}) => {
  const isDarkmode = useDetectDarkmode();

  return (
    <TERipple
      className={containerClassName}
      rippleColor={clsx({
        light:
          buttonType === "primary" || (buttonType === "tertiary" && isDarkmode),
        primary: buttonType === "secondary",
        dark: buttonType === "tertiary" && !isDarkmode,
      })}
    >
      <button
        className={cn(
          "inline-block w-full rounded-lg px-4 pb-1.5 pt-2 text-base font-medium leading-normal transition duration-200 ease-in-out focus:outline-none focus:ring-0",
          {
            "bg-primary border-2 border-primary dark:bg-primary-900 dark:border-primary-900 text-white hover:bg-primary-600 dark:hover:bg-primary-800 focus:bg-primary-600 dark:focus:bg-primary-800 active:bg-primary-700 hover:border-primary-600 dark:hover:border-primary-800 focus:border-primary-600 dark:focus:border-primary-800 active:border-primary-700":
              buttonType === "primary",
            "bg-white border-2 border-primary-300/70 dark:border-primary-800 dark:bg-neutral-800 text-primary-500 hover:bg-primary-50 active:bg-primary-100":
              buttonType === "secondary",
            "bg-white border-2 dark:bg-transparent text-neutral-400 border-neutral-100 hover:border-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600":
              buttonType === "tertiary",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    </TERipple>
  );
};
