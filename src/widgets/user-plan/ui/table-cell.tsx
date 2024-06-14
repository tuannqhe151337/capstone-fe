type Status = "active" | "de-active";

interface Props {
  children?: React.ReactNode;
  status: Status;
}

export const TableCell: React.FC<Props> = ({ children }) => (
  <td className="whitespace-nowrap px-6 py-4 font-bold">
    <p className="font-extrabold py-2">{children}</p>
  </td>
);
