import { Tag } from "../../../shared/tag";
import { cn } from "../../../shared/utils/cn";

interface Props {
  children?: React.ReactNode;
  isFetching?: boolean;
  skeletonClassName?: string;
  deactivated: boolean;
}

export const TableCellName: React.FC<Props> = ({
  children,
  deactivated,
  isFetching,
  skeletonClassName,
}) => (
  <td className="text-left first-letter:whitespace-nowrap px-6 py-4 font-bold">
    {isFetching ? (
      <span
        className={cn(
          "block h-[30px] mx-auto bg-neutral-200/70 animate-pulse rounded",
          skeletonClassName
        )}
      ></span>
    ) : (
      <>
        <p className="inline-block mr-3">{children}</p>

        {deactivated && (
          <Tag
            className="inline-block ml-auto w-max"
            background="unfilled"
            variant="deactivate"
          >
            Deactive
          </Tag>
        )}
      </>
    )}
  </td>
);
