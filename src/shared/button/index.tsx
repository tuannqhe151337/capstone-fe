import { TERipple } from "tw-elements-react";
import { cn } from "../utils/cn";
import clsx from "clsx";
import { useDetectDarkmode } from "../hooks/useDetectDarkmode";

type Variant = "primary" | "secondary" | "tertiary" | "quaternary";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: Variant;
  containerClassName?: string;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
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
          variant === "primary" ||
          (variant === "quaternary" && isDarkmode) ||
          (variant === "tertiary" && isDarkmode),
        primary: variant === "secondary",
        dark: variant === "tertiary" && !isDarkmode,
      })}
    >
      <button
        className={cn(
          "inline-block w-full rounded-lg px-4 pb-1.5 pt-2 text-base font-medium leading-normal transition duration-200 ease-in-out focus:outline-none focus:ring-0",
          {
            "bg-primary border-2 border-primary dark:bg-primary-800 dark:border-primary-800 text-white hover:bg-primary-600 dark:hover:bg-primary-700 focus:bg-primary-600 dark:focus:bg-primary-700 active:bg-primary-700 hover:border-primary-600 dark:hover:border-primary-700 focus:border-primary-600 dark:focus:border-primary-700 active:border-primary-700":
              variant === "primary",
            "font-semibold bg-primary-100 border-2 border-primary-100 dark:bg-primary-900/50 dark:border-primary-900/50 text-primary-500 hover:bg-primary-200/70 dark:hover:bg-primary-900/70 focus:bg-primary-200 dark:focus:bg-primary-900/70 active:bg-primary-200 hover:border-primary-200/70 dark:hover:border-primary-900/70 focus:border-primary-200 dark:focus:border-primary-900/70 active:border-primary-200 dark:active:border-primary-900/70":
              variant === "secondary",
            "bg-white border-2 border-primary-300/70 dark:border-primary-800 dark:bg-neutral-800 text-primary-500 hover:bg-primary-50 active:bg-primary-100":
              variant === "tertiary",
            "bg-white border-2 dark:bg-transparent text-neutral-400 border-neutral-100 hover:border-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600":
              variant === "quaternary",
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
