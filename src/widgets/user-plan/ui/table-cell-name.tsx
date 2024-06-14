import { Tag } from "../../../shared/tag";

type Status = "active" | "de-active";

interface Props {
  children?: React.ReactNode;
  status: Status;
}

export const TableCellName: React.FC<Props> = ({ children, status }) => (
  <td className="text-left first-letter:whitespace-nowrap px-6 py-4 font-bold">
    <p className="inline-block mr-3">{children}</p>

    {status === "de-active" && (
      <Tag
        className="inline-block ml-auto w-max"
        background="unfilled"
        variant="deactivate"
      >
        Deactive
      </Tag>
    )}
  </td>
);
