import { cn } from "../../../shared/utils/cn";

interface Props {
  isFetching?: boolean;
  skeletonClassName?: string;
  children?: React.ReactNode;
}

export const TableCell: React.FC<Props> = ({
  children,
  isFetching,
  skeletonClassName,
}) => (
  <td className="whitespace-nowrap px-6 py-4 font-bold">
    {isFetching ? (
      <span
        className={cn(
          "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded",
          skeletonClassName
        )}
      ></span>
    ) : (
      <p className="font-extrabold py-2">{children}</p>
    )}
  </td>
);
