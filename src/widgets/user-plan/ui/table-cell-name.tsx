import { Tag } from "../../../shared/tag";

type Status = "active" | "de-active";

interface Props {
  children?: React.ReactNode;
  status: Status;
}

export const TableCellName: React.FC<Props> = ({ children, status }) => (
  <td className="text-left first-letter:whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
    <p
      className={`${
        status === "active"
          ? "inline-block mr-4 text-primary-500 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-600 dark:group-hover:text-primary-500/90"
          : "inline-block mr-4 text-primary-500/70 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-500 dark:group-hover:text-primary-500/90"
      }`}
    >
      {children}
    </p>

    {status === "de-active" && (
      <Tag className="m-0" background="unfilled" variant="deactivate">
        Deactive
      </Tag>
    )}
  </td>
);
