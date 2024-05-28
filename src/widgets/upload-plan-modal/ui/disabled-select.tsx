import { FaAngleDown } from "react-icons/fa6";
import { cn } from "../../../shared/utils/cn";

interface Props {
  className?: string;
  label: string;
  value: string;
}

export const DisabledSelect: React.FC<Props> = ({
  className,
  label,
  value,
}) => {
  return (
    <div className={cn("flex flex-col flex-wrap cursor-pointer", className)}>
      <p className="mb-1 text-xs font-bold pl-4 text-neutral-300 dark:text-neutral-500">
        {label}
      </p>
      <div className="flex flex-row flex-wrap items-center py-1.5 pl-4 pr-3 border-2 border-neutral-200 dark:border-neutral-700 rounded text-sm text-neutral-400 font-semibold">
        <p>{value}</p>
        <FaAngleDown className="ml-auto text-lg text-neutral-300" />
      </div>
    </div>
  );
};
