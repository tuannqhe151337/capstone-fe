import { TERipple } from "tw-elements-react";
import { cn } from "../utils/cn";

interface Props {
  children?: React.ReactNode;
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  buttonType,
  className,
}) => {
  return (
    <TERipple rippleColor="light">
      <button
        type={buttonType}
        className={cn(
          "inline-block rounded bg-primary dark:bg-primary-900 px-4 pb-1.5 pt-2 text-base font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700",
          className
        )}
      >
        {children}
      </button>
    </TERipple>
  );
};
