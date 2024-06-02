type Status = "active" | "de-active";

interface Props {
  children?: React.ReactNode;
  status: Status;
}

export const TableCell: React.FC<Props> = ({ children, status }) => (
  <td className="whitespace-nowrap px-6 py-4 font-bold text-primary-500 dark:text-primary-600 group-hover:text-primary-600 dark:group-hover:text-primary-500/90">
    <p
      className={`${
        status === "active"
          ? "text-primary-500 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-600 dark:group-hover:text-primary-500/90"
          : "text-primary-500/70 dark:text-primary-600 font-extrabold py-2 group-hover:text-primary-500 dark:group-hover:text-primary-500/90"
      }`}
    >
      {children}
    </p>
  </td>
);
