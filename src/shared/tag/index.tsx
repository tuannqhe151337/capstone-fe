import clsx from "clsx";

type Background = "filled" | "unfilled";
type Variant = "new" | "reviewed" | "waiting" | "denied";

interface Props {
  children?: React.ReactNode;
  background?: Background;
  variant?: Variant;
}

export const Tag: React.FC<Props> = ({
  children,
  background = "filled",
  variant = "new",
}) => {
  return (
    <div
      className={clsx({
        rounded: true,
        border: true,
        "bg-white text-green-600 font-bold shadow py-1 px-4 ml-4 mt-1 dark:bg-neutral-800 dark:shadow-black dark:border-neutral-800 group-hover:text-green-700 group-hover:bg-white/85 dark:group-hover:text-green-500 dark:group-hover:bg-neutral-900/70":
          background === "unfilled" && variant === "new",
        "bg-green-600 text-white/90 font-bold shadow py-1 px-4 ml-4 mt-1 dark:bg-green-700 dark:shadow-black dark:border-neutral-800 dark:text-white/70 group-hover:text-white group-hover:bg-green-700 dark:group-hover:bg-green-800 dark:group-hover:text-white/80":
          background === "filled" && variant === "reviewed",
        "bg-white text-primary-500 font-bold shadow py-1 px-4 ml-4 mt-1 dark:bg-neutral-800 dark:shadow-black dark:border-neutral-800 group-hover:text-primary-700 group-hover:bg-white/85 dark:group-hover:text-primary-600 dark:group-hover:bg-neutral-900/70":
          background === "unfilled" && variant === "waiting",
        "bg-white text-red-600 font-bold shadow py-1 px-4 ml-4 mt-1 dark:text-red-700 dark:bg-neutral-800 dark:shadow-black dark:border-neutral-800 group-hover:text-red-700/95 group-hover:bg-white/85 dark:group-hover:text-red-600 dark:group-hover:bg-neutral-900/70":
          background === "unfilled" && variant === "denied",
      })}
    >
      {children}
    </div>
  );
};
